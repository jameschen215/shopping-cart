import { useLoaderData } from "react-router-dom";

export default function CartPage() {
  const data: string = useLoaderData();

  return (
    <>
      <h1 className="heading-1">{data}</h1>
    </>
  );
}
