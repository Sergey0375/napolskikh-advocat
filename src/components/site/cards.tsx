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
    <div className="flex min-h-[112px] flex-col">
      <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
      <dd className="mt-3 font-display text-xl leading-tight text-foreground md:text-[1.5rem]">
        {value}
      </dd>
      {note && <dd className="mt-2 text-body-sm text-muted-foreground">{note}</dd>}
    </div>
  );
}

/** Глубокая «золотая» тень при наведении — для карточек услуг/практик. */
export const cardGlowHover =
  "group relative overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-neon/40 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--neon)_45%,transparent)]";

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
      <p className="mt-4 text-body-sm text-muted-foreground">{service.short}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-body-sm font-medium text-neon">
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
    <article className="panel group relative flex flex-col overflow-hidden p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-neon/40 hover:shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--neon)_45%,transparent)] md:p-9">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {item.tag}
      </span>
      <Tag className="mt-4 text-balance text-[1.125rem] leading-snug md:text-[1.3125rem]">
        {item.title}
      </Tag>
      <p className="mt-4 text-body-sm text-muted-foreground">{item.text}</p>
      <dl className="mt-auto grid grid-cols-[1fr_auto] items-end gap-5 border-t border-border/60 pt-6">
        <div className="min-w-0">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Результат
          </dt>
          <dd className="mt-2 font-display text-lg leading-snug text-neon md:text-xl">
            {item.result}
          </dd>
        </div>
        <div className="text-right">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Срок</dt>
          <dd className="mt-2 text-body-sm text-foreground">{item.term}</dd>
        </div>
      </dl>
    </article>
  );
}
