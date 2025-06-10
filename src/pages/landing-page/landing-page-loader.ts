import { getStoredToken } from "@/lib/auth";
import { redirect } from "react-router-dom";

export default function landingPageLoader() {
  const token = getStoredToken();

  if (token) {
    throw redirect("/products");
  }

  return null;
}
