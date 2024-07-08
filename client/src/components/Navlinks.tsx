import { BarChart, PlusCircle, Table, User, UserCog } from "lucide-react";
import {
  Link,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import ChangeTheme from "./ChangeTheme";
import { useQuery } from "@tanstack/react-query";
import { userQuery } from "@/lib/loaders/user.loader";
import Logout from "./Logout";

export default function Navlinks() {
  const user = useQuery(userQuery).data;
  const { pathname } = useLocation();
  const authProtected = ["/", "/register"];
  const links = [
    {
      name: "All jobs",
      icon: <Table />,
      href: "/home",
    },
    {
      name: "Create jobs",
      icon: <PlusCircle />,
      href: "/home/create-job",
    },
    {
      name: "Stats",
      icon: <BarChart />,
      href: "/home/stats",
    },
    {
      name: "Profile",
      icon: <User />,
      href: "/home/profile",
    },
  ];
  return (
    <ul className="flex flex-col mt-4">
      <ChangeTheme />
      {links.map((link) => {
        if (pathname === "/home/admin" && user?.role !== "Admin") return;
        if (authProtected.includes(pathname)) {
          if (user?._id) return <Navigate to={"/home"} />;
        }
        return (
          <Link to={link.href} key={link.name}>
            <NavLink to={link.href} key={link.name}>
              <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black dark:text-white">
                <span className="inline-flex items-center justify-center h-16 w-16 text-black dark:text-white">
                  {link.icon}
                </span>
                <span className="font-medium">{link.name}</span>
              </p>
            </NavLink>
          </Link>
        );
      })}
      {user?.role === "Admin" && (
        <NavLink to={"/home/admin"}>
          <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black dark:text-white">
            <span className="inline-flex items-center justify-center h-16 w-16 text-lg text-black dark:text-white">
              <UserCog />
            </span>
            <span className="text-lg font-medium">Admin</span>
          </p>
        </NavLink>
      )}
      <Logout />
    </ul>
  );
}
