import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "primary" | "success" | "purple" | "orange" | "teal";
}

const variantConfig = {
  primary: {
    gradient: "gradient-primary",
    bgLight: "bg-primary/5",
    text: "text-primary",
  },
  success: {
    gradient: "gradient-success",
    bgLight: "bg-success/5",
    text: "text-success",
  },
  purple: {
    gradient: "gradient-purple",
    bgLight: "bg-medical-purple/5",
    text: "text-medical-purple",
  },
  orange: {
    gradient: "gradient-orange",
    bgLight: "bg-medical-orange/5",
    text: "text-medical-orange",
  },
  teal: {
    gradient: "gradient-teal",
    bgLight: "bg-medical-teal/5",
    text: "text-medical-teal",
  },
};

export function DashboardStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "primary",
}: DashboardStatsCardProps) {
  const config = variantConfig[variant];

  return (
    <div className="card-stats p-6 animate-slide-in">
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 mt-3">
              <div className={cn(
                "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
                trend.positive 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              )}>
                {trend.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {trend.positive ? "+" : ""}{trend.value}
              </div>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center",
          config.gradient
        )} style={{ boxShadow: 'var(--shadow-md)' }}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}