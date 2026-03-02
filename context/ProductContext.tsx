"use client";

import { createContext, ReactNode, useContext } from "react";
import { Product } from "@/types/product";
import { products as productsData } from "@/data/products";

interface ProductContextType {
  products: Product[];
}

const ProductContext = createContext<ProductContextType>({
  products: [],
});

export const ProductProvider = ({ children }: { children: ReactNode }) => (
  <ProductContext.Provider value={{ products: productsData }}>
    {children}
  </ProductContext.Provider>
);

export const useProducts = () => useContext(ProductContext);
