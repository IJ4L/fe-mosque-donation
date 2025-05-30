// filepath: f:\web\mosque-donation\src\app\router.jsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../components/error/ErrorPage";
import NotFoundPage from "../components/error/NotFoundPage";
import DashboardLayout from "@/components/layouts/dashboard_layout";
import Login from "@/features/auth/components/login";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

// Use a more HMR-friendly way of lazy loading components
const LandingLayout = lazy(
  () => import("../components/layouts/landing_layout")
);

// Root layout with AuthProvider
const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Create routes array for easier configuration
const routes = [
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <LandingLayout />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

// Create router with routes
export const router = createBrowserRouter(routes);
