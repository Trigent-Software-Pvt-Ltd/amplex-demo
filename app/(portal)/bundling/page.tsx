"use client";

import { Suspense, useState, useEffect } from "react";
import { Layers, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/portal/DataTable";
import { ISeriesTag } from "@/components/portal/ISeriesTag";
import { StatusPill } from "@/components/portal/StatusPill";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BUNDLING_OPEN, BUNDLING_DONE } from "@/lib/mockData";
import { useSearchParams, useRouter } from "next/navigation";

type Row = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Open WO table columns                                              */
/* ------------------------------------------------------------------ */

const openColumns = [
  { key: "id", header: "WO Number", mono: true },
  { key: "bundleSku", header: "Bundle SKU", mono: true },
  { key: "description", header: "Description" },
  {
    key: "qty",
    header: "Qty",
    render: (item: Record<string, unknown>) =>
      (item.qty as number).toLocaleString(),
  },
  { key: "started", header: "Started" },
  { key: "dueDate", header: "Due Date" },
  {
    key: "progress",
    header: "Progress",
    render: (item: Record<string, unknown>) => {
      const pct = item.progress as number;
      return (
        <div className="flex items-center gap-2 min-w-[90px]">
          <Progress value={pct} className="flex-1">
            <span className="text-xs text-muted-foreground tabular-nums">
              {pct}%
            </span>
          </Progress>
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    render: (item: Record<string, unknown>) => (
      <StatusPill status={item.status as string} />
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Completed WO table columns                                         */
/* ------------------------------------------------------------------ */

const completedColumns = [
  { key: "id", header: "WO Number", mono: true },
  { key: "bundleSku", header: "Bundle SKU", mono: true },
  { key: "description", header: "Description" },
  {
    key: "qty",
    header: "Qty",
    render: (item: Record<string, unknown>) =>
      (item.qty as number).toLocaleString(),
  },
  { key: "laborHours", header: "Labor Hrs" },
  { key: "output", header: "Output" },
];

/* ------------------------------------------------------------------ */
/* Timeline chart data                                                */
/* ------------------------------------------------------------------ */

const statusColorMap: Record<string, string> = {
  "on-track": "#22c55e",
  "in-progress": "#3b82f6",
  "at-risk": "#ef4444",
};

const chartData = BUNDLING_OPEN.map((wo) => ({
  id: wo.id,
  progress: wo.progress,
  fill: statusColorMap[wo.status] ?? "#6b7280",
}));

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

const VALID_TABS = ["open", "completed"];

export default function BundlingPage() {
  return (
    <Suspense>
      <BundlingContent />
    </Suspense>
  );
}

function BundlingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(tabParam ?? "") ? tabParam! : "open";
  const [bannerDismissed, setBannerDismissed] = useState(true);

  useEffect(() => {
    setBannerDismissed(localStorage.getItem("amplex-bundling-banner-dismissed") === "true");
  }, []);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-display font-bold">
          Bundling Operations
        </h1>
        <p className="text-sm text-muted-foreground">
          Accessory bundling and retail packaging
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "open") {
          params.delete("tab");
        } else {
          params.set("tab", value);
        }
        const query = params.toString();
        router.replace(`/bundling${query ? `?${query}` : ""}`, { scroll: false });
      }}>
        <TabsList>
          <TabsTrigger value="open">Open Work Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed Work Orders</TabsTrigger>
        </TabsList>

        {/* ── Open Work Orders Tab ── */}
        <TabsContent value="open" className="space-y-4">
          {/* Context Banner */}
          {!bannerDismissed && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <div className="flex gap-2 items-center">
                <Layers className="size-4 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-800 flex-1">
                  Bundling adds accessory items to kitted handsets — chargers, cases,
                  promotional inserts — creating the final retail-ready product variant.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBannerDismissed(true);
                    localStorage.setItem("amplex-bundling-banner-dismissed", "true");
                  }}
                  className="shrink-0 p-0.5 rounded hover:bg-blue-100 text-blue-600 transition-colors"
                  aria-label="Dismiss banner"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle className="text-lg font-semibold">
                  Open Work Orders
                </CardTitle>
                <ISeriesTag table="WOHDR &middot; type=BND" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="table">
                <TabsList>
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="table">
                  <DataTable columns={openColumns} data={BUNDLING_OPEN as unknown as Row[]} />
                </TabsContent>

                <TabsContent value="timeline">
                  <div className="w-full h-[300px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          type="number"
                          domain={[0, 100]}
                          tickFormatter={(v: number) => `${v}%`}
                        />
                        <YAxis type="category" dataKey="id" width={80} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Progress"]}
                        />
                        <Bar dataKey="progress" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Completed Work Orders Tab ── */}
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Completed Work Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={completedColumns} data={BUNDLING_DONE as unknown as Row[]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
