import { toggleInArray } from "@/shared/lib/array";

export const TRAILER_TYPES = ["Dry van", "Reefer", "Flatbed", "Step deck", "Power only"];
export const DRIVER_TYPES = ["I drive", "Company driver", "Team"];
export const REGIONS = [
  "Midwest",
  "Northeast",
  "Southeast",
  "Texas & South",
  "West Coast",
  "Mountain",
  "Anywhere",
];
export const HOME_TIME_OPTIONS = ["Every night", "Every week", "Every 2 weeks", "Out 3+ weeks"];
export const AUTHORITY_OPTIONS = ["I have an MC", "MC is pending", "I don't have one yet"];
export const NO_AUTHORITY = "I don't have one yet";
export const BEST_TIME_OPTIONS = ["Right now", "Today", "Tomorrow AM", "Tomorrow PM"];
export const LANGUAGE_OPTIONS = ["English", "Русский"];

export const STEP_LABELS = ["Truck", "Lanes", "Authority", "Call"] as const;
export const CALL_STEP = 3;
export const DONE_STEP = 4;
export const MAX_TRUCKS = 50;

const TIME_PHRASES: Record<string, string> = {
  "Right now": "in the next 15 minutes",
  Today: "today",
  "Tomorrow AM": "tomorrow morning",
  "Tomorrow PM": "tomorrow afternoon",
};

export type DispatchData = {
  trailer: string;
  trucks: number;
  driver: string;
  homeBase: string;
  lanes: string[];
  homeTime: string;
  authority: string;
  mcNumber: string;
  name: string;
  phone: string;
  bestTime: string;
  language: string;
};

export type DispatchState = {
  step: number;
  data: DispatchData;
  status: "idle" | "submitting" | "error";
  error: string | null;
};

type SetAction = { [K in keyof DispatchData]: { type: "set"; field: K; value: DispatchData[K] } }[keyof DispatchData];

export type DispatchAction =
  | SetAction
  | { type: "toggleLane"; lane: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "goTo"; step: number }
  | { type: "submitStart" }
  | { type: "submitFailed"; message: string }
  | { type: "submitted" };

export function setField<K extends keyof DispatchData>(field: K, value: DispatchData[K]) {
  return { type: "set", field, value } as DispatchAction;
}

export const initialDispatchState: DispatchState = {
  step: 0,
  data: {
    trailer: "Dry van",
    trucks: 1,
    driver: "I drive",
    homeBase: "",
    lanes: ["Midwest"],
    homeTime: "Every week",
    authority: "I have an MC",
    mcNumber: "",
    name: "",
    phone: "",
    bestTime: "Today",
    language: "English",
  },
  status: "idle",
  error: null,
};

export function dispatchReducer(state: DispatchState, action: DispatchAction): DispatchState {
  switch (action.type) {
    case "set":
      return { ...state, data: { ...state.data, [action.field]: action.value } };
    case "toggleLane":
      return { ...state, data: { ...state.data, lanes: toggleInArray(state.data.lanes, action.lane) } };
    case "next":
      return { ...state, step: state.step + 1 };
    case "back":
      return { ...state, step: state.step - 1 };
    case "goTo":
      return { ...state, step: action.step };
    case "submitStart":
      return { ...state, status: "submitting", error: null };
    case "submitFailed":
      return { ...state, status: "error", error: action.message };
    case "submitted":
      return { ...state, status: "idle", error: null, step: DONE_STEP };
  }
}

export function canAdvance(step: number, data: DispatchData): boolean {
  if (step === CALL_STEP) return data.name.length > 0 && data.phone.length > 0;
  return true;
}

export function buildPayload(data: DispatchData, website: string) {
  return {
    trailerType: data.trailer,
    trucks: data.trucks,
    driverType: data.driver,
    homeBase: data.homeBase,
    lanes: data.lanes,
    homeTime: data.homeTime,
    authority: data.authority,
    mcNumber: data.mcNumber,
    name: data.name,
    phone: data.phone,
    bestTime: data.bestTime,
    language: data.language,
    website,
  };
}

export function callTimePhrase(bestTime: string): string {
  return TIME_PHRASES[bestTime] ?? "soon";
}

export function languageName(language: string): string {
  return language === "English" ? "English" : "Russian";
}
