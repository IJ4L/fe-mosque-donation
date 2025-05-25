import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { queryClient } from "./lib/queryClient";
import { router } from "./app/router";
import { initWorker } from "./lib/workerUtils";
import { ToastProvider } from "./components/ui/toast-provider";
import { setupAuthInterceptor } from "./features/auth/api/auth.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/src/sw.js")
      .then((registration) => {
        // Registration successful
      })
      .catch((error) => {
        // Registration failed
      });
  });
}

initWorker();
setupAuthInterceptor();

let root;

if (!root) {
  root = createRoot(document.getElementById("root"));
}

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastProvider />
    </QueryClientProvider>
  </StrictMode>
);
