import { useMutation } from "@tanstack/react-query";

// Login function - simulated API call
const loginUser = async ({ email, password }) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple validation
    if (!email || !password) {
      throw new Error("Email dan password wajib diisi");
    }
    
    // Mock authentication - in real implementation, this would call a backend API
    if (email === "admin@mosque.com" && password === "admin123") {
      // Create mock token and user data
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcwMDAwMDAwMH0.mock-token";
      const userData = {
        id: 1,
        username: "Admin Masjid", 
        email: "admin@mosque.com",
        phoneNumber: "081234567890",
        role: "admin"
      };
      
      // Store in localStorage
      localStorage.setItem("mosque_token", token);
      localStorage.setItem("mosque_user", JSON.stringify(userData));
      
      return { success: true, user: userData, token };
    } else {
      throw new Error("Email atau password salah");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Custom hook for login
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.error("Login failed:", error);
    }
  });
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("mosque_token");
  
  if (!token) {
    return false;
  }
  
  // In a real app, we would verify the token hasn't expired
  // For simplicity, we just check if it exists
  return true;
};

// Function to get current user data
export const getCurrentUser = () => {
  const userJSON = localStorage.getItem("mosque_user");
  
  if (!userJSON) {
    return null;
  }
  
  try {
    return JSON.parse(userJSON);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// Logout function
export const logoutUser = () => {
  localStorage.removeItem("mosque_token");
  localStorage.removeItem("mosque_user");
};
