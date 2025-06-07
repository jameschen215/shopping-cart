import { getStoredUser } from "@/auth/auth";
import { getCart, getProduct } from "@/data/products";

export default async function cartLoader() {
  const user = getStoredUser();

  if (!user) {
    return null;
  }

  const data = await getCart(user.id);

  const products = await Promise.all(
    data.products.map(async ({ productId, quantity }) => {
      const product = await getProduct(productId);
      return { product, quantity };
    }),
  );

  return products;
}
