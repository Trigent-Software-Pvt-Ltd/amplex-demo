"use client";

import { useState, useRef } from "react";
import { Sparkles, Minus, Plus, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StatusPill } from "@/components/portal/StatusPill";
import { DataTable } from "@/components/portal/DataTable";
import { INVENTORY, PREVIOUS_ORDERS } from "@/lib/mockData";
import { toast } from "sonner";

function getLastOrder(sku: string) {
  return PREVIOUS_ORDERS.find((o) => o.sku === sku);
}

const orderColumns: {
  key: string;
  header: string;
  mono?: boolean;
  render?: (item: Record<string, unknown>) => React.ReactNode;
}[] = [
  { key: "id", header: "Order #", mono: true },
  { key: "date", header: "Date" },
  { key: "sku", header: "SKU", mono: true },
  { key: "skuName", header: "Product" },
  { key: "qty", header: "Qty" },
  { key: "total", header: "Total", mono: true },
  {
    key: "_action",
    header: "",
    render: () => null, // Placeholder — rendered in the wrapper below
  },
];

function ReorderCard({
  item,
  topRef,
  qty,
  setQty,
}: {
  item: (typeof INVENTORY)[number];
  topRef: React.RefObject<HTMLDivElement | null>;
  qty: number;
  setQty: (qty: number) => void;
}) {
  const lastOrder = getLastOrder(item.sku);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="font-code bg-muted rounded px-2 py-0.5 text-xs">
            {item.sku}
          </span>
          <StatusPill status={item.status} />
        </div>
        <CardTitle className="text-lg font-semibold mt-2">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          Available:{" "}
          <span className="font-code font-medium">
            {item.available.toLocaleString()}
          </span>
        </div>
        {lastOrder && (
          <div className="text-xs text-muted-foreground">
            Last order: {lastOrder.date} &middot; {lastOrder.qty} units
          </div>
        )}

        {/* Quantity control */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="size-10"
            onClick={() => setQty(Math.max(120, qty - 120))}
          >
            <Minus className="size-4" />
          </Button>
          <span className="font-code text-xl w-20 text-center">{qty}</span>
          <Button
            variant="outline"
            size="icon"
            className="size-10"
            onClick={() => setQty(qty + 120)}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        {lastOrder && (
          <div className="font-code text-sm text-muted-foreground">
            Last order price: {lastOrder.total}
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() =>
              toast.success("Added to basket")
            }
          >
            Add to Basket
          </Button>

          <AlertDialog>
            <AlertDialogTrigger className="flex-1 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[#1652CC] text-white hover:bg-[#1652CC]/90 cursor-pointer">
              Order Now
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Reorder</AlertDialogTitle>
                <AlertDialogDescription>
                  {qty} units of {item.sku} ({item.name})?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                  onClick={() =>
                    toast.success(
                      "✓ ORD-2026-2250 placed — Amplex operations processing"
                    )
                  }
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReorderPage() {
  const topRef = useRef<HTMLDivElement>(null);

  // Lifted quantity state keyed by SKU — initialized from last order or default
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const item of INVENTORY) {
      const lastOrder = getLastOrder(item.sku);
      init[item.sku] = lastOrder?.qty ?? 120;
    }
    return init;
  });

  const previousOrderColumns: {
    key: string;
    header: string;
    mono?: boolean;
    render?: (item: Record<string, unknown>) => React.ReactNode;
  }[] = [
    { key: "id", header: "Order #", mono: true },
    { key: "date", header: "Date" },
    { key: "sku", header: "SKU", mono: true },
    { key: "skuName", header: "Product" },
    { key: "qty", header: "Qty" },
    { key: "total", header: "Total", mono: true },
    {
      key: "_action",
      header: "",
      render: (item: Record<string, unknown>) => (
        <Button
          size="sm"
          variant="outline"
          className="text-[#1652CC] border-[#1652CC]"
          onClick={() => {
            const sku = item.sku as string;
            const qty = item.qty as number;
            setQuantities((prev) => ({ ...prev, [sku]: qty }));
            toast.success("Reorder details pre-filled above");
            topRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <RefreshCw className="size-3.5 mr-1.5" /> Repeat Order
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Title */}
      <div ref={topRef}>
        <h1 className="text-xl font-bold">Quick Reorder</h1>
        <p className="text-sm text-muted-foreground">
          Repeat from previous orders
        </p>
      </div>

      {/* AI Tip Banner */}
      <div className="bg-blue-50 border border-blue-200 border-l-4 border-l-[#0891B2] rounded-lg px-3 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[#0891B2] shrink-0" />
          <p className="text-xs">
            <strong>AI Insight:</strong> SGM-ACC-KIT is at critical low stock (660 units). Current velocity suggests 1.9 weeks remaining. Recommend placing a replenishment order before the QC hold resolves.
          </p>
        </div>
      </div>

      {/* Reorder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {INVENTORY.map((item) => (
          <ReorderCard
            key={item.sku}
            item={item}
            topRef={topRef}
            qty={quantities[item.sku] ?? 120}
            setQty={(q) => setQuantities((prev) => ({ ...prev, [item.sku]: q }))}
          />
        ))}
      </div>

      {/* Previous Orders Table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Previous Orders</h2>
        <Card>
          <CardContent>
            <DataTable
              columns={previousOrderColumns}
              data={
                PREVIOUS_ORDERS as unknown as Record<string, unknown>[]
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
