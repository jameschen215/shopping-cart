import type { ProductType } from "@/data/data-type";

export function ImageWrapper({ product }: { product: ProductType }) {
  return (
    <div className="flex max-h-[calc(100vh-300px)] flex-1 items-center justify-center">
      <div className="h-full w-[75%] md:w-1/2">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-auto object-cover"
        />
      </div>
    </div>
  );
}
