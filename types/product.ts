// types/product.ts
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string; // <-- string only
  category: string;
  rating: number;
}
