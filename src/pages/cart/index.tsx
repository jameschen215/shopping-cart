import { getStoredUser } from "@/lib/auth";
import { useCart } from "@/lib/hooks";
import CartTable from "./components/CartTable";
import ButtonGroup from "./components/ButtonGroup";
import NoUserCartPage from "./components/NoUserCartPage";
import NoItemCartPage from "./components/NoItemCartPage";
import { TypographyH1 } from "@/components/typography";
import { useNavigation } from "react-router-dom";
import LoadingPage from "@/components/loading-page";

export default function CartPage() {
  const { cartItems } = useCart();
  const user = getStoredUser();
  const navigation = useNavigation();

  if (!user) return <NoUserCartPage />;

  if (cartItems.length === 0) return <NoItemCartPage />;

  if (navigation.state === "loading") return <LoadingPage pageName="cart" />;

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
