import { ReactNode } from "react";
import { Card } from "./ui/card";

interface Props {
  title: string;
  count: number | string;
  icon: ReactNode;
}

export default function StatsCard(props: Props) {
  const { title, icon, count } = props;
  return (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <Card className="px-4 py-6">
        {icon}
        <h2 className="title-font font-medium text-3xl">{count}</h2>
        <p className="leading-relaxed">{title}</p>
      </Card>
    </div>
  );
}
