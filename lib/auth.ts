import api from "./api"

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
}

export const registerUser = async (data: RegisterPayload) => {
  const res = await api.post("/register", data)
  return res.data
}

export const loginUser = async (
  data: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post("/login", data)

  return res.data
}

export const logoutUser = () => {
  localStorage.removeItem("token")
}
