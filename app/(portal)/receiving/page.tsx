import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/portal/DataTable";
import { ISeriesTag } from "@/components/portal/ISeriesTag";
import { StatusPill } from "@/components/portal/StatusPill";
import { Progress } from "@/components/ui/progress";
import { INBOUND_POS, RECEIVED_POS } from "@/lib/mockData";

type Row = Record<string, unknown>;

const inboundColumns = [
  { key: "id", header: "PO Number", mono: true },
  { key: "supplier", header: "Supplier" },
  { key: "sku", header: "SKU", mono: true },
  {
    key: "qtyOrdered",
    header: "Qty Ordered",
    render: (item: Record<string, unknown>) =>
      (item.qtyOrdered as number).toLocaleString(),
  },
  { key: "expectedDate", header: "Expected" },
  {
    key: "status",
    header: "Status",
    render: (item: Record<string, unknown>) => (
      <StatusPill
        status={item.status as string}
        pulse={(item.status as string) === "critical"}
      />
    ),
  },
  {
    key: "progress",
    header: "Progress",
    render: (item: Record<string, unknown>) => {
      const pct = item.progress as number;
      return (
        <div className="flex items-center gap-2 min-w-[120px]">
          <Progress value={pct} className="flex-1">
            <span className="text-xs text-muted-foreground tabular-nums">
              {pct}%
            </span>
          </Progress>
        </div>
      );
    },
  },
];

const receivedColumns = [
  { key: "id", header: "PO Number", mono: true },
  { key: "sku", header: "SKU", mono: true },
  { key: "qtyOrdered", header: "Qty Ordered" },
  { key: "qtyReceived", header: "Qty Received" },
  { key: "receivedDate", header: "Received" },
  {
    key: "variance",
    header: "Variance",
    render: (item: Record<string, unknown>) => {
      const v = item.variance as number;
      if (v === 0) {
        return <span className="text-green-600 font-medium">None ✓</span>;
      }
      return <span className="text-amber-600 font-medium">{v}</span>;
    },
  },
];

export default function ReceivingPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">Receiving</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Inbound purchase order tracking
        </p>
      </div>

      {/* Two-section layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Section 1: Open Inbound POs */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg font-semibold">
                Open Inbound POs
              </CardTitle>
              <ISeriesTag table="PORCVHDR" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={inboundColumns} data={INBOUND_POS as unknown as Row[]} />
          </CardContent>
        </Card>

        {/* Section 2: Received POs */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg font-semibold">
                Received POs
              </CardTitle>
              <ISeriesTag table="PORCVHDR + RCVLOG" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={receivedColumns} data={RECEIVED_POS as unknown as Row[]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
