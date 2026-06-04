# 뉴스온(NEWSON) 디자인 시스템 — v2 (실사이트 기준 리뉴얼)

> 갱신: 2026-05-16. **본 문서는 처음부터 새로 만드는 것이 아니라, 이미 모던하게 구축된 실제 운영 사이트 `c:\client`를 현대화 리뉴얼하기 위한 디자인 시스템이다.**
> 측정값은 `c:\client\style.css` 실측 + 레퍼런스 3종 Playwright `getComputedStyle` 실측 기반.

---

## 0. 전제 — 보존 vs 변경

| 구분 | 항목 | 정책 |
|------|------|------|
| 🔒 **절대 보존** | 메인 컬러 `#e8234a` (시그니처 레드) | 변경 금지 |
| 🔒 **절대 보존** | 메뉴 구성 (브랜드대상·언론홍보 비용·사업분야·Clients·온라인문의·고객센터) | 변경 금지 |
| 🔒 **절대 보존** | 모든 기능 (히어로 슬라이더·카운트업·견적폼·가격티어·FAQ 아코디언·게시판·구글맵·마키) | 동작 동일 보존 |
| 🔒 **절대 보존** | 비즈니스 데이터 (200개 언론사·1,500 고객사·12,800건·87% 재계약·031-758-0215 등) | 텍스트 동일 |
| 🔄 **현대화** | 타이포 위계, radius, shadow, 섹션 배경 리듬, 여백, 이미지 | 적극 개선 |
| 🆕 **신규** | 무료 스톡 이미지(브랜드 톤 처리), 산세리프 헤드라인 | 도입 |

**디자인 강도: 중간(균형)** — 정교한 진화를 기반으로, 히어로·핵심 섹션에만 에디토리얼 임팩트 가미.

---

## 1. 레퍼런스 종합

| 레퍼런스 | 컨텍스트 | NEWSON에 적용할 핵심 | 적용 강도 |
|---|---|---|---|
| **MediaBee** (mediabee.com) | 한국 B2B PR 플랫폼 — 최근접 모델 | Noto Sans KR 14px, 부드러운 파스텔/민트 섹션 교차, 라운드 카드, 6px 버튼, 큰 컬러 통계 숫자, 좌우 교차 피처 블록, 다크네이비 푸터 | **1차 모델** |
| **Sana Labs** (sanalabs.com) | 글로벌 B2B SaaS, 에디토리얼 | h1 83px·트래킹 -0.03em·라인하이트 ~1.0, 풀블리드 사진, 화이트/그레이 섹션 교차, 알약 버튼, 그리드 푸터 | 히어로·핵심 섹션 타이포 |
| **Maze** (maze.co) | US SaaS | 넉넉한 섹션 여백(80~208px), 알약 배지/태그 시스템, 세그먼트 탭, 라운드 카드 그리드, 액센트 컬러 블록 | 여백 스케일·배지·탭 |

실측 결과:
- Sana h1 `83.2px / weight 400 / -2.5px(-0.03em) / lh 79px`, 버튼 `radius 36px`
- MediaBee h1 `54px / weight 500 / -1.35px(-0.025em) / lh 75.6px`, 버튼 `radius 6px / bg #008a87`, body `Noto Sans KR 14px`
- Maze h1 `130px / weight 300 / -11.7px / Phonic`, body 16px (NEWSON엔 과함)

---

## 2. 컬러 토큰

기존 `--ns-*` 네이밍 체계 **유지**(Tailwind theme로 매핑). 레드는 불변, 중립/틴트만 리듬 강화.

```css
:root {
  /* 🔒 시그니처 레드 — 불변 */
  --ns-red:        #e8234a;
  --ns-red-deep:   #c81a3d;   /* hover */
  --ns-red-soft:   #fdeef2;   /* tint 배경 */
  --ns-red-tint:   #fbf3f5;   /* NEW — 섹션 배경용 초연한 레드 틴트 */

  /* 잉크/텍스트 — 유지 */
  --ns-ink:        #0f1729;
  --ns-ink-2:      #1f2a44;
  --ns-slate:      #4a5568;
  --ns-slate-2:    #6b7280;

  /* 표면 — 유지 + 섹션 리듬 추가 */
  --ns-bg:         #ffffff;
  --ns-paper:      #fafbfc;
  --ns-paper-2:    #f4f6f9;
  --ns-line:       #e2e7ed;
  --ns-line-2:     #f0f2f5;
  --ns-mist:       #f6f8fb;   /* NEW — 중립 파스텔 섹션 배경 (MediaBee 모델) */

  /* 액센트 — 유지 (보조, 레드 보호선 내) */
  --ns-accent:     #0072bc;
  --ns-accent-dk:  #005a96;
  --ns-accent-lt:  #e8f4fc;
  --ns-success:    #1f9d55;
}
```

### 섹션 배경 교차 시스템 (NEW — 가장 큰 시각적 변화)

현재 사이트는 거의 흰 배경 + 1px 보더로만 섹션을 구분 → **2000년대 격자감**의 주원인.
→ 보더 격자를 **걷어내고, 배경 톤 교차 + 여백**으로 섹션을 구분 (MediaBee/Sana 공통 패턴).

| 순서 | 섹션(홈 기준) | 배경 |
|---|---|---|
| 1 | 히어로 | `--ns-bg` (흰색) + 사진/그라디언트 |
| 2 | trust-strip 통계 | `--ns-mist` |
| 3 | onestop | `--ns-ink` (다크, 유지) |
| 4 | services | `--ns-bg` |
| 5 | why-news | `--ns-red-tint` |
| 6 | client-marquee | `--ns-mist` |
| 7 | process | `--ns-bg` |
| 8 | cta-banner | `--ns-ink` (다크, 유지) |
| 9 | footer | `--ns-ink` (유지) |

서브페이지: page-header `--ns-mist`, 콘텐츠 영역 `--ns-bg`.

---

## 3. 타이포그래피 — 산세리프 전환

**결정: 헤드라인 세리프(Noto Serif KR) → 산세리프 전환.** Pretendard 주력, 타이트 음수 트래킹으로 에디토리얼 무게 확보 (Sana/MediaBee 방식).

```css
:root {
  --ff-sans:    'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
  --ff-display: 'Pretendard', 'Noto Sans KR', system-ui, sans-serif;  /* serif → sans */
  --ff-mono:    'Inter', 'Pretendard', sans-serif;  /* 숫자/메타 — 유지 */
  /* Noto Serif KR 로드 제거 */
}
```

### 타입 스케일 (clamp 반응형 유지, 위계 강화)

| 토큰 | 값 | 용도 | weight / tracking | 변경 |
|---|---|---|---|---|
| `--fs-display` | `clamp(40px, 4.5vw+12px, 72px)` | 히어로 h1 | 800 / `-0.03em` | 상향(64→72), 산세리프 |
| `--fs-h1` | `clamp(30px, 2.6vw+12px, 46px)` | 섹션 헤드 | 800 / `-0.025em` | 산세리프 |
| `--fs-h2` | `clamp(22px, 1.6vw+10px, 32px)` | 서브섹션 | 700 / `-0.02em` | 유지 |
| `--fs-h3` | `19px` | 카드 타이틀 | 700 / `-0.015em` | 18→19 |
| `--fs-body` | `15px` | 본문 | 400 / `-0.01em` | 유지 |
| `--fs-small` | `13px` | 보조 | 400 | 유지 |
| `--fs-meta` | `12px` | 메타/배지 | 600 / `0.04em` | 유지 |

라인하이트: 디스플레이 `1.08`(타이트, Sana식), 헤드 `1.18`, 본문 `1.7`(유지).
숫자(통계·가격·전화)는 `--ff-mono` + `font-variant-numeric: tabular-nums` 유지.

---

## 4. 여백 & 리듬 (더 넉넉하게)

8px 베이스 유지. **섹션 세로 여백을 상향** (현재 56~96 → 80~120, MediaBee/Maze 리듬).

```css
:root {
  --sp-section:    clamp(72px, 9vw, 120px);   /* 섹션 상하 — 상향 */
  --sp-section-sm: clamp(56px, 7vw, 88px);    /* 다크/컴팩트 섹션 */
  --gap-grid:      24px;                        /* 카드 그리드 — 16→24 (보더 제거분 여백 보강) */
  --gap-grid-lg:   32px;
  --container:     1200px;   /* 유지 */
}
```

---

## 5. Border Radius (신규 — 현재 ≈0)

현재 사이트는 모서리가 전부 각짐 → 라운드 도입이 "현대화" 체감의 핵심.

```css
:root {
  --r-xs:   4px;    /* 배지/태그 작은 것 */
  --r-sm:   6px;    /* 버튼·인풋 (MediaBee 실측 6px) */
  --r-md:   10px;   /* 작은 카드 */
  --r-lg:   16px;   /* 카드·패널 (services-card, tier, news-card) */
  --r-xl:   24px;   /* 히어로 콜아웃·이미지 컨테이너 */
  --r-pill: 999px;  /* 알약 배지/칩 (Maze/Sana) */
}
```

적용: 버튼/인풋 `--r-sm`, 카드류 `--r-lg`, 배지/칩/필터 `--r-pill`, 이미지 래퍼 `--r-xl`.

---

## 6. Shadow (신규 — 현재 거의 없음)

플랫 → 카드/호버에 부드러운 엘리베이션. 과하지 않게(중간 강도).

```css
:root {
  --sh-xs:    0 1px 2px rgba(15,23,41,0.04);
  --sh-sm:    0 2px 8px rgba(15,23,41,0.05);
  --sh-card:  0 4px 16px rgba(15,23,41,0.06);
  --sh-hover: 0 12px 32px rgba(15,23,41,0.10);
  --sh-red:   0 8px 24px rgba(232,35,74,0.18);   /* 레드 CTA 강조용 */
}
```

원칙: 보더 1px 격자 → **보더 제거 + `--sh-card`** 로 대체. 호버 시 `--sh-hover` + `translateY(-4px)`.

---

## 7. 컴포넌트 스펙 (c:\client → 현대화 매핑)

각 항목 = **기능 동일 보존**, 표면만 현대화.

### 7.1 마스트헤드 + 탑바 + 헤더
- 3px 레드 마스트헤드 라인 **유지** (브랜드 시그니처)
- 탑바: 유지, 배경 `--ns-mist`
- 헤더: backdrop-blur 글래스 효과 유지, 스크롤 축소(80→60px) 유지. 보더-바텀 1px → 스크롤 시 `--sh-sm`로 전환
- nav 언더라인 애니메이션 유지. CTA "무료 견적" 버튼 → `--r-sm` + `--sh-red`
- 모바일 슬라이드 내비: 유지, 링크 서체 산세리프 전환

### 7.2 히어로 (3슬라이드 — 기능 보존)
- 슬라이더/진행바/카운터/화살표/키보드/hover-pause **전부 보존**
- 헤드라인: 세리프 → 산세리프, `--fs-display` 800, `-0.03em`, lh 1.08
- 좌측 텍스트 + 우측 뉴스카드 모자이크 구조 유지 → 카드에 `--r-lg` + `--sh-card`, 미세 회전 제거(중간강도: 정렬된 안정감)
- **신규 이미지**: 히어로 우측 또는 배경에 B2B 스톡 이미지(뉴스룸/미디어) — 레드 듀오톤 처리로 브랜드 일치
- CTA: `.btn-primary` `--r-sm` + `--sh-red`, `.btn-line` `--r-sm`

### 7.3 trust-strip (카운트업 — 보존)
- IntersectionObserver 카운트업 **보존**
- 4열 보더 구분 → **보더 제거**, 배경 `--ns-mist`, 각 셀 카드화(`--r-lg`, `--sh-xs`, 흰 배경)
- 숫자 `--ff-mono` 800, 레드 suffix 유지, 크기 상향

### 7.4 onestop (다크 배너)
- 다크 배경 + 레디얼 레드 그라디언트 유지
- 4스텝 → `--r-lg` 카드, hover 강화. 배지 알약형(`--r-pill`)

### 7.5 services-grid (6 카드 — 보존)
- 3열 보더 격자 → **보더 제거**, `--gap-grid` 간격 + 카드화(`--r-lg`, `--sh-card`)
- hover: `translateY(-4px)` + `--sh-hover` + 상단 레드 스트라이프 애니메이션 유지
- 넘버링(01~06)·아이콘·링크 화살표 유지

### 7.6 why-news
- 배경 `--ns-red-tint`. 통계 카드 + 일반 카드 혼합 그리드 → 라운드/섀도 통일
- 큰 숫자(69%/59%) 모노 800 유지

### 7.7 client-marquee (무한 흐름 — 보존)
- 좌/우 마키 애니메이션·hover-pause·mask 페이드 **보존**
- 배경 `--ns-mist`. 아이템 그레이스케일 완화(`grayscale(.7) opacity(.7)`)
- **신규**: 텍스트 마키 → 실제 로고가 없으므로 모노그램 칩(`--r-md`, `--sh-xs`)로 품질 상향

### 7.8 process-steps (5단계 — 보존)
- 수평 스텝퍼 구조 유지, 커넥터 라인 유지. 원형 마커 레드 보더 유지
- 반응형(900px 3열→모바일 세로) 동작 보존

### 7.9 cta-banner + 견적 폼 (기능 보존)
- 다크 배너 + 인라인 폼: `cta-quick-form` 검증·`inquiry.html` 파라미터 전달 **로직 보존**
- 폼 배경 `rgba(255,255,255,0.04)`→`0.06`, 보더 2px, 인풋 `--r-sm`, 포커스 레드 링 유지
- 제출 버튼 `--r-sm` + 로딩 상태 추가

### 7.10 footer (보존)
- 다크 그리드 푸터 유지. 보더 1px 구분 → 여백+톤으로 정리
- 산세리프 전환, 연락처 모노 숫자 유지, 하단 카피 유지

### 7.11 서브페이지 공용
| 요소 | 보존 기능 | 현대화 |
|---|---|---|
| page-header | 타이틀·브레드크럼 | 배경 `--ns-mist`, 우상단 레드 삼각 장식 강화 |
| 사이드바 | sticky·active·consult 박스 | 블록 카드화 `--r-lg`, active 레드 바 유지 |
| pricing-tiers | 3패키지·추천 ribbon | 카드 `--r-lg`+`--sh-card`, 추천 2px 레드+`--sh-red`, hover lift |
| FAQ `<details>` | 네이티브 아코디언 | +/− 아이콘·트랜지션 유지, 행 라운드 hover |
| board-list | 게시판 그리드·공지태그 | 풀셀 보더 → 행 하단 보더만, hover `--ns-mist`, 공지 알약 배지 |
| inquiry-form | required·submit 핸들러 | 인풋 언더라인 → 박스형 `--r-sm`, 에러 배경 틴트 |
| clients-grid | 28셀·통계 | 보더격자 → 카드칩 `--r-md`, hover lift |
| timeline | 연혁/절차 | 라운드 마커, 커넥터 유지 |
| location-map | 구글맵 iframe | iframe 래퍼 `--r-xl` + `--sh-card` |

---

## 8. 이미지 전략 (무료 스톡)

현재 래스터 0개 → 무료 스톡(Unsplash 등 상업적 무료) 도입. **브랜드 일관성**이 핵심.

| 위치 | 주제 키워드 | 처리 |
|---|---|---|
| 히어로 | newsroom, press, journalism, media, korean office | 레드 듀오톤 또는 다크 오버레이 + 레드 그라디언트 |
| onestop | workflow, digital, network | 다크 배경 합성, 저채도 |
| why-news | newspaper, trust, reading | 그레이스케일+레드 포인트 |
| cta-banner | handshake, consulting | 다크 오버레이 |
| 서브 page-header(선택) | 페이지 주제별 | `--ns-mist` 위 저대비 |

**일관 처리 규칙:**
- 모든 사진 `filter: saturate(0.85)` 기본, 듀오톤은 `--ns-ink`↔`--ns-red`
- 인물 과다·스톡 클리셰(악수 클로즈업 등) 지양, 추상·환경 우선
- 16:9 또는 4:3, `--r-xl` 컨테이너, `object-fit: cover`
- 출처/라이선스는 `docs/image-credits.md`에 기록 (구현 단계)
- next/image 최적화, lazy, AVIF/WebP

---

## 9. 모션 (보존 + 정제)

```css
:root {
  --t-fast:  150ms cubic-bezier(.2,.8,.2,1);
  --t-base:  220ms cubic-bezier(.2,.8,.2,1);   /* 유지 */
  --t-slow:  400ms cubic-bezier(.2,.8,.2,1);
  --t-ease-emph: 500ms cubic-bezier(.16,.84,.44,1);  /* NEW — 카드 입장 */
}
```
- 보존: 히어로 슬라이더, trust 카운트업, 마키, `.section-animate` 페이드업, hero hover-pause
- 추가: 카드 stagger 입장(`--t-ease-emph`), CTA hover lift
- `prefers-reduced-motion` 분기 **보존 필수**

---

## 10. Tailwind 매핑 원칙 (구현 시)

- `--ns-*` → `theme.extend.colors` (`primary`=#e8234a, `ink`, `slate`, `paper`, `mist`, `accent`...)
- 타입/여백/radius/shadow 토큰 → `fontSize`/`spacing`/`borderRadius`/`boxShadow`
- 인라인 스타일 금지, `any` 금지(기존 규칙 유지)
- 글로벌 CSS는 토큰 + 베이스 리셋 최소만, 컴포넌트는 Tailwind 클래스

---

## 11. 확정 결정사항 (2026-05-16 갱신)

1. 🔒 메인 레드 `#e8234a`·6메뉴·전 기능·비즈니스 데이터 **보존**
2. 🔄 소스 오브 트루스 = **`c:\client`** (실제 운영 사이트). Next.js + Tailwind 재구축
3. 🆕 헤드라인 **산세리프 전환** (Pretendard, 타이트 음수 트래킹)
4. 🆕 이미지 = **무료 스톡** + 브랜드 듀오톤/저채도 일관 처리
5. 🔄 디자인 강도 = **중간(균형)** — 정교한 진화 + 히어로/핵심 섹션 에디토리얼 임팩트
6. 🔄 최대 변화 지점 = **보더 격자 제거 → 섹션 배경 교차 + radius + shadow + 넉넉한 여백**
7. 🔒 이전 세션의 _legacy 기반 Next.js 홈페이지는 폐기·교체 (콘텐츠/메뉴 불일치)
