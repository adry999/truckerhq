import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Logo from "@/components/Logo";
import GrossComparison from "@/components/GrossComparison";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Диспетчинг для дальнобойщиков, фиксированная цена в неделю",
  description:
    "Диспетчинг для owner-operator и небольших автопарков. Одна фиксированная цена за грузовик в неделю, диспетчеры 24/7, проверка брокеров, документы включены.",
  alternates: {
    canonical: "/ru/dispatch",
    languages: { en: "/dispatch", ru: "/ru/dispatch", "x-default": "/dispatch" },
  },
};

const INCLUDED = [
  { t: "Диспетчер 24/7", d: "Живой человек в вашем часовом поясе, днём и ночью. По-английски или по-русски." },
  { t: "Биржи грузов", d: "Мы ищем на DAT, Truckstop и у прямых брокеров, чтобы вам не пришлось." },
  { t: "Торг за ставку", d: "Давим на каждого брокера за более высокую цену. Сверяем со средней по маршруту, прежде чем согласиться." },
  { t: "Проверка брокера", d: "Кредитная история, скорость оплаты и статус авторизации проверяются перед каждой бронью." },
  { t: "Скидки на топливо", d: "Скидки по топливной карте на крупных сетях заправок по всей стране." },
  { t: "Документы", d: "Rate con, BOL, инвойсы и пакеты для факторинга — всё оформляем за вас." },
  { t: "Напоминания по комплаенсу", d: "Следим за страховкой, UCR, IFTA и датами по авторизации." },
  { t: "Присутствие онлайн", d: "Простой сайт и профиль Google Business, чтобы брокеры и грузоотправители находили вас." },
];

const PACKAGES = [
  {
    who: "MC МОЛОЖЕ 6 МЕСЯЦЕВ",
    name: "Starter MC",
    unit: "/ неделя",
    desc: "Для новых авторизаций, которым нужны первые брокеры и первые грузы.",
    items: ["Полный диспетчинг", "Пакеты для оформления у брокеров", "Брокеры, работающие с новыми MC", "Разбор New MC Checklist", "Напоминания по комплаенсу"],
    cta: "Начать Starter MC",
    featured: false,
  },
  {
    who: "1–3 ГРУЗОВИКА",
    name: "Owner-Operator Flat",
    unit: "/ неделя за грузовик",
    desc: "Всё включено. Одна цена, каждую неделю.",
    items: ["Диспетчер 24/7 в вашем поясе", "Торг за ставку на каждый груз", "Проверка брокеров", "Документы и инвойсы", "Скидки по топливной карте"],
    cta: "Начать диспетчинг",
    featured: true,
    popular: true,
  },
  {
    who: "3–10 ГРУЗОВИКОВ",
    name: "Fleet",
    unit: "/ неделя за грузовик",
    desc: "Цена ниже за грузовик и один диспетчер, знающий весь ваш парк.",
    items: ["Всё из Owner-Operator", "Персональный диспетчер", "Еженедельный отчёт по парку", "Помощь в найме водителей", "Сайт и профиль Google включены"],
    cta: "Поговорить с нами",
    featured: false,
  },
  {
    who: "ЛЮБОЙ ПЕРЕВОЗЧИК",
    name: "Web & Brand",
    unit: "разовый платёж",
    desc: "Выглядите как настоящая компания для брокеров и грузоотправителей.",
    items: ["Одностраничный сайт компании", "Профиль Google Business", "Почта на вашем домене", "Файл логотипа и надписи на дверь", "Добавляется к любому пакету диспетчинга"],
    cta: "Выйти онлайн",
    featured: false,
  },
];

const STEPS = [
  { n: "1", title: "Звоните или регистрируйтесь", desc: "Расскажите про грузовик, оборудование, маршруты и время дома. Пришлите MC, W-9 и страховку." },
  { n: "2", title: "Мы бронируем грузы", desc: "Ищем на биржах, проверяем брокера и торгуемся. Вы одобряете каждый груз." },
  { n: "3", title: "Вы едете, мы делаем бумаги", desc: "Rate con, check calls, инвойсы и факторинг. Вам платят, мы получаем ту же фиксированную цену." },
];

const FAQ = [
  { q: "Что входит в фиксированную недельную цену?", a: "Всё на этой странице: поиск грузов, торг за ставку, проверка брокеров, документы, инвойсы, скидки на топливо и поддержка 24/7. Никаких доплат за груз." },
  { q: "Есть ли долгосрочный контракт?", a: "Долгого контракта нет. Диспетчинг работает неделя за неделей. Предупредите за неделю — и вы свободны." },
  { q: "Вы навязываете мне грузы?", a: "Никогда. Мы приносим вам варианты со ставкой и маршрутом. Вы говорите да или нет. Это ваш грузовик." },
  { q: "У меня новый MC. Брокеры будут со мной работать?", a: "Некоторые нет, и мы знаем, кто будет. Starter MC включает пакеты для оформления у брокеров и маршруты, принимающие новые авторизации." },
  { q: "Вы работаете с факторинговыми компаниями?", a: "Да. Мы отправляем rate con, BOL и инвойсы в вашу факторинговую компанию, либо выставляем счета брокерам напрямую, если вы не факторите." },
  { q: "Какое оборудование вы диспетчерите?", a: "Dry van, reefer, flatbed, step deck, power only и box truck." },
];

export default function DispatchRuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={faqSchema(FAQ)} />
      <SiteHeader lang="RU" enHref="/dispatch" ruHref="/ru/dispatch" />

      <section className="relative overflow-hidden bg-asphalt text-offwhite">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1783247007596-cca4a61a16f5?fm=jpg&q=70&w=2000&auto=format&fit=crop"
            alt="Водитель в кабине на стоянке для дальнобойщиков, рассвет"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(22,24,27,.94)] via-[rgba(22,24,27,.7)] to-[rgba(22,24,27,.35)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-28">
          <div className="flex flex-col gap-5">
            <Logo theme="dark" size={30} sub="ДИСПЕТЧИНГ" />
            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl">
              Фиксированная цена в неделю.
              <br />
              <span className="text-amber">Без процентов.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#D4D6DA] md:text-xl">
              Мы находим грузы, торгуемся за ставку и делаем документы. Вы
              платите одну цену каждую неделю, независимо от вашей выручки.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#pricing"
                className="flex h-14 items-center rounded-xl bg-amber px-7 font-display text-xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                Смотреть пакеты
              </a>
              <a
                href="tel:+1XXXXXXXXXX"
                className="flex h-14 items-center rounded-xl border-2 border-offwhite px-6 font-display text-xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                Звонок (XXX) XXX-XXXX
              </a>
            </div>
          </div>
          <div className="justify-self-end w-full max-w-[420px] rounded-[10px] bg-green p-1.5">
            <div className="flex flex-col gap-3.5 rounded-md border-[1.5px] border-white/70 p-6">
              <div className="font-display text-[15px] font-bold tracking-[.14em] text-amber">
                ОДИН ГРУЗОВИК · ОДНА ЦЕНА
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-8xl font-extrabold">$XXX</span>
                <span className="text-[17px] text-[#DCE6E0]">/ неделя</span>
              </div>
              <div className="h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_24px,transparent_24px_40px)]" />
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <div className="font-display text-3xl font-extrabold">24/7</div>
                  <div className="text-sm text-[#DCE6E0]">все пояса США</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold">0%</div>
                  <div className="text-sm text-[#DCE6E0]">от вашей выручки</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold">EN · RU</div>
                  <div className="text-sm text-[#DCE6E0]">диспетчеры</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-extrabold">1 НЕДЕЛЯ</div>
                  <div className="text-sm text-[#DCE6E0]">на выход</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="road-line relative h-1.5" />
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Всё, что должен делать диспетчер
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((i) => (
            <div key={i.t} className="flex flex-col gap-2.5 rounded-lg border-[1.5px] border-border bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 shrink-0 rounded-sm bg-amber" />
                <span className="font-display text-2xl font-extrabold uppercase leading-tight">
                  {i.t}
                </span>
              </div>
              <div className="text-[15px] leading-relaxed text-[#4B5058]">{i.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="border-y border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:py-24">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              Выберите свой вариант
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4B5058]">
              Каждый пакет диспетчинга — фиксированная цена в неделю. Неделя
              за неделей, без долгого контракта.
            </p>
          </div>
          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className={
                  p.featured
                    ? "flex rounded-[10px] bg-green p-1.5"
                    : "flex rounded-[10px] border-[1.5px] border-border"
                }
              >
                <div
                  className={`flex flex-1 flex-col gap-3.5 rounded-md p-6 ${
                    p.featured ? "border-[1.5px] border-white/70 text-offwhite" : "text-asphalt"
                  }`}
                >
                  <div className="flex min-h-7 items-center justify-between gap-2">
                    <span
                      className={`font-display text-[15px] font-bold tracking-[.14em] ${
                        p.featured ? "text-amber" : "text-grey"
                      }`}
                    >
                      {p.who}
                    </span>
                    {p.popular && (
                      <span className="flex h-7 items-center rounded-md bg-amber px-2.5 font-display text-sm font-extrabold tracking-[.08em] text-asphalt">
                        ПОПУЛЯРНЫЙ
                      </span>
                    )}
                  </div>
                  <div className="font-display text-[34px] font-extrabold uppercase leading-[0.95]">
                    {p.name}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-5xl font-extrabold">$XXX</span>
                    <span className={`text-[15px] ${p.featured ? "text-[#DCE6E0]" : "text-[#4B5058]"}`}>
                      {p.unit}
                    </span>
                  </div>
                  <div className={`text-[15px] leading-snug ${p.featured ? "text-[#DCE6E0]" : "text-[#4B5058]"}`}>
                    {p.desc}
                  </div>
                  <div className={`h-px ${p.featured ? "bg-white/25" : "bg-border"}`} />
                  <ul className="flex flex-1 flex-col gap-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[15px] leading-snug">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-amber" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dispatch/start"
                    className={`mt-1.5 flex h-14 items-center justify-center rounded-xl font-display text-xl font-extrabold uppercase tracking-[.05em] ${
                      p.featured
                        ? "bg-amber text-asphalt hover:bg-amber-hover"
                        : "border-2 border-asphalt text-asphalt hover:bg-asphalt hover:text-offwhite"
                    }`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Старт за 3 шага
        </h2>
        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-7 right-7 top-[27px] hidden h-1 bg-[repeating-linear-gradient(90deg,#F2A900_0_32px,transparent_32px_52px)] md:block" />
          {STEPS.map((s) => (
            <div key={s.n} className="relative flex flex-col gap-3.5">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-md bg-asphalt font-display text-3xl font-extrabold text-amber shadow-[0_0_0_6px_var(--color-offwhite)]">
                {s.n}
              </div>
              <div className="font-display text-3xl font-extrabold uppercase">{s.title}</div>
              <div className="max-w-[340px] text-base leading-relaxed text-[#3F444B]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-asphalt text-offwhite">
        <div className="mx-auto flex max-w-6xl flex-col gap-9 px-4 py-14 sm:px-6 md:py-24">
          <div className="flex flex-col gap-2">
            <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
              ФИКСИРОВАННАЯ ЦЕНА ПРОТИВ ПРОЦЕНТА
            </div>
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              Сколько вам стоит процент
            </h2>
          </div>
          <GrossComparison lang="RU" />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-14 sm:px-6 md:py-24">
        <h2 className="font-display text-4xl font-extrabold md:text-5xl">
          Вопросы о диспетчинге
        </h2>
        <div className="flex flex-col border-t-2 border-asphalt">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold marker:hidden">
                {f.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEEFEC] text-xl font-medium group-open:bg-amber">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <div className="pb-5 text-base leading-relaxed text-[#3F444B]">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-5xl rounded-[24px] bg-green p-2">
          <div className="flex flex-wrap items-center justify-between gap-7 rounded-xl border-2 border-white/75 px-6 py-10 text-offwhite sm:px-12 sm:py-14">
            <div className="flex max-w-xl flex-col gap-3">
              <div className="font-display text-[15px] font-bold tracking-[.16em] text-amber">
                СЛЕДУЮЩИЙ ВЫЕЗД · ВАШ ПЕРВЫЙ ГРУЗ
              </div>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] md:text-6xl">
                Готовы стартовать?
              </h2>
              <p className="text-lg leading-relaxed text-[#E3EAE6]">
                Десять минут по телефону. Мы можем забронировать ваш первый
                груз уже сегодня.
              </p>
            </div>
            <div className="flex min-w-[280px] flex-col gap-3">
              <Link
                href="/dispatch/start"
                className="flex h-[60px] items-center justify-center rounded-xl bg-amber px-7 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-asphalt hover:bg-amber-hover"
              >
                Начать диспетчинг
              </Link>
              <a
                href="tel:+1XXXXXXXXXX"
                className="flex h-[60px] items-center justify-center rounded-xl border-2 border-offwhite px-6 font-display text-2xl font-extrabold uppercase tracking-[.05em] text-offwhite hover:bg-offwhite hover:text-asphalt"
              >
                Звонок (XXX) XXX-XXXX
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
