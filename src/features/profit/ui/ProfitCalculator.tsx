"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { getCopy, type Locale } from "@/shared/i18n/locale";
import { Card } from "@/shared/ui/Card";
import { PROFIT_COPY } from "../data/profit-copy";
import { EXAMPLE_INPUTS } from "../model/example";
import { calcProfit, type ProfitInputs } from "../model/profit";
import { NumberField } from "./NumberField";
import { ProfitResults } from "./ProfitResults";

type FieldValues = Record<keyof ProfitInputs, string>;

const DEFAULT_VALUES = Object.fromEntries(
  Object.entries(EXAMPLE_INPUTS).map(([key, value]) => [key, String(value)]),
) as FieldValues;

type FieldConfig = {
  key: keyof ProfitInputs;
  step: number;
  prefix?: string;
};

const GROUPS: { id: "load" | "running" | "fixed"; fields: FieldConfig[] }[] = [
  {
    id: "load",
    fields: [
      { key: "loadPay", prefix: "$", step: 50 },
      { key: "loadedMiles", step: 10 },
      { key: "deadheadMiles", step: 10 },
    ],
  },
  {
    id: "running",
    fields: [
      { key: "fuelPrice", prefix: "$", step: 0.01 },
      { key: "mpg", step: 0.1 },
      { key: "maintenancePerMile", prefix: "$", step: 0.01 },
      { key: "tolls", prefix: "$", step: 5 },
    ],
  },
  {
    id: "fixed",
    fields: [
      { key: "truckPayment", prefix: "$", step: 25 },
      { key: "trailerPayment", prefix: "$", step: 25 },
      { key: "insurance", prefix: "$", step: 25 },
      { key: "otherWeekly", prefix: "$", step: 25 },
      { key: "dispatchFee", prefix: "$", step: 25 },
      { key: "weekMiles", step: 50 },
    ],
  },
];

function parseInputs(values: FieldValues): ProfitInputs {
  const parsed = {} as ProfitInputs;
  for (const key of Object.keys(values) as (keyof ProfitInputs)[]) {
    parsed[key] = Number(values[key]) || 0;
  }
  return parsed;
}

export function ProfitCalculator({ lang = "EN" }: { lang?: Locale }) {
  const copy = getCopy(PROFIT_COPY, lang);
  const [values, setValues] = useState<FieldValues>(DEFAULT_VALUES);
  const result = calcProfit(parseInputs(values));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="flex min-w-0 flex-col gap-5">
        {GROUPS.map((group) => (
          <Card key={group.id} className="flex flex-col gap-4 p-[22px]">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold uppercase">{copy.groups[group.id].title}</h2>
              <span className="text-[13px] text-grey">{copy.groups[group.id].hint}</span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {group.fields.map((field) => {
                const text = copy.fields[field.key];
                return (
                  <NumberField
                    key={field.key}
                    label={text.label}
                    prefix={field.prefix}
                    suffix={text.suffix}
                    note={text.note}
                    step={field.step}
                    value={values[field.key]}
                    onChange={(value) => setValues((prev) => ({ ...prev, [field.key]: value }))}
                  />
                );
              })}
            </div>
          </Card>
        ))}
        <Button variant="outline" onClick={() => setValues(DEFAULT_VALUES)} className="w-fit">
          {copy.reset}
        </Button>
      </div>

      <ProfitResults result={result} lang={lang} />
    </div>
  );
}
