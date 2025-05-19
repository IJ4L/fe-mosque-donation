import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchMutationSummary = async () => {
  const response = await axios.get("http://localhost:9999/mutations/summary");
  return response.data;
};

export const useMutationSummary = () => {
  return useQuery({
    queryKey: ["mutationSummary"],
    queryFn: fetchMutationSummary,
    staleTime: 5 * 60 * 1000,
  });
};
