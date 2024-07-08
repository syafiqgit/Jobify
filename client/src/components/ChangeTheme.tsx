import { useTheme } from "@/lib/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black dark:text-white">
          <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black dark:text-white">
            <span className="inline-flex items-center justify-center h-16 w-16 text-black dark:text-white">
              {theme === "light" ? <Moon /> : <Sun />}
            </span>
            <span className="font-medium">Change theme</span>
          </p>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
