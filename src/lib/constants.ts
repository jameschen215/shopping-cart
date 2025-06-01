import women from "@/assets/images/women.jpg";
import men from "@/assets/images/men.jpg";
import kids from "@/assets/images/kids.jpg";

export const HOMEPAGE_CATEGORIES = [
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

export const CATEGORIES = [
  { id: 1, label: "men's clothing", to: "/products/category/men" },
  { id: 2, label: "women's clothing", to: "/products/category/women" },
  { id: 3, label: "jewelry", to: "/products/category/jewelry" },
  { id: 4, label: "electronics", to: "/products/category/electronics" },
];
