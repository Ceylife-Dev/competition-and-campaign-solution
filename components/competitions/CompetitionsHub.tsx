"use client";

import { useMemo, useState } from "react";
import { cn } from "@/components/cn";
import {
  ChevronDownIcon,
  DownloadIcon,
  GridIcon,
  ListIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";
import {
  type Competition,
  type Frequency,
  FREQUENCY_FILTERS,
  TOTAL_COMPETITIONS,
} from "./data";
import { CompetitionsGrid } from "./CompetitionsGrid";
import { CompetitionsTable } from "./CompetitionsTable";
import { Pagination } from "./Pagination";
import { StatCards } from "./StatCards";

type ViewMode = "tiles" | "table";
type FrequencyFilter = "ALL" | Frequency;

interface CompetitionsHubProps {
  competitions: Competition[];
}

export function CompetitionsHub({ competitions }: CompetitionsHubProps) {
  // Grid view is the default state; the toggle swaps to the table view.
  const [view, setView] = useState<ViewMode>("tiles");
  const [frequency, setFrequency] = useState<FrequencyFilter>("ALL");
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return competitions.filter((competition) => {
      const matchesFrequency =
        frequency === "ALL" || competition.frequency === frequency;
      const matchesQuery =
        needle === "" ||
        competition.name.toLowerCase().includes(needle) ||
        competition.code.toLowerCase().includes(needle);
      return matchesFrequency && matchesQuery;
    });
  }, [competitions, frequency, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, filtered.length);

  const allSelected =
    pageRows.length > 0 && pageRows.every((row) => selected.has(row.id));

  function resetToFirstPage() {
    setPage(1);
  }

  function handleFrequency(next: FrequencyFilter) {
    setFrequency(next);
    resetToFirstPage();
  }

  function handleQuery(next: string) {
    setQuery(next);
    resetToFirstPage();
  }

  function handlePageSize(next: number) {
    setPageSize(next);
    resetToFirstPage();
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        pageRows.forEach((row) => next.delete(row.id));
      } else {
        pageRows.forEach((row) => next.add(row.id));
      }
      return next;
    });
  }

  return (
    <div className="min-w-0 space-y-6">
      {/* Breadcrumb + title + primary actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-slate-400">
            Dashboard <span className="mx-1">/</span>
            <span className="text-slate-500">Competitions</span>
          </p>
          <div className="mt-1 flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Competitions Hub
            </h1>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-900">
              {competitions.length}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <DownloadIcon className="h-4 w-4" />
            Export All
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-900 px-4 text-sm font-semibold text-white hover:bg-red-950 cursor-pointer"
          >
            <PlusIcon className="h-4 w-4" />
            Create New Competition
          </button>
        </div>
      </div>

      <StatCards />

      {/* Toolbar: search, view toggle, bulk actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => handleQuery(event.target.value)}
            placeholder="Search 50+ competitions by name, code, or type…"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="View mode"
            className="inline-flex h-10 items-center rounded-lg border border-slate-200 bg-white p-1"
          >
            <button
              type="button"
              aria-pressed={view === "tiles"}
              onClick={() => setView("tiles")}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium",
                "cursor-pointer",
                view === "tiles"
                  ? "bg-red-50 text-red-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <GridIcon className="h-4 w-4" />
              Tiles
            </button>
            <button
              type="button"
              aria-pressed={view === "table"}
              onClick={() => setView("table")}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium",
                "cursor-pointer",
                view === "table"
                  ? "bg-red-50 text-red-900"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <ListIcon className="h-4 w-4" />
              Table
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Bulk Actions
            {selected.size > 0 && (
              <span className="rounded-full bg-red-50 px-1.5 text-xs font-semibold text-red-900">
                {selected.size}
              </span>
            )}
            <ChevronDownIcon className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Frequency filter chips */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Filter by Frequency
        </p>
        <div className="flex flex-wrap gap-2">
          {FREQUENCY_FILTERS.map((option) => {
            const isActive = frequency === option.key;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleFrequency(option.key)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-sm font-medium",
                  "cursor-pointer",
                  isActive
                    ? "border-red-200 bg-red-50 text-red-900"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Showing <span className="font-semibold text-slate-700">{pageRows.length}</span>{" "}
        of <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
        competitions
        {filtered.length !== TOTAL_COMPETITIONS && (
          <span className="text-slate-400"> (filtered from {TOTAL_COMPETITIONS})</span>
        )}
      </p>

      {view === "table" ? (
        <CompetitionsTable
          rows={pageRows}
          selected={selected}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          allSelected={allSelected}
        />
      ) : (
        <CompetitionsGrid
          rows={pageRows}
          selected={selected}
          onToggleRow={toggleRow}
        />
      )}

      <Pagination
        page={currentPage}
        pageCount={pageCount}
        onPageChange={setPage}
        pageSize={pageSize}
        onPageSizeChange={handlePageSize}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        total={filtered.length}
      />
    </div>
  );
}