import { Routes, Route } from "react-router-dom";
import { Barber } from "../index";

const BarberRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Barber />} />
    </Routes>
  );
};

export default BarberRouter;
