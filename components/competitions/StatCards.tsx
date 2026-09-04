import type { ReactNode } from "react";
import { DollarIcon, FileIcon, UsersIcon } from "@/components/icons";
import { SUMMARY_STATS } from "./data";

interface StatCard {
  label: string;
  value: string;
  sub: string;
  subClass: string;
  iconWrap: string;
  icon: ReactNode;
}

const CARDS: StatCard[] = [
  {
    label: "Active",
    value: SUMMARY_STATS.active,
    sub: "Competitions running",
    subClass: "text-emerald-600",
    iconWrap: "bg-emerald-50",
    icon: <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />,
  },
  {
    label: "Total Participants",
    value: SUMMARY_STATS.participants,
    sub: "+12% vs last period",
    subClass: "text-emerald-600 font-medium",
    iconWrap: "bg-blue-50 text-blue-600",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    label: "Drafts / Pending",
    value: SUMMARY_STATS.drafts,
    sub: "Awaiting launch",
    subClass: "text-amber-600",
    iconWrap: "bg-amber-50 text-amber-600",
    icon: <FileIcon className="h-4 w-4" />,
  },
  {
    label: "Prize Budget",
    value: SUMMARY_STATS.prizeBudget,
    sub: "Total allocated",
    subClass: "text-slate-400",
    iconWrap: "bg-red-50 text-red-800",
    icon: <DollarIcon className="h-4 w-4" />,
  },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {CARDS.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex items-center gap-6">
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${card.iconWrap}`}
            >
              {card.icon}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {card.label}
              </p>
              <p className="truncate text-xl font-bold text-slate-800">
                {card.value}
              </p>
              <p className={`mt-1 text-xs ${card.subClass}`}>{card.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}