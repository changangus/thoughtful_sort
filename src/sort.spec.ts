import { describe, it, expect, vi } from "vitest";
import { sort } from "./sort.js";

describe("sort", () => {
  describe("STANDARD packages", () => {
    it("returns STANDARD for a small, light package", () => {
      expect(sort(10, 10, 10, 5)).toBe("STANDARD");
    });

    it("returns STANDARD for a package just under all thresholds", () => {
      expect(sort(99, 99, 99, 19.9)).toBe("STANDARD");
    });
  });

  describe("SPECIAL — heavy only", () => {
    it("returns SPECIAL when mass is exactly 20 kg", () => {
      expect(sort(10, 10, 10, 20)).toBe("SPECIAL");
    });

    it("returns SPECIAL when mass exceeds 20 kg", () => {
      expect(sort(10, 10, 10, 50)).toBe("SPECIAL");
    });
  });

  describe("SPECIAL — bulky by volume", () => {
    it("returns SPECIAL when volume is exactly 1,000,000 cm³", () => {
      expect(sort(100, 100, 100, 5)).toBe("SPECIAL");
    });

    it("returns SPECIAL when volume exceeds 1,000,000 cm³", () => {
      expect(sort(200, 200, 200, 5)).toBe("SPECIAL");
    });
  });

  describe("SPECIAL — bulky by single dimension", () => {
    it("returns SPECIAL when width is exactly 150 cm", () => {
      expect(sort(150, 1, 1, 5)).toBe("SPECIAL");
    });

    it("returns SPECIAL when height is exactly 150 cm", () => {
      expect(sort(1, 150, 1, 5)).toBe("SPECIAL");
    });

    it("returns SPECIAL when length is exactly 150 cm", () => {
      expect(sort(1, 1, 150, 5)).toBe("SPECIAL");
    });

    it("returns SPECIAL when a dimension exceeds 150 cm", () => {
      expect(sort(200, 1, 1, 5)).toBe("SPECIAL");
    });
  });

  describe("REJECTED — bulky AND heavy", () => {
    it("returns REJECTED when bulky by volume and heavy", () => {
      expect(sort(100, 100, 100, 20)).toBe("REJECTED");
    });

    it("returns REJECTED when bulky by dimension and heavy", () => {
      expect(sort(150, 1, 1, 25)).toBe("REJECTED");
    });
  });

  describe("boundary values", () => {
    it("returns STANDARD when dimension is 149 cm (just under bulky)", () => {
      expect(sort(149, 1, 1, 5)).toBe("STANDARD");
    });

    it("returns STANDARD when volume is 999,999 cm³ (just under bulky)", () => {
      expect(sort(99, 99, 102, 5)).toBe("STANDARD");
      // 99 * 99 * 102 = 999,702 < 1,000,000
    });

    it("returns STANDARD when mass is 19.99 kg (just under heavy)", () => {
      expect(sort(10, 10, 10, 19.99)).toBe("STANDARD");
    });
  });

  describe("invalid inputs", () => {
    const errorSpy = () => vi.spyOn(console, "error").mockImplementation(() => {});

    it("returns REJECTED and logs error for negative dimensions", () => {
      const spy = errorSpy();
      expect(sort(-10, 10, 10, 5)).toBe("REJECTED");
      expect(spy).toHaveBeenCalledWith(
        "Error: all inputs must be finite positive numbers.",
        JSON.stringify({ width: -10, height: 10, length: 10, mass: 5 }),
      );
      spy.mockRestore();
    });

    it("returns REJECTED and logs error for zero dimension", () => {
      const spy = errorSpy();
      expect(sort(0, 100, 100, 5)).toBe("REJECTED");
      expect(spy).toHaveBeenCalledWith(
        "Error: all inputs must be finite positive numbers.",
        JSON.stringify({ width: 0, height: 100, length: 100, mass: 5 }),
      );
      spy.mockRestore();
    });

    it("returns REJECTED and logs error for zero mass", () => {
      const spy = errorSpy();
      expect(sort(10, 10, 10, 0)).toBe("REJECTED");
      expect(spy).toHaveBeenCalledWith(
        "Error: all inputs must be finite positive numbers.",
        JSON.stringify({ width: 10, height: 10, length: 10, mass: 0 }),
      );
      spy.mockRestore();
    });

    it("returns REJECTED and logs error for NaN dimension", () => {
      const spy = errorSpy();
      expect(sort(NaN, 10, 10, 5)).toBe("REJECTED");
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
