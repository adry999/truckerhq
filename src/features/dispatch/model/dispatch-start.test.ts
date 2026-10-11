import { describe, expect, it } from "vitest";
import {
  buildPayload,
  callTimePhrase,
  canAdvance,
  dispatchReducer,
  initialDispatchState,
  languageName,
  setField,
} from "./dispatch-start";

const { data } = initialDispatchState;

describe("dispatchReducer", () => {
  it("sets a single field", () => {
    const next = dispatchReducer(initialDispatchState, setField("trucks", 4));
    expect(next.data.trucks).toBe(4);
    expect(next.data.trailer).toBe("Dry van");
  });

  it("toggles lanes on and off", () => {
    const added = dispatchReducer(initialDispatchState, { type: "toggleLane", lane: "Texas & South" });
    expect(added.data.lanes).toEqual(["Midwest", "Texas & South"]);
    const removed = dispatchReducer(added, { type: "toggleLane", lane: "Midwest" });
    expect(removed.data.lanes).toEqual(["Texas & South"]);
  });

  it("moves between steps", () => {
    const forward = dispatchReducer(initialDispatchState, { type: "next" });
    expect(forward.step).toBe(1);
    expect(dispatchReducer(forward, { type: "back" }).step).toBe(0);
    expect(dispatchReducer(forward, { type: "goTo", step: 0 }).step).toBe(0);
  });

  it("tracks the submit lifecycle", () => {
    const sending = dispatchReducer({ ...initialDispatchState, step: 3 }, { type: "submitStart" });
    expect(sending.status).toBe("submitting");
    const failed = dispatchReducer(sending, { type: "submitFailed", message: "Too many requests" });
    expect(failed).toMatchObject({ status: "error", error: "Too many requests", step: 3 });
    const retry = dispatchReducer(failed, { type: "submitStart" });
    expect(retry).toMatchObject({ status: "submitting", error: null });
    expect(dispatchReducer(retry, { type: "submitted" })).toMatchObject({ status: "idle", step: 4 });
  });
});

describe("canAdvance", () => {
  it("lets the first three steps advance with defaults", () => {
    expect([0, 1, 2].every((step) => canAdvance(step, data))).toBe(true);
  });

  it("requires name and phone on the call step", () => {
    expect(canAdvance(3, data)).toBe(false);
    expect(canAdvance(3, { ...data, name: "Ion" })).toBe(false);
    expect(canAdvance(3, { ...data, name: "Ion", phone: "555" })).toBe(true);
  });
});

describe("buildPayload", () => {
  it("keeps the exact field names the API expects", () => {
    expect(buildPayload({ ...data, name: "Ion", phone: "555" }, "")).toEqual({
      trailerType: "Dry van",
      trucks: 1,
      driverType: "I drive",
      homeBase: "",
      lanes: ["Midwest"],
      homeTime: "Every week",
      authority: "I have an MC",
      mcNumber: "",
      name: "Ion",
      phone: "555",
      bestTime: "Today",
      language: "English",
      website: "",
    });
  });
});

describe("copy helpers", () => {
  it("maps call times to phrases with a fallback", () => {
    expect(callTimePhrase("Right now")).toBe("in the next 15 minutes");
    expect(callTimePhrase("Tomorrow PM")).toBe("tomorrow afternoon");
    expect(callTimePhrase("Whenever")).toBe("soon");
  });

  it("names the call language", () => {
    expect(languageName("English")).toBe("English");
    expect(languageName("Русский")).toBe("Russian");
  });
});
