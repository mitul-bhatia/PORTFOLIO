'use client';

import { useEffect, useState } from 'react';

const FORMAT = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** The board's clock: Mitul's local time, ticking. Renders empty until mounted. */
export function StationClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(FORMAT.format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="t-data flex items-center gap-2 text-yellow" aria-hidden={time ? undefined : true}>
      <span className="live-dot" aria-hidden="true" />
      <span className="sr-only">Local time in India: </span>
      <span className="min-w-[8ch]">{time || '--:--:--'}</span> IST
    </p>
  );
}
