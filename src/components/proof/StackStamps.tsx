export function StackStamps({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li
          key={item}
          className="border border-[var(--border-notebook)] bg-[var(--paper-soft)] px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--ink)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
