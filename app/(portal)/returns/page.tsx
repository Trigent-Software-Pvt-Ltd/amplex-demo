"use client";

import { useState } from "react";
import { RotateCcw, PackageCheck, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StatCard } from "@/components/portal/StatCard";
import { DataTable } from "@/components/portal/DataTable";
import { StatusPill } from "@/components/portal/StatusPill";
import { RETURNS, OPEN_ORDERS } from "@/lib/mockData";
import { toast } from "sonner";

const returnColumns: {
  key: string;
  header: string;
  mono?: boolean;
  render?: (item: Record<string, unknown>) => React.ReactNode;
}[] = [
  { key: "rmaNumber", header: "RMA #", mono: true },
  { key: "originalOrder", header: "Original Order", mono: true },
  { key: "sku", header: "SKU", mono: true },
  { key: "qty", header: "Qty" },
  { key: "returnDate", header: "Return Date" },
  { key: "reason", header: "Reason" },
  {
    key: "condition",
    header: "Condition",
    render: (item: Record<string, unknown>) => (
      <StatusPill status={item.condition as string} />
    ),
  },
  {
    key: "disposition",
    header: "Disposition",
    render: (item: Record<string, unknown>) => (
      <StatusPill status={item.disposition as string} />
    ),
  },
];

export default function ReturnsPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState("");
  const [condition, setCondition] = useState("");

  const selectedOrderData = OPEN_ORDERS.find((o) => o.id === selectedOrder);

  function resetForm() {
    setStep(1);
    setSelectedOrder("");
    setQty("");
    setReason("");
    setCondition("");
  }

  function handleCreate() {
    toast.success(
      "✓ RMA-2026-0090 created — Amplex operations notified"
    );
    setSheetOpen(false);
    resetForm();
  }

  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">Returns Management</h1>
          <p className="text-sm text-muted-foreground">
            RMA tracking and disposition
          </p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={(open) => { setSheetOpen(open); if (!open) resetForm(); }}>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[#1652CC] text-white hover:bg-[#1652CC]/90 cursor-pointer">
            <Plus className="size-4 mr-2" />
            Raise New Return
          </SheetTrigger>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {step === 1 && "Step 1: Select Order"}
                {step === 2 && "Step 2: Return Details"}
                {step === 3 && "Step 3: Confirm Return"}
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Order</Label>
                    <Select value={selectedOrder} onValueChange={(v) => setSelectedOrder(v ?? "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an order" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPEN_ORDERS.map((order) => (
                          <SelectItem key={order.id} value={order.id}>
                            {order.id} — {order.sku}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!selectedOrder && (
                      <p className="text-sm text-muted-foreground">Select an order to continue</p>
                    )}
                  </div>
                  <Button
                    className="w-full bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                    disabled={!selectedOrder}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reason</Label>
                    <Select value={reason} onValueChange={(v) => setReason(v ?? "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Overstock">Overstock</SelectItem>
                        <SelectItem value="Damaged">Damaged</SelectItem>
                        <SelectItem value="Order Error">Order Error</SelectItem>
                        <SelectItem value="Product Defect">Product Defect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Select value={condition} onValueChange={(v) => setCondition(v ?? "")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sellable">Sellable</SelectItem>
                        <SelectItem value="Damaged">Damaged</SelectItem>
                        <SelectItem value="Defective">Defective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                      disabled={!qty || !reason || !condition}
                      onClick={() => setStep(3)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order</span>
                        <span className="font-code font-medium">{selectedOrder}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SKU</span>
                        <span className="font-code font-medium">
                          {selectedOrderData?.sku}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product</span>
                        <span className="font-medium">
                          {selectedOrderData?.skuName}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-code font-medium">{qty}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reason</span>
                        <span className="font-medium">{reason}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Condition</span>
                        <span className="font-medium">{condition}</span>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                      onClick={handleCreate}
                    >
                      Create RMA
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          value="6"
          label="Returns MTD"
          icon={<RotateCcw className="size-5" />}
        />
        <StatCard
          value="4"
          label="Restocked"
          sub="Sellable condition"
          subType="success"
          icon={<PackageCheck className="size-5" />}
        />
        <StatCard
          value="2"
          label="Destroyed"
          sub="Damaged/Defective"
          subType="danger"
          icon={<Trash2 className="size-5" />}
        />
      </div>

      {/* RMA Log Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">RMA Log</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={returnColumns}
            data={RETURNS as unknown as Record<string, unknown>[]}
            iSeriesTable="RTNHDR + RTNDTL + INVADJ"
          />
        </CardContent>
      </Card>
    </div>
  );
}
