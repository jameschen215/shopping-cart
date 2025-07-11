/** --- pages/cart/index.tsx --- */
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

import { useCart, useStayOnRoute } from '@/lib/hooks';

import { TypographyH1 } from '@/components/typography';
import CartSkeleton from '@/components/skeletons/CartSkeleton';
import NoItemCartPage from '@/components/cart/NoItemCartPage';
import CartTable from '@/components/cart/CartTable';
import ButtonGroup from '@/components/others/ButtonGroup';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { cartItems, isLoading: isCartLoading } = useCart();
  const isRouteLoading = useStayOnRoute('/cart');

  // Check route loading first
  if (isRouteLoading) {
    console.log('route loading ...');
    return <CartSkeleton />;
  }

  // Then check cart loading
  if (isCartLoading) {
    console.log('cart loading ...');
    return <CartSkeleton />;
  }

  // Finally check if cart is empty
  if (cartItems && cartItems.length === 0) {
    console.log('cart is empty');
    return <NoItemCartPage />;
  }

  return (
    <>
      {/* 1. Title */}
      <TypographyH1 className="my-8 ml-5 w-full text-left">
        My cart
      </TypographyH1>

      {/* 2. Table */}
      <CartTable />

      {/* 3. Buttons */}
      <ButtonGroup className="md:justify-end">
        <Button
          className="flex-1 cursor-pointer rounded-xs sm:order-2 md:max-w-[200px]"
          onClick={() => toast.info('Sorry, checkout is coming soon.')}
        >
          Proceed to checkout
        </Button>
        <Button
          className="flex-1 cursor-pointer rounded-xs md:max-w-[200px]"
          asChild
        >
          <Link to={'/products'}>Go back shopping</Link>
        </Button>
      </ButtonGroup>
    </>
  );
}
