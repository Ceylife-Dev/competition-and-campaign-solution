import { LuBell, LuMenu, LuSearch } from "react-icons/lu";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

/** Compact top bar shown only below `lg`, where the sidebar/desktop Topbar are hidden. */
export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-slate-200 bg-white px-3 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
      >
        <LuMenu className="h-5 w-5" />
      </button>

      <span className="truncate text-lg font-bold text-slate-900">
        Competitions Hub
      </span>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          aria-label="Search"
          className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
        >
          <LuSearch className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
        >
          <LuBell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border border-white bg-red-600" />
        </button>

        {/* Profile Avatar Added for Mobile Header */}
        <button
          type="button"
          aria-label="Account menu"
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300 ml-1"
        >
          JS
        </button>
      </div>
    </header>
  );
}