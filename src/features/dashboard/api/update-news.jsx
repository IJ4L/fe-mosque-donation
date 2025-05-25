import { API_URL } from "@/config/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      try {
        for (let pair of formData.entries()) {
          if (pair[1] instanceof File) {
            // File content in formData
          } else {
          }
        }

        const response = await axios.patch(`${API_URL}/news/${id}`, formData, {
          headers: {},
          transformRequest: [(data) => data],
        });

        return response.data;
      } catch (error) {
        if (error.response) {
        }
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", variables.id] });
    },
  });
}
