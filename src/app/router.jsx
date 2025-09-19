// filepath: f:\web\mosque-donation\src\app\router.jsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../components/error/ErrorPage";
import NotFoundPage from "../components/error/NotFoundPage";
import DashboardLayout from "@/components/layouts/dashboard_layout";
import Login from "@/features/auth/components/login";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

const LandingLayout = lazy(
  () => import("../components/layouts/landing_layout")
);

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

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

export const router = createBrowserRouter(routes);
