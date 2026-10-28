import { INDEXABLE, SITE_URL } from "@/shared/config/site";
import { GUIDES, hasGuideBody } from "@/features/guides";
import { DISPATCH_SERVICE_PAGES } from "@/features/dispatch";

// Built from build-time values only, so the response is prerendered.
export const dynamic = "force-static";

const page = (path: string, title: string, note: string) => `- [${title}](${SITE_URL}${path}): ${note}`;

function buildLlmsTxt(): string {
  const guides = GUIDES.filter(hasGuideBody).map((g) =>
    page(`/guides/${g.slug}`, g.title, `${g.category} guide for owner-operators, ${g.minutes} min read.`),
  );

  const servicePages = DISPATCH_SERVICE_PAGES.map((s) => page(`/dispatch/${s.slug}`, s.title, s.description));

  return [
    "# Trucker HQ",
    "",
    "> Truck dispatch for owner-operators and small fleets at a flat weekly price, never a percentage of the load. English and Russian-speaking dispatchers, plus CDL driver jobs and free carrier lookup built on public FMCSA data.",
    "",
    "## Services",
    "",
    page("/dispatch", "Truck dispatch", "Flat weekly rate per truck, 24/7 dispatchers, broker checks and paperwork included."),
    ...servicePages,
    page("/pricing", "Pricing", "Dispatch packages at a flat weekly price per truck, driver hiring plans, flat fee vs percentage."),
    page("/jobs", "CDL driver jobs", "Listings with the pay stated up front."),
    page("/jobs/russian-speaking", "Russian-speaking driver jobs", "CDL jobs with Russian-speaking recruiters and dispatchers."),
    page("/hire-drivers", "Hire drivers", "Post jobs and reach CDL drivers."),
    "",
    "## Free tools",
    "",
    page("/tools", "Carrier tools", "Overview of the free tools."),
    page("/tools/carrier-lookup", "MC and DOT carrier lookup", "Authority, insurance, inspections and crashes from FMCSA data, with a Health Score."),
    page("/tools/new-mc-checklist", "New MC checklist", "Steps for a new motor carrier authority."),
    page("/tools/profit-per-mile", "Profit per mile calculator", "Work out what a load really pays."),
    page("/tools/compliance-alerts", "Compliance alerts", "Reminders for insurance, authority and filing deadlines."),
    ...(guides.length > 0 ? ["", "## Guides", "", ...guides] : []),
    "",
    "## Company",
    "",
    page("/about", "About Trucker HQ", "Who we are and how to reach us."),
    "",
    "## Russian",
    "",
    page("/ru", "Trucker HQ по-русски", "Главная страница: диспетчинг, работа CDL, бесплатные инструменты."),
    page("/ru/dispatch", "Диспетчинг", "Фиксированная цена в неделю, без процентов."),
    page("/ru/jobs", "Работа CDL", "Вакансии с указанной оплатой."),
    page("/ru/pricing", "Цены", "Пакеты диспетчинга за фиксированную цену в неделю."),
    page("/ru/tools", "Бесплатные инструменты", "Калькулятор прибыли на милю, чек-лист нового MC, SMS-уведомления FMCSA."),
    page("/ru/tools/profit-per-mile", "Прибыль за милю", "Сколько на самом деле платит груз."),
    page("/ru/tools/new-mc-checklist", "Чек-лист нового MC", "Шаги для нового authority за первые 6 месяцев."),
    page("/ru/tools/compliance-alerts", "Уведомления FMCSA", "SMS, когда меняется authority, страховка или safety-статус."),
    "",
  ].join("\n");
}

export function GET() {
  if (!INDEXABLE) return new Response("Not found", { status: 404 });
  return new Response(buildLlmsTxt(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
