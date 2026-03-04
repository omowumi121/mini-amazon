const BASE_URL = "https://go-ecommerce-d46r.onrender.com";

async function request(endpoint: string, method: string = "GET", body?: any) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
}

/* ========================= */
/* AUTH */
/* ========================= */

export const registerUser = (email: string, password: string) =>
  request("/register", "POST", { email, password });

export const loginUser = (email: string, password: string) =>
  request("/login", "POST", { email, password });

/* ========================= */
/* PRODUCTS */
/* ========================= */

export const getProducts = () => request("/products");

export const getProduct = (id: string) =>
  request(`/product?id=${id}`);

export const addProduct = (product: any) =>
  request("/product/add", "POST", product);

export const updateProduct = (product: any) =>
  request("/product/update", "PUT", product);

export const deleteProduct = (id: string) =>
  request("/product/delete", "DELETE", { id });

/* ========================= */
/* ORDERS */
/* ========================= */

export const createOrder = (order: any) =>
  request("/product/creatorder", "POST", order);

export const getOrders = () =>
  request("/product/getorders");
