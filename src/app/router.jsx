// filepath: f:\web\mosque-donation\src\app\router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "../components/error/ErrorPage";
import NotFoundPage from "../components/error/NotFoundPage";
import DashboardLayout from "@/components/layouts/dashboard_layout";

const LandingLayout = lazy(
  () => import("../components/layouts/landing_layout")
);

export const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
