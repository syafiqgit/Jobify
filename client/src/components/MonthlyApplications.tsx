import { MonthlyApplications } from "@/lib/types/stats.type";
import AreaChartComponent from "./AreaChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import BarChartComponent from "./BarChart";

interface Props {
  data: MonthlyApplications[];
}

export default function MonthlyApplications(props: Props) {
  const { data } = props;
  return (
    <Tabs defaultValue="areaChart">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="areaChart">Area chart</TabsTrigger>
        <TabsTrigger value="barChart">Bar chart</TabsTrigger>
      </TabsList>
      <TabsContent value="areaChart">
        <AreaChartComponent monthly_applications={data} />
      </TabsContent>
      <TabsContent value="barChart">
        <BarChartComponent monthly_applications={data} />
      </TabsContent>
    </Tabs>
  );
}
