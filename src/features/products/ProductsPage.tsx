import { Form } from "react-router-dom";
import CategoryNavigation from "./CategoryNavigation";

export default function ProductsPage() {
  return (
    <>
      <div className="flex w-full items-center justify-between py-2">
        <CategoryNavigation />

        <Form action="">
          <input
            className="border outline-none"
            type="search"
            name="search-products"
            id="search-products"
          />
        </Form>
      </div>
    </>
  );
}
