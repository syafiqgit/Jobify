import { MonthlyApplications } from "@/lib/types/stats.type";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  monthly_applications: MonthlyApplications[];
}

export default function AreaChartComponent(props: Props) {
  const { monthly_applications } = props;
  return (
    <ResponsiveContainer width={1000} height={300}>
      <AreaChart data={monthly_applications} margin={{ top: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
