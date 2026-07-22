import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { consumeLastCapturedError } from "./error-capture";

describe("consumeLastCapturedError", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // consume any existing error to reset state
    // To properly reset, advance time so it expires or just consume it
    consumeLastCapturedError();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return undefined if no error was captured", () => {
    // Make sure we start fresh
    consumeLastCapturedError();
    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("should return the captured error", () => {
    const error = new Error("test error");
    globalThis.dispatchEvent(new ErrorEvent("error", { error }));

    expect(consumeLastCapturedError()).toBe(error);
  });

  it("should return the captured error from unhandledrejection", () => {
    const reason = new Error("rejection reason");
    globalThis.dispatchEvent(
      new PromiseRejectionEvent("unhandledrejection", { reason, promise: Promise.resolve() }),
    );

    expect(consumeLastCapturedError()).toBe(reason);
  });

  it("should return undefined if the error has expired (TTL > 5000ms)", () => {
    const error = new Error("expired error");
    globalThis.dispatchEvent(new ErrorEvent("error", { error }));

    vi.advanceTimersByTime(5001);

    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("should return the error if it has not expired (TTL <= 5000ms)", () => {
    const error = new Error("valid error");
    globalThis.dispatchEvent(new ErrorEvent("error", { error }));

    vi.advanceTimersByTime(4999);

    expect(consumeLastCapturedError()).toBe(error);
  });

  it("should consume the error and return undefined on subsequent calls", () => {
    const error = new Error("test error");
    globalThis.dispatchEvent(new ErrorEvent("error", { error }));

    expect(consumeLastCapturedError()).toBe(error);
    expect(consumeLastCapturedError()).toBeUndefined();
  });
});
