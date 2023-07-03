import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import DashboardRoulette from "../views/DashboardRoulette";
import DashboardUsers from "../views/DashboardUsers";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/roleta" element={<DashboardRoulette />} />
        <Route path="/dashboard/usuarios" element={<DashboardUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
