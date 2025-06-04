import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatNumberToK(num: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short", // 'short' for 'K', 'long' for 'thousand'
  }).format(num);
}
