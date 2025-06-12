import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorInfo = "";
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    errorInfo = error.data;
  } else if (error instanceof Error) {
    errorInfo = error.message;
  }

  return (
    <div className="mt-20 flex h-full w-full flex-1 flex-col items-center">
      <TypographyH1 className="mb-4">Oops!</TypographyH1>

      <TypographyP>Sorry, an unexpected error has occurred.</TypographyP>

      <TypographyP>
        <em>{errorInfo}</em>
      </TypographyP>

      <Button
        variant={"ghost"}
        onClick={() => navigate(-1)}
        className="text-foreground/75 decoration-foreground/75 mt-10 cursor-pointer text-lg font-light underline underline-offset-4"
      >
        Go back
      </Button>
    </div>
  );
}
