/** --- lib/api.ts --- */

import type { CartType, ProductType } from "@/lib/types";

const BASE_URL = "https://fakestoreapi.com";
const DEFAULT_TIMEOUT = 10000; // 10 seconds

// Custom error class
export class ApiError extends Error {
  status?: number;
  response?: Response;

  constructor(message: string, status?: number, response?: Response) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}

// Generic fetch wrapper with timeout and better error handling
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        response,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408);
    }

    // Re-throw ApiError as-is
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle other errors
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error occurred",
    );
  }
}

export async function getProducts(query?: string): Promise<ProductType[]> {
  try {
    const data = apiFetch<ProductType[]>("/products");

    // Apply filtering if query is provided and not empty
    if (query && query.trim()) {
      const normalizedQuery = query.toLowerCase().trim();
      return (await data).filter(
        (product) =>
          product.title.toLowerCase().includes(normalizedQuery) ||
          product.category.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery),
      );
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw new ApiError("Failed to fetch products");
  }
}

export async function getProduct(id: number): Promise<ProductType> {
  // Input validation
  if (!id || id <= 0) throw new ApiError("Invalid product ID", 400);

  try {
    const data = await apiFetch<ProductType>(`/products/${id}`);
    return data;
  } catch (error) {
    // console.error(`Failed to fetch product ${id}`, error);

    if (error instanceof ApiError && error.status === 404) {
      throw new Response("Product not found", { status: 404 });
    }

    throw new ApiError(`Failed to fetch product ${id}`);
  }
}

export async function getCart(userId: number): Promise<CartType> {
  // Input validation
  if (!userId || userId <= 0) {
    throw new ApiError("Invalid user ID", 400);
  }

  try {
    const carts = await apiFetch<CartType[]>("/carts");
    const userCart = carts.find((cart) => cart.userId === userId);

    if (!userCart) {
      throw new ApiError("Cart not found for this user", 404);
    }

    return userCart;
  } catch (error) {
    console.error(`Failed to fetch cart for user ${userId}:`, error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(`Failed to fetch cart for user ${userId}`);
  }
}

// Cache utilities (optional enhancement)
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedProducts(
  query?: string,
): Promise<ProductType[]> {
  const cacheKey = `products-${query || "all"}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as ProductType[];
  }

  const data = await getProducts(query);
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}

export function clearCache(): void {
  cache.clear();
}
