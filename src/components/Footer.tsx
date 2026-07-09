import Link from 'next/link'

export default function Footer() {
  return (
    <footer id="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col-brand">
            <div className="footer-brand">
              NEWS<span className="logo-dot">ON</span>
            </div>
            <p className="footer-tagline">언론홍보·보도자료 배포·네이버 블로그 게재를 한 번에 처리하는 언론홍보 전문 대행사입니다.</p>
            <div className="footer-meta">
              <p><strong>뉴스온 (NEWSON)</strong></p>
              <p>사업자등록번호 : 428-86-00314 | 대표 : 이은별</p>
              <p>경기도 하남시 미사대로 550, C동 10층 1001호 (현대지식산업센터 한강미사)</p>
            </div>
          </div>

          <div className="footer-col">
            <h4>서비스</h4>
            <ul>
              <li><Link href="/company">회사소개</Link></li>
              <li><Link href="/pressrelease">보도자료 배포</Link></li>
              <li><Link href="/business">네이버 블로그 게재</Link></li>
              <li><Link href="/pricing">언론홍보 비용</Link></li>
              <li><Link href="/brand-award">브랜드대상</Link></li>
              <li><Link href="/clients">클라이언트</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-contact">
            <h4>연락처</h4>
            <div className="fc-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div>
                <a href="tel:1544-4701" className="fc-phone">1544-4701</a><br />
                평일 09:00 ~ 18:00
              </div>
            </div>
            <div className="fc-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:newsmarketing@daum.net">newsmarketing@daum.net</a>
            </div>
            <Link href="/inquiry" className="btn btn-primary" style={{ marginTop: '16px', fontSize: '13px', padding: '10px 18px' }}>온라인 문의하기</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright &copy; 2026 뉴스온 (NEWSON). All Rights Reserved.</span>
          <div className="fb-links">
            <Link href="/terms">이용약관</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/location">오시는 길</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
