import type { ProductType } from "@/data/data-type";

export async function getProducts(query?: string): Promise<ProductType[]> {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }

  const data: ProductType[] = await response.json();

  if (query) {
    return (
      data.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())) ??
      []
    );
  }

  return data;
}
