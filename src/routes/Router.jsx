import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import DashboardRoulette from "../views/DashboardRoulette";
import DashboardUsers from "../views/DashboardUsers";

import { PrivateRoute, PrivateRouteUser } from "./privateRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/dashboard/roleta"
          element={
            <PrivateRoute>
              <DashboardRoulette />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/usuarios"
          element={
            <PrivateRouteUser>
              <DashboardUsers />
            </PrivateRouteUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
