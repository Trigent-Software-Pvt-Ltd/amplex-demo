"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ISeriesTag } from "@/components/portal/ISeriesTag";
import { DataTable } from "@/components/portal/DataTable";
import { StatusPill } from "@/components/portal/StatusPill";
import { AlertBanner } from "@/components/portal/AlertBanner";
import { StockBar } from "@/components/portal/StockBar";
import { INVENTORY, ALLOCATED_INVENTORY } from "@/lib/mockData";
import type { AllocatedInventory, InventoryItem } from "@/lib/types";

const allocatedColumns: {
  key: string;
  header: string;
  mono?: boolean;
  render?: (item: Record<string, unknown>) => React.ReactNode;
}[] = [
  { key: "sku", header: "SKU", mono: true },
  { key: "skuName", header: "SKU Name" },
  { key: "qtyAllocated", header: "Qty Allocated" },
  { key: "orderId", header: "For Order", mono: true },
  { key: "allocatedDate", header: "Ship By" },
];

const quarantinedColumns: {
  key: string;
  header: string;
  mono?: boolean;
  render?: (item: Record<string, unknown>) => React.ReactNode;
}[] = [
  { key: "sku", header: "SKU", mono: true },
  { key: "name", header: "Name" },
  { key: "quarantined", header: "Qty" },
  { key: "holdReason", header: "Hold Reason" },
  { key: "estRelease", header: "Est. Release" },
];

export default function InventoryPage() {
  const quarantinedItems = INVENTORY.filter((item) => item.quarantined > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">
          Inventory Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time stock levels from iSeries V7R3
        </p>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="allocated">Allocated</TabsTrigger>
          <TabsTrigger value="quarantined">Quarantined</TabsTrigger>
        </TabsList>

        {/* ── Available Tab ── */}
        <TabsContent value="available" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="INVMST · AVAIL" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {INVENTORY.map((item) => (
              <Card key={item.sku}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <span className="font-mono text-xs bg-muted rounded px-2 py-0.5">
                    {item.sku}
                  </span>
                  <StatusPill status={item.status} />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <span className="inline-block text-xs bg-muted rounded px-2 py-1">
                    📍 {item.location}
                  </span>

                  <div className="flex items-center gap-4 text-sm">
                    <span>
                      Available:{" "}
                      <span className="font-mono">{item.available}</span>
                    </span>
                    <span>
                      Allocated:{" "}
                      <span className="font-mono">{item.allocated}</span>
                    </span>
                    <span>
                      Reorder Point:{" "}
                      <span className="font-mono">{item.reorderPoint}</span>
                    </span>
                  </div>

                  <StockBar
                    current={item.available}
                    max={item.reorderPoint * 2}
                    reorderPoint={item.reorderPoint}
                  />

                  {item.quarantined > 0 && (
                    <p className="text-sm text-red-600 font-medium">
                      ⚠ {item.quarantined} units on QC hold
                    </p>
                  )}

                  <Button className="w-full bg-[#1652CC] text-white hover:bg-[#1652CC]/90">
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Allocated Tab ── */}
        <TabsContent value="allocated" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="INVMST · ALLOC" />
          </div>
          <DataTable
            columns={allocatedColumns}
            data={ALLOCATED_INVENTORY as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        {/* ── Quarantined Tab ── */}
        <TabsContent value="quarantined" className="space-y-4">
          <div className="flex justify-end">
            <ISeriesTag table="INVMST · QUAR" />
          </div>
          <AlertBanner
            type="danger"
            message="240 units of SGM-ACC-KIT currently on QC hold. Lab inspection in progress."
          />
          <DataTable
            columns={quarantinedColumns}
            data={quarantinedItems as unknown as Record<string, unknown>[]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
