import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NoItemCartPage() {
  return (
    <div className="mt-30 flex flex-1 flex-col items-center gap-6">
      <TypographyH1>Your cart is empty</TypographyH1>

      <p className="text-xl" data-testid="paragraph">
        Looks like you haven't added anything yet. Explore our products and fill
        your cart!
      </p>

      <Button className="min-w-[240px] cursor-pointer rounded-xs py-5" asChild>
        <Link to={"/products"}>Go shopping</Link>
      </Button>
    </div>
  );
}
