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
