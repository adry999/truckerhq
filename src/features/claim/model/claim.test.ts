import { describe, expect, it } from "vitest";
import {
  alsoShowLabels,
  buildPayload,
  canAdvance,
  claimReducer,
  initialClaimState,
} from "./claim";

const { data } = initialClaimState;

describe("claimReducer", () => {
  it("sets contact method and phone", () => {
    const withMethod = claimReducer(initialClaimState, { type: "setContactMethod", value: "email" });
    const withPhone = claimReducer(withMethod, { type: "setPhone", value: "555" });
    expect(withPhone.data).toMatchObject({ contactMethod: "email", phone: "555" });
  });

  it("toggles values in each list independently", () => {
    let state = claimReducer(initialClaimState, { type: "toggle", field: "equipment", value: "Reefer" });
    expect(state.data.equipment).toEqual(["Dry van", "Reefer"]);
    state = claimReducer(state, { type: "toggle", field: "lanes", value: "Midwest" });
    expect(state.data.lanes).toEqual([]);
    state = claimReducer(state, { type: "toggle", field: "alsoShow", value: "hiring" });
    expect(state.data.alsoShow).toEqual(["russian", "direct", "hiring"]);
  });

  it("moves between steps", () => {
    const forward = claimReducer(initialClaimState, { type: "next" });
    expect(forward.step).toBe(1);
    expect(claimReducer(forward, { type: "back" }).step).toBe(0);
  });

  it("tracks the submit lifecycle", () => {
    const sending = claimReducer({ ...initialClaimState, step: 1 }, { type: "submitStart" });
    expect(sending.status).toBe("submitting");
    const failed = claimReducer(sending, { type: "submitFailed", message: "Bad phone" });
    expect(failed).toMatchObject({ status: "error", error: "Bad phone", step: 1 });
    expect(claimReducer(failed, { type: "submitted" })).toMatchObject({ status: "idle", error: null, step: 2 });
  });
});

describe("canAdvance", () => {
  it("needs a contact method on the first step only", () => {
    expect(canAdvance(0, data)).toBe(false);
    expect(canAdvance(0, { ...data, contactMethod: "phone" })).toBe(true);
    expect(canAdvance(1, data)).toBe(true);
  });
});

describe("buildPayload", () => {
  it("keeps the exact field names the API expects", () => {
    expect(buildPayload({ ...data, contactMethod: "phone", phone: "(555) 555-5555" }, "")).toEqual({
      dot: "3412897",
      carrierSlug: "carpathian-freight-3412897",
      contactMethod: "phone",
      phone: "(555) 555-5555",
      equipment: ["Dry van"],
      lanes: ["Midwest"],
      alsoShow: ["We speak Russian", "Looking for direct shippers and brokers"],
      website: "",
    });
  });

  it("lists also-show labels in display order", () => {
    expect(alsoShowLabels({ ...data, alsoShow: ["direct", "hiring"] })).toEqual([
      "We are hiring drivers",
      "Looking for direct shippers and brokers",
    ]);
  });
});
