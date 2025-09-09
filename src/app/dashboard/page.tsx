import { StatCard } from "@/components/dashboard/stat-card";
import { PortfolioValueChart } from "@/components/dashboard/portfolio-value-chart";
import { EquityBreakdownChart } from "@/components/dashboard/equity-breakdown-chart";
import { DollarSign, Home, Landmark, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Portfolio Dashboard</h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your real estate investments.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Portfolio Value"
          value="$1,250,000"
          icon={<Home className="h-4 w-4 text-muted-foreground" />}
          change="+5.2% from last month"
        />
        <StatCard
          title="Net Equity"
          value="$450,000"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          change="+8.1% from last month"
        />
        <StatCard
          title="Outstanding Loan Balance"
          value="$800,000"
          icon={<Landmark className="h-4 w-4 text-muted-foreground" />}
          change="-1.2% from last month"
        />
        <StatCard
          title="Blended ROI"
          value="+12.5%"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Annualized return on investment"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Portfolio Value Over Time</CardTitle>
            <CardDescription>
              See how your portfolio value has grown.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PortfolioValueChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Equity Breakdown</CardTitle>
            <CardDescription>
              Distribution of net equity across your properties.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EquityBreakdownChart />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add a New Property</CardTitle>
            <CardDescription>
              Expand your portfolio by adding a new property and track its performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/add-property">
              <Button>Add Property</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Analyze Market Trends</CardTitle>
            <CardDescription>
              Use our AI tool to get valuation trends for any property.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/trends">
              <Button>Analyze Trends</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
