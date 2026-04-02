"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  RefreshCw,
  PackageOpen,
  PackageCheck,
  Wrench,
  CheckCircle2,
  Layers,
  ShoppingCart,
  AlertTriangle,
  Truck,
  XCircle,
  Edit3,
  RotateCcw,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMobileNav } from "./MobileNavProvider";

interface SidebarItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  dot?: string; // color class for dot
  badge?: string;
  badgeVariant?: "destructive" | "secondary";
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const iconClass = "w-4 h-4 shrink-0";

const sections: SidebarSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className={iconClass} /> },
      { label: "Quick Reorder", href: "/reorder", icon: <RefreshCw className={iconClass} /> },
    ],
  },
  {
    title: "RECEIVING",
    items: [
      { label: "Open Inbound POs", href: "/receiving", icon: <PackageOpen className={iconClass} />, badge: "4", badgeVariant: "secondary" },
      { label: "Received POs", href: "/receiving?tab=received", icon: <PackageCheck className={iconClass} /> },
    ],
  },
  {
    title: "KITTING",
    items: [
      { label: "Open Work Orders", href: "/kitting", icon: <Wrench className={iconClass} />, badge: "1", badgeVariant: "destructive" },
      { label: "Completed WOs", href: "/kitting?tab=completed", icon: <CheckCircle2 className={iconClass} /> },
    ],
  },
  {
    title: "BUNDLING",
    items: [
      { label: "Open Work Orders", href: "/bundling", icon: <Layers className={iconClass} /> },
      { label: "Completed WOs", href: "/bundling?tab=completed", icon: <CheckCircle2 className={iconClass} /> },
    ],
  },
  {
    title: "INVENTORY",
    items: [
      { label: "Available", href: "/inventory", dot: "bg-ampgreen" },
      { label: "Allocated", href: "/inventory?tab=allocated", dot: "bg-ampblue" },
      { label: "Quarantined", href: "/inventory?tab=quarantined", dot: "bg-destructive", badge: "240", badgeVariant: "destructive" },
    ],
  },
  {
    title: "FULFILLMENT",
    items: [
      { label: "Open Orders", href: "/fulfillment", icon: <ShoppingCart className={iconClass} /> },
      { label: "Back Orders", href: "/fulfillment?tab=backorders", icon: <AlertTriangle className={iconClass} />, badge: "2", badgeVariant: "destructive" },
      { label: "Shipped Orders", href: "/fulfillment?tab=shipped", icon: <Truck className={iconClass} /> },
      { label: "Cancelled Orders", href: "/fulfillment?tab=cancelled", icon: <XCircle className={iconClass} /> },
      { label: "Order Changes", href: "/fulfillment?tab=changes", icon: <Edit3 className={iconClass} />, badge: "2", badgeVariant: "secondary" },
    ],
  },
  {
    title: "RETURNS",
    items: [
      { label: "Orders Returned", href: "/returns", icon: <RotateCcw className={iconClass} /> },
    ],
  },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase px-4 pt-3 pb-0.5">
            {section.title}
          </div>
          {section.items.map((item, idx) => {
            const [itemPath, itemQuery] = item.href.split("?");
            const itemTab = itemQuery ? new URLSearchParams(itemQuery).get("tab") : null;
            const currentTab = searchParams.get("tab");
            const pathMatches = pathname.startsWith(itemPath);
            const isActive = pathMatches && itemTab === currentTab;
            return (
              <Link
                key={`${section.title}-${idx}`}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-2 text-[13px] px-4 py-1.5 mx-2 rounded-md transition-colors",
                  isActive
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                {item.dot && (
                  <span className={cn("w-2 h-2 rounded-full shrink-0", item.dot)} />
                )}
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={item.badgeVariant ?? "secondary"}
                    className="ml-auto text-[10px] h-5 min-w-5 flex items-center justify-center px-1.5"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useMobileNav();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-56 shrink-0 bg-white border-r overflow-y-auto h-full">
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-display font-semibold text-sm">Navigation</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent onLinkClick={() => setSidebarOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
