"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type ChartDataPoint = {
  month: string;
  value: number;
  [key: string]: any;
};

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ValuationTrendsChart({ chartData: rawData }: { chartData: string }) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (rawData) {
      try {
        const parsedData = JSON.parse(rawData);
        if (Array.isArray(parsedData)) {
          setData(parsedData);
        } else {
            throw new Error("Data is not an array");
        }
      } catch (e) {
        console.error("Failed to parse chart data:", e);
        setError("Could not display chart. The data format is invalid.");
      }
    }
  }, [rawData]);

  if (error) {
    return <div className="text-destructive text-sm">{error}</div>;
  }
  
  if (data.length === 0) {
    return <div className="text-muted-foreground text-sm">No chart data available.</div>;
  }

  const dataKey = Object.keys(data[0]).find(k => k.toLowerCase().includes('value')) || 'value';
  const labelKey = Object.keys(data[0]).find(k => !k.toLowerCase().includes('value')) || 'month';

  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={labelKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : value}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) =>
            `$${(value as number / 1000).toFixed(0)}k`
          }
        />
        <Tooltip
          cursor={true}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelKey={dataKey}
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
        <defs>
          <linearGradient id="fillValueAI" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-value)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-value)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey={dataKey}
          type="natural"
          fill="url(#fillValueAI)"
          stroke="var(--color-value)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
