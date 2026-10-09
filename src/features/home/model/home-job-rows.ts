export type HomeJobRow = {
  title: string;
  company: string;
  loc: string;
  type: string;
  equip: string;
  pay: string;
  posted: string;
  href: string;
};

// The fields of a job the home page shows. A structural type, so this feature
// does not import the jobs feature: app-level code passes the jobs in.
export type HomeJobSource = {
  slug: string;
  title: string;
  company: string;
  loc: string;
  type: string;
  equipment: string;
  pay: string;
  posted: string;
};

// Company, location and pay are data, not prose, so only titles are translated.
const RU_JOB_TITLES: Record<string, string> = {
  "otr-company-driver-carpathian": "Водитель OTR в компанию",
  "regional-reefer-driver-lone-star": "Региональный водитель, reefer",
  "team-drivers-iron-horse": "Командные водители",
  "local-flatbed-driver-bluebonnet": "Локальный водитель, flatbed",
  "owner-operator-power-only-volga": "Owner-operator, power only",
  "otr-reefer-solo-moldova": "OTR, reefer, соло",
  "regional-dry-van-laredo": "Региональный водитель, dry van",
};

function ruPostedLabel(posted: string): string {
  if (/today/i.test(posted)) return "Сегодня";
  const m = /(\d+)\s*day/i.exec(posted);
  if (!m) return posted;
  const n = Number(m[1]);
  const word = n === 1 ? "день" : n >= 2 && n <= 4 ? "дня" : "дней";
  return `${n} ${word} назад`;
}

export function homeJobRows(lang: "EN" | "RU", jobs: readonly HomeJobSource[]): HomeJobRow[] {
  const ru = lang === "RU";
  return jobs.map((j) => ({
    title: ru ? (RU_JOB_TITLES[j.slug] ?? j.title) : j.title,
    company: j.company,
    loc: j.loc,
    type: j.type,
    equip: j.equipment.toUpperCase(),
    pay: j.pay,
    posted: ru ? ruPostedLabel(j.posted) : j.posted,
    href: `/jobs/${j.slug}`,
  }));
}
