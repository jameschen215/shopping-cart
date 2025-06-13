import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorInfo = "";
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Error - Odin Store";
  }, []);

  if (isRouteErrorResponse(error)) {
    errorInfo = error.data;
  } else if (error instanceof Error) {
    errorInfo = error.message;
  }

  return (
    <div className="mt-20 flex h-full w-full flex-1 flex-col items-center">
      <TypographyH1 className="mb-4">Oops!</TypographyH1>

      <div role="alert">
        <TypographyP>Sorry, an unexpected error has occurred.</TypographyP>
        <TypographyP>
          <em>{errorInfo}</em>
        </TypographyP>
      </div>

      <Button
        variant={"ghost"}
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
        className="text-foreground/75 decoration-foreground/75 mt-10 cursor-pointer text-lg font-light underline underline-offset-4"
      >
        Go back
      </Button>
    </div>
  );
}
