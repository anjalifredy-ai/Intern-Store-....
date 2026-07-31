import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

export default function Section({
  title,
  children,
  scroll = true,
}: {
  title: string;
  children: ReactNode;
  scroll?: boolean;
}) {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between px-4 pb-3">
        <h2 className="font-display text-[19px] font-medium text-ink">
          {title}
        </h2>
        <ChevronRight size={20} className="text-subink" />
      </div>
      {scroll ? (
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-4">
          {children}
        </div>
      ) : (
        <div className="px-4">{children}</div>
      )}
    </section>
  );
}
