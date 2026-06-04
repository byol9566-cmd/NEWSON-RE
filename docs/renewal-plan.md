# 뉴스온(NEWSON) 리뉴얼 계획 — v2

> 갱신: 2026-05-16. 소스 오브 트루스 = **`c:\client`** (실제 운영 사이트). 목표 = 기능·메뉴·메인컬러 100% 보존하며 UI를 현대화하여 Next.js + Tailwind로 재구축.
> 디자인 토큰/컴포넌트 스펙은 `docs/design-system.md` v2 참조.

---

## 1. 배경 / 목적

`c:\client`는 이미 잘 만들어진 모던 HTML/CSS 사이트(index 41KB·style.css 77KB·9개 페이지)다. 그러나 **1px 보더 격자 과다, border-radius 거의 0, 그림자 부재**로 2000년대 격자감이 남아 있다. 본 리뉴얼은 정보구조·기능·브랜드를 그대로 둔 채 시각 표면을 현대화(섹션 배경 교차·라운드·섀도·넉넉한 여백·산세리프 에디토리얼 타이포·스톡 이미지)하여 newson.co.kr 전체를 재단장한다.

---

## 2. 절대 보존 체크리스트 (구현 검수 기준)

### 2.1 메뉴/IA — 변경 금지
글로벌 내비 6개 순서 고정: **브랜드대상 · 언론홍보 비용 · 사업분야 · Clients · 온라인문의 · 고객센터**
탑바: 홈 · 온라인문의 · 고객센터 / 전화 031-758-0215 / 평일 09:00~18:00

### 2.2 라우트 매핑 (9개)

| c:\client 파일 | Next.js 라우트 | 핵심 보존 기능 |
|---|---|---|
| index.html | `/` | 히어로 3슬라이드·trust 카운트업·onestop·services 6·why·marquee·process 5·cta 폼 |
| brand-award.html | `/brand-award` | 통계 4셀·수상 4카드·연혁 타임라인 6·CTA |
| pricing.html | `/pricing` | 3패키지(BASIC 80/STANDARD 180 추천/PREMIUM 350)·이용절차 5·FAQ 5 |
| business.html | `/business` | 6서비스 리스트·프로세스 5 |
| clients.html | `/clients` | 통계 4·28 고객사 그리드 |
| inquiry.html | `/inquiry` | **견적 폼**(name·company·tel·service·message 필수, email 선택, privacy 필수, submit 핸들러) |
| customer.html | `/customer` | 공지 게시판 테이블·FAQ 6 아코디언 |
| pressrelease.html | `/pressrelease` | 통계·8 배포 사례 리스트 |
| location.html | `/location` | 구글맵 iframe·주소블록·교통안내 |

> 라우트 슬러그는 기존 파일명 기준(확장자 제거). 메뉴 텍스트·링크 대상 동일.

### 2.3 기능 동작 — 동일 보존

| 기능 | 위치 | 보존 방식 |
|---|---|---|
| 히어로 슬라이더(진행바·카운터·화살표·키보드·hover pause) | / | React state + IntersectionObserver, 동작 동일 |
| trust 카운트업 (data-target) | / | IntersectionObserver + rAF, prefers-reduced 분기 보존 |
| 섹션 페이드업 `.section-animate` | 전 페이지 | IntersectionObserver 보존 |
| 클라이언트 마키 무한루프 | / clients | CSS keyframes 보존, hover pause |
| cta-quick-form 검증→inquiry 파라미터 전달 | / → /inquiry | querystring 전달 로직 보존 |
| inquiry 견적 폼 제출 | /inquiry | submit 핸들러(현재 alert+reset) 보존, 추후 API 연동 여지 |
| pricing/customer FAQ | /pricing /customer | `<details>`/네이티브 동등 동작 |
| 게시판 테이블·공지태그 | /customer | 데이터·정렬 보존 |
| 구글맵 임베드 | /location | iframe src 동일 |
| 모바일 내비 토글·스크롤 헤더 섀도·active | 전역 | common.js 로직 → 공통 컴포넌트로 이식 |

### 2.4 비즈니스 데이터 — 텍스트 동일
200+ 언론사 · 1,500+ 고객사 · 12,800+ 배포 · 87% 재계약 · 15년 · 98% 네이버노출 · 031-758-0215 · newsmarketing@daum.net · 서울 금천구 가산디지털2로 98, 2동 1306호 · 사업자 116-86-43178 · 대표 김영기 · 가격 80/180/350만원~

---

## 3. 페이지별 리뉴얼 방향 & 우선순위

### P1 — 기반 + 홈 (최우선, 전 페이지 영향)

| 항목 | 작업 |
|---|---|
| 디자인 토큰 | design-system v2 토큰 → Tailwind theme 매핑, Pretendard 로드, Noto Serif 제거 |
| 공통 레이아웃 | 마스트헤드+탑바+헤더+모바일내비+푸터 컴포넌트화, common.js 로직 이식 |
| 홈 / | 9개 섹션 전부: 보더격자 제거→배경교차+라운드+섀도, 산세리프 헤드라인, 히어로/why/cta 스톡이미지, 모든 인터랙션 보존 |

### P2 — 전환 핵심 페이지

| 페이지 | 작업 |
|---|---|
| /pricing | 3티어 카드 현대화(라운드·섀도·추천 강조), FAQ·절차 타임라인 |
| /inquiry | 견적 폼 박스형 인풋·에러 틴트·로딩, 사이드바 카드화 (제출 로직 보존) |
| /business | 6서비스 카드 그리드 현대화, 프로세스 스텝 |

### P3 — 콘텐츠 페이지

| 페이지 | 작업 |
|---|---|
| /customer | 게시판 행 보더 정리·공지 알약배지, FAQ 아코디언 |
| /pressrelease | 8 사례 리스트 카드화 |
| /clients | 28셀 그리드 → 카드칩, 통계 |
| /brand-award | 수상 카드·연혁 타임라인 라운드화 |

### P4 — 마무리

| 페이지 | 작업 |
|---|---|
| /location | 맵 래퍼 라운드·섀도, 주소/교통 블록 |
| 전역 점검 | 이용약관·개인정보 링크, 푸터, SEO 메타·구조화데이터 보존 |

---

## 4. 컴포넌트 델타 요약 (현재 → 리뉴얼)

| 컴포넌트 | 현재 | 리뉴얼 |
|---|---|---|
| 섹션 구분 | 1px 보더 격자 | 배경 톤 교차 + 넉넉한 여백 |
| 카드(service/tier/news) | 각진·보더·플랫 | `--r-lg` + `--sh-card`, hover lift `--sh-hover` |
| 버튼 | 각진 | `--r-sm`, primary에 `--sh-red` |
| 배지/태그/칩 | 사각 | 알약형 `--r-pill` |
| 헤드라인 | Noto Serif KR 명조 | Pretendard 산세리프 800 / `-0.03em` |
| 통계 그리드 | 보더 4분할 | mist 배경 + 흰 카드 셀 |
| 게시판 | 풀셀 보더 | 행 하단 보더만 + hover tint |
| 이미지 | 없음(전 CSS/SVG) | 무료 스톡 + 레드 듀오톤/저채도 |
| 그림자 | 거의 없음 | 카드/호버 소프트 엘리베이션 |
| 여백 | 섹션 56~96px | 80~120px |

---

## 5. 빌드 단계 (구현 시 순서)

1. **정리** — 기존 _legacy 기반 Next.js 산출물(src/app, src/components의 구버전) 폐기. `c:\client` 9개 HTML을 `_source/`로 복사(참조용).
2. **토큰** — Tailwind theme에 design-system v2 매핑, globals.css 베이스, Pretendard CDN.
3. **공통 컴포넌트** — Masthead·TopBar·Header·MobileNav·Footer·Button·Badge·Card·SectionWrap. common.js 로직 → 훅/컴포넌트.
4. **홈(/)** — 9개 섹션 컴포넌트, 인터랙션(슬라이더·카운트업·페이드·마키·cta폼) 동작 검증.
5. **P2~P4 페이지** — 라우트별 구현, 기능 보존 검수.
6. **이미지** — 스톡 수급·브랜드 처리·next/image 최적화·credits 기록.
7. **검증** — 아래 §7.

---

## 6. 이미지 자산 목록 (스톡 수급 대상)

| # | 페이지/위치 | 키워드 | 처리 |
|---|---|---|---|
| 1 | 홈 히어로 | newsroom / press / korean media | 레드 듀오톤+다크 오버레이 |
| 2 | 홈 onestop | digital workflow / network | 다크 합성 저채도 |
| 3 | 홈 why-news | newspaper / reading / trust | 그레이스케일+레드 포인트 |
| 4 | 홈 cta-banner | consulting / business meeting | 다크 오버레이 |
| 5 | /business 헤더 | media services | mist 위 저대비 |
| 6 | /brand-award | award / achievement | 저채도 |
| 7~ | 서브 page-header(선택) | 페이지 주제 | 일관 처리 |

라이선스·출처 → 구현 시 `docs/image-credits.md`.

---

## 7. 검증 방법

1. **기능 동등성** — 9개 페이지에서 §2.3 표의 모든 인터랙션을 실제 클릭/스크롤로 확인 (Playwright)
2. **메뉴/데이터 일치** — 메뉴 6개·라우트·전화·주소·가격·통계 텍스트가 c:\client와 동일한지 diff
3. **반응형** — 1440 / 900 / 375 스크린샷, 레퍼런스(`docs/references/`)와 톤 비교
4. **디자인 검수** — 보더격자 제거·라운드·섀도·섹션교차·산세리프 적용 여부, 레드 #e8234a 불변 확인
5. **빌드/품질** — `npm run build` 무오류, TS 0 에러, `prefers-reduced-motion` 동작, 접근성(skip-link·aria·focus) 보존
6. **SEO** — title/description/og/JSON-LD LocalBusiness 보존

---

## 8. 리스크 / 주의

- 기능 누락이 가장 큰 리스크 → §2.3 체크리스트를 페이지별 완료 게이트로 사용
- 스톡 이미지 톤 불일치 → §8(design-system) 일관 처리 규칙 엄수, 1차 수급분 사용자 확인
- 산세리프 전환으로 신문 신뢰감 약화 우려 → 타이트 트래킹·웨이트 800·정렬로 권위감 보강
- 라우트 슬러그 변경 시 기존 SEO 영향 → 파일명 기반 슬러그 유지로 최소화
