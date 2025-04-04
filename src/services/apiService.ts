import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiService = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data = {},
  params = {}
) => {
  try {
    const response = await (async () => {
      switch (method) {
        case "GET":
          return axiosInstance.get(url, { params });
        case "POST":
          return axiosInstance.post(url, data);
        case "PUT":
          return axiosInstance.put(url, data);
        case "DELETE":
          return axiosInstance.delete(url);
        default:
          throw new Error("Invalid HTTP method");
      }
    })();

    return response.data;
  } catch (error:any) {
    console.error(`${method} Error:`, error.response?.data || error.message);
    throw error;
  }
};

export default apiService;
