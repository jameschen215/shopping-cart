import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/typography";

import { LANDING_PAGE_CATEGORIES } from "@/lib/constants";
import AppCarousel from "@/components/landing-page/AppCarousel";
import ButtonGroup from "@/components/others/ButtonGroup";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div
      className="flex w-full max-w-2xs flex-1 flex-col items-center justify-center px-2 md:max-w-2xl"
      data-testid="landing-page"
    >
      {/* 1. Title */}
      <TypographyH1 className="font-display my-12 flex flex-col items-center justify-center gap-2 md:mt-5 md:mb-20 md:flex-row">
        <span>Shop Smarter, </span>
        <span>Live Better</span>
      </TypographyH1>

      {/* 2. Carousel */}
      <AppCarousel slides={LANDING_PAGE_CATEGORIES} />

      {/* 3. Buttons */}
      <ButtonGroup>
        <Button className="flex-1 cursor-pointer rounded-[2px]" asChild>
          <Link to={"/products"}>Shop Now</Link>
        </Button>

        <Button
          variant={"outline"}
          className="flex-1 cursor-pointer rounded-[2px]"
          asChild
        >
          <Link to={"/login"}>Sign In</Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
