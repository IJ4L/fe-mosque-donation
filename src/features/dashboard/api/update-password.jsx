import { API_URL } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const updatePassword = async ({ userId, currentPassword, newPassword }) => {
  try {
    const response = await axios.put(
      `${API_URL}/auth/password/${userId}`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update password");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 422) {
        if (error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(
            "Data tidak valid. Pastikan password lama Anda benar dan password baru memenuhi kriteria."
          );
        }
      } else if (error.response.status === 401) {
        throw new Error("Password lama tidak valid. Silakan coba lagi.");
      } else if (error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error(
      error.message || "Gagal mengubah password. Silakan coba lagi."
    );
  }
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: updatePassword,
  });
};
