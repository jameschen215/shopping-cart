import { getStoredToken } from "@/auth/auth";
// import { redirect } from "react-router-dom";

export default function cartLoader() {
  const token = getStoredToken();

  if (!token) {
    return "Please login to get your cart.";
  }

  return "Cart page";
}
