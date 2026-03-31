"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type: "warning" | "danger" | "info";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const typeStyles = {
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  danger: "bg-red-50 text-red-800 border-red-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

const typeEmoji = {
  warning: "\u26A0",
  danger: "\uD83D\uDD34",
  info: "\u2139",
};

export function AlertBanner({ type, message, action }: AlertBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full rounded-lg border px-4 py-3 text-sm",
        typeStyles[type]
      )}
    >
      <span>
        {typeEmoji[type]} {message}
      </span>
      {action && (
        <Button size="sm" variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
