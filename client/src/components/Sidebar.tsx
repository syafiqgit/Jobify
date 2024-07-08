import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navlinks from "./Navlinks";
import { User } from "@/lib/types/user.type";

interface Props {
  user: User;
}

export default function Sidebar(props: Props) {
  const { user } = props;
  return (
    <div className="flex border-r z-50 sticky left-0 top-0">
      <div className="flex flex-col w-56 bg-white dark:bg-black overflow-hidden">
        <div className="flex flex-col gap-2 items-center justify-center shadow-md border-b p-4">
          <Avatar>
            <AvatarImage src={user?.avatar} alt={user?.avatar} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
        </div>
        <Navlinks />
      </div>
    </div>
  );
}
