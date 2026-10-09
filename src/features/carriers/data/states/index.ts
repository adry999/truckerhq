import { buildStateContent } from "@/features/carriers/model/state-content";
import { parseStateData } from "@/features/carriers/model/state-data.schema";
import type { StateContentEntry } from "@/features/carriers/model/carriers.types";
import alabama from "./alabama.json";
import alaska from "./alaska.json";
import arizona from "./arizona.json";
import arkansas from "./arkansas.json";
import california from "./california.json";
import colorado from "./colorado.json";
import connecticut from "./connecticut.json";
import delaware from "./delaware.json";
import florida from "./florida.json";
import georgia from "./georgia.json";
import hawaii from "./hawaii.json";
import idaho from "./idaho.json";
import illinois from "./illinois.json";
import indiana from "./indiana.json";
import iowa from "./iowa.json";
import kansas from "./kansas.json";
import kentucky from "./kentucky.json";
import louisiana from "./louisiana.json";
import maine from "./maine.json";
import maryland from "./maryland.json";
import massachusetts from "./massachusetts.json";
import michigan from "./michigan.json";
import minnesota from "./minnesota.json";
import mississippi from "./mississippi.json";
import missouri from "./missouri.json";
import montana from "./montana.json";
import nebraska from "./nebraska.json";
import nevada from "./nevada.json";
import newHampshire from "./new-hampshire.json";
import newJersey from "./new-jersey.json";
import newMexico from "./new-mexico.json";
import newYork from "./new-york.json";
import northCarolina from "./north-carolina.json";
import northDakota from "./north-dakota.json";
import ohio from "./ohio.json";
import oklahoma from "./oklahoma.json";
import oregon from "./oregon.json";
import pennsylvania from "./pennsylvania.json";
import rhodeIsland from "./rhode-island.json";
import southCarolina from "./south-carolina.json";
import southDakota from "./south-dakota.json";
import tennessee from "./tennessee.json";
import texas from "./texas.json";
import utah from "./utah.json";
import vermont from "./vermont.json";
import virginia from "./virginia.json";
import washington from "./washington.json";
import westVirginia from "./west-virginia.json";
import wisconsin from "./wisconsin.json";
import wyoming from "./wyoming.json";

const RAW_STATES: Record<string, unknown> = {
  "alabama": alabama,
  "alaska": alaska,
  "arizona": arizona,
  "arkansas": arkansas,
  "california": california,
  "colorado": colorado,
  "connecticut": connecticut,
  "delaware": delaware,
  "florida": florida,
  "georgia": georgia,
  "hawaii": hawaii,
  "idaho": idaho,
  "illinois": illinois,
  "indiana": indiana,
  "iowa": iowa,
  "kansas": kansas,
  "kentucky": kentucky,
  "louisiana": louisiana,
  "maine": maine,
  "maryland": maryland,
  "massachusetts": massachusetts,
  "michigan": michigan,
  "minnesota": minnesota,
  "mississippi": mississippi,
  "missouri": missouri,
  "montana": montana,
  "nebraska": nebraska,
  "nevada": nevada,
  "new-hampshire": newHampshire,
  "new-jersey": newJersey,
  "new-mexico": newMexico,
  "new-york": newYork,
  "north-carolina": northCarolina,
  "north-dakota": northDakota,
  "ohio": ohio,
  "oklahoma": oklahoma,
  "oregon": oregon,
  "pennsylvania": pennsylvania,
  "rhode-island": rhodeIsland,
  "south-carolina": southCarolina,
  "south-dakota": southDakota,
  "tennessee": tennessee,
  "texas": texas,
  "utah": utah,
  "vermont": vermont,
  "virginia": virginia,
  "washington": washington,
  "west-virginia": westVirginia,
  "wisconsin": wisconsin,
  "wyoming": wyoming,
};

export const STATE_CONTENT: Record<string, StateContentEntry> = Object.fromEntries(
  Object.entries(RAW_STATES).map(([slug, raw]) => [slug, buildStateContent(parseStateData(slug, raw))]),
);

export const STATE_SLUGS = Object.keys(STATE_CONTENT);
