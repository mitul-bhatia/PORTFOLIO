'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export function SlidingNumber({ value }: { value: string }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  // Extract prefix, number, and suffix (e.g. "<24ms" -> prefix: "<", num: 24, suffix: "ms")
  const match = value.match(/^([^0-9.]*)([0-9.]+)(.*)$/);

  const prefix = match ? match[1] : '';
  const targetNum = match ? parseFloat(match[2]) : null;
  const suffix = match ? match[3] : '';
  const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;

  const [currentNum, setCurrentNum] = useState<number>(0);

  useEffect(() => {
    if (shouldReduceMotion || targetNum === null || !isInView) {
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentNum(eased * targetNum);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentNum(targetNum);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, shouldReduceMotion, targetNum]);

  if (shouldReduceMotion || targetNum === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {currentNum.toFixed(decimals)}
      {suffix}
    </span>
  );
}
