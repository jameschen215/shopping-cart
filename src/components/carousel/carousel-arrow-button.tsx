import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { type EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType {
  const [prevBtnDisabled, setPrevButtonDisabled] = useState(true);
  const [nextBtnDisabled, setNextButtonDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();

    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();

    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevButtonDisabled(!emblaApi.canScrollPrev());
    setNextButtonDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

type ArrowButtonPropType = ComponentPropsWithRef<"button">;

export function PrevButton({ children, ...restProps }: ArrowButtonPropType) {
  return (
    // <button
    //   className="disabled:text-muted z-10 m-0 flex size-[36px] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#36313d] no-underline inset-shadow-[0_0_0_2px_#635e69]"
    //   type="button"
    //   {...restProps}
    // >
    //   <ChevronLeft />
    //   {children}
    // </button>
    <Button
      variant="outline"
      className="m-0 size-8 cursor-pointer rounded-full p-0"
      {...restProps}
    >
      <ChevronLeft />
      {children}
    </Button>
  );
}

export function NextButton({ children, ...restProps }: ArrowButtonPropType) {
  return (
    // <button
    //   className="z-10 m-0 flex size-[36px] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 text-[#36313d] no-underline inset-shadow-[0_0_0_2px_#635e69]"
    //   type="button"
    //   {...restProps}
    // >
    //   <ChevronRight />
    //   {children}
    // </button>
    <Button
      variant="outline"
      className="m-0 size-8 cursor-pointer rounded-full p-0"
      {...restProps}
    >
      <ChevronRight />
      {children}
    </Button>
  );
}
