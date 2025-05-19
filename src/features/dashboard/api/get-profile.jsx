import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProfile = async () => {
  const response = await axios.get("http://localhost:9999/auth/user");
  console.log("response", response);
  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    refetchOnWindowFocus: false,
  });
};
