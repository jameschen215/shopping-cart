import type { ProductType } from "@/data/data-type";
import { getAllProducts } from "@/data/products";

export async function productsLoader(): Promise<{ data: ProductType[] }> {
  const data = await getAllProducts();

  return { data };
}
