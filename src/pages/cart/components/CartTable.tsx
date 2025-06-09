import ProductCount from "@/components/product-count";
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
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartTable() {
  const { cartItems, setCartItems } = useCart();
  const [selectIds, setSelectedIds] = useState<number[]>(() =>
    cartItems.map((item) => item.product.id),
  );

  function handleQuantityChange(newQuantity: number, id?: number) {
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
              className="cursor-pointer"
            />
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
                className="cursor-pointer"
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
