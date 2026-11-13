import { ImageResponse } from 'next/og';

export const alt = 'Mitul Bhatia (mitulb95.dev) — AI and Full-Stack Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const INK = '#14151A';
const PAPER = '#F1F3F4';
const LINES = [
  { color: '#D8002B', label: 'AEGIS' },
  { color: '#0057B8', label: 'Flately' },
  { color: '#00843D', label: 'Agrovers' },
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PAPER,
          color: INK,
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 24, fontWeight: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 36,
                border: `8px solid ${INK}`,
                backgroundColor: '#FFFFFF',
              }}
            />
            <span>mitulb95.dev</span>
          </div>
          <span>AI / Full-Stack Engineer</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.95, letterSpacing: '-5px' }}>Mitul Bhatia</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 28, maxWidth: 940 }}>
            Agentic systems, backend APIs, and real-time products with clear architecture and measured behavior.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {LINES.map((line) => (
            <div key={line.label} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 150, fontSize: 24, fontWeight: 800 }}>{line.label}</div>
              <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', height: 14, borderRadius: 14, backgroundColor: line.color }}>
                {[0, 1, 2, 3, 4].map((stop) => (
                  <div
                    key={stop}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 26,
                      border: `6px solid ${INK}`,
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
