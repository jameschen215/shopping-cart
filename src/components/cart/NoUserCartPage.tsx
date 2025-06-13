import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function NoUserCartPage() {
  const location = useLocation();

  return (
    <div className="mt-30 flex flex-1 flex-col items-center gap-6">
      <TypographyH1>Your cart is empty</TypographyH1>

      <p className="text-xl" data-testid="paragraph">
        Have an account? Sign in to see your cart
      </p>

      <div className="flex w-full flex-col gap-3 md:flex-row">
        <Button
          className="cursor-pointer rounded-xs py-5 md:min-w-[200px]"
          asChild
        >
          <Link to={"/products"}>Go back shopping</Link>
        </Button>
        <Button
          className="cursor-pointer rounded-xs py-5 md:min-w-[200px]"
          asChild
        >
          <Link to={"/login"} state={{ from: location }}>
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
}
