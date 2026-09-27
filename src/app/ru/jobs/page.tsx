import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Logo from "@/components/Logo";
import { JOBS, healthColor, CARRIERS } from "@/lib/data";
import { CITY_DIRECTORY } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Работа CDL с указанной оплатой",
  description:
    "OTR, региональные и локальные вакансии CDL-A. В каждой вакансии — оплата, время дома и Health Score перевозчика. Отклик на английском или русском.",
  alternates: {
    canonical: "/ru/jobs",
    languages: { en: "/jobs", ru: "/ru/jobs", "x-default": "/jobs" },
  },
};

const TYPES = ["All", "OTR", "REGIONAL", "LOCAL", "TEAM", "OWNER-OP"] as const;
const EQUIPMENT = ["All", "Dry van", "Reefer", "Flatbed", "Power only"] as const;

function scoreFor(carrierSlug: string) {
  return CARRIERS.find((c) => c.slug === carrierSlug)?.score ?? 75;
}

export default async function JobsRuPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; equip?: string; q?: string }>;
}) {
  const params = await searchParams;
  const type = params.type ?? "All";
  const equip = params.equip ?? "All";
  const q = (params.q ?? "").trim().toLowerCase();

  const filtered = JOBS.filter((j) => {
    if (type !== "All" && j.type !== type) return false;
    if (equip !== "All" && j.equipment !== equip) return false;
    if (q && !(j.company + j.loc + j.title).toLowerCase().includes(q)) return false;
    return true;
  });

  const chipHref = (next: Record<string, string>) => {
    const sp = new URLSearchParams({ type, equip });
    if (q) sp.set("q", q);
    Object.entries(next).forEach(([k, v]) => {
      if (v === "All") sp.delete(k);
      else sp.set(k, v);
    });
    const qs = sp.toString();
    return qs ? `/ru/jobs?${qs}` : "/ru/jobs";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang="RU" enHref="/jobs" ruHref="/ru/jobs" />

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-[18px] px-4 py-10 sm:px-6 md:py-20">
          <Logo theme="dark" size={28} sub="JOBS" />
          <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl">
            Работа CDL.
            <br />
            <span className="text-amber">Оплата указана сразу.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#D4D6DA]">
            В каждой вакансии — оплата и время дома. У каждого перевозчика —
            Health Score. Отклик на английском или русском.
          </p>
          <form
            action="/ru/jobs"
            className="flex max-w-3xl flex-col gap-1.5 rounded-lg border-[3px] border-amber bg-white p-1.5 sm:flex-row"
          >
            <input
              name="q"
              defaultValue={q}
              aria-label="Поиск вакансий"
              placeholder="Город, штат или компания"
              className="min-h-[58px] flex-1 border-0 bg-transparent px-3.5 font-sans text-lg text-asphalt outline-none"
            />
            <button
              type="submit"
              className="min-h-[58px] rounded px-8 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt"
              style={{ background: "var(--color-amber)" }}
            >
              Найти работу
            </button>
          </form>
        </div>
        <div className="road-line h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-7 sm:px-6 md:pb-20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="w-[92px] shrink-0 font-display text-sm font-bold tracking-[.12em] text-grey">
              ТИП РАБОТЫ
            </span>
            {TYPES.map((t) => (
              <Link
                key={t}
                href={chipHref({ type: t })}
                className={`flex h-11 shrink-0 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                  type === t
                    ? "bg-asphalt text-offwhite"
                    : "border-[1.5px] border-border bg-white text-asphalt"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
            <span className="w-[92px] shrink-0 font-display text-sm font-bold tracking-[.12em] text-grey">
              ОБОРУДОВАНИЕ
            </span>
            {EQUIPMENT.map((e) => (
              <Link
                key={e}
                href={chipHref({ equip: e })}
                className={`flex h-11 shrink-0 items-center rounded-[10px] px-3.5 font-display text-base font-extrabold tracking-[.06em] ${
                  equip === e
                    ? "bg-asphalt text-offwhite"
                    : "border-[1.5px] border-border bg-white text-asphalt"
                }`}
              >
                {e}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            {filtered.length} ваканси{filtered.length === 1 ? "я" : filtered.length >= 2 && filtered.length <= 4 ? "и" : "й"}
          </h2>
          <span className="text-sm text-grey">Сначала новые</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((j) => {
            const score = scoreFor(j.carrierSlug);
            return (
              <Link
                key={j.slug}
                href={`/jobs/${j.slug}`}
                className="flex flex-col gap-3.5 rounded-lg border-[1.5px] border-border bg-white p-5 hover:border-green"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-[26px] font-extrabold uppercase leading-tight">
                      {j.title}
                    </span>
                    <span className="text-sm text-[#4B5058]">
                      {j.company} · {j.loc}
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-2xl border-[1.5px] border-border py-0.5 pl-1 pr-2">
                    <span
                      className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-display text-[15px] font-extrabold"
                      style={{
                        background: healthColor(score),
                        color: score >= 60 && score < 80 ? "#16181B" : "#F7F7F5",
                      }}
                    >
                      {score}
                    </span>
                    <span className="text-[13px] font-semibold text-[#4B5058]">Health</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-[34px] font-extrabold tabular-nums text-green">
                    {j.pay}
                  </span>
                  <span className="text-sm text-[#4B5058]">{j.payNote}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="flex h-7 items-center rounded-md bg-[#E2F0E8] px-2.5 font-display text-[15px] font-extrabold tracking-[.08em] text-green">
                    {j.type}
                  </span>
                  <span className="flex h-7 items-center rounded-md bg-[#EEEFEC] px-2.5 font-display text-[15px] font-bold tracking-[.06em] text-[#3F444B]">
                    {j.equipment.toUpperCase()}
                  </span>
                  <span className="flex h-7 items-center rounded-md bg-[#EEEFEC] px-2.5 font-display text-[15px] font-bold tracking-[.06em] text-[#3F444B]">
                    {j.home.toUpperCase()}
                  </span>
                  {j.russian && (
                    <span className="flex h-7 items-center rounded-md border border-[#9CA0A8] px-2.5 font-display text-[15px] font-extrabold tracking-[.06em] text-[#3F444B]">
                      ГОВОРИМ ПО-РУССКИ
                    </span>
                  )}
                </div>
                <div className="flex justify-between border-t border-[#ECEDEA] pt-3 text-[13px] text-grey">
                  <span>
                    {j.posted} · {j.experience}
                  </span>
                  <span className="font-display text-[17px] font-bold tracking-[.05em] text-green">
                    СМОТРЕТЬ →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-lg border border-border bg-white p-10 text-center text-base text-[#4B5058]">
            Нет вакансий по этим фильтрам. Попробуйте убрать часть фильтров.
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3.5">
          <h3 className="font-display text-2xl font-extrabold uppercase">
            Вакансии по городам
          </h3>
          <div className="flex flex-wrap gap-2">
            {CITY_DIRECTORY.map((c) => (
              <Link
                key={c.slug}
                href={`/jobs/${c.slug}`}
                className="flex h-11 items-center gap-2 rounded-[10px] border-[1.5px] border-border bg-white px-3.5 text-[15px] font-semibold hover:border-green"
              >
                {c.name}
                <span className="text-[13px] font-medium text-grey">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-green">
          <div className="flex flex-wrap items-center justify-between gap-[18px] p-6 text-offwhite">
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
                ПЕРЕВОЗЧИКАМ
              </span>
              <span className="font-display text-[32px] font-extrabold uppercase leading-none">
                Нужен водитель? Разместите вакансию здесь.
              </span>
            </div>
            <Link
              href="/hire-drivers"
              className="flex h-14 items-center rounded-xl bg-amber px-[26px] font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
            >
              Нанять водителей
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
