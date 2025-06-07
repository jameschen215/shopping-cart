import { getStoredUser } from "@/auth/auth";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProductType } from "@/data/data-type";

import { useCart } from "@/lib/hooks";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  // const products = useLoaderData() as LocalCartType[] | null;
  const { cartItems } = useCart();
  const user = getStoredUser();

  if (!user) {
    return (
      <div className="mt-30 flex flex-1 flex-col items-center gap-6">
        <TypographyH1>Your cart is empty</TypographyH1>
        <p className="text-xl">Have an account? Sign in to see your cart</p>
        <Button className="min-w-[240px] rounded-xs py-5">
          <Link to={"/login"}>Sign in</Link>
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mt-30 flex flex-1 flex-col items-center gap-6">
        <TypographyH1>Your cart is empty</TypographyH1>
        <p className="text-xl">
          Looks like you haven't added anything yet. Explore our products and
          fill your cart!
        </p>
        <Button className="min-w-[240px] rounded-xs py-5">
          <Link to={"/products"}>Go shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <TypographyH1 className="my-8 ml-5 w-full text-left">
        My cart
      </TypographyH1>

      <CartTable />

      <Button
        className="mt-10 w-full self-end rounded-xs py-6 md:mr-5 md:w-60 md:rounded-xs"
        onClick={() => toast.info("Functionality is coming soon.")}
      >
        Proceed to checkout
      </Button>
    </>
  );
}

function CartTable() {
  const { cartItems, setCartItems } = useCart();
  const [selectIds, setSelectedIds] = useState<number[]>(() =>
    cartItems.map((item) => item.product.id),
  );

  function handleQuantityChange(id: number, newQuantity: number) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }

  function toggleSelectAll() {
    if (selectIds.length === cartItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map(({ product }) => product.id));
    }
  }

  function toggleSelectOne(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id],
    );
  }

  function handleDeleteItem(id: number) {
    setCartItems((prev) =>
      prev.filter((item) => {
        if (item.product.id !== id) return item;
        return;
      }),
    );
  }

  const isAllSelected = selectIds.length === cartItems.length;

  const totalPrice = cartItems
    .filter((item) => selectIds.includes(item.product.id))
    .reduce((a, c) => a + c.product.price * c.quantity, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={toggleSelectAll}
            />
            {/* <span className="ml-2">Select All</span> */}
          </TableHead>
          <TableHead className="">Product</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Operation</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cartItems.map(({ product, quantity }) => (
          <TableRow key={product.title}>
            <TableCell className="font-medium">
              <Checkbox
                checked={selectIds.includes(product.id)}
                onCheckedChange={() => toggleSelectOne(product.id)}
              />
            </TableCell>
            <TableCell>
              <ProductCell product={product} />
            </TableCell>
            <TableCell className="text-center">
              {formatCurrency(product.price)}
            </TableCell>
            <TableCell className="text-center">
              <ProductCount
                productId={product.id}
                quantity={quantity}
                onChange={handleQuantityChange}
              />
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleDeleteItem(product.id)}
              >
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="text-base">
        <TableRow>
          <TableCell className="md:text-center"></TableCell>
          <TableCell colSpan={3} className="">
            Total
          </TableCell>
          <TableCell className="text-center">
            {formatCurrency(totalPrice)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function ProductCell({ product }: { product: ProductType }) {
  return (
    <div className="flex items-center gap-5 py-2">
      <div className="size-10 md:size-20">
        <img
          className="h-full w-full object-cover"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="hidden md:flex md:flex-col">
        <span className="break-words whitespace-normal">{product.title}</span>
      </div>
    </div>
  );
}

type ProductCountPropsType = {
  productId: number;
  quantity: number;
  onChange: (id: number, newQuantity: number) => void;
};

function ProductCount({
  productId,
  quantity,
  onChange,
}: ProductCountPropsType) {
  const [count, setCount] = useState(quantity);

  function handleDecrement() {
    const newCount = count - 1;
    if (newCount <= 0) return;

    setCount(newCount);
    onChange(productId, newCount);
  }

  function handleIncrement() {
    const newCount = count + 1;
    setCount(newCount);
    onChange(productId, newCount);
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={handleDecrement}
        disabled={count <= 1}
        className="cursor-pointer"
      >
        <Minus />
      </Button>

      <div className="flex size-5 items-center justify-center">{count}</div>

      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        onClick={handleIncrement}
        className="cursor-pointer"
      >
        <Plus />
      </Button>
    </div>
  );
}
