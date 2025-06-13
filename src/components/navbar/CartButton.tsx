import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth, useCart } from "@/lib/hooks";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartButton() {
  const { user } = useAuth();
  const { cartItems } = useCart();

  const itemsNumber = cartItems.reduce((a, c) => a + c.quantity, 0);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative hover:bg-transparent"
      asChild
    >
      <Link to="/cart" aria-label={`Shopping cart with ${itemsNumber} items`}>
        <ShoppingCart className="size-5" strokeWidth={1.5} aria-hidden="true" />
        {cartItems.length > 0 && user !== null && (
          <Badge
            className="absolute -top-1 -right-1 flex size-5 items-center justify-center overflow-visible bg-transparent p-0 text-xs font-medium text-rose-500"
            aria-hidden="true"
            data-testid="badge"
          >
            {itemsNumber > 99 ? "99+" : itemsNumber}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
