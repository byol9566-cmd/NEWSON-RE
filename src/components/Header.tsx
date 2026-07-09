'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

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
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

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

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (navOpen) {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
    } else {
      hamburgerRef.current?.focus()
    }
  }, [navOpen])

  function handleNavKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setNavOpen(false)
      return
    }
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <header id="header" role="banner" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div id="logo">
            <Link href="/" aria-label="뉴스온 홈으로">
              NEWS<span className="logo-dot">ON</span>
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
            ref={hamburgerRef}
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
        inert={!navOpen}
        className={navOpen ? 'open' : ''}
        onClick={(e) => { if (e.target === e.currentTarget) setNavOpen(false) }}
        onKeyDown={handleNavKeyDown}
      >
        <div className="mn-panel" ref={panelRef}>
          <div className="mn-header">
            <span className="mn-brand">
              NEWS<span className="logo-dot">ON</span>
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
