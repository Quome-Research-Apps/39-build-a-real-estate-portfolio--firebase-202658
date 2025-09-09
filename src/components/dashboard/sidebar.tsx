import Link from "next/link";
import { Home, Building, FileText, TrendingUp, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "../logo";

const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/trends", icon: TrendingUp, label: "AI Trends" },
    { href: "/dashboard/add-property", icon: Building, label: "Add Property" },
    { href: "/dashboard/documents", icon: FileText, label: "Documents" },
];

export function DashboardSidebar() {
  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="p-2" />
            <span className="font-headline text-xl">PropTrackr</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
        </div>
      </div>
    </div>
  );
}
