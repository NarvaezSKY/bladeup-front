import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import IndexPage from "@/pages/index";
import { Login } from "./app/auth/login";
import { Register } from "./app/auth/register";
import AboutPage from "@/pages/about";
import ClientRouter from "./app/client/home/router/ClientRouter";
import BarberRouter from "./app/barber/home/router/ClientRouter";
import { useAuthStore } from "@/app/shared/store/AuthStore";
import ProtectedRoute from "./ProtectedRoute"; 

function App() {
  const { verify, userId } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await verify();
      } catch (error) {
        console.error("Error verifying user:", error);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [verify]);

  if (loading) return <div>Cargando...</div>;

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<AboutPage />} path="/about" />

      <Route
        path="/home/client/*"
        element={
          <ProtectedRoute isAuthenticated={!!userId}>
            <ClientRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/barber/*"
        element={
          <ProtectedRoute isAuthenticated={!!userId}>
            <BarberRouter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
