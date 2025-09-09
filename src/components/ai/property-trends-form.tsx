"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  getPropertyValuationTrends,
  type GetPropertyValuationTrendsOutput,
} from "@/ai/flows/property-valuation-trends";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValuationTrendsChart } from "./valuation-trends-chart";

const formSchema = z.object({
  location: z.string().min(1, { message: "Location is required." }),
  propertyCharacteristics: z
    .string()
    .min(1, { message: "Property characteristics are required." }),
});

export function PropertyTrendsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<GetPropertyValuationTrendsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "Austin, TX",
      propertyCharacteristics: "3 bedroom, 2 bathroom, 1800 sqft, built in 2010",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const trendResult = await getPropertyValuationTrends(values);
      setResult(trendResult);
    } catch (e) {
      setError("An error occurred while generating the trend report.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="propertyCharacteristics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Characteristics</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 4 beds, 3 baths, 2500 sqft, modern design"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Report
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4">Generating analysis...</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Valuation Trends</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-foreground">
              <p>{result.valuationTrends}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Neighborhood Valuation Trends Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ValuationTrendsChart chartData={result.interactiveChartData} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
