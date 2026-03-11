// ✅ Use 'export' before 'async function'
export interface AuthResponse {
  message: string;
  token?: string; 
}



export async function apiRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
  const BASE_URL = "https://go-ecommerce-d46r.onrender.com";
  
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}