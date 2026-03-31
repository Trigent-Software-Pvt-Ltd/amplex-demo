import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: string;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "neutral";
  pulse?: boolean;
}

const autoVariantMap: Record<string, StatusPillProps["variant"]> = {
  "on-track": "success",
  "on-time": "success",
  healthy: "success",
  shipped: "success",
  completed: "success",
  sellable: "success",
  restocked: "success",
  received: "success",
  "at-risk": "warning",
  "back-order": "warning",
  low: "warning",
  late: "warning",
  pending: "warning",
  critical: "danger",
  cancelled: "danger",
  damaged: "danger",
  defective: "danger",
  destroyed: "danger",
  "in-progress": "info",
  picking: "info",
  queued: "info",
  allocated: "info",
  "in-transit": "info",
};

const variantStyles: Record<string, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  neutral: "bg-gray-50 text-gray-700 border-gray-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
};

const pulseColors: Record<string, string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-gray-500",
  default: "bg-gray-500",
};

export function StatusPill({ status, variant, pulse }: StatusPillProps) {
  const resolved =
    variant ?? autoVariantMap[status.toLowerCase()] ?? "neutral";

  const displayText = status.replace(/-/g, " ");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        variantStyles[resolved]
      )}
    >
      {pulse && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            pulseColors[resolved]
          )}
        />
      )}
      {displayText}
    </span>
  );
}
