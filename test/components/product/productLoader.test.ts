// test/services/api.test.ts

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getProducts,
  getProduct,
  getCart,
  getCachedProducts,
  clearCache,
  ApiError,
} from "../api";
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
const createMockResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  statusText: status === 200 ? "OK" : "Error",
  json: vi.fn().mockResolvedValue(data),
});

describe("ApiError", () => {
  it("should create an ApiError with message", () => {
    const error = new ApiError("Test error");

    expect(error.message).toBe("Test error");
  });
});
