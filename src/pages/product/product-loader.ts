/* --- @/pages/product/product-loader.ts --- */

import { ApiError, getProduct } from "@/services/api";
import type { LoaderFunctionArgs } from "react-router-dom";

export default async function productLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.productId);

  if (isNaN(id)) {
    throw new Response("Invalid product ID", { status: 400 });
  }

  try {
    const product = await getProduct(id);

    if (!product) {
      throw new Response("Product not found", { status: 404 });
    }

    return { product };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Response(error.message, { status: error.status || 500 });
    }

    if (error instanceof Response) {
      throw error;
    }

    throw new Response("Unknown error occurred", { status: 500 });
  }
}
