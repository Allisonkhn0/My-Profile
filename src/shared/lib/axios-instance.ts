import axios from "axios";
import authStorage from "@/feature/auth/model/auth-storage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = authStorage.getStorageAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = authStorage.getStorageRefreshToken();

    if (error.status === 401) {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BASE_URL + "/auth/refresh",
          refreshToken,
        );
        
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        authStorage.setStorageAccessToken(data.accessToken);
        return axiosInstance(originalRequest);
      } catch {
        localStorage.clear();
      }
    }
  },
);

export default axiosInstance;
