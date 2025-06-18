/* --- @/test/services/api.test.ts --- */

import productLoader from "@/pages/product/product-loader";
import { ApiError } from "@/services/api";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetProduct = vi.fn();

vi.mock("@/services/api", async () => {
  const actual =
    await vi.importActual<typeof import("@/services/api")>("@/services/api");

  return {
    ...actual,
    getProduct: () => mockGetProduct(),
  };
});

describe("productLoader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return product with valid ID", async () => {
    mockGetProduct.mockResolvedValueOnce({ id: 1, title: "Test Product" });

    const result = await productLoader({
      params: { productId: "1" },
      request: new Request("http://localhost/product/1"),
      context: {},
    });

    expect(result).toEqual({ product: { id: 1, title: "Test Product" } });
  });

  it("should throw 400 for invalid ID", async () => {
    await expect(
      productLoader({
        params: { productId: "abc" },
        request: new Request("http://localhost/product/abc"),
        context: {},
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  it("should throw 404 if product is not found", async () => {
    mockGetProduct.mockResolvedValueOnce(undefined);

    await expect(
      productLoader({
        params: { productId: "999" },
        request: new Request("http://localhost/product/999"),
        context: {},
      }),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("should throw error with ApiError status", async () => {
    mockGetProduct.mockRejectedValueOnce(new ApiError("Boom!", 418));

    await expect(
      productLoader({
        params: { productId: "2" },
        request: new Request("http://localhost/product/2"),
        context: {},
      }),
    ).rejects.toMatchObject({ status: 418 });
  });

  it("should throw 500 on unknown error", async () => {
    mockGetProduct.mockRejectedValueOnce(new Error("Random failure"));

    await expect(
      productLoader({
        params: { productId: "1" },
        request: new Request("http://localhost/product/1"),
        context: {},
      }),
    ).rejects.toMatchObject({ status: 500 });
  });
});
