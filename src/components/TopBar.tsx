export default function TopBar() {
  return (
    <div id="top-bar">
      <div className="container">
        <div className="topbar-meta">
          <span className="tm-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <a href="tel:1544-4701" className="tm-phone">1544-4701</a>
          </span>
          <span className="tm-item">평일 09:00 ~ 18:00</span>
        </div>
        <div className="topbar-links">
          <a href="/" aria-current="page">홈</a>
          <a href="/inquiry">온라인문의</a>
          <a href="/customer">고객센터</a>
        </div>
      </div>
    </div>
  )
}
