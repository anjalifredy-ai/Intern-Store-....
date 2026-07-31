"use client";

import { Gamepad2, LayoutGrid, Search, User } from "lucide-react";
import { useState } from "react";

const TABS = [
  { key: "games", label: "Games", icon: Gamepad2 },
  { key: "apps", label: "Apps", icon: LayoutGrid },
  { key: "search", label: "Search", icon: Search },
  { key: "profile", label: "You", icon: User },
];

export default function BottomNav() {
  const [active, setActive] = useState("apps");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-md items-stretch justify-around">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="tap-scale flex flex-1 flex-col items-center gap-1 py-2.5"
            >
              <Icon
                size={22}
                className={isActive ? "text-accent" : "text-faintink"}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span
                className={`text-[11px] ${
                  isActive ? "font-medium text-accent" : "text-faintink"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
