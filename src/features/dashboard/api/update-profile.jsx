import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";

export const updateProfile = async ({ userId, username, phoneNumber }) => {
  const response = await axios.put(
    `http://localhost:9999/auth/user/${userId}`,
    {
      username,
      phoneNumber,
    }
  );
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
