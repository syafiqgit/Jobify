import { CalendarCheck, Clock, Code, NotepadText, X } from "lucide-react";
import { statsQuery } from "@/lib/loaders/stats.loader";
import { useQuery } from "@tanstack/react-query";
import { Card, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import MonthlyApplications from "@/components/MonthlyApplications";

export default function Stats() {
  const { data } = useQuery(statsQuery);

  const stats = [
    {
      title: "Pending applications",
      count: data?.status_applications.pending || 0,
      icon: <Clock className="text-yellow-500 w-12 h-12 mb-3 inline-block" />,
    },
    {
      title: "Interview HR",
      count: data?.status_applications.interview_hr || 0,
      icon: (
        <CalendarCheck className="text-blue-500 w-12 h-12 mb-3 inline-block" />
      ),
    },
    {
      title: "Interview user",
      count: data?.status_applications.interview_user || 0,
      icon: (
        <CalendarCheck className="text-blue-500 w-12 h-12 mb-3 inline-block" />
      ),
    },
    {
      title: "Technical test",
      count: data?.status_applications.technical_test || 0,
      icon: <Code className="text-gray-500 w-12 h-12 mb-3 inline-block" />
    },
    {
      title: "Recieve job offer letter",
      count: data?.status_applications.recieve_job_offer_letter || 0,
      icon: <NotepadText className="text-sky-500 w-12 h-12 mb-3 inline-block" />
    },
    {
      title: "Rejected job offer letter",
      count: data?.status_applications.rejected_offer_letter || 0,
      icon: <NotepadText className="text-red-500 w-12 h-12 mb-3 inline-block" />
    },
    {
      title: "Rejected interview HR",
      count: data?.status_applications.rejected_interview_hr || 0,
      icon: <CalendarCheck className="text-red-500 w-12 h-12 mb-3 inline-block" />
    },
    {
      title: "Rejected Technical test",
      count: data?.status_applications.rejected_technical_test || 0,
      icon: <Code className="text-red-500 w-12 h-12 mb-3 inline-block" />
    },
    {
      title: "Accept job offer letter",
      count: data?.status_applications.accept_job_offer_letter || 0,
      icon: <NotepadText className="text-red-500 w-12 h-12 mb-3 inline-block" />
    },
    {
      title: "Jobs declined",
      count: data?.status_applications.declined || 0,
      icon: <X className="text-red-500 w-12 h-12 mb-3 inline-block" />,
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
        <MonthlyApplications data={data!.monthly_applications} />
      </Card>
    </div>
  );
}
