import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ButtonGroup() {
  return (
    <div className="mt-10 mb-10 flex w-full flex-col gap-4 sm:flex-row md:justify-end">
      <Button
        className="flex-1 cursor-pointer rounded-xs py-4 sm:order-2 md:max-w-[200px]"
        onClick={() => toast.info("Sorry, checkout is coming soon.")}
      >
        Proceed to checkout
      </Button>
      <Button
        className="flex-1 cursor-pointer rounded-xs py-4 md:max-w-[200px]"
        asChild
      >
        <Link to={"/products"}>Go back shopping</Link>
      </Button>
    </div>
  );
}
