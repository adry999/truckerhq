import { toggleInArray } from "@/shared/lib/array";

export const CARRIER = {
  name: "Carpathian Freight LLC",
  dot: "3412897",
  mc: "MC 1182044",
  score: 86,
  slug: "carpathian-freight-3412897",
};

export const STEPS = ["Contact", "Details", "Done"];
export const DETAILS_STEP = 1;
export const DONE_STEP = 2;

export type ContactMethod = "phone" | "email";

export const CONTACT_METHODS: { id: ContactMethod; label: string; masked: string }[] = [
  { id: "phone", label: "Text to the phone on FMCSA record", masked: "(•••) •••-4471" },
  { id: "email", label: "Email on FMCSA record", masked: "o•••@carpathianfreight.com" },
];

export const EQUIPMENT_OPTIONS = ["Dry van", "Reefer", "Flatbed", "Step deck", "Power only"];
export const LANE_OPTIONS = [
  "Midwest",
  "Northeast",
  "Southeast",
  "Texas & South",
  "West Coast",
  "Mountain",
];

export const ALSO_SHOW: { id: string; label: string }[] = [
  { id: "russian", label: "We speak Russian" },
  { id: "hiring", label: "We are hiring drivers" },
  { id: "direct", label: "Looking for direct shippers and brokers" },
];

export type ClaimData = {
  contactMethod: ContactMethod | null;
  phone: string;
  equipment: string[];
  lanes: string[];
  alsoShow: string[];
};

export type ClaimState = {
  step: number;
  data: ClaimData;
  status: "idle" | "submitting" | "error";
  error: string | null;
};

export type ToggleField = "equipment" | "lanes" | "alsoShow";

export type ClaimAction =
  | { type: "setContactMethod"; value: ContactMethod }
  | { type: "setPhone"; value: string }
  | { type: "toggle"; field: ToggleField; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "submitStart" }
  | { type: "submitFailed"; message: string }
  | { type: "submitted" };

export const initialClaimState: ClaimState = {
  step: 0,
  data: {
    contactMethod: null,
    phone: "",
    equipment: ["Dry van"],
    lanes: ["Midwest"],
    alsoShow: ["russian", "direct"],
  },
  status: "idle",
  error: null,
};

export function claimReducer(state: ClaimState, action: ClaimAction): ClaimState {
  switch (action.type) {
    case "setContactMethod":
      return { ...state, data: { ...state.data, contactMethod: action.value } };
    case "setPhone":
      return { ...state, data: { ...state.data, phone: action.value } };
    case "toggle":
      return {
        ...state,
        data: { ...state.data, [action.field]: toggleInArray(state.data[action.field], action.value) },
      };
    case "next":
      return { ...state, step: state.step + 1 };
    case "back":
      return { ...state, step: state.step - 1 };
    case "submitStart":
      return { ...state, status: "submitting", error: null };
    case "submitFailed":
      return { ...state, status: "error", error: action.message };
    case "submitted":
      return { ...state, status: "idle", error: null, step: DONE_STEP };
  }
}

export function canAdvance(step: number, data: ClaimData): boolean {
  return step !== 0 || data.contactMethod !== null;
}

export function alsoShowLabels(data: ClaimData): string[] {
  return ALSO_SHOW.filter(({ id }) => data.alsoShow.includes(id)).map(({ label }) => label);
}

export function buildPayload(data: ClaimData, website: string) {
  return {
    dot: CARRIER.dot,
    carrierSlug: CARRIER.slug,
    contactMethod: data.contactMethod,
    phone: data.phone,
    equipment: data.equipment,
    lanes: data.lanes,
    alsoShow: alsoShowLabels(data),
    website,
  };
}
