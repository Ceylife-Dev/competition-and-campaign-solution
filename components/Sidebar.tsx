import type { ComponentType, SVGProps } from "react";
import { cn } from "@/components/cn";
import {
  BarChartIcon,
  ChevronDownIcon,
  GridIcon,
  LayoutDashboardIcon,
  SendIcon,
  SettingsIcon,
  TagIcon,
  TrophyIcon,
} from "@/components/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

interface NavItem {
  label: string;
  icon: IconType;
  active?: boolean;
  expandable?: boolean;
}

interface NavSection {
  heading: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    heading: "Main",
    items: [{ label: "Dashboard", icon: LayoutDashboardIcon }],
  },
  {
    heading: "Manage",
    items: [
      { label: "Competitions", icon: TrophyIcon, active: true, expandable: true },
      { label: "Campaigns", icon: SendIcon, expandable: true },
      { label: "Promotions", icon: TagIcon, expandable: true },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Reports", icon: BarChartIcon },
      { label: "Settings", icon: SettingsIcon },
    ],
  },
];

interface SidebarProps {
  className?: string;
  /** Render the icon-only rail instead of the full-width sidebar. */
  collapsed?: boolean;
}

export function Sidebar({ className, collapsed = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen sticky top-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center border-b border-slate-200 py-4",
          collapsed ? "justify-center px-2" : "gap-3 px-5",
        )}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-900 text-white">
          <GridIcon className="h-4 w-4" />
        </span>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold leading-tight text-slate-900">
              Competition Solution
            </p>
            <p className="text-xs text-slate-400">Control Center</p>
          </div>
        )}
      </div>

      <nav
        className={cn(
          "flex-1 space-y-4 overflow-y-hidden py-6",
          collapsed ? "px-4" : "px-4",
        )}
      >
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            {!collapsed && (
              <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {section.heading}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    title={collapsed ? item.label : undefined}
                    aria-current={item.active ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium cursor-pointer",
                      collapsed ? "justify-center" : "gap-3",
                      item.active
                        ? "bg-red-50 text-red-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <span className="flex-1 text-left">{item.label}</span>
                    )}
                    {!collapsed && item.expandable && (
                      <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}