import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface LineChartCardProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  showGrid?: boolean;
}

export function LineChartCard({ title, data, dataKey, showGrid = true }: LineChartCardProps) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#eee" />}
            <XAxis
              dataKey="name"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#1B5E20"
              strokeWidth={2}
              dot={{ fill: "#1B5E20" }}
              activeDot={{ r: 6, fill: "#4CAF50" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}