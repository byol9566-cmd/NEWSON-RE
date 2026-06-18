'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: '회사소개', href: '/company' },
  { label: '브랜드대상', href: '/brand-award' },
  { label: '언론홍보 비용', href: '/pricing' },
  { label: '사업분야', href: '/business' },
  { label: 'Clients', href: '/clients' },
  { label: '온라인문의', href: '/inquiry' },
  { label: '고객센터', href: '/customer' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [navOpen])

  useEffect(() => {
    setNavOpen(false)
  }, [pathname])

  return (
    <>
      <header id="header" role="banner" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div id="logo">
            <Link href="/" aria-label="뉴스온 홈으로">
              <span className="logo-mark" aria-hidden="true" />NEWS<span className="logo-dot">ON</span>
            </Link>
          </div>

          <nav id="nav" aria-label="주요 메뉴">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'is-active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/inquiry" className="header-cta" aria-label="무료 견적 받기">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
            </svg>
            무료 견적
          </Link>

          <button
            id="hamburger"
            aria-label={navOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={navOpen}
            className={navOpen ? 'open' : ''}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="모바일 메뉴"
        aria-modal="true"
        className={navOpen ? 'open' : ''}
        onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false) }}
      >
        <div className="mn-panel">
          <div className="mn-header">
            <span className="mn-brand">
              <span className="logo-mark" aria-hidden="true" />NEWSON
            </span>
            <button id="close-nav" onClick={() => setNavOpen(false)} aria-label="메뉴 닫기">✕</button>
          </div>
          <nav className="mn-nav">
            <Link href="/">홈</Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'is-active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mn-foot">
            <span>전화 상담</span>
            <span className="mn-phone">1544-4701</span>
            <span>평일 09:00 ~ 18:00</span>
            <Link href="/inquiry">온라인 견적 신청 →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
