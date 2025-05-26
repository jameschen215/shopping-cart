import CarouselShad from "@/components/carousel-shad/carousel-shad";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center px-2">
      <TypographyH1 className="font-display mt-15 flex flex-wrap justify-center gap-2 p-2">
        <span>Shop Smarter,</span>
        <span>Live Better</span>
      </TypographyH1>

      {/* <Carousel slides={SLIDES} options={OPTIONS} /> */}
      <CarouselShad className="mt-8" />

      <Button className="mt-8 w-full max-w-xs cursor-pointer">Shop Now</Button>
    </div>
  );
}
