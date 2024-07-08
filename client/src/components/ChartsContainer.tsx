import { MonthlyApplications } from "@/lib/types/stats.type";
import BarChartComponent from "./BarChart";

interface Props {
  monthly_applications: MonthlyApplications;
}

export default function ChartsContainer(props: Props) {
  const { monthly_applications } = props;
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <p>Monthly Applications</p>
      <BarChartComponent monthly_applications={monthly_applications} />
    </div>
  );
}
