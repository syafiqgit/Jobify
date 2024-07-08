import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  name: string;
  isLoading: boolean;
}

export default function AuthSubmit(props: Props) {
  const { name, isLoading } = props;
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-black dark:text-white">
        {pathname === "/"
          ? "Don't have an account ? "
          : "already have an account ? "}
        <Link className="underline" to={pathname === "/" ? "/register" : "/"}>
          {pathname === "/" ? "Please register" : "Please login"}
        </Link>
      </p>
      <Button
        type="submit"
        variant={"outline"}
        disabled={isLoading}
        className="text-black dark:text-white"
      >
        {isLoading ? <ReloadIcon className="animate-spin" /> : <>{name}</>}
      </Button>
    </div>
  );
}
