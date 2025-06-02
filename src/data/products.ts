import type { ProductType } from "@/data/data-type";

export async function getAllProducts(): Promise<ProductType[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }

  return response.json();
}
