// export interface AuthResponse {
//   message: string;
//   token?: string;
// }

// export interface Product {
//   id: string | number;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   category?: string;
//   rating?: { rate: number; count: number } | number;
// }

// export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
//   const BASE_URL = "https://go-ecommerce-d46r.onrender.com";
  
//   const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
//   const url = `${BASE_URL}${cleanEndpoint}`;

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };

//   if (options.headers) {
//     Object.assign(headers, options.headers as Record<string, string>);
//   }

//   if (token && token !== "undefined") {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const res = await fetch(url, {
//     ...options,
//     headers,
//   });

//   const text = await res.text();

//   let data;
//   try {
//     data = text ? JSON.parse(text) : {};
//   } catch {
//     data = {};
//   }

//   if (!res.ok) {
//     const errorMessage = data.error || data.message || `API Error: ${res.status}`;
//     throw new Error(errorMessage);
//   }

//   return data as T;
// }

// /* ================================
//    PRODUCT API FUNCTIONS
// ================================ */

// /** Get all products */
// export async function getProducts(): Promise<Product[]> {
//   return apiRequest<Product[]>("/product");
// }

// /** Get single product */
// export async function getProduct(id: string | number): Promise<Product> {
//   return apiRequest<Product>(`/product/${id}`);
// }



export interface AuthResponse {
  message: string;
  token?: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string; // Ensured this is here
  rating?: { rate: number; count: number } | number;
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const BASE_URL = "https://go-ecommerce-d46r.onrender.com";
  
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  if (token && token !== "undefined") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!res.ok) {
    const errorMessage = data.error || data.message || `API Error: ${res.status}`;
    throw new Error(errorMessage);
  }

  return data as T;
}

/* ================================
    PRODUCT API FUNCTIONS
================================ */

/** Get all products - note the plural /products often used for lists */
export async function getProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/products");
}

/** Get single product using the string ID from your database */
export async function getProduct(id: string): Promise<Product> {
  // Use ?id= format as seen in your successful admin calls
  return apiRequest<Product>(`/product?id=${id}`);

}

/** Add new product - uses POST */
export async function addProduct(product: Omit<Product, 'id'>): Promise<any> {
  return apiRequest("/product/add", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

/** Update product - uses PUT as confirmed by your 405 error */
export async function updateProduct(id: string | number, product: Partial<Product>): Promise<any> {
  return apiRequest(`/product/update?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...product, id: Number(id) }),
  });
}