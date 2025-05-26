// import Fade from "embla-carousel-fade";
import { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType, type EmblaCarouselType } from "embla-carousel";
import {
  DotButton,
  useDotButton,
} from "@/components/carousel/carousel-dot-button";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/carousel/carousel-arrow-button";
import { cn } from "@/lib/utils";

type CarouselProps = {
  slides: number[];
  options: EmblaOptionsType;
};

export default function Carousel({ slides, options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="mx-auto max-w-120">
      {/* Slides */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="ml-[-10px] flex touch-pan-y touch-pinch-zoom">
          {slides.map((index) => (
            <div
              key={index}
              className="min-w-0 flex-shrink-0 flex-grow-0 basis-full translate-[0,0,0] pl-[10px]"
            >
              <div className="flex h-[190px] items-center justify-center rounded-[18px] text-5xl font-bold inset-shadow-[0_0_0_2px_#eaeaea] select-none">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-3">
        {/* Arrow Buttons */}
        <div className="flex items-center gap-2">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* Dot Buttons */}
        <div className="mr-[-6px] flex flex-wrap items-center justify-end">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "m-0 flex size-[26px] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#313131] no-underline after:flex after:size-[14px] after:items-center after:rounded-full after:inset-shadow-[0_0_0_2px_#635469] after:content-['']",
                selectedIndex === index &&
                  "after:inset-shadow-[0_0_0_2px_#36313d]",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
