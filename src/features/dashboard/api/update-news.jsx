import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useUpdateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }) => {
      try {
        // Ensure the formData object includes newsDescription and newsImage
        const response = await axios.patch(
          `http://localhost:9999/news/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            transformRequest: [(data) => data],
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", variables.id] });
    },
  });
}
