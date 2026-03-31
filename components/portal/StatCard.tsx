import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  sub?: string;
  subType?: "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
}

const subTypeStyles: Record<string, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const iconColorStyles: Record<string, string> = {
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
  info: "text-blue-600",
};

export function StatCard({ value, label, sub, subType = "info", icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="relative">
        {icon && (
          <div className={cn("absolute top-0 right-0", iconColorStyles[subType])}>
            {icon}
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
