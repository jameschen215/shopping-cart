import { getProduct } from "@/data/products";
import type { LoaderFunctionArgs } from "react-router-dom";

export default async function productLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.productId);
  const product = await getProduct(id);

  return { product };
}
