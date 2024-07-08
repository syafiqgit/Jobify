import StatsCard from "@/components/StatsCard";
import { Card, CardTitle } from "@/components/ui/card";
import { adminQuery } from "@/lib/loaders/admin.loader";
import { StatsCardType } from "@/lib/types/stats.type";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, User } from "lucide-react";
import MonthlyApplications from "@/components/MonthlyApplications";

export default function Admin() {
  const { data } = useQuery(adminQuery);
  const stats: StatsCardType[] = [
    {
      title: "Users",
      count: data?.users || 0,
      icon: <User className="text-blue-500 w-12 h-12 mb-3 inline-block" />,
    },
    {
      title: "Jobs",
      count: data?.jobs || 0,
      icon: (
        <BriefcaseBusiness className="text-red-500 w-12 h-12 mb-3 inline-block" />
      ),
    },
  ];

  return (
    <div className="px-4 pb-4">
      <div className="flex justify-center flex-wrap -m-4 text-center p-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      <Card className="p-4">
        <CardTitle className="text-center pb-4">Monthly applications</CardTitle>
        <MonthlyApplications data={data!.monthly_applications_jobs} />
      </Card>
    </div>
  );
}
