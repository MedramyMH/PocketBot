import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "primary";
}

export default function StatCard({ title, value, subtitle, icon: Icon, variant = "default" }: StatCardProps) {
  const variantStyles = {
    default: "border-border",
    success: "border-success/30",
    warning: "border-warning/30",
    primary: "border-primary/30",
  };

  const iconBgStyles = {
    default: "bg-muted",
    success: "bg-success/10",
    warning: "bg-warning/10",
    primary: "bg-primary/10",
  };

  const iconStyles = {
    default: "text-muted-foreground",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary",
  };

  return (
    <Card className={`${variantStyles[variant]} backdrop-blur-sm`} data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
            <h3 className="text-2xl font-bold font-mono tracking-tight mb-1" data-testid={`text-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              {value}
            </h3>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBgStyles[variant]}`}>
            <Icon className={`h-5 w-5 ${iconStyles[variant]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
