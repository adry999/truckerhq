import type { Locale } from "@/shared/i18n/locale";
import { PROFIT_FAQ, PROFIT_GUIDE_UPDATED } from "../model/example";
import type { ProfitInputs, VerdictKey } from "../model/profit";

type FieldCopy = { label: string; suffix?: string; note?: string };

type ExampleValues = {
  loadPay: string;
  loadedMiles: string;
  deadheadMiles: string;
  fuelPrice: string;
  mpg: string;
  maintenance: string;
  tolls: string;
  weeklyFixed: string;
  weekMiles: string;
};

export type ProfitCopy = {
  groups: Record<"load" | "running" | "fixed", { title: string; hint: string }>;
  fields: Record<keyof ProfitInputs, FieldCopy>;
  reset: string;
  results: {
    eyebrow: string;
    perMileUnit: string;
    verdicts: Record<VerdictKey, string>;
    segments: Record<"fuel" | "maintenance" | "tolls" | "fixed" | "profit", string>;
    lines: Record<"loadPay" | "ratePerMile" | "fuel" | "maintenance" | "tolls" | "profit", string>;
    fixedLine: (miles: string) => string;
    breakEvenEyebrow: string;
    perLoadedMile: (rate: string) => string;
    breakEvenNote: string;
    percentTitle: string;
    percentBefore: string;
    percentAfter: string;
    percentCta: string;
    dispatchHref: string;
  };
  guide: {
    /** Month and year the guide was last reviewed; keep in step with PROFIT_GUIDE_UPDATED. */
    updatedDate: string;
    updated: (date: string) => string;
    heading: string;
    intro: string;
    steps: string[];
    exampleHeading: string;
    exampleText: (v: ExampleValues) => string;
    totalMiles: string;
    fuel: string;
    maintenance: string;
    tolls: string;
    fixedShare: string;
    totalCost: string;
    profit: string;
    perMile: string;
    rateLine: (rate: string, breakEven: string) => string;
    goodHeading: string;
    goodBefore: string;
    goodWord: string;
    goodMid1: (threshold: string) => string;
    thinWord: string;
    goodMid2: (threshold: string) => string;
    losingWord: string;
    goodAfter: string;
    faqHeading: string;
  };
  faq: readonly { q: string; a: string }[];
};

export const PROFIT_COPY: Record<Locale, ProfitCopy> = {
  EN: {
    groups: {
      load: { title: "The load", hint: "From the rate con" },
      running: { title: "Running costs", hint: "Change with every mile" },
      fixed: { title: "Fixed weekly costs", hint: "Paid even when parked" },
    },
    fields: {
      loadPay: { label: "Load pay" },
      loadedMiles: { label: "Loaded miles", suffix: "mi" },
      deadheadMiles: { label: "Deadhead miles", suffix: "mi", note: "Empty miles to pickup" },
      fuelPrice: { label: "Diesel price", suffix: "/ gal" },
      mpg: { label: "Fuel economy", suffix: "mpg" },
      maintenancePerMile: { label: "Tires & maintenance", suffix: "/ mi" },
      tolls: { label: "Tolls & scales", suffix: "this load" },
      truckPayment: { label: "Truck payment", suffix: "/ wk" },
      trailerPayment: { label: "Trailer", suffix: "/ wk" },
      insurance: { label: "Insurance", suffix: "/ wk" },
      otherWeekly: { label: "ELD, permits, phone", suffix: "/ wk" },
      dispatchFee: { label: "Dispatch fee", suffix: "/ wk", note: "Trucker HQ flat: $XXX / wk" },
      weekMiles: { label: "Miles per week", suffix: "mi", note: "Spreads fixed costs per mile" },
    },
    reset: "Reset to example",
    results: {
      eyebrow: "PROFIT PER MILE · ALL MILES",
      perMileUnit: "/ mi",
      verdicts: { good: "GOOD LOAD", thin: "THIN MARGIN", losing: "LOSING MONEY" },
      segments: { fuel: "Fuel", maintenance: "Maintenance", tolls: "Tolls", fixed: "Fixed", profit: "Profit" },
      lines: {
        loadPay: "Load pay",
        ratePerMile: "Rate per loaded mile",
        fuel: "Fuel",
        maintenance: "Tires & maintenance",
        tolls: "Tolls & scales",
        profit: "Profit on this load",
      },
      fixedLine: (miles) => `Fixed costs (${miles} mi)`,
      breakEvenEyebrow: "BREAK-EVEN RATE",
      perLoadedMile: (rate) => `${rate} per loaded mile`,
      breakEvenNote: "Below this, the load costs you money.",
      percentTitle: "Paying a percentage?",
      percentBefore: "A 10% dispatcher takes ",
      percentAfter: " of this load. Our flat weekly price does not change with the rate.",
      percentCta: "See flat dispatch",
      dispatchHref: "/dispatch",
    },
    guide: {
      updatedDate: PROFIT_GUIDE_UPDATED,
      updated: (date) => `Updated ${date}`,
      heading: "How to calculate profit per mile",
      intro:
        "Profit per mile is what a load leaves you after every cost, divided by all the miles you drove for it, loaded and empty.",
      steps: [
        "Total miles = loaded miles + deadhead miles.",
        "Fuel = total miles ÷ mpg × diesel price.",
        "Maintenance = maintenance cost per mile × total miles.",
        "Fixed share = (truck payment + trailer payment + insurance + other weekly costs + dispatch fee) ÷ miles per week × total miles.",
        "Total cost = fuel + maintenance + tolls + fixed share.",
        "Profit = load pay − total cost.",
        "Profit per mile = profit ÷ total miles.",
      ],
      exampleHeading: "Worked example",
      exampleText: (v) =>
        `A load pays ${v.loadPay} for ${v.loadedMiles} loaded miles, with ${v.deadheadMiles} miles of deadhead to the pickup. Diesel is ${v.fuelPrice} a gallon at ${v.mpg} mpg, maintenance is ${v.maintenance} a mile, tolls are ${v.tolls}, weekly fixed costs are ${v.weeklyFixed} and you run ${v.weekMiles} miles a week.`,
      totalMiles: "Total miles",
      fuel: "Fuel",
      maintenance: "Maintenance",
      tolls: "Tolls",
      fixedShare: "Fixed share",
      totalCost: "Total cost",
      profit: "Profit",
      perMile: "Profit per mile",
      rateLine: (rate, breakEven) =>
        `Rate per loaded mile: ${rate}; break-even per loaded mile: ${breakEven}`,
      goodHeading: "What's a good profit per mile?",
      goodBefore: "This calculator rates a load ",
      goodWord: "Good",
      goodMid1: (t) => ` at ${t} or more profit per mile, `,
      thinWord: "Thin Margin",
      goodMid2: (t) => ` below ${t}, and `,
      losingWord: "Losing Money",
      goodAfter:
        " when the load profit is below zero. The cutoff is a rule of thumb. Your own number depends on your equipment, lane and what you want to take home.",
      faqHeading: "Profit per mile FAQ",
    },
    faq: PROFIT_FAQ,
  },
  RU: {
    groups: {
      load: { title: "Груз", hint: "Из rate con" },
      running: { title: "Расходы в пути", hint: "Растут с каждой милей" },
      fixed: { title: "Постоянные расходы в неделю", hint: "Платите, даже когда стоите" },
    },
    fields: {
      loadPay: { label: "Оплата за груз" },
      loadedMiles: { label: "Мили с грузом", suffix: "mi" },
      deadheadMiles: { label: "Мили deadhead", suffix: "mi", note: "Порожний пробег до погрузки" },
      fuelPrice: { label: "Цена дизеля", suffix: "/ гал" },
      mpg: { label: "Расход топлива", suffix: "mpg" },
      maintenancePerMile: { label: "Шины и обслуживание", suffix: "/ mi" },
      tolls: { label: "Толлы и весовые", suffix: "за груз" },
      truckPayment: { label: "Платёж за трак", suffix: "/ нед" },
      trailerPayment: { label: "Трейлер", suffix: "/ нед" },
      insurance: { label: "Страховка", suffix: "/ нед" },
      otherWeekly: { label: "ELD, пермиты, телефон", suffix: "/ нед" },
      dispatchFee: { label: "Оплата диспетчера", suffix: "/ нед", note: "Trucker HQ фиксированно: $XXX / нед" },
      weekMiles: { label: "Миль в неделю", suffix: "mi", note: "Делит постоянные расходы на мили" },
    },
    reset: "Вернуть пример",
    results: {
      eyebrow: "ПРИБЫЛЬ НА МИЛЮ · ВСЕ МИЛИ",
      perMileUnit: "/ mi",
      verdicts: { good: "ХОРОШИЙ ГРУЗ", thin: "ТОНКАЯ МАРЖА", losing: "ГРУЗ В МИНУС" },
      segments: { fuel: "Топливо", maintenance: "Обслуживание", tolls: "Толлы", fixed: "Постоянные", profit: "Прибыль" },
      lines: {
        loadPay: "Оплата за груз",
        ratePerMile: "Ставка за милю с грузом",
        fuel: "Топливо",
        maintenance: "Шины и обслуживание",
        tolls: "Толлы и весовые",
        profit: "Прибыль с этого груза",
      },
      fixedLine: (miles) => `Постоянные расходы (${miles} mi)`,
      breakEvenEyebrow: "СТАВКА БЕЗУБЫТОЧНОСТИ",
      perLoadedMile: (rate) => `${rate} за милю с грузом`,
      breakEvenNote: "Ниже этой суммы груз обходится вам в минус.",
      percentTitle: "Платите процент?",
      percentBefore: "Диспетчер на 10% забирает ",
      percentAfter: " с этого груза. Наша фиксированная цена в неделю не зависит от ставки.",
      percentCta: "Диспетчинг с фиксированной ценой",
      dispatchHref: "/ru/dispatch",
    },
    guide: {
      updatedDate: "октябрь 2026",
      updated: (date) => `Обновлено: ${date}`,
      heading: "Как посчитать прибыль на милю",
      intro:
        "Прибыль на милю — это то, что остаётся от груза после всех расходов, делённое на все мили, которые вы проехали ради него: с грузом и порожняком.",
      steps: [
        "Всего миль = мили с грузом + мили deadhead.",
        "Топливо = всего миль ÷ mpg × цена дизеля.",
        "Обслуживание = стоимость обслуживания за милю × всего миль.",
        "Доля постоянных расходов = (платёж за трак + платёж за трейлер + страховка + прочие недельные расходы + оплата диспетчера) ÷ миль в неделю × всего миль.",
        "Общие расходы = топливо + обслуживание + толлы + доля постоянных расходов.",
        "Прибыль = оплата за груз − общие расходы.",
        "Прибыль на милю = прибыль ÷ всего миль.",
      ],
      exampleHeading: "Пример расчёта",
      exampleText: (v) =>
        `Груз оплачивается ${v.loadPay} за ${v.loadedMiles} миль с грузом, плюс ${v.deadheadMiles} миль deadhead до погрузки. Дизель стоит ${v.fuelPrice} за галлон при ${v.mpg} mpg, обслуживание ${v.maintenance} за милю, толлы ${v.tolls}, постоянные расходы за неделю ${v.weeklyFixed}, и вы проезжаете ${v.weekMiles} миль в неделю.`,
      totalMiles: "Всего миль",
      fuel: "Топливо",
      maintenance: "Обслуживание",
      tolls: "Толлы",
      fixedShare: "Доля постоянных расходов",
      totalCost: "Общие расходы",
      profit: "Прибыль",
      perMile: "Прибыль на милю",
      rateLine: (rate, breakEven) =>
        `Ставка за милю с грузом: ${rate}; безубыточная ставка за милю с грузом: ${breakEven}`,
      goodHeading: "Какая прибыль на милю считается хорошей?",
      goodBefore: "Калькулятор оценивает груз как ",
      goodWord: "Хороший",
      goodMid1: (t) => ` при прибыли от ${t} на милю, `,
      thinWord: "Тонкая маржа",
      goodMid2: (t) => ` при прибыли ниже ${t} и `,
      losingWord: "В минус",
      goodAfter:
        ", если прибыль с груза ниже нуля. Порог — ориентир, не закон. Ваша цифра зависит от оборудования, направления и от того, сколько вы хотите забирать домой.",
      faqHeading: "Прибыль на милю: частые вопросы",
    },
    faq: [
      {
        q: "Как посчитать прибыль на милю?",
        a: "Вычтите все расходы по грузу из оплаты за груз и разделите на общее число миль: с грузом плюс deadhead. Расходы — это топливо, обслуживание, толлы и ваша доля недельных постоянных расходов.",
      },
      {
        q: "Считаются ли мили deadhead?",
        a: "Да. На порожнем пробеге вы тратите топливо и изнашиваете трак, поэтому калькулятор добавляет deadhead к милям с грузом, прежде чем считать расходы и прибыль на милю. Ставка за милю с грузом считается только по милям с грузом.",
      },
      {
        q: "Какая прибыль на милю хорошая?",
        a: "В этом калькуляторе груз считается хорошим при прибыли от $0.50 на милю, с тонкой маржой — ниже этого, и убыточным, если прибыль меньше нуля. Ваша личная цель может быть выше.",
      },
      {
        q: "Как постоянные расходы распределяются на груз?",
        a: "Недельные постоянные расходы (платёж за трак, платёж за трейлер, страховка, прочие расходы и оплата диспетчера) делятся на мили, которые вы планируете проехать за неделю, и умножаются на мили этого груза.",
      },
      {
        q: "Что такое безубыточная ставка за милю?",
        a: "Это общие расходы по грузу, делённые на мили с грузом. Любая ставка за милю с грузом выше этого числа оставляет вам прибыль.",
      },
      {
        q: "Примерные цифры — это мои реальные расходы?",
        a: "Нет. Это условные значения, чтобы показать, как работает формула. Подставьте свою цену дизеля, mpg и недельные расходы, чтобы получить результат, которому можно доверять.",
      },
    ],
  },
};

export function profitFaq(lang: Locale): readonly { q: string; a: string }[] {
  return PROFIT_COPY[lang].faq;
}
