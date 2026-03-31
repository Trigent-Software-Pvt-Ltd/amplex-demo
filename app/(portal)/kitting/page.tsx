"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/portal/DataTable";
import { ISeriesTag } from "@/components/portal/ISeriesTag";
import { StatusPill } from "@/components/portal/StatusPill";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  KITTING_OPEN,
  KITTING_DONE,
  BOMS,
} from "@/lib/mockData";
import type { BOM } from "@/lib/types";

type Row = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Completed WO columns                                               */
/* ------------------------------------------------------------------ */

const completedColumns = [
  { key: "id", header: "WO Number", mono: true },
  { key: "kitSku", header: "Kit SKU", mono: true },
  { key: "description", header: "Description" },
  {
    key: "qty",
    header: "Qty",
    render: (item: Record<string, unknown>) =>
      (item.qty as number).toLocaleString(),
  },
  { key: "dueDate", header: "Due Date" },
  {
    key: "accuracy",
    header: "Accuracy",
    render: (item: Record<string, unknown>) => {
      const acc = item.accuracy as number | undefined;
      return acc != null ? `${acc.toFixed(1)}%` : "—";
    },
  },
  { key: "disposition", header: "Disposition" },
];

/* ------------------------------------------------------------------ */
/* BOM lookup helper                                                  */
/* ------------------------------------------------------------------ */

function findBom(kitSku: string): BOM | undefined {
  // Exact match first
  const exact = BOMS.find((b) => b.kitSku === kitSku);
  if (exact) return exact;
  // Fallback: match first word
  const firstWord = kitSku.split("-")[0];
  return BOMS.find((b) => b.kitSku.startsWith(firstWord));
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function KittingPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBom, setSelectedBom] = useState<BOM | null>(null);

  function handleViewBom(kitSku: string) {
    const bom = findBom(kitSku);
    setSelectedBom(bom ?? null);
    setSheetOpen(true);
  }

  const hasPairingNote = selectedBom?.components.some((c) => c.pairingNote);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">
          Kitting Operations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Handset kit assembly and production tracking
        </p>
      </div>

      {/* Context Banner */}
      <Card className="bg-teal-50 border-teal-200">
        <CardContent className="p-4">
          <div className="flex gap-3 items-start">
            <Info className="size-5 text-teal-600 mt-0.5 shrink-0" />
            <p className="text-sm text-teal-800">
              Kitting is Amplex&apos;s core production process. Each handset kit
              is assembled on a conveyor belt with BOM-guided component scanning.
              SIM card serial is married to handset serial at time of kitting —
              this pairing cannot be changed after kit closure.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Open Work Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold">
              Open Work Orders
            </CardTitle>
            <ISeriesTag table="WOHDR &middot; type=KIT" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>WO Number</TableHead>
                <TableHead>Kit SKU</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {KITTING_OPEN.map((wo) => (
                <TableRow key={wo.id}>
                  <TableCell className="font-mono text-xs">{wo.id}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {wo.kitSku}
                  </TableCell>
                  <TableCell>{wo.description}</TableCell>
                  <TableCell>{wo.qty.toLocaleString()}</TableCell>
                  <TableCell>{wo.started}</TableCell>
                  <TableCell>{wo.dueDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={wo.progress} className="flex-1">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {wo.progress}%
                        </span>
                      </Progress>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusPill
                      status={wo.status}
                      pulse={wo.status === "at-risk"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewBom(wo.kitSku)}
                    >
                      View BOM
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Completed Work Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Completed Work Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={completedColumns} data={KITTING_DONE as unknown as Row[]} />
        </CardContent>
      </Card>

      {/* BOM Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              Bill of Materials —{" "}
              {selectedBom?.kitName ?? "Unknown Kit"}
            </SheetTitle>
          </SheetHeader>

          {selectedBom ? (
            <div className="px-4 pb-4 space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Qty Per Kit</TableHead>
                    <TableHead>Scan Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedBom.components.map((c) => (
                    <TableRow key={c.sku}>
                      <TableCell>{c.component}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {c.sku}
                      </TableCell>
                      <TableCell>{c.qtyPerKit}</TableCell>
                      <TableCell>{c.scanRequired ? "✓" : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pairing notes */}
              {selectedBom.components
                .filter((c) => c.pairingNote)
                .map((c) => (
                  <div
                    key={c.sku}
                    className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                  >
                    ⚠ {c.pairingNote}
                  </div>
                ))}

              {/* Bottom pairing warning */}
              {hasPairingNote && (
                <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  SIM-to-serial pairing is validated at scan station. Mis-paired
                  units cannot be activated.
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 pb-4 text-sm text-muted-foreground">
              No BOM found for this kit SKU.
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
