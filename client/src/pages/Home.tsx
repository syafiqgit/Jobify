import Sidebar from "@/components/Sidebar";
import { userQuery } from "@/lib/loaders/user.loader";
import { User } from "@/lib/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

export default function Home() {
  const { data } = useQuery<User>(userQuery);
  return (
    <div className="w-full h-screen flex overflow-auto font-poppins dark:bg-black">
      <Sidebar user={data!} />
      <div className="w-full dark:bg-black">
        <Outlet context={data!} />
      </div>
    </div>
  );
}
