"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Product, getProducts } from "@/lib/api";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string;

  fetchProducts: () => Promise<void>;

  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string | number) => void;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: "",
  fetchProducts: async () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ==========================
        FETCH PRODUCTS
     ========================== */

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* Load products on first mount */

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ==========================
        CRUD OPERATIONS
     ========================== */

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const deleteProduct = (id: string | number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
