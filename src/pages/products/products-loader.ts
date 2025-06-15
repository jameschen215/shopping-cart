/** --- pages/products/products-loader.ts --- */

import { ApiError, getCachedProducts } from "@/services/api";

export async function productsLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  try {
    const data = await getCachedProducts(q || "");
    return { data, q };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Products loader error:", error.name, error.message);

      throw new Response(error.message, {
        status: error.status || 500,
      });
    }

    // Unknown error
    throw new Response("Unknown error occurred", { status: 500 });
  }
}
