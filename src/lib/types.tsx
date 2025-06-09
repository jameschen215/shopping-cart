export type Theme = "dark" | "light" | "system";

type RatingType = {
  rate: number;
  count: number;
};

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingType;
};

export type CartType = {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
};

export type LocalCartType = {
  product: ProductType;
  quantity: number;
};

export type UserType = {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  phone: string;
};
