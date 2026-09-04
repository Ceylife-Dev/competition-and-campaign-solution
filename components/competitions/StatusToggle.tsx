"use client";

import { useState } from "react";
import { cn } from "@/components/cn";

interface StatusToggleProps {
  defaultOn: boolean;
  showLabel?: boolean;
}

export function StatusToggle({ defaultOn, showLabel = false }: StatusToggleProps) {
  const [on, setOn] = useState(defaultOn);

  return (
    
    <div className="flex items-center gap-2 ">
      <button
        
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={on ? "Deactivate competition" : "Activate competition"}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
          "cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-900/40",
          on ? "bg-blue-200" : "bg-slate-200",
        )}
      >
        <span
          className={cn(
            "inline-block pointer-events-none h-4 w-4 rounded-full bg-blue-950 shadow-sm transition-transform",
            on ? "translate-x-4 bg-blue-950" : "translate-x-0.5 bg-white",
          )}
        />
      </button>
      {showLabel && (
        <span className="text-xs font-medium text-slate-500">
          {on ? "Active" : "Inactive"}
        </span>
      )}
    </div>

  );
}
