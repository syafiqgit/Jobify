import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import customFetch from "@/lib/customFetch";
import { toast } from "./ui/use-toast";

export default function Logout() {
  const navigate = useNavigate();
  const logoutHandle = async () => {
    await customFetch.get("/auth/logout");
    toast({ title: "Logout successfull" });
    navigate("/");
  };
  return (
    <li onClick={logoutHandle}>
      <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black dark:text-white">
        <span className="inline-flex items-center justify-center h-16 w-16 text-black dark:text-white">
          <LogOut />
        </span>
        <span className="font-medium">Logout</span>
      </p>
    </li>
  );
}
