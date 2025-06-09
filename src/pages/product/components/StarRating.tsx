import { formatNumberToK } from "@/lib/utils";
import { Star } from "lucide-react";

type StarRatingPropsType = {
  rate: number;
  count: number;
  max?: number;
};

export default function StarRating({
  rate,
  count,
  max = 5,
}: StarRatingPropsType) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-foreground mr-1 text-base">{rate.toFixed(1)}</span>

      {Array.from({ length: max }).map((_, index) => {
        const percent = Math.max(0, Math.min(1, rate - index)) * 100;

        return (
          <div key={index} className="relative size-5">
            {/* Empty Stars */}
            <div className="absolute inset-0 size-5">
              <Star
                className="text-foreground/50 h-full w-full"
                strokeWidth={1}
              />
            </div>

            {/* Yellow clipped fill */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${percent}%` }}
            >
              <Star className="size-5 text-yellow-500" fill="currentColor" />
            </div>
          </div>
        );
      })}
      <span className="text-foreground/75 ml-1 text-sm">
        ({formatNumberToK(count)})
      </span>
    </div>
  );
}
