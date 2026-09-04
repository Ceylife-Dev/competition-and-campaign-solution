import { cn } from "@/components/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  rangeStart: number;
  rangeEnd: number;
  total: number;
}

const PAGE_SIZES = [10, 25, 50];

function pageList(current: number, total: number): (number | "ellipsis")[] {
  const out: (number | "ellipsis")[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 1) {
      out.push(p);
    } else if (out[out.length - 1] !== "ellipsis") {
      out.push("ellipsis");
    }
  }
  return out;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  pageSize,
  onPageSizeChange,
  rangeStart,
  rangeEnd,
  total,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
      <nav className="flex flex-wrap items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Previous
        </button>

        {pageList(page, pageCount).map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1.5 text-sm text-slate-400"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                "h-8 min-w-8 rounded-md px-2 text-sm font-medium",
                item === page
                  ? "bg-red-900 text-white"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </nav>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span>
          Showing {rangeStart} to {rangeEnd} of {total} results
        </span>
        <label className="flex items-center gap-2">
          Rows
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/30"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
