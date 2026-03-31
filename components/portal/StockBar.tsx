import { cn } from "@/lib/utils";

interface StockBarProps {
  current: number;
  max: number;
  reorderPoint?: number;
}

export function StockBar({ current, max, reorderPoint }: StockBarProps) {
  const percentage = max > 0 ? Math.round((current / max) * 100) : 0;
  const clampedPct = Math.min(100, Math.max(0, percentage));

  const barColor =
    percentage > 50
      ? "bg-green-500"
      : percentage >= 20
        ? "bg-amber-500"
        : "bg-red-500";

  const belowReorder =
    reorderPoint !== undefined && current < reorderPoint;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", barColor)}
          style={{ width: `${clampedPct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground w-10 text-right">
        {percentage}%
      </span>
      {belowReorder && (
        <span className="text-xs font-medium text-amber-600">
          Below Reorder
        </span>
      )}
    </div>
  );
}
