"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { calcProfit, type ProfitInputs } from "../model/profit";
import { NumberField } from "./NumberField";
import { ProfitResults } from "./ProfitResults";

type FieldValues = Record<keyof ProfitInputs, string>;

const DEFAULT_VALUES: FieldValues = {
  loadPay: "2400",
  loadedMiles: "1000",
  deadheadMiles: "120",
  fuelPrice: "3.85",
  mpg: "6.8",
  maintenancePerMile: "0.18",
  tolls: "40",
  truckPayment: "650",
  trailerPayment: "200",
  insurance: "450",
  otherWeekly: "150",
  dispatchFee: "0",
  weekMiles: "2500",
};

type FieldConfig = {
  key: keyof ProfitInputs;
  label: string;
  step: number;
  prefix?: string;
  suffix?: string;
  note?: string;
};

const GROUPS: { title: string; hint: string; fields: FieldConfig[] }[] = [
  {
    title: "The load",
    hint: "From the rate con",
    fields: [
      { key: "loadPay", label: "Load pay", prefix: "$", step: 50 },
      { key: "loadedMiles", label: "Loaded miles", suffix: "mi", step: 10 },
      { key: "deadheadMiles", label: "Deadhead miles", suffix: "mi", step: 10, note: "Empty miles to pickup" },
    ],
  },
  {
    title: "Running costs",
    hint: "Change with every mile",
    fields: [
      { key: "fuelPrice", label: "Diesel price", prefix: "$", suffix: "/ gal", step: 0.01 },
      { key: "mpg", label: "Fuel economy", suffix: "mpg", step: 0.1 },
      { key: "maintenancePerMile", label: "Tires & maintenance", prefix: "$", suffix: "/ mi", step: 0.01 },
      { key: "tolls", label: "Tolls & scales", prefix: "$", suffix: "this load", step: 5 },
    ],
  },
  {
    title: "Fixed weekly costs",
    hint: "Paid even when parked",
    fields: [
      { key: "truckPayment", label: "Truck payment", prefix: "$", suffix: "/ wk", step: 25 },
      { key: "trailerPayment", label: "Trailer", prefix: "$", suffix: "/ wk", step: 25 },
      { key: "insurance", label: "Insurance", prefix: "$", suffix: "/ wk", step: 25 },
      { key: "otherWeekly", label: "ELD, permits, phone", prefix: "$", suffix: "/ wk", step: 25 },
      { key: "dispatchFee", label: "Dispatch fee", prefix: "$", suffix: "/ wk", step: 25, note: "Trucker HQ flat: $XXX / wk" },
      { key: "weekMiles", label: "Miles per week", suffix: "mi", step: 50, note: "Spreads fixed costs per mile" },
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

export function ProfitCalculator() {
  const [values, setValues] = useState<FieldValues>(DEFAULT_VALUES);
  const result = calcProfit(parseInputs(values));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="flex min-w-0 flex-col gap-5">
        {GROUPS.map((group) => (
          <Card key={group.title} className="flex flex-col gap-4 p-[22px]">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold uppercase">{group.title}</h2>
              <span className="text-[13px] text-grey">{group.hint}</span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {group.fields.map((field) => (
                <NumberField
                  key={field.key}
                  label={field.label}
                  prefix={field.prefix}
                  suffix={field.suffix}
                  note={field.note}
                  step={field.step}
                  value={values[field.key]}
                  onChange={(value) => setValues((prev) => ({ ...prev, [field.key]: value }))}
                />
              ))}
            </div>
          </Card>
        ))}
        <Button variant="outline" onClick={() => setValues(DEFAULT_VALUES)} className="w-fit">
          Reset to example
        </Button>
      </div>

      <ProfitResults result={result} />
    </div>
  );
}
