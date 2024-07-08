import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "./lib/loaders/user.loader";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const { pathname } = useLocation();
  const { data: user } = useQuery(userQuery);
  const token = Cookies.get("token");

  const authProtected = ["/", "/register"];
  const protectedByToken = ["/home", "/home/profile", "/home/stats"];
  const adminProtected = ["/home/admin"];

  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to="/home" />;
  }

  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/" />;
  }

  if (adminProtected.includes(pathname)) {
    if (user?.role !== "Admin") return <Navigate to="/home" />;
  }
  return <Outlet />;
}
