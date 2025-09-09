import { PropertyTrendsForm } from "@/components/ai/property-trends-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TrendsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-headline text-3xl font-bold">
          Property Valuation Trends
        </h1>
        <p className="text-muted-foreground">
          Leverage AI to analyze valuation trends for a specific location and
          property type.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Trend Analysis</CardTitle>
          <CardDescription>
            Enter a location and describe the property to generate a trend report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyTrendsForm />
        </CardContent>
      </Card>
    </div>
  );
}
