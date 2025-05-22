import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: "inherit",
          borderRadius: "0.5rem",
        },
        className: "toast-custom",
        success: {
          style: {
            background: "#dcfce7",
            color: "#166534",
            border: "1px solid #86efac",
          },
        },
        error: {
          style: {
            background: "#fee2e2",
            color: "#991b1b",
            border: "1px solid #fca5a5",
          },
        },
        loading: {
          style: {
            background: "#e0f2fe",
            color: "#075985",
            border: "1px solid #7dd3fc",
          },
        },
      }}
    />
  );
}
