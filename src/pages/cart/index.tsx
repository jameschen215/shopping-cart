import { getStoredUser } from "@/auth/auth";
import { useCart } from "@/lib/hooks";
import CartTable from "./components/CartTable";
import ButtonGroup from "./components/ButtonGroup";
import NoUserCartPage from "./components/NoUserCartPage";
import NoItemCartPage from "./components/NoItemCartPage";
import { TypographyH1 } from "@/components/typography";

export default function CartPage() {
  const { cartItems } = useCart();
  const user = getStoredUser();

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
