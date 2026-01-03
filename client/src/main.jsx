import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "aos/dist/aos.css";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./context/AuthProvider";
import { router } from "./routes/router";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
