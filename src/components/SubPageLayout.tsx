import Link from 'next/link'
import { ReactNode } from 'react'

interface SidebarItem {
  label: string
  href: string
  active?: boolean
}

interface SubPageLayoutProps {
  eyebrow: string
  title: string
  sub: string
  breadcrumb: string
  sidebarHeading: string
  sidebarItems: SidebarItem[]
  consultHeading?: string
  consultBtnLabel?: string
  consultBtnHref?: string
  children: ReactNode
}

export default function SubPageLayout({
  eyebrow,
  title,
  sub,
  breadcrumb,
  sidebarHeading,
  sidebarItems,
  consultHeading = 'CONTACT',
  consultBtnLabel = '온라인 문의하기',
  consultBtnHref = '/inquiry',
  children,
}: SubPageLayoutProps) {
  return (
    <>
      <section id="page-header">
        <div className="container">
          <div className="page-header-inner">
            <div>
              <span className="eyebrow ph-eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p className="ph-sub">{sub}</p>
            </div>
            <nav className="breadcrumb" aria-label="경로">
              <Link href="/">HOME</Link>
              <span className="bc-sep">/</span>
              <span className="bc-current">{breadcrumb}</span>
            </nav>
          </div>
        </div>
      </section>

      <section id="sub-body">
        <div className="container">
          <aside id="sidebar">
            <div className="sidebar-block">
              <div className="sidebar-block-hd">{sidebarHeading}</div>
              {sidebarItems.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={`sidebar-item${item.active ? ' active' : ''}`}
                >
                  {item.label} <span className="arrow">→</span>
                </Link>
              ))}
            </div>
            <div className="sidebar-consult">
              <div className="sidebar-consult-hd">{consultHeading}</div>
              <span className="consult-phone">031-758-0215</span>
              <div className="consult-hours">
                <span className="label">운영시간</span><br />
                평일 09:00 ~ 18:00<br />
                토·일·공휴일 휴무
              </div>
              <Link href={consultBtnHref} className="consult-btn">{consultBtnLabel}</Link>
            </div>
          </aside>

          <div id="content-area">
            <div className="content-inner">
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
