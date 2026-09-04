import {
  BellIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-17 px-3 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 cursor-pointer"

        aria-label="Collapse sidebar"
      >
        <MenuIcon className="h-5 w-5 -scale-x-100" />
      </button>

      <div className="flex-1" />

      <div className="relative hidden max-w-xs flex-1 sm:block">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search…"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/30"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="relative cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />

          <span className="absolute right-0 top-0 grid h-3.5 w-3.5 place-items-center rounded-full bg-red-800 text-[8px] font-bold text-white">
            3
          </span>
        </button>

        <label className="cursor-pointer">
        <div className="flex h-10 items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-1.5 pr-3.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
            JS
          </span>
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            J.S. ••••••••
          </span>
          <ChevronDownIcon className="h-4 w-4 text-slate-400" />
        </div>
        </label>
      </div>
    </header>
  );
}