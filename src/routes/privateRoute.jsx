import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const user = localStorage.getItem("token");

  return user !== null ? children : <Navigate to="/" />;
}
export function PrivateRouteUser({ children }) {
  const user = localStorage.getItem("token");
  const status = localStorage.getItem("status");

  return user !== null && status === "0" ? children : <Navigate to="/" />;
}
