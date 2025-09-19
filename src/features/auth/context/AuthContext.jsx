import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { isAuthenticated, getCurrentUser, logoutUser } from "../api/auth.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

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

  const login = (userData, token) => {
    setUser(userData);
    setIsAuth(true);
    if (navigate) {
      navigate("/admin");
    } else {
      window.location.href = "/admin";
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuth(false);
    if (navigate) {
      navigate("/login");
    } else {
      window.location.href = "/login";
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuth,
      loading,
      login,
      logout,
    }),
    [user, isAuth, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
