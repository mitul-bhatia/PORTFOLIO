import { lineFor } from '@/content/lines';

/** The round line marker: one letter on the line's colour. */
export function Bullet({
  slug,
  size = 'md',
  className = '',
}: {
  slug: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const line = lineFor(slug);
  const sizeClass = size === 'lg' ? 'bullet-lg' : size === 'sm' ? 'bullet-sm' : '';
  return (
    <span className={`bullet line-${line.color} ${sizeClass} ${className}`.trim()} aria-hidden="true">
      {line.bullet}
    </span>
  );
}
