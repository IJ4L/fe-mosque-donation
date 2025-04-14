// filepath: f:\web\mosque-donation\src\app\router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorPage from "../components/error/ErrorPage";
import NotFoundPage from "../components/error/NotFoundPage";

const LandingLayout = lazy(
  () => import("../components/layouts/landing_layout")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
