import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center rounded-lg bg-primary p-3", className)}>
      <Building2 className="h-8 w-8 text-primary-foreground" />
    </div>
  );
}
