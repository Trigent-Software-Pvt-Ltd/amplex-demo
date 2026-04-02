import { Suspense } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { AIPanel } from "@/components/layout/AIPanel";
import { Footer } from "@/components/portal/Footer";
import { MobileNavProvider } from "@/components/layout/MobileNavProvider";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileNavProvider>
      <div className="min-h-screen bg-page-bg">
        <Topbar />
        <div className="flex pt-14" style={{ height: "100vh" }}>
          <Suspense>
            <Sidebar />
          </Suspense>
          <main className="flex-1 overflow-y-auto p-4 flex flex-col">
            <div className="max-w-6xl mx-auto flex-1 w-full">
              {children}
            </div>
            <Footer />
          </main>
          <AIPanel />
        </div>
      </div>
    </MobileNavProvider>
  );
}
