import { productsLoader } from "@/pages/products/products-loader";
import { getCachedProducts } from "@/services/api";
import { describe, expect, it, vi, type Mock } from "vitest";

// Mock the data layer
vi.mock("@/services/api", () => ({
  getCachedProducts: vi.fn(),
  ApiError: class extends Error {
    status = 400;
    constructor(message: string) {
      super(message);
      this.name = "ApiError";
    }
  },
}));

describe("productsLoader", () => {
  it("should return data and query if successful", async () => {
    const mockData = [{ id: 1, title: "Test Product" }];
    (getCachedProducts as Mock).mockResolvedValueOnce(mockData);

    const request = new Request("https://localhost/products?q=test");
    const result = await productsLoader({ request });

    expect(result).toEqual({ data: mockData, q: "test" });
  });

  it("should throw Response with status from ApiError when unsuccessful", async () => {
    (getCachedProducts as Mock).mockRejectedValueOnce(new Error("Not Found"));

    const request = new Request("https://localhost/products?q=test");

    await expect(productsLoader({ request })).rejects.toThrow(Response);

    try {
      expect(productsLoader({ request }));
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(404);
      expect((error as Response).statusText).toBe("");
    }
  });

  it("throws generic 500 Response on unknown error", async () => {
    (getCachedProducts as Mock).mockRejectedValueOnce(new Error("Boom"));

    const request = new Request("https://localhost/products");

    await expect(productsLoader({ request })).rejects.toThrow(Response);

    try {
      expect(productsLoader({ request }));
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(500);
      expect((error as Response).statusText).toBe("");
    }
  });
});
