import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { Login } from "./app/auth/login";
import { Register } from "./app/auth/register";
import AboutPage from "@/pages/about";
import ClientRouter from "./app/client/home/router/ClientRouter";
import BarberRouter from "./app/barber/home/home/router/ClientRouter";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<AboutPage />} path="/about" />

      <Route element={<ClientRouter />} path="/home/client/*" /> 
      <Route element={<BarberRouter />} path="/home/barber/*" />

    </Routes>
  );
}

export default App;
