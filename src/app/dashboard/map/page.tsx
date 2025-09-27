"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Header } from "@/components/header";
import InterActiveMap from "@/components/interactive-map";

export default function MapPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card sticky top-0 h-screen">
        <DashboardSidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1  flex flex-col mt-12 p-2">
        <InterActiveMap />
      </div>
    </div>
  );
}
