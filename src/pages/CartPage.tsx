/** --- pages/cart/index.tsx --- */

import { getStoredUser } from "@/lib/auth";
import { useCart, useStayOnRoute } from "@/lib/hooks";

import { TypographyH1 } from "@/components/typography";
import CartSkeleton from "@/components/skeletons/CartSkeleton";
import NoUserCartPage from "@/components/cart/NoUserCartPage";
import NoItemCartPage from "@/components/cart/NoItemCartPage";
import CartTable from "@/components/cart/CartTable";
import ButtonGroup from "@/components/cart/ButtonGroup";

export default function CartPage() {
  const { cartItems } = useCart();
  const user = getStoredUser();

  const stillOnCart = useStayOnRoute("/cart");

  if (stillOnCart) return <CartSkeleton />;

  if (!user) return <NoUserCartPage />;

  if (cartItems.length === 0) return <NoItemCartPage />;

  return (
    <>
      <TypographyH1 className="my-8 ml-5 w-full text-left">
        My cart
      </TypographyH1>

      <CartTable />

      <ButtonGroup />
    </>
  );
}
