import { MonthlyApplications } from "@/lib/types/stats.type";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  monthly_applications: MonthlyApplications[];
}

export default function BarChartComponent(props: Props) {
  const { monthly_applications } = props;
  return (
    <ResponsiveContainer width={1000} height={300}>
      <BarChart data={monthly_applications} margin={{ top: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
}
