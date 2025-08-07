import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // или useAuth().isLoggedIn
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
