import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-border/60">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-border/60">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left font-display text-[19px] leading-snug transition-colors duration-200 hover:text-neon"
              >
                <span className="min-w-0">{f.q}</span>
                <span className="mt-1 shrink-0 text-neon" aria-hidden>
                  {isOpen ? (
                    <Minus className="size-5" strokeWidth={1.6} />
                  ) : (
                    <Plus className="size-5" strokeWidth={1.6} />
                  )}
                </span>
              </button>
            </h3>
            {isOpen && (
              <p className="max-w-[680px] pb-7 text-[15px] leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
