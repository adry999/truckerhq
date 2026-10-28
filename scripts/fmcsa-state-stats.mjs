#!/usr/bin/env node
// Builds src/features/carriers/data/states/census.json from the FMCSA Company Census File
// (data.transportation.gov, Socrata dataset az4n-8mr2). Public data, no key required;
// set SOCRATA_APP_TOKEN to avoid throttling. Run: npm run data:census
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DATASET_ID = "az4n-8mr2";
const BASE = `https://data.transportation.gov/resource/${DATASET_ID}.json`;
const DIR = join(fileURLToPath(new URL(".", import.meta.url)), "../src/features/carriers/data/states");
const TOP_CITIES = 6;

// Active, interstate, authorized-for-hire carriers with a US physical address.
// status_code A = active; carrier_operation A = interstate; classdef is a ";"-joined list of
// operation classifications (text column, hence LIKE).
const BASE_FILTER =
  "status_code='A' AND carrier_operation='A' AND classdef like '%AUTHORIZED FOR HIRE%' AND phy_country='US'";

const twelveMonthsAgo = new Date();
twelveMonthsAgo.setUTCFullYear(twelveMonthsAgo.getUTCFullYear() - 1);
const SINCE = twelveMonthsAgo.toISOString().slice(0, 10).replaceAll("-", ""); // add_date is text YYYYMMDD

async function query(params, attempt = 1) {
  const url = `${BASE}?${new URLSearchParams(params)}`;
  const headers = process.env.SOCRATA_APP_TOKEN ? { "X-App-Token": process.env.SOCRATA_APP_TOKEN } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (attempt < 4 && (res.status === 429 || res.status >= 500)) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return query(params, attempt + 1);
    }
    throw new Error(`Socrata ${res.status} for ${url}: ${(await res.text()).slice(0, 200)}`);
  }
  return res.json();
}

const byState = (rows, field) => Object.fromEntries(rows.map((r) => [r.phy_state, Number(r[field])]));

const grouped = (select, extra = "") =>
  query({ $select: `phy_state,${select}`, $where: `${BASE_FILTER}${extra}`, $group: "phy_state", $limit: "100" });

const titleCase = (s) => s.toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());

const states = readdirSync(DIR)
  .filter((f) => f.endsWith(".json") && f !== "census.json")
  .map((f) => ({ slug: f.slice(0, -5), abbr: JSON.parse(readFileSync(join(DIR, f), "utf8")).stateAbbr }));

const [total, recent, small, sums] = await Promise.all([
  grouped("count(*) as n"),
  grouped("count(*) as n", ` AND add_date>='${SINCE}'`),
  grouped("count(*) as n", " AND power_units in ('1','2','3','4','5')"),
  grouped("sum(power_units::number) as pu,sum(total_drivers::number) as dr"),
]);
const totalBy = byState(total, "n");
const recentBy = byState(recent, "n");
const smallBy = byState(small, "n");
const puBy = byState(sums, "pu");
const drBy = byState(sums, "dr");

const out = {};
for (const { slug, abbr } of states.sort((a, b) => a.slug.localeCompare(b.slug))) {
  const cities = await query({
    $select: "phy_city,count(*) as n",
    $where: `${BASE_FILTER} AND phy_state='${abbr}' AND phy_city IS NOT NULL`,
    $group: "phy_city",
    $order: "n DESC",
    $limit: String(TOP_CITIES),
  });
  const n = totalBy[abbr];
  if (!n) throw new Error(`No carriers returned for ${abbr}`);
  out[slug] = {
    activeForHire: n,
    newLast12Months: recentBy[abbr] ?? 0,
    smallFleetCount: smallBy[abbr] ?? 0,
    smallFleetShare: Math.round(((smallBy[abbr] ?? 0) / n) * 1000) / 10,
    powerUnits: puBy[abbr] ?? 0,
    drivers: drBy[abbr] ?? 0,
    topCities: cities.map((c) => ({ city: titleCase(c.phy_city), count: Number(c.n) })),
  };
  console.log(`${abbr} ${n}`);
}

const census = {
  source: {
    name: "FMCSA Company Census File",
    url: `https://data.transportation.gov/d/${DATASET_ID}`,
    datasetId: DATASET_ID,
    fetchedAt: new Date().toISOString(),
    filters: `${BASE_FILTER}; grouped by phy_state. New = add_date >= ${SINCE}. Small fleet = power_units 1-5.`,
  },
  states: out,
};
writeFileSync(join(DIR, "census.json"), JSON.stringify(census, null, 2) + "\n");
console.log(`Wrote ${Object.keys(out).length} states`);
