import { useRouteError } from "react-router-dom";

import { TypographyH1, TypographyP } from "@/components/typography";

export default function ErrorPage() {
  const error = useRouteError();
  let errorInfo = "";

  if (error instanceof Error) {
    errorInfo = error.message;
  } else if (error instanceof Response) {
    errorInfo = error.statusText;
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
