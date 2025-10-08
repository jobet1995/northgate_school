import { describe, it, expect } from "@jest/globals";

describe("Sample Tests", () => {
  it("should pass a basic hello world test", () => {
    expect("hello world").toBe("hello world");
  });

  it("should handle simple math", () => {
    expect(2 + 2).toBe(4);
  });

  it("should handle boolean logic", () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });
});
