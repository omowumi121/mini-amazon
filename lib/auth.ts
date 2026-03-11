// import API from "./API"

// export interface RegisterPayload {
//   name: string
//   email: string
//   password: string
// }

// export interface LoginPayload {
//   email: string
//   password: string
// }

// export interface LoginResponse {
//   message: string
//   token: string
// }

// // REGISTER
// export const registerUser = async (data: RegisterPayload) => {
//   const res = await API.post("/register", data)
//   return res.data
// }

// // LOGIN
// export const loginUser = async (
//   data: LoginPayload
// ): Promise<LoginResponse> => {
//   const res = await API.post("/login", data)
//   return res.data
// }

// // LOGOUT
// export const logoutUser = () => {
//   localStorage.removeItem("token")
// }


// import axios from "axios"

// const API = axios.create({
//   baseURL: "http://localhost:8080",
//   headers: {
//     "Content-Type": "application/json"
//   }
// })

// // Attach token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }

//   return config
// })

// export default API
