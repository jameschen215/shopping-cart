import CarouselShad from "@/components/carousel-shad/carousel-shad";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/constants";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-2">
      <TypographyH1 className="font-display my-12 flex flex-col items-center justify-center gap-2 md:mt-5 md:mb-20 md:flex-row">
        <span>Shop Smarter,</span>
        <span>Live Better</span>
      </TypographyH1>

      <div className="max-w-2xs md:max-w-2xl">
        <CarouselShad slides={CATEGORIES} />

        <ButtonContainer />
      </div>
    </div>
  );
}

function ButtonContainer() {
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
