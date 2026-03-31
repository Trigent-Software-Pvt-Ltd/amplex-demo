"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { ISeriesTag } from "@/components/portal/ISeriesTag";
import { DataTable } from "@/components/portal/DataTable";
import { StatusPill } from "@/components/portal/StatusPill";
import { AlertBanner } from "@/components/portal/AlertBanner";
import {
  OPEN_ORDERS,
  BACK_ORDERS,
  SHIPPED_ORDERS,
  CANCELLED_ORDERS,
  ORDER_CHANGES as INITIAL_ORDER_CHANGES,
} from "@/lib/mockData";
import type { Order, OrderChange } from "@/lib/types";
import { toast } from "sonner";

export default function FulfillmentPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderChanges, setOrderChanges] = useState<OrderChange[]>([
    ...INITIAL_ORDER_CHANGES,
  ]);

  function handleAcceptChange(change: OrderChange) {
    setOrderChanges((prev) =>
      prev.map((c) => (c.id === change.id ? { ...c, status: "accepted" } : c))
    );
    toast("✓ Change accepted — iSeries updated");
  }

  function handleRejectChange(change: OrderChange) {
    setOrderChanges((prev) =>
      prev.map((c) => (c.id === change.id ? { ...c, status: "rejected" } : c))
    );
    toast("Change rejected");
  }

  // ── Column definitions ──

  const openOrderColumns: {
    key: string;
    header: string;
    mono?: boolean;
    render?: (item: Record<string, unknown>) => React.ReactNode;
  }[] = [
    { key: "id", header: "Order #", mono: true },
    { key: "poNumber", header: "PO Number", mono: true },
    { key: "sku", header: "SKU", mono: true },
    { key: "qty", header: "Qty" },
    { key: "destination", header: "Destination" },
    { key: "orderDate", header: "Order Date" },
    { key: "shipBy", header: "Ship By" },
    {
      key: "status",
      header: "Status",
      render: (item: Record<string, unknown>) => (
        <StatusPill status={item.status as string} />
      ),
    },
    {
      key: "_actions",
      header: "",
      render: (item: Record<string, unknown>) => (
        <Sheet>
          <SheetTrigger
            render={<Button size="sm" variant="outline" />}
            onClick={() => setSelectedOrder(item as unknown as Order)}
          >
            Details
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Order Details</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <DetailRow label="Order ID" value={item.id as string} mono />
              <DetailRow
                label="PO Number"
                value={item.poNumber as string}
                mono
              />
              <DetailRow label="SKU" value={item.sku as string} mono />
              <DetailRow label="SKU Name" value={item.skuName as string} />
              <DetailRow label="Qty" value={String(item.qty)} />
              <DetailRow
                label="Destination"
                value={item.destination as string}
              />
              <DetailRow
                label="Order Date"
                value={item.orderDate as string}
              />
              <DetailRow label="Ship By" value={item.shipBy as string} />
              <DetailRow
                label="Status"
                value={item.status as string}
                pill
              />
            </div>
          </SheetContent>
        </Sheet>
      ),
    },
  ];

  const backOrderColumns: {
    key: string;
    header: string;
    mono?: boolean;
    render?: (item: Record<string, unknown>) => React.ReactNode;
  }[] = [
    { key: "orderId", header: "Order #", mono: true },
    { key: "sku", header: "SKU", mono: true },
    { key: "skuName", header: "SKU Name" },
    { key: "qtyOrdered", header: "Qty Ordered" },
    { key: "qtyAvailable", header: "Available Now" },
    {
      key: "shortBy",
      header: "Short By",
      render: (item: Record<string, unknown>) => (
        <span className="text-red-600 font-medium">
          {item.shortBy as number}
        </span>
      ),
    },
    {
      key: "resolutionEta",
      header: "Resolution ETA",
      render: (item: Record<string, unknown>) => (
        <span className="text-amber-600 font-medium">
          {item.resolutionEta as string}
        </span>
      ),
    },
    { key: "resolutionPo", header: "Resolution PO", mono: true },
  ];

  const shippedColumns: {
    key: string;
    header: string;
    mono?: boolean;
    render?: (item: Record<string, unknown>) => React.ReactNode;
  }[] = [
    { key: "id", header: "Shipment", mono: true },
    { key: "orderId", header: "Order", mono: true },
    { key: "sku", header: "SKU", mono: true },
    { key: "qty", header: "Qty" },
    { key: "carrier", header: "Carrier" },
    { key: "shippedDate", header: "Shipped" },
    {
      key: "deliveredDate",
      header: "Delivered",
      render: (item: Record<string, unknown>) => (
        <span>{(item.deliveredDate as string) ?? "—"}</span>
      ),
    },
    {
      key: "otif",
      header: "OTIF",
      render: (item: Record<string, unknown>) => (
        <StatusPill status={item.otif as string} />
      ),
    },
  ];

  const cancelledColumns: {
    key: string;
    header: string;
    mono?: boolean;
  }[] = [
    { key: "id", header: "Order #", mono: true },
    { key: "poNumber", header: "PO", mono: true },
    { key: "sku", header: "SKU", mono: true },
    { key: "qty", header: "Qty" },
    { key: "cancelDate", header: "Cancelled" },
    { key: "reason", header: "Reason" },
  ];

  const orderChangeColumns: {
    key: string;
    header: string;
    mono?: boolean;
    render?: (item: Record<string, unknown>) => React.ReactNode;
  }[] = [
    { key: "orderId", header: "Order #", mono: true },
    { key: "changeType", header: "Change Type" },
    { key: "from", header: "From" },
    { key: "to", header: "To" },
    { key: "requestedDate", header: "Requested" },
    {
      key: "status",
      header: "Status",
      render: (item: Record<string, unknown>) => (
        <StatusPill status={item.status as string} />
      ),
    },
    {
      key: "_actions",
      header: "",
      render: (item: Record<string, unknown>) => {
        const change = item as unknown as OrderChange;
        if (change.status !== "pending") return null;

        return (
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    size="sm"
                    className="bg-[#0D7A45] text-white hover:bg-[#0D7A45]/90"
                  />
                }
              >
                Accept
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Change</AlertDialogTitle>
                  <AlertDialogDescription>
                    Accept {change.changeType}: {change.from} → {change.to} for
                    order {change.orderId}. This will update the order in iSeries
                    immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleAcceptChange(change)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger
                render={<Button size="sm" variant="destructive" />}
              >
                Reject
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reject Change</AlertDialogTitle>
                  <AlertDialogDescription>
                    Reject {change.changeType}: {change.from} → {change.to} for
                    order {change.orderId}. Are you sure?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleRejectChange(change)}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Fulfillment</h1>
        <p className="text-sm text-muted-foreground">
          Order management and shipping operations
        </p>
      </div>

      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open Orders</TabsTrigger>
          <TabsTrigger value="backorders">Back Orders</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="changes">Order Changes</TabsTrigger>
        </TabsList>

        {/* ── Open Orders ── */}
        <TabsContent value="open" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="ORDHDR · OPEN" />
          </div>
          <DataTable
            columns={openOrderColumns}
            data={OPEN_ORDERS as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        {/* ── Back Orders ── */}
        <TabsContent value="backorders" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="ORDHDR · BACK" />
          </div>
          <AlertBanner
            type="danger"
            message="2 back orders active. Replenishment arriving Mar 28."
          />
          <DataTable
            columns={backOrderColumns}
            data={BACK_ORDERS as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        {/* ── Shipped ── */}
        <TabsContent value="shipped" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="SHIPHDR · MAR26" />
          </div>
          <DataTable
            columns={shippedColumns}
            data={SHIPPED_ORDERS as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        {/* ── Cancelled ── */}
        <TabsContent value="cancelled" className="space-y-4">
          <DataTable
            columns={cancelledColumns}
            data={CANCELLED_ORDERS as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        {/* ── Order Changes ── */}
        <TabsContent value="changes" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="ORDCHGHDR" />
          </div>
          <AlertBanner
            type="warning"
            message="2 changes pending your confirmation."
          />
          <DataTable
            columns={orderChangeColumns}
            data={orderChanges as unknown as Record<string, unknown>[]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Helper component for Sheet detail rows ──

function DetailRow({
  label,
  value,
  mono,
  pill,
}: {
  label: string;
  value: string;
  mono?: boolean;
  pill?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      {pill ? (
        <StatusPill status={value} />
      ) : (
        <span className={mono ? "font-mono text-sm" : "text-sm"}>{value}</span>
      )}
    </div>
  );
}
