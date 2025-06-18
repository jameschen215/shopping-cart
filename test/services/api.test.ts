// test/services/api.test.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getProducts,
  getProduct,
  getCart,
  getCachedProducts,
  clearCache,
  ApiError,
} from "@/services/api";
import type { ProductType, CartType } from "@/lib/types";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock data
const mockProducts: ProductType[] = [
  {
    id: 1,
    title: "Test Product 1",
    category: "electronics",
    description: "A test product",
    price: 29.99,
    image: "test-image-1.jpg",
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: "Test Product 2",
    category: "clothing",
    description: "Another test product",
    price: 19.99,
    image: "test-image-2.jpg",
    rating: { rate: 4.0, count: 50 },
  },
];

const mockProduct: ProductType = {
  id: 1,
  title: "Single Test Product",
  category: "electronics",
  description: "A single test product",
  price: 39.99,
  image: "single-test-image.jpg",
  rating: { rate: 4.8, count: 200 },
};

const mockCarts: CartType[] = [
  {
    id: 1,
    userId: 1,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
  },
  {
    id: 2,
    userId: 2,
    products: [{ productId: 1, quantity: 1 }],
  },
];

// Helper function to create mock response
const createMockResponse = (data: unknown, ok = true, status = 200) =>
  ({
    ok,
    status,
    statusText: status === 200 ? "OK" : status === 404 ? "Not Found" : "Error",
    json: vi.fn().mockResolvedValue(data),
  }) as unknown as Response;

describe("ApiError", () => {
  it("should create an ApiError with message", () => {
    const error = new ApiError("Test error");

    expect(error.message).toBe("Test error");
    expect(error.name).toBe("ApiError");
    expect(error.status).toBe(undefined);
  });

  it("should throw an ApiError with status and response", () => {
    const mockResponse = {} as Response;
    const error = new ApiError("Test error", 404, mockResponse);

    expect(error.message).toBe("Test error");
    expect(error.status).toBe(404);
    expect(error.response).toBe(mockResponse);
  });
});

describe("getProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all products successfully", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    const result = await getProducts();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result).toEqual(mockProducts);
  });

  it("should filter products by query", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    const result = await getProducts("electronics");

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("electronics");
  });

  it("should filter products by title", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    const result = await getProducts("Product 1");

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Test Product 1");
  });

  it("should return empty array for non-matching query", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    const result = await getProducts("nonexistent");

    expect(result).toHaveLength(0);
  });

  it("should handle empty query", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    const result = await getProducts(" ");

    expect(result).toEqual(mockProducts);
  });

  it("should handle API error response", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: vi.fn().mockResolvedValue({}),
    } as unknown as Response;

    mockFetch
      .mockResolvedValueOnce(mockResponse)
      .mockResolvedValueOnce(mockResponse);

    await expect(getProducts()).rejects.toThrow(ApiError);
    await expect(getProducts()).rejects.toThrow(
      "API request failed: 500 Internal Server Error",
    );
  });

  it("should handle network error", async () => {
    mockFetch
      .mockRejectedValueOnce(new Error("Network error"))
      .mockRejectedValueOnce(new Error("Network error"));

    await expect(getProducts()).rejects.toThrow(ApiError);
    await expect(getProducts()).rejects.toThrow("Network error");
  });

  it("should handle unknown error types", async () => {
    // Mock a rejection that's not an Error object
    mockFetch
      .mockRejectedValueOnce({ message: "Not an Error object" })
      .mockRejectedValueOnce({ message: "Not an Error object" });

    await expect(getProducts()).rejects.toThrow(ApiError);
    await expect(getProducts()).rejects.toThrow("Unknown error occurred");
  });

  it("should handle timeout", async () => {
    vi.useFakeTimers();

    // Mock fetch that listens to AbortSignal
    mockFetch.mockImplementationOnce((_, { signal }) => {
      return new Promise((_resolve, reject) => {
        if (signal) {
          signal.addEventListener("abort", () => {
            const error = new Error("Aborted");
            (error as Error & { name: string }).name = "AbortError";
            reject(error);
          });
        }
      });
    });

    const promise = getProducts();

    // Trigger the timeout
    vi.advanceTimersByTime(10000);
    await vi.runOnlyPendingTimersAsync();

    await expect(promise).rejects.toThrow("Request timeout");

    vi.useRealTimers();
  });
});

describe("getProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch a single product successfully", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProduct));

    const result = await getProduct(1);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/products/1",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result).toEqual(mockProduct);
  });

  it("should throw error for invalid product ID (zero)", async () => {
    await expect(getProduct(0)).rejects.toThrow(ApiError);
    await expect(getProduct(0)).rejects.toThrow("Invalid product ID");
  });

  it("should throw error for invalid product ID (negative)", async () => {
    await expect(getProduct(-1)).rejects.toThrow(ApiError);
    await expect(getProduct(-1)).rejects.toThrow("Invalid product ID");
  });

  it("should handle product not found (404)", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(null, false, 404));

    await expect(getProduct(999)).rejects.toThrow(Response);
  });

  it("should handle other API errors", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(null, false, 500));

    await expect(getProduct(1)).rejects.toThrow(ApiError);
    await expect(getProduct(1)).rejects.toThrow("Failed to fetch product 1");
  });
});

describe("getCart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    console.error = vi.fn();
  });

  it("should fetch user cart successfully", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockCarts));

    const result = await getCart(1);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/carts",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result).toEqual(mockCarts[0]);
  });

  it("should throw error for invalid user ID (zero)", async () => {
    await expect(getCart(0)).rejects.toThrow(ApiError);
    await expect(getCart(0)).rejects.toThrow("Invalid user ID");
  });

  it("should throw error for invalid user ID (negative)", async () => {
    await expect(getCart(-1)).rejects.toThrow(ApiError);
    await expect(getCart(-1)).rejects.toThrow("Invalid user ID");
  });

  it("should throw error when cart not found for user", async () => {
    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockCarts))
      .mockResolvedValueOnce(createMockResponse(mockCarts));

    await expect(getCart(999)).rejects.toThrow(ApiError);
    await expect(getCart(999)).rejects.toThrow("Cart not found for this user");
  });

  it("should handle API error", async () => {
    mockFetch
      .mockResolvedValueOnce(createMockResponse(null, false, 500))
      .mockResolvedValueOnce(createMockResponse(null, false, 500));

    await expect(getCart(1)).rejects.toThrow(ApiError);
    await expect(getCart(1)).rejects.toThrow("API request failed: 500 Error");
  });
});

describe("getCachedProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache(); // Clear cache before each test
  });

  it("should fetch and cache  products", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    const result = await getCachedProducts();

    expect(result).toEqual(mockProducts);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should return cached products on subsequent calls", async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockProducts));

    // First call
    const result1 = await getCachedProducts();

    // Second call should use cache
    const result2 = await getCachedProducts();

    expect(result1).toEqual(mockProducts);
    expect(result2).toEqual(mockProducts);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("should cache with different keys for different queries", async () => {
    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockProducts))
      .mockResolvedValueOnce(createMockResponse([mockProducts[0]]));

    await getCachedProducts();
    await getCachedProducts("electronics");

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("should refresh cache after expiration", async () => {
    vi.useFakeTimers();

    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockProducts))
      .mockResolvedValueOnce(createMockResponse([mockProducts[1]]));

    // First call
    await getCachedProducts();

    // Fast-forward time beyond cache duration (5 minutes)
    vi.advanceTimersByTime(5 * 60 * 1000 + 1);

    // Second call should fetch fresh data
    await getCachedProducts();

    expect(mockFetch).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});

describe("clearCache", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  it("should clear the cache", async () => {
    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockProducts))
      .mockResolvedValueOnce(createMockResponse([mockProducts[1]]));

    // First call to populate cache
    await getCachedProducts();

    // Clear cache
    clearCache();

    // Second call should fetch fresh data
    await getCachedProducts();

    expect(mockFetch).toHaveBeenCalledTimes(2); // Cache was cleared
  });
});

describe("Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle complex product filtering scenarios", async () => {
    const complexProducts = [
      {
        ...mockProducts[0],
        title: "iPhone 13",
        category: "electronics",
        description: "Latest smartphone",
      },
      {
        ...mockProducts[1],
        title: "Samsung TV",
        category: "electronics",
        description: "Smart television",
      },
      {
        ...mockProducts[0],
        title: "Nike Shoes",
        category: "clothing",
        description: "Running shoes",
      },
    ];

    mockFetch.mockResolvedValueOnce(createMockResponse(complexProducts));

    const result = await getProducts("smart");

    expect(result).toHaveLength(2); // iPhone (smartphone) and Samsung (Smart television)
  });

  it("should handle multiple API calls with different endpoints", async () => {
    mockFetch
      .mockResolvedValueOnce(createMockResponse(mockProducts)) // getProducts
      .mockResolvedValueOnce(createMockResponse(mockProduct)) // getProduct
      .mockResolvedValueOnce(createMockResponse(mockCarts)); // getCart

    const [products, product, cart] = await Promise.all([
      getProducts(),
      getProduct(1),
      getCart(1),
    ]);

    expect(products).toEqual(mockProducts);
    expect(product).toEqual(mockProduct);
    expect(cart).toEqual(mockCarts[0]);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });
});
