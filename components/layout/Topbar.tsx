"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Fulfillment", href: "/fulfillment" },
  { label: "Inventory", href: "/inventory" },
  { label: "Operations", href: "/kitting" },
  { label: "Returns", href: "/returns" },
  { label: "Reports", href: "/reports" },
  { label: "Reorder", href: "/reorder" },
];

export function Topbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-navy px-4">
      {/* Left section */}
      <div className="flex items-center">
        <img
          src="https://amplex.com/wp-content/uploads/2020/12/amplex-logo.png"
          alt="Amplex"
          className="h-7 w-auto"
        />
        <div className="border-r border-white/20 h-6 mx-3" />
        <span className="text-sm text-white/70">Customer Portal</span>
      </div>

      {/* Center section - navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                isActive
                  ? "text-white bg-white/10 rounded-md px-3 py-1"
                  : "text-white/70 hover:text-white px-3 py-1"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <span className="font-code text-xs bg-ampteal/20 text-ampteal border border-ampteal/30 rounded-full px-3 py-1">
          iSeries V7R3
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-ampgreen animate-pulse" />
          <span className="text-xs text-ampgreen">AI Active</span>
        </div>
        <Avatar>
          <AvatarFallback className="bg-ampblue text-white text-xs">
            WM
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
