import type { MetricItem } from '@/content/projects';
import { CountUp } from '@/components/ui/CountUp';

/** Documented results, set as a ruled row rather than tiles. */
export function MetricRow({ metrics, className = '' }: { metrics: MetricItem[]; className?: string }) {
  return (
    <dl className={`grid grid-cols-1 border-y-2 border-ink min-[22.5rem]:grid-cols-3 ${className}`}>
      {metrics.map((metric, index) => (
        <div key={metric.label} className={`flex min-w-0 flex-col-reverse justify-end py-4 ${
            index > 0
              ? 'border-t border-rule min-[22.5rem]:border-l min-[22.5rem]:border-t-0 min-[22.5rem]:pl-4'
              : 'min-[22.5rem]:pr-4'
          }`}>
          <dt className="t-sign mt-1 text-muted">{metric.label}</dt>
          <dd
            className={
              /\d/.test(metric.value)
                ? 'font-mono text-[clamp(1.05rem,2.2vw,1.6rem)] font-semibold leading-none tracking-tight tabular-nums'
                : 'text-[clamp(1rem,1.6vw,1.2rem)] font-extrabold leading-tight [font-stretch:104%]'
            }
          >
            <CountUp value={`${metric.value}${metric.suffix ?? ''}`} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
