import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
export const Auth = () => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export const CheckAuth = () => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to={"/dashboard"} />;
  }
  return <Outlet />;
};