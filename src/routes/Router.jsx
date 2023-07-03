import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
