import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  sub?: string;
  subType?: "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
  iconColor?: "blue" | "green" | "amber" | "red" | "teal";
}

const subTypeStyles: Record<string, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const iconBgStyles: Record<string, string> = {
  blue: "bg-blue-500 text-white",
  green: "bg-emerald-500 text-white",
  amber: "bg-amber-500 text-white",
  red: "bg-red-500 text-white",
  teal: "bg-teal-500 text-white",
};

export function StatCard({ value, label, sub, subType = "info", icon, iconColor = "blue" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="relative">
        {icon && (
          <div className={cn("absolute top-0 right-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm", iconBgStyles[iconColor])}>
            <div className="h-6 w-6 [&>svg]:h-6 [&>svg]:w-6">
              {icon}
            </div>
          </div>
        )}
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
        {sub && (
          <Badge
            variant="outline"
            className={cn("mt-2", subTypeStyles[subType])}
          >
            {sub}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
