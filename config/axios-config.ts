import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://server-sneaker-shop.vercel.app/api",
});
