"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      { label: "Received POs", href: "/receiving", icon: <PackageCheck className={iconClass} /> },
    ],
  },
  {
    title: "KITTING",
    items: [
      { label: "Open Work Orders", href: "/kitting", icon: <Wrench className={iconClass} />, badge: "1", badgeVariant: "destructive" },
      { label: "Completed WOs", href: "/kitting", icon: <CheckCircle2 className={iconClass} /> },
    ],
  },
  {
    title: "BUNDLING",
    items: [
      { label: "Open Work Orders", href: "/bundling", icon: <Layers className={iconClass} /> },
      { label: "Completed WOs", href: "/bundling", icon: <CheckCircle2 className={iconClass} /> },
    ],
  },
  {
    title: "INVENTORY",
    items: [
      { label: "Available", href: "/inventory", dot: "bg-ampgreen" },
      { label: "Allocated", href: "/inventory", dot: "bg-ampblue" },
      { label: "Quarantined", href: "/inventory", dot: "bg-destructive", badge: "240", badgeVariant: "destructive" },
    ],
  },
  {
    title: "FULFILLMENT",
    items: [
      { label: "Open Orders", href: "/fulfillment", icon: <ShoppingCart className={iconClass} /> },
      { label: "Back Orders", href: "/fulfillment", icon: <AlertTriangle className={iconClass} />, badge: "2", badgeVariant: "destructive" },
      { label: "Shipped Orders", href: "/fulfillment", icon: <Truck className={iconClass} /> },
      { label: "Cancelled Orders", href: "/fulfillment", icon: <XCircle className={iconClass} /> },
      { label: "Order Changes", href: "/fulfillment", icon: <Edit3 className={iconClass} />, badge: "2", badgeVariant: "secondary" },
    ],
  },
  {
    title: "RETURNS",
    items: [
      { label: "Orders Returned", href: "/returns", icon: <RotateCcw className={iconClass} /> },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-white border-r overflow-y-auto h-full">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase px-4 pt-4 pb-1">
            {section.title}
          </div>
          {section.items.map((item, idx) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={`${section.title}-${idx}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm px-4 py-2 mx-2 rounded-md transition-colors",
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
    </aside>
  );
}
