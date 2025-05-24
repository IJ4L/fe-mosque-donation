import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../config/env";

const fetchProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/user`);
  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};
