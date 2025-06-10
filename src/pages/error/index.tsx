import { TypographyH1, TypographyP } from "@/components/typography";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorInfo = "";

  console.log(isRouteErrorResponse(error));

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
    </div>
  );
}
