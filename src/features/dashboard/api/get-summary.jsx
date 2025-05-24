import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/env";

const fetchMutationSummary = async () => {
  const response = await axios.get(`${API_URL}/mutations/summary`);
  return response.data;
};

export const useMutationSummary = () => {
  return useQuery({
    queryKey: ["mutationSummary"],
    queryFn: fetchMutationSummary,
    staleTime: 5 * 60 * 1000,
  });
};
