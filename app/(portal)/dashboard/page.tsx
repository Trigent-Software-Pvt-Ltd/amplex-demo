import Link from "next/link";
import { ShoppingCart, Package, Truck, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/portal/StatCard";
import { AlertBanner } from "@/components/portal/AlertBanner";
import { DataTable } from "@/components/portal/DataTable";
import { ISeriesTag } from "@/components/portal/ISeriesTag";
import { StatusPill } from "@/components/portal/StatusPill";
import { SHIPPED_ORDERS } from "@/lib/mockData";

const shipmentColumns: {
  key: string;
  header: string;
  mono?: boolean;
  render?: (item: Record<string, unknown>) => React.ReactNode;
}[] = [
  { key: "id", header: "Shipment", mono: true },
  { key: "orderId", header: "Order", mono: true },
  { key: "sku", header: "SKU", mono: true },
  { key: "carrier", header: "Carrier" },
  { key: "shippedDate", header: "Shipped" },
  {
    key: "otif",
    header: "OTIF",
    render: (item: Record<string, unknown>) => (
      <StatusPill status={item.otif as string} />
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Hero Banner */}
      <div className="rounded-xl bg-gradient-to-r from-[#0C2340] via-[#0C2340] to-[#1a2a45] px-6 py-4 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl font-display font-bold">
              Good morning, Walmart Stores Inc.
            </h1>
            <p className="text-sm text-white/60 mt-1">
              All data live from iSeries V7R3 &middot; Updated just now
            </p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-ampgreen">97.2%</div>
              <div className="text-xs text-white/60">OTIF</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-xs text-white/60">Active Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">3</div>
              <div className="text-xs text-white/60">Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/fulfillment" className="no-underline hover:scale-[1.02] transition-transform">
          <StatCard
            value="7"
            label="Open Orders"
            sub="2 backorders"
            subType="warning"
            icon={<ShoppingCart className="size-5" />}
            iconColor="amber"
          />
        </Link>
        <Link href="/inventory" className="no-underline hover:scale-[1.02] transition-transform">
          <StatCard
            value="14,820"
            label="Units Available"
            sub="Healthy"
            subType="success"
            icon={<Package className="size-5" />}
            iconColor="green"
          />
        </Link>
        <Link href="/receiving" className="no-underline hover:scale-[1.02] transition-transform">
          <StatCard
            value="4"
            label="Inbound POs"
            sub="4,400 units"
            subType="info"
            icon={<Truck className="size-5" />}
            iconColor="teal"
          />
        </Link>
        <Link href="/returns" className="no-underline hover:scale-[1.02] transition-transform">
          <StatCard
            value="6"
            label="Returns MTD"
            sub="4 restocked"
            subType="warning"
            icon={<RotateCcw className="size-5" />}
            iconColor="amber"
          />
        </Link>
      </div>

      {/* Alert Banners */}
      <div className="space-y-2">
        <AlertBanner
          type="warning"
          message="Back order on ORD-2026-2241 — 120 units short. Replenishment arriving Mar 28."
        />
        <AlertBanner
          type="danger"
          message="SGM-ACC-KIT quarantined (240 units on QC hold). Expected release Mar 28."
        />
        <AlertBanner
          type="info"
          message="2 order changes pending your confirmation."
        />
      </div>

      {/* Recent Shipments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold">
              Recent Shipments
            </CardTitle>
            <ISeriesTag table="SHIPHDR" />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={shipmentColumns}
            data={SHIPPED_ORDERS.slice(0, 5) as unknown as Record<string, unknown>[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
