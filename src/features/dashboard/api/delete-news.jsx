import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(`http://localhost:9999/news/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate and refetch the news list
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}
