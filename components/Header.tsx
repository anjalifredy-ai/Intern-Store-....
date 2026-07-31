import { Search, UserCircle2 } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-surface">
      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 2L4 22L14 12L4 2Z" fill="#00875f" />
            <path d="M4 2L16 9L14 12L4 2Z" fill="#00d67d" />
            <path d="M4 22L16 15L14 12L4 22Z" fill="#0084d1" />
            <path d="M16 9L20.5 11.5C21.2 11.9 21.2 12.9 20.5 13.3L16 15L14 12L16 9Z" fill="#ff3e30" />
          </svg>
          <span className="font-display text-lg font-medium tracking-tight text-ink">
            Intern <span className="font-normal text-subink">Store</span>
          </span>
        </Link>
      </div>
      <div className="px-4 pb-2">
        <div className="flex items-center gap-3 rounded-full bg-surfacedim px-4 py-2.5">
          <Search size={18} className="text-subink shrink-0" />
          <input
            type="text"
            placeholder="Search apps"
            className="w-full bg-transparent text-sm text-ink placeholder:text-subink outline-none"
          />
          <UserCircle2 size={22} className="text-subink shrink-0" />
        </div>
      </div>
    </header>
  );
}
