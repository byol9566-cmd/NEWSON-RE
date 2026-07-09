import { ImageResponse } from 'next/og'

export const alt = '뉴스온 — 언론홍보·보도자료 배포·네이버 블로그 원스톱 대행'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f1729',
          backgroundImage:
            'linear-gradient(135deg, #0f1729 0%, #1f2a44 100%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 140, fontWeight: 800, letterSpacing: -6 }}>
          <span style={{ color: '#e8234a' }}>NEWS</span>
          <span style={{ color: '#8b95a8' }}>ON</span>
        </div>
        <div
          style={{
            display: 'flex',
            width: 120,
            height: 6,
            borderRadius: 3,
            background: '#e8234a',
            margin: '28px 0 36px',
          }}
        />
        <div style={{ display: 'flex', fontSize: 34, color: '#c7cdd8', letterSpacing: 1 }}>
          PR &amp; Media Distribution Agency
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#7d8699', marginTop: 14 }}>
          908 Media Outlets Network · www.newson.co.kr
        </div>
      </div>
    ),
    { ...size }
  )
}
