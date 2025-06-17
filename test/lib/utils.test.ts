import { describe, expect, it } from "vitest";

import { formatCurrency, formatNumberToCompactNotation } from "@/lib/utils";

describe("utils", () => {
  describe("formatCurrency", () => {
    it("should format number as USD currency", () => {
      expect(formatCurrency(1000)).toBe("$1,000.00");
      expect(formatCurrency(12.5)).toBe("$12.50");
      expect(formatCurrency(0)).toBe("$0.00");
      expect(formatCurrency(-12.59)).toBe("-$12.59");
    });
  });

  describe("formatNumberToK", () => {
    it("should format number to compat notation", () => {
      expect(formatNumberToCompactNotation(1000)).toBe("1K");
      expect(formatNumberToCompactNotation(2500000)).toBe("2.5M");
      expect(formatNumberToCompactNotation(987)).toBe("987");
      expect(formatNumberToCompactNotation(0)).toBe("0");
      expect(formatNumberToCompactNotation(-2500)).toBe("-2.5K");
    });
  });
});
