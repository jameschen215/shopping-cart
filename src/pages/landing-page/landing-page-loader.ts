import { redirect } from "react-router-dom";

export function ladingPageLoader() {
  const token = localStorage.getItem("token");

  if (token) {
    throw redirect("/products");
  }

  return null;
}
