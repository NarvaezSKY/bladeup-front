import { Routes, Route } from "react-router-dom";
import { Client } from "../index";

const ClientRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Client />} />
    </Routes>
  );
};

export default ClientRouter;
