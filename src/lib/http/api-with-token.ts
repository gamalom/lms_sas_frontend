import axios from "axios";

export const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json", //send vairako data ko format
    Accept: "application/json", // kasto data accept garne
  },
});

APIWITHTOKEN.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});
