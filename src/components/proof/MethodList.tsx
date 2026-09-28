import { PROFILE } from '@/content/profile';

export function MethodList() {
  return (
    <ol className="border-t border-[var(--ink)]">
      {PROFILE.methodology.map((method) => (
        <li key={method.id} className="grid gap-3 border-b border-[var(--border-notebook)] py-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] sm:items-baseline">
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">{method.title}</h3>
          <p className="text-sm leading-6 text-[var(--muted)]">{method.description}</p>
        </li>
      ))}
    </ol>
  );
}
