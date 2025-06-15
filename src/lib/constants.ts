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
  { id: 1, label: "all", name: "all", to: "/products", exact: true },
  {
    id: 2,
    label: "men's",
    name: "men",
    to: "/products/category/men",
    exact: false,
  },
  {
    id: 3,
    label: "women's",
    name: "women",
    to: "/products/category/women",
    exact: false,
  },
  {
    id: 4,
    label: "jewelry",
    name: "jewelry",
    to: "/products/category/jewelry",
    exact: false,
  },
  {
    id: 5,
    label: "electronics",
    name: "electronics",
    to: "/products/category/electronics",
    exact: false,
  },
];

export const DEBOUNCE_TIME = 300;
