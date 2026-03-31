"use client";

import {
  TrendingUp,
  Package,
  Truck,
  RotateCcw,
  Wrench,
  DollarSign,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";

interface ReportType {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  period?: string;
}

const reports: ReportType[] = [
  {
    title: "OTIF Performance Report",
    description:
      "On-time in-full delivery metrics for the current period",
    icon: <TrendingUp className="size-6" />,
    iconBg: "bg-[#0D7A45]/10 text-[#0D7A45]",
    period: "March 2026",
  },
  {
    title: "Inventory Status Report",
    description:
      "Current stock levels, allocations, and quarantine status",
    icon: <Package className="size-6" />,
    iconBg: "bg-[#1652CC]/10 text-[#1652CC]",
  },
  {
    title: "Fulfillment Summary",
    description:
      "Order fulfillment metrics, shipping performance, and carrier analysis",
    icon: <Truck className="size-6" />,
    iconBg: "bg-[#0891B2]/10 text-[#0891B2]",
  },
  {
    title: "Returns Analysis",
    description: "Return rates, reasons, and disposition breakdown",
    icon: <RotateCcw className="size-6" />,
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Kitting & Bundling Operations",
    description:
      "Work order completion rates, accuracy, and throughput",
    icon: <Wrench className="size-6" />,
    iconBg: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Accessorial Charges",
    description:
      "Monthly accessorial charge breakdown and freight spend analysis",
    icon: <DollarSign className="size-6" />,
    iconBg: "bg-red-500/10 text-red-600",
    period: "March 2026 · $2,620 total",
  },
];

function ReportCard({ report }: { report: ReportType }) {
  function handleGenerate(format: string) {
    toast.success(
      `✓ ${report.title} generating — you'll be notified when ready`
    );
  }

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className={`rounded-lg p-3 w-fit ${report.iconBg}`}>
          {report.icon}
        </div>
        <div>
          <h3 className="font-semibold text-base">{report.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {report.description}
          </p>
        </div>
        {report.period && (
          <Badge variant="outline" className="text-xs">
            {report.period}
          </Badge>
        )}
        <AlertDialog>
          <AlertDialogTrigger className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[#1652CC] text-white hover:bg-[#1652CC]/90 cursor-pointer">
            Generate Report
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Generate {report.title}?</AlertDialogTitle>
              <AlertDialogDescription>
                This report will be compiled from live iSeries V7R3 data. Choose
                your preferred format:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                onClick={() => handleGenerate("pdf")}
              >
                📄 PDF
              </AlertDialogAction>
              <AlertDialogAction
                className="bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                onClick={() => handleGenerate("excel")}
              >
                📊 Excel
              </AlertDialogAction>
              <AlertDialogAction
                className="bg-[#1652CC] text-white hover:bg-[#1652CC]/90"
                onClick={() => handleGenerate("email")}
              >
                📧 Email to team
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground">
          Generate and download operational reports
        </p>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.title} report={report} />
        ))}
      </div>
    </div>
  );
}
