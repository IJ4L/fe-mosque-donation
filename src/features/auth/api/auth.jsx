import { API_URL } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const TOKEN_KEY = "mosque_auth_token";
const USER_DATA_KEY = "mosque_user_data";

export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export const getCurrentUser = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

export const saveAuthData = (userData, token) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const logoutUser = () => {
  localStorage.removeItem(USER_DATA_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      try {
        console.log("Making login request with:", credentials);

        const response = await axios.post(
          `${API_URL}/auth/login`,
          credentials,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000,
          }
        );

        console.log("Login response:", response.data);

        if (response.data && response.data.message === "Login berhasil") {
          const userData = response.data.data;

          const mockToken = `mock_token_${Date.now()}`;

          saveAuthData(userData, mockToken);

          return {
            success: true,
            user: userData,
            token: mockToken,
          };
        }

        console.error("Unexpected response format:", response.data);
        throw new Error("Format respons server tidak valid");
      } catch (error) {
        console.error("Login error:", error);

        if (error.response) {
          const serverMessage = error.response.data?.message;
          console.log("Server error message:", serverMessage);
          throw new Error(
            serverMessage || "Login gagal. Server menolak permintaan."
          );
        } else if (error.request) {
          console.log("No response received from server");
          throw new Error(
            "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
          );
        } else {
          console.log("Request setup error:", error.message);
          throw new Error(error.message || "Terjadi kesalahan saat login.");
        }
      }
    },
  });
};

export const setupAuthInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};
