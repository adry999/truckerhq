import type { Locale } from "@/shared/i18n/locale";

export type ChecklistItem = { title: string; description: string };
export type AuditStep = { number: string; title: string; description: string };
export type ChecklistFaq = { q: string; a: string };

export type NewMcCopy = {
  toolsLabel: string;
  toolsHref: string;
  crumb: string;
  h1: string;
  intro: string;
  beforeHeading: string;
  beforeYouHaul: ChecklistItem[];
  auditEyebrow: string;
  auditHeading: string;
  auditIntro: string;
  auditSteps: AuditStep[];
  shutdownHeading: string;
  shutdownIntro: string;
  shutdownReasons: ChecklistItem[];
  faqHeading: string;
  faq: ChecklistFaq[];
  cta: {
    eyebrow: string;
    heading: string;
    body: string;
    primary: string;
    primaryHref: string;
    secondary: string;
    secondaryHref: string;
  };
};

export const NEW_MC_COPY: Record<Locale, NewMcCopy> = {
  EN: {
    toolsLabel: "Tools",
    toolsHref: "/tools",
    crumb: "New MC Checklist",
    h1: "New MC checklist",
    intro:
      "Every step for your first 6 months, from getting your USDOT and MC number to passing the FMCSA new entrant safety audit.",
    beforeHeading: "Before you haul",
    beforeYouHaul: [
      {
        title: "USDOT & MC number",
        description:
          "Issued by FMCSA when you register through the Unified Registration System. Your authority goes active after a 4-day protest period.",
      },
      {
        title: "BOC-3 process agent",
        description:
          "Required in every state you operate. A process agent service can file blanket coverage for all 50 states in one shot.",
      },
      {
        title: "UCR registration",
        description:
          "Unified Carrier Registration, paid every year. The fee is based on how many trucks are in your fleet.",
      },
      {
        title: "BMC-91/91X insurance",
        description:
          "Liability and optional cargo insurance, filed straight to FMCSA by your insurer. This is not paperwork you file yourself.",
      },
      {
        title: "EIN & business bank account",
        description:
          "Keep company money separate from day one. Brokers and factoring companies will ask for both.",
      },
      {
        title: "IFTA & IRP",
        description:
          "Fuel tax license and apportioned plates if you run more than one state. Skip these and roadside stops get expensive fast.",
      },
    ],
    auditEyebrow: "YOUR FIRST 90 DAYS",
    auditHeading: "The new entrant safety audit",
    auditIntro:
      "FMCSA monitors every new entrant for 18-24 months and typically schedules a safety audit within the first 12 months, often inside the first 60 to 90 days. This is the single most important thing a new MC needs to be ready for.",
    auditSteps: [
      {
        number: "1",
        title: "Authority goes active",
        description:
          "Your USDOT and MC are live. FMCSA starts an 18-24 month new entrant monitoring period the same day.",
      },
      {
        number: "2",
        title: "Audit gets scheduled",
        description:
          "Most new entrants see a safety audit within the first 12 months, often inside the first 60-90 days.",
      },
      {
        number: "3",
        title: "The paperwork gets checked",
        description:
          "Driver qualification files, HOS and ELD records, drug & alcohol testing, maintenance records and your accident register.",
      },
      {
        number: "4",
        title: "Pass, fix, or lose your authority",
        description:
          "Most failures are missing files, not violations. An unsatisfactory rating can lead to revoked operating authority.",
      },
    ],
    shutdownHeading: "Common reasons new MCs get shut down",
    shutdownIntro:
      "Most authorities do not lose their MC over a crash. They lose it over a missed filing.",
    shutdownReasons: [
      {
        title: "BOC-3 lapses",
        description:
          "Miss it in even one state you run and your authority can be frozen until it is refiled.",
      },
      {
        title: "Failing the audit on paperwork",
        description:
          "Missing driver files or HOS logs fails you just as fast as an actual safety problem.",
      },
      {
        title: "Skipping the Clearinghouse",
        description:
          "Every DOT-regulated carrier with drivers, even a solo owner-operator, must register for the Drug & Alcohol Clearinghouse.",
      },
      {
        title: "No ELD or HOS logs",
        description:
          "Running without required logs is one of the fastest paths to an unsatisfactory safety rating.",
      },
      {
        title: "BMC-91X lapses",
        description:
          "Let your insurance filing lapse for even a day and FMCSA revokes operating authority automatically, no grace period.",
      },
    ],
    faqHeading: "New MC questions",
    faq: [
      {
        q: "How long does it take to get my MC?",
        a: "USDOT and MC numbers are usually issued within a few business days of applying through URS. Your authority does not go active until a 4-day protest period passes and your BOC-3 and insurance filings are on file with FMCSA.",
      },
      {
        q: "Can I haul loads before the safety audit?",
        a: "Yes. You can haul as soon as your authority is active. The safety audit usually happens later in your first year, but FMCSA expects you to be keeping full driver, HOS and maintenance records from day one, not just once the audit is scheduled.",
      },
      {
        q: "What is BOC-3 and do I need it in every state?",
        a: "BOC-3 designates a process agent to accept legal papers on your behalf, and yes, you need coverage in every state you operate. Most process agent services file blanket coverage for all 50 states at once.",
      },
      {
        q: "Will brokers work with a brand-new MC?",
        a: "Some brokers filter out authorities under 6 months, mainly over insurance and fraud risk. Plenty still will, especially if a dispatcher who knows which brokers accept new MCs is setting up the load.",
      },
      {
        q: "What happens if I fail the new entrant audit?",
        a: "A conditional rating usually gives you a chance to correct the deficiencies. An unsatisfactory rating can lead to your operating authority being revoked, which shuts down your ability to haul.",
      },
    ],
    cta: {
      eyebrow: "NEW MC · FIRST LOADS",
      heading: "Get through it without losing loads.",
      body: "Starter MC dispatch covers brokers that accept new authorities and walks you through this checklist while you haul.",
      primary: "See Starter MC",
      primaryHref: "/dispatch",
      secondary: "Get alerts before anything lapses",
      secondaryHref: "/tools/compliance-alerts",
    },
  },
  RU: {
    toolsLabel: "Инструменты",
    toolsHref: "/ru/tools",
    crumb: "New MC Checklist",
    h1: "Чек-лист для нового MC",
    intro:
      "Все шаги на первые 6 месяцев: от получения USDOT и MC до прохождения safety audit для новых перевозчиков (new entrant) от FMCSA.",
    beforeHeading: "Что нужно до первого груза",
    beforeYouHaul: [
      {
        title: "USDOT и MC",
        description:
          "FMCSA выдаёт номера, когда вы регистрируетесь через Unified Registration System. Авторизация становится активной после 4-дневного периода протеста (protest period).",
      },
      {
        title: "BOC-3 (process agent)",
        description:
          "Нужен в каждом штате, где вы работаете. Сервис process agent может оформить BOC-3 сразу на все 50 штатов.",
      },
      {
        title: "Регистрация UCR",
        description:
          "Unified Carrier Registration, платится каждый год. Сумма зависит от количества траков в автопарке.",
      },
      {
        title: "Страховка BMC-91/91X",
        description:
          "Страховка ответственности и, по желанию, cargo. Её подаёт в FMCSA ваша страховая, самим эту бумагу оформлять не нужно.",
      },
      {
        title: "EIN и банковский счёт компании",
        description:
          "Деньги компании держите отдельно с первого дня. Брокеры и факторинговые компании попросят и то, и другое.",
      },
      {
        title: "IFTA и IRP",
        description:
          "Лицензия на налог на топливо и apportioned-номера, если вы работаете в нескольких штатах. Без них остановки на дороге быстро обходятся дорого.",
      },
    ],
    auditEyebrow: "ВАШИ ПЕРВЫЕ 90 ДНЕЙ",
    auditHeading: "Safety audit для новых перевозчиков",
    auditIntro:
      "FMCSA наблюдает за каждым новым перевозчиком 18-24 месяца и обычно назначает safety audit в первые 12 месяцев, часто уже в первые 60-90 дней. Это самое важное, к чему должен быть готов новый MC.",
    auditSteps: [
      {
        number: "1",
        title: "Авторизация становится активной",
        description:
          "USDOT и MC работают. В тот же день FMCSA начинает 18-24-месячный период наблюдения за новым перевозчиком.",
      },
      {
        number: "2",
        title: "Назначают аудит",
        description:
          "Большинство новых перевозчиков проходят safety audit в первые 12 месяцев, часто в первые 60-90 дней.",
      },
      {
        number: "3",
        title: "Проверяют документы",
        description:
          "Driver qualification files, записи HOS и ELD, тесты на наркотики и алкоголь, документы по обслуживанию трака и журнал аварий.",
      },
      {
        number: "4",
        title: "Сдали, исправили или потеряли авторизацию",
        description:
          "Чаще всего проваливаются из-за отсутствующих документов, а не из-за нарушений. Рейтинг unsatisfactory может закончиться отзывом operating authority.",
      },
    ],
    shutdownHeading: "Почему новые MC закрывают",
    shutdownIntro:
      "Чаще всего MC теряют не из-за аварии, а из-за пропущенной подачи документов.",
    shutdownReasons: [
      {
        title: "BOC-3 истёк",
        description:
          "Пропустили хотя бы в одном штате, где работаете, и авторизацию могут заморозить, пока BOC-3 не подадут заново.",
      },
      {
        title: "Провал аудита из-за документов",
        description:
          "Нет файлов водителя или логов HOS, и вы проваливаетесь так же быстро, как из-за реальной проблемы с безопасностью.",
      },
      {
        title: "Нет регистрации в Clearinghouse",
        description:
          "Каждый перевозчик под DOT с водителями, даже owner-operator, который ездит сам, обязан зарегистрироваться в Drug & Alcohol Clearinghouse.",
      },
      {
        title: "Нет ELD или логов HOS",
        description:
          "Работа без обязательных логов — один из самых быстрых путей к рейтингу unsatisfactory.",
      },
      {
        title: "BMC-91X истёк",
        description:
          "Если страховая подача (filing) пропала хотя бы на день, FMCSA автоматически отзывает operating authority, без льготного периода.",
      },
    ],
    faqHeading: "Вопросы про новый MC",
    faq: [
      {
        q: "Сколько времени занимает получение MC?",
        a: "Номера USDOT и MC обычно выдают через несколько рабочих дней после заявки в URS. Авторизация не станет активной, пока не пройдёт 4-дневный protest period и пока в FMCSA не появятся ваши BOC-3 и страховка.",
      },
      {
        q: "Можно ли возить грузы до safety audit?",
        a: "Да. Возить можно, как только авторизация активна. Аудит обычно проходит позже в первый год, но FMCSA ждёт, что вы ведёте полные документы по водителям, HOS и обслуживанию с первого дня, а не с момента назначения аудита.",
      },
      {
        q: "Что такое BOC-3 и нужен ли он в каждом штате?",
        a: "BOC-3 назначает process agent, который принимает юридические бумаги от вашего имени. Да, покрытие нужно в каждом штате, где вы работаете. Большинство сервисов подают его сразу на все 50 штатов.",
      },
      {
        q: "Будут ли брокеры работать с совсем новым MC?",
        a: "Некоторые брокеры отсеивают авторизации младше 6 месяцев, в основном из-за страховки и риска мошенничества. Но многие всё равно работают, особенно если груз ставит диспетчер, который знает, какие брокеры берут новые MC.",
      },
      {
        q: "Что будет, если я не пройду аудит new entrant?",
        a: "Рейтинг conditional обычно даёт шанс исправить недочёты. Рейтинг unsatisfactory может закончиться отзывом operating authority, и возить грузы вы больше не сможете.",
      },
    ],
    cta: {
      eyebrow: "НОВЫЙ MC · ПЕРВЫЕ ГРУЗЫ",
      heading: "Пройдите это, не теряя грузы.",
      body: "Диспетчинг Starter MC работает с брокерами, которые берут новые авторизации, и ведёт вас по этому чек-листу, пока вы возите грузы.",
      primary: "Смотреть Starter MC",
      primaryHref: "/ru/dispatch",
      secondary: "Уведомления, пока ничего не истекло",
      secondaryHref: "/ru/tools/compliance-alerts",
    },
  },
};

export const NEW_MC_FAQ: ChecklistFaq[] = NEW_MC_COPY.EN.faq;
