import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated, getCurrentUser, logoutUser } from "../api/auth";

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);

      if (authenticated) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // Login handler - updates context after successful login
  const login = (userData, token) => {
    setUser(userData);
    setIsAuth(true);
    // Use window.location for navigation if navigate function is not provided
    if (navigate) {
      navigate('/admin');
    } else {
      window.location.href = '/admin';
    }
  };

  // Logout handler
  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuth(false);
    // Use window.location for navigation if navigate function is not provided
    if (navigate) {
      navigate('/login');
    } else {
      window.location.href = '/login';
    }
  };

  // Context value
  const value = {
    user,
    isAuth,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
