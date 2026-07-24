import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,

    style: {
      background: "#ffffff",
      color: "#0f172a",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "14px 16px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow:
        "0 12px 35px rgba(15,23,42,.12)",
    },

    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#ffffff",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>
    </BrowserRouter>
  </AuthProvider>
);