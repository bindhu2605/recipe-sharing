import { Outlet, Navigate } from "react-router-dom";

const PrivateComponent = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateComponent;