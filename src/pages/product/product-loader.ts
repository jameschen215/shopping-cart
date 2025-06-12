import { ApiError, getProduct } from "@/lib/api";
import type { LoaderFunctionArgs } from "react-router-dom";

export default async function productLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.productId);

  try {
    const product = await getProduct(id);

    if (!product) {
      throw new Response("", { status: 404, statusText: "Not Found" });
    }

    return { product };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("Product loader error:", error.name, error.message);

      throw new Response(error.message, {
        status: error.status || 500,
      });
    }

    // Unknown error
    throw new Response("Unknown error occurred", { status: 500 });
  }
}
