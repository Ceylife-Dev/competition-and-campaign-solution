"use client";

import { type ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardShell({ children }: { children: ReactNode }) {
  // Mobile: slide-over drawer. Desktop (lg+): collapse to an icon-only rail.
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  function handleMenuClick() {
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      setCollapsed((value) => !value);
    } else {
      setNavOpen((value) => !value);
    }
  }

  return (
    <div className="flex min-h-screen min-w-[320px] bg-slate-50 text-slate-900">
      <Sidebar collapsed={collapsed} className="hidden lg:flex" />

      {navOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="absolute inset-0 bg-slate-900/40"
          />
          <Sidebar className="absolute inset-y-0 left-0 flex shadow-xl" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={handleMenuClick} collapsed={collapsed} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto min-w-0 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
