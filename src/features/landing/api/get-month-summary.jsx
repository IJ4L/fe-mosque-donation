import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/config/env";

/**
 * Custom hook to fetch monthly financial summary data
 * @param {string} month - Month in format YYYY-MM (e.g. 2025-05)
 * @returns {Object} Query result containing data, loading state, and error
 */
export const useMonthSummary = (month) => {
  return useQuery({
    queryKey: ["monthSummary", month],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/mutations/summary?month=${month}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
