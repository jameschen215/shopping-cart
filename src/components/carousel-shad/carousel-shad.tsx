import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from "../ui/carousel";
import { cn } from "@/lib/utils";

type SlideType = {
  category: string;
  image: string;
};

type CarouselPropsType = {
  className?: string;
  slides: SlideType[];
};

export default function CarouselShad({ className, slides }: CarouselPropsType) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: true }), Fade()]}
      className={cn("w-full", className)}
    >
      <CarouselContent>
        {slides.map(({ category, image }, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="p-0">
              <Card className="flex flex-row justify-center overflow-hidden rounded-xs border-none p-0">
                <CardContent className="relative flex aspect-[5/7] w-full items-center justify-center p-0 md:aspect-[16/9]">
                  <div className="h-full w-full">
                    <img
                      src={image}
                      alt="Category photo"
                      className="block h-full w-full object-cover"
                    />
                    <span className="text-background/25 absolute bottom-1/7 left-1/2 block -translate-x-1/2 text-4xl">
                      {category.toUpperCase()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselIndicators />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
