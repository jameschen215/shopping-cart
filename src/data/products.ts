import type { CartType, ProductType } from "@/lib/types";

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

export async function getProduct(id: number) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }

  const data: ProductType = await response.json();

  return data;
}

export async function getCart(userId: number) {
  const response = await fetch("https://fakestoreapi.com/carts");

  if (!response.ok) throw new Response("Not Found", { status: 404 });

  const carts: CartType[] = await response.json();
  const cart = carts.find((c) => c.userId === userId);

  if (!cart) throw new Error("User not found");

  return cart;
}
