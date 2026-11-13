'use client';

import { useEffect, useRef, useState } from 'react';
import type { PipelineNode } from '@/content/projects';
import { usePrefersReducedMotion } from '@/lib/motion';
import { Replay } from '@/components/ui/icons';
import { PetCharacter } from '@/components/pet/PetCharacter';
import { signalPip } from '@/lib/pipSignal';

const HOP_MS = 820;

/**
 * A project's pipeline drawn as a line. A run travels it stage by stage when
 * the diagram scrolls into view; each station snaps to done as the run passes.
 * Server render and reduced motion both show the completed run.
 */
export function LineRun({ nodes, title }: { nodes: PipelineNode[]; title: string }) {
  const count = nodes.length;
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(count);
  const played = useRef(false);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || played.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        played.current = true;
        observer.disconnect();
        animated.current = true;
        setStep(0);
      },
      { threshold: 0.55 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (step >= count) {
      // Pip notices a run it just watched finish.
      if (animated.current) {
        animated.current = false;
        signalPip({ reaction: 'happy', say: `${title}: all ${count} stages, in order. Nice.` });
      }
      return;
    }
    const timer = window.setTimeout(() => setStep((current) => current + 1), HOP_MS);
    return () => window.clearTimeout(timer);
  }, [step, count, title]);

  const running = step < count;
  const fill = Math.min(step, count - 1);

  return (
    <div ref={ref}>
      <div
        className="run"
        style={{ '--n': count, '--i': fill, '--hop': `${HOP_MS}ms` } as React.CSSProperties}
      >
        <div className="run-track" aria-hidden="true">
          <div className="run-fill" />
        </div>
        {!reduced ? (
          <div className="run-rider" aria-hidden="true">
            <div key={step} className="run-rider-hop">
              <PetCharacter
                mood={running ? 'focused' : 'fan'}
                status={running ? 'thinking' : 'idle'}
                reaction={running ? null : 'happy'}
                className="h-full w-full"
              />
            </div>
          </div>
        ) : null}
        <ol className="run-stops" aria-label={`${title} pipeline, ${count} stages in order`}>
          {nodes.map((node, i) => (
            <li
              key={node.id}
              className="run-stop"
              data-state={i < step ? 'done' : i === step ? 'active' : 'idle'}
            >
              <span className="run-dot flex-none" aria-hidden="true" />
              <span className="run-name t-sign transition-colors sm:max-w-[13ch]">{node.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-7 flex min-h-11 flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
        <p className="t-data text-muted">
          {running ? (
            <>
              Stage {step + 1} of {count} <span className="text-ink">· {nodes[step].label}</span>
            </>
          ) : (
            <>Run complete · {count} stages</>
          )}
        </p>
        {!reduced ? (
          <button
            type="button"
            onClick={() => {
              animated.current = true;
              setStep(0);
            }}
            disabled={running}
            className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-ink underline decoration-[var(--line)] decoration-2 underline-offset-4 disabled:text-muted disabled:no-underline"
          >
            <Replay size={15} />
            {running ? 'Running' : 'Replay the run'}
          </button>
        ) : null}
      </div>
    </div>
  );
}
