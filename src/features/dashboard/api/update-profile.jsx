import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";
import { API_URL } from "@/config/env";

export const updateProfile = async ({ userId, username, phoneNumber }) => {
  const response = await axios.put(`${API_URL}/auth/user/${userId}`, {
    username,
    phoneNumber,
  });
  return response.data;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
