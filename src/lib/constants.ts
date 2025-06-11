import women from "@/assets/images/women.jpg";
import men from "@/assets/images/men.jpg";
import kids from "@/assets/images/kids.jpg";

export const LANDING_PAGE_CATEGORIES = [
  {
    category: "men",
    image: men,
  },
  {
    category: "women",
    image: women,
  },
  {
    category: "kids",
    image: kids,
  },
];

export const PRODUCTS_PAGE_CATEGORIES = [
  { id: 1, label: "all", to: "/products" },
  { id: 2, label: "men's", to: "/products/category/men" },
  { id: 3, label: "women's", to: "/products/category/women" },
  { id: 4, label: "jewelry", to: "/products/category/jewelry" },
  { id: 5, label: "electronics", to: "/products/category/electronics" },
];
