"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-[#C41230] px-4">
      {/* Left section */}
      <div className="flex items-center">
        <img
          src="https://amplex.com/wp-content/uploads/2019/10/logo-wyt-300x56.png"
          alt="Amplex Corporation"
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
                  ? "text-white bg-white/20 rounded-md px-3 py-1"
                  : "text-white/80 hover:text-white px-3 py-1"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <span className="font-code text-xs bg-white/20 text-white border border-white/30 rounded-full px-3 py-1">
          iSeries V7R3
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-ampgreen animate-pulse" />
          <span className="text-xs text-white/80">AI Active</span>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <Avatar className="cursor-pointer">
              <AvatarFallback className="bg-ampblue text-white text-xs">
                WM
              </AvatarFallback>
            </Avatar>
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border py-1 z-50">
              <div className="px-3 py-2 border-b">
                <div className="font-semibold text-sm">Walmart Stores Inc.</div>
                <div className="text-xs text-muted-foreground">walmart@amplex.com</div>
              </div>
              <button
                type="button"
                onClick={() => { window.location.href = "/api/auth/logout"; }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
