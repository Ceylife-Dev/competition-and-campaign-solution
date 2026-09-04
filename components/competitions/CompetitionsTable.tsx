import { cn } from "@/components/cn";
import { MoreVerticalIcon, PinIcon } from "@/components/icons";
import {
  type Competition,
  DAYS_LEFT_WARNING,
  FREQUENCY_META,
} from "./data";
import { StatusToggle } from "./StatusToggle";

interface CompetitionsTableProps {
  rows: Competition[];
  selected: Set<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  allSelected: boolean;
}

const HEAD_CLASS =
  "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400";

export function CompetitionsTable({
  rows,
  selected,
  onToggleRow,
  onToggleAll,
  allSelected,
}: CompetitionsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="w-10 px-4 py-3">
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
                checked={allSelected}
                onChange={onToggleAll}
                aria-label="Select all competitions on this page"
              />
              </label>
            
            </th>
            <th className={HEAD_CLASS}>Competition</th>
            <th className={HEAD_CLASS}>Freq</th>
            <th className={cn(HEAD_CLASS, "text-center")}>Status</th>
            <th className={cn(HEAD_CLASS, "text-right")}>Participants</th>
            <th className={HEAD_CLASS}>Start Date</th>
            <th className={cn(HEAD_CLASS, "text-right")}>Days Left</th>
            <th className={cn(HEAD_CLASS, "text-right")}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-12 text-center text-sm text-slate-400"
              >
                No competitions match your filters.
              </td>
            </tr>
          )}
          {rows.map((row) => {
            const freq = FREQUENCY_META[row.frequency];
            const isWarning =
              row.daysLeft !== null && row.daysLeft <= DAYS_LEFT_WARNING;
            return (
              <tr
                key={row.id}
                className="border-t border-slate-100 odd:bg-white even:bg-slate-50/40 hover:bg-slate-50"
              >
                <td className="px-4 py-3">
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
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-slate-800">{row.name}</div>
                  <div className="text-xs text-slate-400">{row.code}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${freq.badge}`}
                  >
                    {freq.short}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <StatusToggle defaultOn={row.active} />
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-medium tabular-nums text-slate-700">
                  {row.participants}
                </td>
                <td className="px-4 py-3 text-slate-500">{row.startDate}</td>
                <td
                  className={cn(
                    "px-4 py-3 text-right font-semibold tabular-nums",
                    isWarning ? "text-red-500" : "text-slate-600",
                  )}
                >
                  {row.daysLeft ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1 text-slate-300">
                    <button
                      type="button"
                      className="rounded p-1 hover:bg-slate-100 hover:text-slate-500 cursor-pointer"
                      aria-label="Pin competition"
                    >
                      <PinIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded p-1 hover:bg-slate-100 hover:text-slate-500 cursor-pointer"
                      aria-label="More actions"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
