import { ImageResponse } from 'next/og';

export const alt = 'Mitul Bhatia — AI and Full-Stack Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

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
          backgroundColor: '#F3E9DA',
          padding: '60px 80px',
          border: '12px solid #2B1D14',
          fontFamily: 'serif',
        }}
      >
        {/* Top Header Plate */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #D9C9AC',
            paddingBottom: '20px',
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#6B5744',
            letterSpacing: '2px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 14, height: 14, backgroundColor: '#A8672E' }} />
            <span style={{ fontWeight: 'bold', color: '#2B1D14' }}>
              MITUL BHATIA — PORTFOLIO
            </span>
          </div>
          <span style={{ color: '#A8672E', fontWeight: 'bold' }}>
              NST CLASS OF &apos;28
          </span>
        </div>

        {/* Center Hero Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 'bold',
              color: '#2B1D14',
              lineHeight: 1.05,
              letterSpacing: '-2px',
            }}
          >
            Mitul Bhatia
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 26,
              color: '#A8672E',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            AI / Full-Stack Engineer · Agentic Systems & LLM Infrastructure
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#6B5744',
              maxWidth: '900px',
              lineHeight: 1.4,
              marginTop: '8px',
            }}
          >
            Agentic systems, backend APIs, and real-time products with clear architecture and measured behavior.
          </div>
        </div>

        {/* Bottom Metrics Plate */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#EADFC8',
            border: '2px solid #2B1D14',
            padding: '20px 32px',
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#2B1D14',
          }}
        >
          <div style={{ display: 'flex', gap: '40px' }}>
            <span>
              GUARDRAIL: <strong style={{ color: '#A8672E' }}>&lt;24ms</strong>
            </span>
            <span>
              SYNC: <strong style={{ color: '#A8672E' }}>&lt;45ms</strong>
            </span>
            <span>
              CGPA: <strong style={{ color: '#A8672E' }}>9.65 / 10.0</strong>
            </span>
          </div>
          <span style={{ fontWeight: 'bold' }}>MITULBHATIA.DEV</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
