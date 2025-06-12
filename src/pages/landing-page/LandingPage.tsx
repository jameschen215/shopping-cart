import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/typography";

import { LANDING_PAGE_CATEGORIES } from "@/lib/constants";
import AppCarousel from "@/components/landing-page/AppCarousel";

export default function LandingPage() {
  return (
    <div className="flex w-full max-w-2xs flex-1 flex-col items-center justify-center px-2 md:max-w-2xl">
      <TitleWrapper />

      <AppCarousel slides={LANDING_PAGE_CATEGORIES} />

      <ButtonWrapper />
    </div>
  );
}

function TitleWrapper() {
  return (
    <TypographyH1 className="font-display my-12 flex flex-col items-center justify-center gap-2 md:mt-5 md:mb-20 md:flex-row">
      <span>Shop Smarter,</span>
      <span>Live Better</span>
    </TypographyH1>
  );
}

function ButtonWrapper() {
  return (
    <div className="my-10 flex w-full flex-col gap-4 md:flex-row md:justify-center md:gap-10">
      <Button className="flex flex-1 cursor-pointer rounded-[2px]" asChild>
        <NavLink to={"/products"}>Shop Now</NavLink>
      </Button>

      <Button
        variant={"outline"}
        className="flex flex-1 cursor-pointer rounded-[2px]"
        asChild
      >
        <NavLink to={"/login"}>Sign In</NavLink>
      </Button>
    </div>
  );
}
