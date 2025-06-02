import { getProducts } from "@/data/products";

export async function productsLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const data = await getProducts(q);

  return { data, q };
}
