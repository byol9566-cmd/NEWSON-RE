'use client'

import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import Link from 'next/link'

/* ── Hero Slider ── */
const HERO_SLIDES = [
  {
    eyebrow: 'VOL.01 · PRESS NETWORK',
    headline: <>당신의 이야기를,<br /><span className="hl-accent">200개 언론사</span>에<br />한 번에.</>,
    sub: '보도자료 기획부터 언론사 송출, 네이버 블로그 게재까지 — 모든 언론홍보를 원스톱으로 처리합니다.',
    cta1: { label: '무료 견적 받기', href: '/inquiry', icon: true },
    cta2: { label: '비용 안내 보기', href: '/pricing' },
    bg: '/images/hero-01.png',
    caption: 'PRESS CONFERENCE · DAILY BRIEFING',
    figure: 'Coverage across 200+ Korean media outlets',
  },
  {
    eyebrow: 'VOL.02 · DIGITAL REACH',
    headline: <>언론 기사 +<br /><span className="hl-accent">네이버 블로그</span><br />동시 게재.</>,
    sub: '포털 뉴스 노출과 네이버 블로그 게재를 동시에 진행해 검색 노출 효과를 극대화합니다.',
    cta1: { label: '상담 신청하기', href: '/inquiry', icon: false },
    cta2: { label: '서비스 자세히 보기', href: '/business' },
    bg: '/images/hero-02.png',
    caption: 'SEARCH ANALYTICS · NAVER VIEW TAB',
    figure: '98% search exposure within 48 hours',
  },
  {
    eyebrow: 'VOL.03 · BRAND TRUST',
    headline: <>신문기사 광고,<br />TV광고보다 <span className="hl-accent">10%p</span><br />더 신뢰받습니다.</>,
    sub: 'AC닐슨 조사 결과, 한국인이 가장 신뢰하는 광고 형태 1위는 신문기사(69%)입니다. 뉴스온과 함께 신뢰를 쌓으세요.',
    cta1: { label: '지금 시작하기', href: '/inquiry', icon: false },
    cta2: { label: '클라이언트 보기', href: '/clients' },
    bg: '/images/hero-03.png',
    caption: 'PRINT MEDIA · TRUSTED SINCE 2010',
    figure: 'AC Nielsen · 69% trust newspapers',
  },
]

const SLIDE_DUR = 5000

function HeroSection() {
  const [idx, setIdx] = useState(0)
  const [prog, setProg] = useState(0)
  const [paused, setPaused] = useState(false)
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((n: number) => {
    setIdx((prev) => {
      const next = ((n % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length
      return next
    })
    setProg(0)
  }, [])

  useEffect(() => {
    if (paused) return
    progRef.current = setInterval(() => {
      setProg((p) => {
        const next = p + 100 / (SLIDE_DUR / 100)
        if (next >= 100) {
          setIdx((i) => (i + 1) % HERO_SLIDES.length)
          return 0
        }
        return next
      })
    }, 100)
    return () => { if (progRef.current) clearInterval(progRef.current) }
  }, [paused, idx])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(idx - 1)
      if (e.key === 'ArrowRight') goTo(idx + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, goTo])

  const slide = HERO_SLIDES[idx]

  return (
    <section
      id="hero"
      aria-label="메인 히어로"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className="hero-inner">
          {/* Left: slide text */}
          <div className="hero-text" aria-live="polite">
            <div className="hero-slide-text is-active" key={idx}>
              <span className="eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-headline">{slide.headline}</h1>
              <p className="hero-sub">{slide.sub}</p>
              <div className="hero-cta">
                <Link href={slide.cta1.href} className="btn btn-primary">
                  {slide.cta1.icon && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                      <rect x="9" y="3" width="6" height="4" rx="1" />
                    </svg>
                  )}
                  {slide.cta1.label}
                </Link>
                <Link href={slide.cta2.href} className="btn btn-line">{slide.cta2.label}</Link>
              </div>
            </div>

            <div className="hero-controls">
              <span className="hero-counter" aria-live="polite">
                <span className="hc-cur">{String(idx + 1).padStart(2, '0')}</span>
                <span className="hc-sep">/</span>
                <span>03</span>
              </span>
              <div className="hero-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(prog)}>
                <div className="hero-progress-bar" style={{ width: `${prog}%` }} />
              </div>
              <div className="hero-arrows">
                <button className="hero-arrow" aria-label="이전 슬라이드" onClick={() => goTo(idx - 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="hero-arrow" aria-label="다음 슬라이드" onClick={() => goTo(idx + 1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right: editorial image panel */}
          <div className="hero-figure" aria-hidden="true">
            <div className="hero-figure-frame">
              {HERO_SLIDES.map((s, i) => (
                <div
                  key={s.caption}
                  className={`hero-figure-img${i === idx ? ' is-active' : ''}`}
                  style={{ backgroundImage: `url(${s.bg})` }}
                />
              ))}
              <div className="hero-figure-overlay" />
              <span className="hero-figure-volume">N°{String(idx + 1).padStart(2, '0')}</span>
            </div>
            <div className="hero-figure-caption">
              <span className="hfc-line" />
              <div>
                <div className="hfc-tag">{slide.caption}</div>
                <div className="hfc-text">{slide.figure}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Trust Strip countup ── */
const TRUST_ITEMS = [
  { eyebrow: '누적 보도자료', target: 12800, suffix: '+', label: '건 배포 완료' },
  { eyebrow: '제휴 언론사', target: 200, suffix: '+', label: '개 매체 네트워크' },
  { eyebrow: '누적 고객사', target: 1500, suffix: '+', label: '개 브랜드와 함께' },
  { eyebrow: '재계약률', target: 87, suffix: '%', label: '높은 만족도' },
]

function TrustItem({ eyebrow, target, suffix, label }: typeof TRUST_ITEMS[0]) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const observed = useRef(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true
        obs.unobserve(el)
        if (prefersReduced) { setCount(target); return }
        const dur = 1000
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          setCount(Math.round(p * target))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return (
    <div className="trust-item section-animate" ref={ref}>
      <span className="t-eyebrow">{eyebrow}</span>
      <span className="t-num">
        <span className="t-count">{count.toLocaleString()}</span>
        <span className="t-suffix">{suffix}</span>
      </span>
      <span className="t-label">{label}</span>
    </div>
  )
}

function TrustStrip() {
  return (
    <section id="trust-strip" aria-label="주요 실적">
      <div className="container">
        <div className="trust-grid">
          {TRUST_ITEMS.map((item) => (
            <TrustItem key={item.eyebrow} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section animate observer ── */
function useSectionAnimate() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('.section-animate')
    if (prefersReduced) {
      els.forEach((el) => el.classList.add('in-view'))
      return
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── CTA Quick Form ── */
function CtaForm() {
  const [errors, setErrors] = useState({ name: false, tel: false })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const tel = (form.elements.namedItem('tel') as HTMLInputElement).value.trim()
    const service = (form.elements.namedItem('service') as HTMLSelectElement).value

    const newErrors = { name: !name, tel: !tel }
    setErrors(newErrors)
    if (newErrors.name || newErrors.tel) return

    const params = new URLSearchParams({ name, tel, service })
    window.location.href = '/inquiry?' + params.toString()
  }

  return (
    <form className="cta-form" id="cta-quick-form" onSubmit={handleSubmit} noValidate>
      <div className="cf-row">
        <div className={`cf-field${errors.name ? ' has-error' : ''}`}>
          <label htmlFor="cf-name">성명 <span aria-hidden="true">*</span></label>
          <input
            type="text" id="cf-name" name="name" placeholder="홍길동" maxLength={50} required
            onChange={() => setErrors((e) => ({ ...e, name: false }))}
          />
          <span className="cf-error" role="alert">성명을 입력해 주세요.</span>
        </div>
        <div className={`cf-field${errors.tel ? ' has-error' : ''}`}>
          <label htmlFor="cf-tel">연락처 <span aria-hidden="true">*</span></label>
          <input
            type="tel" id="cf-tel" name="tel" placeholder="010-0000-0000" maxLength={20} required
            onChange={() => setErrors((e) => ({ ...e, tel: false }))}
          />
          <span className="cf-error" role="alert">연락처를 입력해 주세요.</span>
        </div>
      </div>
      <div className="cf-field">
        <label htmlFor="cf-service">관심 서비스</label>
        <select id="cf-service" name="service">
          <option value="">서비스를 선택하세요</option>
          <option value="보도자료 배포">보도자료 배포</option>
          <option value="네이버 블로그 게재">네이버 블로그 게재</option>
          <option value="언론홍보+블로그 원스톱">언론홍보+블로그 원스톱</option>
          <option value="기사형 광고">기사형 광고</option>
          <option value="위기관리·기사 정정">위기관리·기사 정정</option>
          <option value="인터뷰·기획기사">인터뷰·기획기사</option>
        </select>
      </div>
      <button type="submit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
        견적 요청하기
      </button>
    </form>
  )
}

/* ── Process Steps (desktop row, mobile fade carousel) ── */
const PROCESS_STEPS = [
  {
    num: '01', title: '상담 및 신청', desc: '전담 AE가 브랜드 니즈에 맞는 최적의 언론홍보 전략을 컨설팅합니다',
    icon: (
      <>
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
        <circle cx="9" cy="11.5" r="0.8" fill="currentColor"/>
        <circle cx="12.5" cy="11.5" r="0.8" fill="currentColor"/>
        <circle cx="16" cy="11.5" r="0.8" fill="currentColor"/>
      </>
    ),
  },
  {
    num: '02', title: '보도자료 준비', desc: '초안 작성·검토, 핵심 키워드 확인, 이미지 준비 (대필 서비스 이용 가능)',
    icon: (
      <>
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M11.5 13.5l2 2 4-4"/>
        <line x1="8" y1="17" x2="13" y2="17"/>
      </>
    ),
  },
  {
    num: '03', title: '언론사 송출', desc: '선정 언론사에 기사 송출. 예약 송출 및 주말·공휴일 즉시 송출 가능',
    icon: (
      <>
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </>
    ),
  },
  {
    num: '04', title: '포털 + 블로그 노출', desc: '네이버·다음·구글 뉴스 영역 노출 + 네이버 블로그 동시 게재',
    icon: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ),
  },
  {
    num: '05', title: '결과 보고', desc: '송출 완료 후 노출 결과 리포트를 상세하게 전달해 드립니다',
    icon: (
      <>
        <path d="M3 3v18h18"/>
        <polyline points="7 14 11 10 14 13 20 6"/>
        <polyline points="15 6 20 6 20 11"/>
      </>
    ),
  },
] as const

function ProcessSteps() {
  const [active, setActive] = useState(0)
  const total = PROCESS_STEPS.length
  const goPrev = () => setActive((i) => (i - 1 + total) % total)
  const goNext = () => setActive((i) => (i + 1) % total)

  return (
    <div className="process-steps section-animate" data-active={active}>
      {PROCESS_STEPS.map((step, i, arr) => (
        <Fragment key={step.num}>
          <div className={`ps-step${i === active ? ' is-active' : ''}`} data-idx={i}>
            <div className="ps-num">{step.num}</div>
            <div className="ps-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {step.icon}
              </svg>
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
          {i < arr.length - 1 && <div className="ps-arrow" aria-hidden="true" />}
        </Fragment>
      ))}
      <button type="button" className="ps-nav ps-nav-prev" onClick={goPrev} aria-label="이전 단계">‹</button>
      <button type="button" className="ps-nav ps-nav-next" onClick={goNext} aria-label="다음 단계">›</button>
      <div className="ps-dots" role="tablist" aria-label="단계 선택">
        {PROCESS_STEPS.map((s, i) => (
          <button
            key={s.num}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${s.num} ${s.title}`}
            className={`ps-dot${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Services Grid (desktop grid, mobile fade carousel) ── */
const SERVICES = [
  {
    num: '01', kicker: 'CORE', title: '보도자료 배포', href: '/pressrelease',
    desc: '200개 이상 제휴 언론사에 동시 송출. 메이저 종합지부터 업종별 전문지까지 맞춤 매체를 선택하실 수 있습니다.',
    icon: (
      <>
        <path d="M3 11l13-7v16L3 13z"/>
        <path d="M3 11h5v4l3 1V11"/>
        <path d="M16 8a4 4 0 010 8"/>
        <line x1="20" y1="6" x2="22" y2="6"/>
        <line x1="20" y1="12" x2="22" y2="12"/>
        <line x1="20" y1="18" x2="22" y2="18"/>
      </>
    ),
  },
  {
    num: '02', kicker: 'DIGITAL', title: '네이버 블로그 게재', href: '/business',
    desc: '언론 기사 배포와 동시에 네이버 블로그에 콘텐츠를 게재합니다. 뉴스 검색과 블로그 검색을 동시에 잡는 원스톱 솔루션.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2"/>
        <line x1="3" y1="8" x2="21" y2="8"/>
        <circle cx="6" cy="6" r="0.6" fill="currentColor"/>
        <circle cx="8.5" cy="6" r="0.6" fill="currentColor"/>
        <text x="9" y="15.5" fontSize="6" fontWeight="800" fill="currentColor" stroke="none">N</text>
        <line x1="13" y1="14" x2="18" y2="14"/>
        <line x1="13" y1="11.5" x2="18" y2="11.5"/>
      </>
    ),
  },
  {
    num: '03', kicker: 'EDITORIAL', title: '기사형 광고', href: '/pricing',
    desc: '광고가 아닌 기사로 인식되는 고신뢰 콘텐츠. 경제·IT·생활 등 카테고리에 맞는 기사형 광고로 브랜드 인지도를 높입니다.',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1.5"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="6" y1="6" x2="13" y2="6"/>
        <path d="M7 13c0-1 .8-2 2-2v3.5c0 .8-.5 1.5-1.5 1.5"/>
        <path d="M12 13c0-1 .8-2 2-2v3.5c0 .8-.5 1.5-1.5 1.5"/>
        <line x1="7" y1="18" x2="17" y2="18"/>
      </>
    ),
  },
  {
    num: '04', kicker: 'CRISIS', title: '위기관리·기사 정정', href: '/business',
    desc: '부정적 기사 발생 시 긍정 보도자료로 검색 순위를 밀어내 악성 기사 확산을 방지합니다. 브랜드 이미지를 신속하게 복원합니다.',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </>
    ),
  },
  {
    num: '05', kicker: 'INTERVIEW', title: '인터뷰·기획기사', href: '/business',
    desc: '대표 인터뷰, 상품 스토리텔링, 기획 기사로 브랜드의 진정성을 전달합니다. 전문 카피라이터가 기사를 직접 작성합니다.',
    icon: (
      <>
        <rect x="9" y="2" width="6" height="11" rx="3"/>
        <path d="M5 11a7 7 0 0014 0"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="9" y1="22" x2="15" y2="22"/>
      </>
    ),
  },
  {
    num: '06', kicker: 'SEARCH', title: '포털 노출 최적화', href: '/pricing',
    desc: '네이버·다음·구글 뉴스 노출을 위한 핵심 키워드 설정과 SEO 최적화 기사를 제공합니다. 검색 유입 극대화.',
    icon: (
      <>
        <circle cx="10" cy="10" r="7"/>
        <line x1="21" y1="21" x2="15.5" y2="15.5"/>
        <polyline points="6.5 12 8.5 9 10.5 10.5 13.5 7"/>
      </>
    ),
  },
] as const

function ServicesGrid() {
  const [active, setActive] = useState(0)
  const total = SERVICES.length
  const goPrev = () => setActive((i) => (i - 1 + total) % total)
  const goNext = () => setActive((i) => (i + 1) % total)

  return (
    <div className="services-grid section-animate" data-active={active}>
      {SERVICES.map((svc, i) => (
        <div key={svc.num} className={`service-card${i === active ? ' is-active' : ''}`} data-idx={i}>
          <div className="sc-head">
            <span className="sc-num">{svc.num}</span>
            <span className="sc-kicker">{svc.kicker}</span>
          </div>
          <div className="sc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {svc.icon}
            </svg>
          </div>
          <h3 className="sc-title">{svc.title}</h3>
          <p className="sc-desc">{svc.desc}</p>
          <Link href={svc.href} className="sc-link">
            자세히 보기
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      ))}
      <button type="button" className="sg-nav sg-nav-prev" onClick={goPrev} aria-label="이전 서비스">‹</button>
      <button type="button" className="sg-nav sg-nav-next" onClick={goNext} aria-label="다음 서비스">›</button>
      <div className="sg-dots" role="tablist" aria-label="서비스 선택">
        {SERVICES.map((s, i) => (
          <button
            key={s.num}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${s.num} ${s.title}`}
            className={`sg-dot${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Main export ── */
export default function HomePage() {
  useSectionAnimate()

  return (
    <>
      <HeroSection />

      {/* Trust Strip */}
      <TrustStrip />

      {/* One-stop */}
      <section id="onestop" aria-label="원스톱 서비스">
        <div className="container">
          <div className="onestop-inner section-animate">
            <div className="onestop-badge">ONE-STOP</div>
            <h2 className="onestop-title">언론홍보 · 보도자료 배포 · 네이버 블로그<br />한 번에 해결합니다</h2>
            <p className="onestop-desc">뉴스온은 국내 유일하게 언론 기사 송출과 네이버 블로그 게재를 동시에 진행합니다.<br />포털 뉴스 노출과 블로그 검색 유입을 동시에 극대화하여 브랜드 신뢰도를 빠르게 높입니다.</p>
            <div className="onestop-steps">
              {[
                {
                  label: '보도자료 기획·대필', desc: '전문 카피라이터가 브랜드 특성에 맞는 보도자료를 작성합니다',
                  icon: (
                    <>
                      <path key="p1" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline key="p2" points="14 2 14 8 20 8"/>
                      <line key="l1" x1="8" y1="13" x2="16" y2="13"/>
                      <line key="l2" x1="8" y1="16" x2="14" y2="16"/>
                    </>
                  ),
                },
                {
                  label: '200개 언론사 배포', desc: '메이저 언론사부터 전문지까지 맞춤 매체에 동시 송출합니다',
                  icon: (
                    <>
                      <path key="p1" d="M3 11l13-7v16L3 13z"/>
                      <path key="p2" d="M16 8a4 4 0 010 8"/>
                      <line key="l1" x1="20" y1="6" x2="22" y2="6"/>
                      <line key="l2" x1="20" y1="12" x2="22" y2="12"/>
                      <line key="l3" x1="20" y1="18" x2="22" y2="18"/>
                    </>
                  ),
                },
                {
                  label: '네이버 블로그 게재', desc: '언론 기사와 동시에 네이버 블로그에 게재해 검색 노출을 극대화합니다',
                  icon: (
                    <>
                      <rect key="r1" x="3" y="4" width="18" height="14" rx="2"/>
                      <line key="l1" x1="3" y1="8" x2="21" y2="8"/>
                      <circle key="c1" cx="6" cy="6" r="0.6" fill="currentColor"/>
                      <circle key="c2" cx="8.5" cy="6" r="0.6" fill="currentColor"/>
                      <text key="t1" x="9" y="15.5" fontSize="6" fontWeight="800" fill="currentColor" stroke="none">N</text>
                      <line key="l2" x1="13" y1="14" x2="18" y2="14"/>
                    </>
                  ),
                },
                {
                  label: '포털 노출 확인', desc: '네이버·다음·구글 노출 결과를 리포트로 전달해 드립니다',
                  icon: (
                    <>
                      <path key="p1" d="M3 3v18h18"/>
                      <polyline key="p2" points="7 14 11 10 14 13 20 6"/>
                      <polyline key="p3" points="15 6 20 6 20 11"/>
                    </>
                  ),
                },
              ].map((step, i, arr) => (
                <Fragment key={step.label}>
                  <div className="os-step">
                    <div className="os-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {step.icon}
                      </svg>
                    </div>
                    <div className="os-label">{step.label}</div>
                    <div className="os-desc">{step.desc}</div>
                  </div>
                  {i < arr.length - 1 && <div className="os-arrow" aria-hidden="true">→</div>}
                </Fragment>
              ))}
            </div>
            <Link href="/inquiry" className="btn btn-primary">원스톱 서비스 문의하기</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" aria-label="서비스 소개">
        <div className="container">
          <div className="section-head section-animate">
            <div className="sh-left">
              <span className="eyebrow">OUR SERVICES</span>
              <h2>언론홍보의 모든 것</h2>
              <p className="sh-sub">보도자료 기획부터 포털 노출, 네이버 블로그 게재까지 — 뉴스온 하나로 해결하세요.</p>
            </div>
            <Link href="/pricing" className="sh-link">비용 안내 →</Link>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* Why News — Editorial Spread */}
      <section id="why-news" aria-label="언론홍보를 선택해야 하는 이유">
        <div className="container">
          <div className="why-spread section-animate">
            {/* Left: editorial figure + pull quote */}
            <div className="why-figure">
              <div className="why-figure-frame">
                <div
                  className="why-figure-img"
                  style={{ backgroundImage: "url('/images/why-01.jpg')" }}
                />
                <div className="why-figure-shade" />
                <div className="why-figure-badge">
                  <span>FEATURE</span>
                  <span className="wfb-no">Nº01</span>
                </div>
              </div>
              <blockquote className="why-quote">
                <svg className="wq-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 5C5.9 5 3 7.9 3 11.5V19h7v-7H6.5C6.5 9.6 8.1 8 10.5 8V5zm11 0C16.9 5 14 7.9 14 11.5V19h7v-7h-3.5c0-2.4 1.6-4 4-4V5z"/>
                </svg>
                <p>신문기사는 여전히 가장 신뢰받는 광고 형태입니다. 디지털 시대에도 정통 저널리즘의 권위는 변하지 않습니다.</p>
                <cite>AC NIELSEN · 광고 신뢰도 조사</cite>
              </blockquote>
            </div>

            {/* Right: section content + stat comparison + features */}
            <div className="why-content">
              <span className="eyebrow">WHY PRESS RELEASE</span>
              <h2 className="why-h2">가장 신뢰도 높은 광고는<br /><span className="hl-accent">신문기사 광고</span>입니다</h2>
              <p className="why-lead">소비자가 가장 신뢰하는 광고 매체는 무엇일까요? AC닐슨 조사 결과, 신문기사 광고가 TV·인터넷·SNS를 모두 제치고 1위를 차지했습니다.</p>

              {/* Bar comparison chart */}
              <div className="trust-chart">
                <div className="tc-row">
                  <div className="tc-head">
                    <span className="tc-label">신문기사</span>
                    <span className="tc-pct">69<i>%</i></span>
                  </div>
                  <div className="tc-bar"><div className="tc-fill is-primary" style={{ width: '69%' }} /></div>
                  <span className="tc-note">한국인이 가장 신뢰하는 광고 형태 1위</span>
                </div>
                <div className="tc-row">
                  <div className="tc-head">
                    <span className="tc-label">TV광고</span>
                    <span className="tc-pct tc-pct-sec">59<i>%</i></span>
                  </div>
                  <div className="tc-bar"><div className="tc-fill" style={{ width: '59%' }} /></div>
                  <span className="tc-note">신문기사 광고 대비 <strong>10%p 낮은 신뢰도</strong></span>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="why-features">
                <div className="wf-item">
                  <div className="wf-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9"/>
                      <polyline points="12 7 12 12 15 14"/>
                    </svg>
                  </div>
                  <div>
                    <h4>지속적인 홍보 효과</h4>
                    <p>한번 게재된 기사는 검색에 영구 노출되어 시간이 지나도 효과가 유지됩니다.</p>
                  </div>
                </div>
                <div className="wf-item">
                  <div className="wf-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="6" cy="6" r="2"/>
                      <circle cx="18" cy="6" r="2"/>
                      <circle cx="12" cy="18" r="2"/>
                      <line x1="7.5" y1="7.5" x2="10.5" y2="16.5"/>
                      <line x1="16.5" y1="7.5" x2="13.5" y2="16.5"/>
                      <line x1="8" y1="6" x2="16" y2="6"/>
                    </svg>
                  </div>
                  <div>
                    <h4>2차 확산 마케팅</h4>
                    <p>블로그·SNS 자연 바이럴이 발생해 추가 비용 없이 홍보 효과가 확산됩니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Marquee */}
      <section id="client-marquee" aria-label="주요 클라이언트">
        <div className="container">
          <div className="marquee-head section-animate">
            <span className="eyebrow">OUR CLIENTS</span>
            <h2>1,500+ 브랜드가 뉴스온과 함께합니다</h2>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {['미소빌딩연구소','마켓비','린나이코리아','티엘비코리아','서울약사신협','고운세상피부과','명지혼혜병원','이름코리아','동서제약웰빙',
              '미소빌딩연구소','마켓비','린나이코리아','티엘비코리아','서울약사신협','고운세상피부과','명지혼혜병원','이름코리아','동서제약웰빙',
            ].map((name, i) => (
              <span key={i} className="marquee-item"><span className="mi-mark" />{name}</span>
            ))}
          </div>
        </div>
        <div className="marquee right" aria-hidden="true">
          <div className="marquee-track">
            {['현대백화점','롯데면세점','GS리테일','CJ푸드빌','빙그레','한국맥도날드','오뚜기','풀무원','매일유업',
              '현대백화점','롯데면세점','GS리테일','CJ푸드빌','빙그레','한국맥도날드','오뚜기','풀무원','매일유업',
            ].map((name, i) => (
              <span key={i} className="marquee-item"><span className="mi-mark" />{name}</span>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="marquee-foot">
            <Link href="/clients">전체 클라이언트 보기 →</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" aria-label="진행 프로세스">
        <div className="container">
          <div className="section-head section-animate" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="sh-left" style={{ maxWidth: '100%' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>PROCESS</span>
              <h2>5단계로 완성되는 언론홍보</h2>
            </div>
          </div>
          <ProcessSteps />

        </div>
      </section>

      {/* CTA Banner */}
      <section id="cta-banner" aria-label="견적 신청">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-left section-animate">
              <span className="eyebrow">GET STARTED</span>
              <h2>지금 무료로<br />견적 받아보세요</h2>
              <div className="cta-meta">
                <div className="cta-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span><strong>평균 2시간 내 답변</strong>평일 09:00 ~ 18:00</span>
                </div>
                <div className="cta-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span><strong>031-758-0215</strong>전화 상담도 가능합니다</span>
                </div>
                <div className="cta-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
                  </svg>
                  <span><strong>언론홍보·블로그 원스톱</strong>한 번의 문의로 모두 해결</span>
                </div>
              </div>
            </div>
            <div className="cta-right section-animate">
              <CtaForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
