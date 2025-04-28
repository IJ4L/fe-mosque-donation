// filepath: f:\web\mosque-donation\src\app\router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../components/error/ErrorPage";
import NotFoundPage from "../components/error/NotFoundPage";
import DashboardLayout from "@/components/layouts/dashboard_layout";

// Use a more HMR-friendly way of lazy loading components
const LandingLayout = lazy(
  () => import("../components/layouts/landing_layout")
);

// Create router configuration with consistent patterns
export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/",
    element: <LandingLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
