"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, RotateCcw, FileText } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  type: "reorder" | "return" | "report";
  onConfirm?: () => void;
  onCancel?: () => void;
  onView?: () => void;
}

const typeIcons = {
  reorder: Package,
  return: RotateCcw,
  report: FileText,
};

export function ActionCard({
  title,
  description,
  type,
  onConfirm,
  onCancel,
  onView,
}: ActionCardProps) {
  const Icon = typeIcons[type];

  return (
    <Card className="border">
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-ampblue/10 p-2 text-ampblue">
            <Icon className="size-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold">{title}</div>
            <div className="text-sm text-muted-foreground">{description}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onConfirm && (
            <Button
              size="sm"
              className="bg-ampblue text-white hover:bg-ampblue/90"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          )}
          {onCancel && (
            <Button size="sm" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onView && (
            <Button size="sm" variant="ghost" onClick={onView}>
              View
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
