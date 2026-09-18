import { MetricItem } from '@/content/projects';

export function MetricStrip({
  metrics,
  compact = false,
}: {
  metrics: MetricItem[];
  compact?: boolean;
}) {
  return (
    <dl className="grid gap-px border border-[var(--border-notebook)] bg-[var(--border-notebook)] sm:grid-cols-3">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className={`bg-[var(--paper-soft)] ${compact ? 'p-3' : 'p-5 sm:p-6'}`}
        >
          <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
            {m.label}
          </dt>
          <dd className="mt-2 font-serif text-2xl font-semibold text-[var(--ink)] tabular-nums sm:text-3xl">
            {m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
