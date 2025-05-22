import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();
  const location = useLocation();
  
  // Show loading state (could be replaced with a loading spinner)
  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuth) {
    // Save the intended destination for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Render children when authenticated
  return children;
};
