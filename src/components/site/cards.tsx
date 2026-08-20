import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/data/site";

export function TrustStat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string | undefined;
}) {
  return (
    <div className="py-1">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-lg text-foreground md:text-xl">{value}</p>
      {note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
    </div>
  );
}

export function PracticeCard({
  service,
  index,
  className = "",
}: {
  service: Service;
  index: number;
  className?: string;
}) {
  return (
    <Link
      to="/services"
      hash={service.slug}
      className={cn(
        "panel panel-hover group flex flex-col p-7 md:p-9",
        className,
      )}
    >
      <span className="font-display text-sm text-neon">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-6 text-balance">{service.title}</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{service.short}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-[15px] text-neon">
        Подробнее
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.6}
        />
      </span>
    </Link>
  );
}

export function CaseCard({
  item,
  as: Tag = "h3",
}: {
  item: { tag: string; title: string; text: string; result: string; term: string };
  as?: "h2" | "h3";
}) {
  return (
    <article className="panel flex flex-col p-7 md:p-9">
      <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {item.tag}
      </span>
      <Tag className="mt-4 text-balance">{item.title}</Tag>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{item.text}</p>
      <dl className="mt-auto grid grid-cols-[1fr_auto] items-end gap-4 border-t border-border/60 pt-6 text-sm">
        <div className="min-w-0">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Результат
          </dt>
          <dd className="mt-1.5 text-neon">{item.result}</dd>
        </div>
        <div className="text-right">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Срок</dt>
          <dd className="mt-1.5">{item.term}</dd>
        </div>
      </dl>
    </article>
  );
}
