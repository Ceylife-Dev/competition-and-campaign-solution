"use client";

import { useState } from "react";
import type { IconType } from "react-icons";
import {
  LuEllipsis,
  LuLayoutGrid,
  LuSend,
  LuTag,
  LuTrophy,
} from "react-icons/lu";
import { cn } from "@/components/cn";

interface BottomNavItem {
  label: string;
  icon: IconType;
  dot?: boolean;
}

const ITEMS: BottomNavItem[] = [
  { label: "Home", icon: LuLayoutGrid },
  { label: "Competitions", icon: LuTrophy, dot: true },
  { label: "Campaigns", icon: LuSend },
  { label: "Promotions", icon: LuTag },
  { label: "More", icon: LuEllipsis },
];

/** Fixed mobile bottom navigation. Hidden from `lg` up where the sidebar takes over. */
export function BottomNav() {
  const [active, setActive] = useState("Competitions");

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 flex min-w-[360px] border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      {ITEMS.map((item) => {
        const isActive = active === item.label;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(item.label)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative flex flex-1 cursor-pointer flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              isActive ? "text-red-900" : "text-slate-500 hover:text-slate-700",
            )}
          >
            {isActive && (
              <span className="absolute inset-x-0 top-0 mx-auto h-0.5 w-10 rounded-full bg-red-900" />
            )}
            <span className="relative">
              <item.icon className="h-5 w-5" aria-hidden />
              {item.dot && (
                <span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-red-600" />
              )}
            </span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
