import { cn } from "@/components/cn";
import { MoreVerticalIcon, PinIcon } from "@/components/icons";
import {
  type Competition,
  DAYS_LEFT_WARNING,
  FREQUENCY_META,
  formatCompact,
} from "./data";
import { StatusToggle } from "./StatusToggle";

interface CompetitionsGridProps {
  rows: Competition[];
  selected: Set<string>;
  onToggleRow: (id: string) => void;
}

export function CompetitionsGrid({
  rows,
  selected,
  onToggleRow,
}: CompetitionsGridProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-12 text-center text-sm text-slate-400">
        No competitions match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {rows.map((row) => {
        const freq = FREQUENCY_META[row.frequency];
        const isWarning =
          row.daysLeft !== null && row.daysLeft <= DAYS_LEFT_WARNING;
        return (
          <div
            key={row.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm/5"
          >
            {/* Top row with soft border */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              {/*<input
                type="checkbox"
                className="h-4 w-4 rounded border border-slate-100 bg-white accent-slate-300 cursor-pointer"
                checked={selected.has(row.id)}
                onChange={() => onToggleRow(row.id)}
                aria-label={`Select ${row.name}`}
              />*/}

              <label className="cursor-pointer">
              <input
                type="checkbox"
                className={cn(
                  "h-4 w-4 cursor-pointer appearance-none rounded",
                  "border border-slate-300 bg-white",
                  "checked:border-slate-500 checked:bg-slate-500",
                  "relative",
                  "focus:outline-none focus:ring-0",
                  "checked:after:absolute checked:after:left-1/2 checked:after:top-1/2",
                  "checked:after:h-2 checked:after:w-1",
                  "checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
                  "checked:after:rotate-45",
                  "checked:after:border-b-2 checked:after:border-r-2",
                  "checked:after:border-white",
                )}
                checked={selected.has(row.id)}
                onChange={() => onToggleRow(row.id)}
                aria-label={`Select ${row.name}`}
              />
              </label>
              <button
                type="button"
                className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 cursor-pointer"
                aria-label="More actions"
              >
                <MoreVerticalIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold leading-snug text-slate-900">
                {row.name}
              </h3>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${freq.badge}`}
              >
                {freq.short}
              </span>
            </div>

           <div className="mx-auto w-[75%] grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-slate-100/80 py-2 text-center">
                <p className="text-[11px] font-medium text-slate-400">
                  Qualifiers
                </p>
                <p className="text-base font-bold text-slate-700">
                  {row.qualifiers === 0 ? "0" : formatCompact(row.qualifiers)}
                </p>
              </div>
              <div className="rounded-lg bg-slate-100/80 py-2 text-center">
                <p className="text-[11px] font-medium text-slate-400">
                  Days Left
                </p>
                <p
                  className={cn(
                    "text-base font-bold",
                    isWarning ? "text-red-500" : "text-slate-700",
                  )}
                >
                  {row.daysLeft ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <StatusToggle defaultOn={row.active} showLabel />
              <label className="cursor-pointer">
              <button
                type="button"
                className="rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 cursor-pointer"
                aria-label="Pin competition"
              >
                
                <PinIcon className="h-4 w-4 rotate-45" />
              </button>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}