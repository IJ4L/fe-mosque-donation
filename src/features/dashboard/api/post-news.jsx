import { API_URL } from "@/config/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function usePostNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
        } else {
        }
      }
      const response = await axios.post(`${API_URL}/news`, formData, {
        headers: {},
        transformRequest: [(data) => data],
      });

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error) => {
      if (error.response) {
      }
    },
  });
}
