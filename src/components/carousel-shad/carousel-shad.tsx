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

export default function CarouselShad({ className }: { className: string }) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true }), Fade()]}
      className={cn("w-full max-w-xs", className)}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="p-0">
              <Card className="overflow-hidden rounded-sm p-0">
                <CardContent className="flex aspect-[3/4] items-center justify-center bg-blue-400 p-6 text-9xl text-amber-300">
                  <span>{index + 1}</span>
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
