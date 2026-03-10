const BASE_URL = "https://go-ecommerce-d46r.onrender.com";

export async function request<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  token?: string
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.message || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error");
  }
}
