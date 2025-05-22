import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProfile = async () => {
  const response = await axios.get(`http://localhost:9999/auth/user`);
  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
