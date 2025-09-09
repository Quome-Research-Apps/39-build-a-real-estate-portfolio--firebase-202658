"use client";

import { Pie, PieChart, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { property: "123 Maple St", equity: 275000, fill: "var(--color-maple)" },
  { property: "456 Oak Ave", equity: 175000, fill: "var(--color-oak)" },
];

const chartConfig = {
  equity: {
    label: "Equity",
  },
  maple: {
    label: "123 Maple St",
    color: "hsl(var(--chart-1))",
  },
  oak: {
    label: "456 Oak Ave",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function EquityBreakdownChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <Tooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(value as number)
              }
            />
          }
        />
        <Pie
          data={chartData}
          dataKey="equity"
          nameKey="property"
          innerRadius={60}
          strokeWidth={5}
        />
      </PieChart>
    </ChartContainer>
  );
}
