import { request } from "./api";

// Registration: POST /register
export async function registerUser(name: string, email: string, password: string) {
  // Swagger says request body: { name, email, password }
  return request<{ message: string }>("/register", "POST", { name, email, password });
}

// Login: POST /login
export async function loginUser(email: string, password: string) {
  // Swagger says response: { message: string, token: string }
  return request<{ message: string; token: string }>("/login", "POST", { email, password });
}
