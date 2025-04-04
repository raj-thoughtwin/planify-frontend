import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  // Redirect logged-in users away from login/register
  if (token && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/dashboard" replace />;
  }

  // Protect other routes
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
