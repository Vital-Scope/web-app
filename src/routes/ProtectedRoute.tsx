import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return true; // или useAuth().isLoggedIn
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
