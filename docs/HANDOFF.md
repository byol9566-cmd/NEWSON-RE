# 뉴스온 리뉴얼 — 인수인계 (Handoff)

> 최신 갱신: **2026-05-17 v3** | 다음 세션은 이 파일부터 읽으세요.

---

## 🆕 v3 업데이트 (2026-05-17) — 이미지 적용 + 디자인 결정

### 이번 세션에서 한 일
1. **나노바나나 이미지 11장 수령·적용** → `public/images/`
   - `hero-01~03.png` (히어로 슬라이더)
   - `card-01~05` (서비스 카드용, **현재 미사용 보관 중**)
   - `why-01.jpg`, `why-02.png` (피처/원스톱)
   - `network_background.jpg` (CTA 배너)
   - `brand_awards_main.jpg` (브랜드대상 페이지)
   - 이미지 의뢰서: `docs/image-prompts.md`
2. **홈 적용 위치 확정** (`src/components/HomePage.tsx`, `src/app/globals.css`)
   - 히어로 슬라이더: `hero-01~03` ✅
   - 원스톱 섹션 배경: `why-02` + 다크 그라디언트 72→86% ✅
   - Why News 좌측 피겨: `why-01` ✅
   - CTA 배너 배경: `network_background` ✅
3. **브랜드대상 페이지 히어로 피겨** 추가: `brand_awards_main` ✅
   - `src/app/brand-award/page.tsx` + `.award-hero-figure` CSS
4. **Services 섹션 — 사용자 디자인 결정**
   - 처음에 일부 카드만 커버 이미지 → 시각적 비대칭 발견
   - **결정: 6개 카드 모두 아이콘 전용 유지** (보수적 일관성)
   - `card-01~05` 5장은 **홈 services에서 미사용 상태** — 서브페이지 재활용 대기
5. **Why 섹션 우측 "TRUST" 배경 텍스트 → 유지** (에디토리얼 요소)
6. **ECC (Everything Claude Code) 설치**
   - Marketplace: `https://github.com/affaan-m/everything-claude-code`
   - Plugin: `ecc@ecc` (200+ skills, 71 agents, 28 hooks)
   - Rules: `~/.claude/rules/ecc/` (common + typescript)
   - Notion + frontend-design 플러그인도 설치됨

### 🟡 미해결 — 다음 세션 첫 작업
**card-01~05 재활용 (낭비 방지)** — Task #9 in_progress
- `card-01` (타이핑+레드 라이트) → `/pressrelease` 페이지 상단 피처
- `card-02` (다중 디바이스 뉴스포털) → `/business` "기사형 광고" 섹션
- `card-03` (방송 카메라/기자) → `/business` "언론보도·인터뷰" 섹션
- `card-04` (스마트폰 바이럴 파티클) → `/business` "네이버 블로그" 섹션
- `card-05` (골드 트로피) → `/brand-award` 수상 그리드 위

### 🔵 옵션 — 사용자가 검토 후 결정
- **`/ecc:gan-design` 적용**: 홈페이지 GAN 루프로 디자인 품질 자동 상향 (5~15회 반복, Playwright Evaluator 기반)
- ECC `web` 룰 추가 복사 가능 (현재 common+typescript만 복사됨)

### 다음 세션 첫 명령 예시
> "HANDOFF.md 읽고 card-01~05 재활용 작업 이어서 해줘. business 페이지부터."

또는
> "/ecc:gan-design 으로 홈페이지 디자인 자동 개선 돌려줘."

### 🔴 비용 알림
- 현재 세션 누적: **$84.62** (2026-05-17 종료 시점)
- 다음 세션 시작 전 `/cost` 또는 `/ecc:cost-report`로 확인 권장

### 환경
- 개발 서버 실행: `npm run dev` (Next.js 16.2.6 Turbopack, http://localhost:3000)
- 빌드 OK · 11개 이미지 모두 200 OK 확인됨
- ECC GateGuard 활성화 — Bash/Edit 전 fact-forcing 필요. 끄려면 `ECC_GATEGUARD=off` 환경변수.

---

## 1. 방향 전환 요약 (중요)

이전 세션은 얇은 `_legacy` HTML 기준으로 Next.js 홈페이지를 만들었으나 **콘텐츠·메뉴·데이터가 실제 사이트와 불일치**하여 폐기 결정.

**새 소스 오브 트루스 = `c:\client`** — 이미 모던하게 구축된 실제 newson.co.kr 운영 사이트(9개 페이지, index 41KB, style.css 77KB).

목표: `c:\client`의 **메인컬러(#e8234a)·6개 메뉴·전 기능·비즈니스 데이터를 100% 보존**한 채, UI를 현대화하여 Next.js + Tailwind로 재구축.

---

## 2. 현재 상태

| 항목 | 상태 |
|------|------|
| c:\client 실사이트 분석 (9페이지+css) | ✅ 완료 |
| 레퍼런스 3종 재분석 (Sana/MediaBee/Maze) | ✅ 완료 (스크린샷 `ref-*.jpeg`, `docs/references/`) |
| `docs/design-system.md` v2 | ✅ 재작성 완료 |
| `docs/renewal-plan.md` v2 | ✅ 재작성 완료 |
| 4개 핵심 결정 확정 | ✅ (아래 §3) |
| Next.js 재구축 구현 | ❌ **미착수 — 사용자 계획 승인 대기** |

이전 _legacy 기반 산출물(src/app, src/components 구버전)은 빌드 단계에서 폐기 예정.

---

## 3. 확정 결정사항

1. 🔒 메인 레드 `#e8234a` · 6메뉴 · 전 기능 · 비즈니스 데이터 **보존**
2. 🔄 소스 = `c:\client`, **Next.js + Tailwind 재구축**
3. 🆕 헤드라인 **산세리프 전환** (Pretendard, 타이트 음수 트래킹)
4. 🆕 이미지 = **무료 스톡** + 브랜드 듀오톤/저채도 일관 처리
5. 🔄 디자인 강도 = **중간(균형)**
6. 🔄 최대 변화 = 보더 격자 제거 → 섹션 배경 교차 + radius + shadow + 넉넉한 여백

---

## 4. 다음 세션 할 일 (renewal-plan.md §5 순서)

1. 기존 _legacy Next.js 산출물 폐기, `c:\client` 9개 HTML → `_source/` 참조 복사
2. Tailwind theme에 design-system v2 토큰 매핑 + Pretendard 로드
3. 공통 컴포넌트(Masthead·TopBar·Header·MobileNav·Footer·Button·Badge·Card) + common.js 로직 이식
4. 홈(/) 9개 섹션 — 인터랙션 전부 보존하며 현대화
5. P2~P4 페이지 (pricing·inquiry·business → customer·pressrelease·clients·brand-award → location)
6. 스톡 이미지 수급·브랜드 처리
7. 검증 (renewal-plan.md §7)

---

## 5. 핵심 참고 파일

| 파일 | 설명 |
|------|------|
| `docs/design-system.md` | v2 토큰 + 컴포넌트 현대화 매핑 |
| `docs/renewal-plan.md` | v2 페이지별 방향·기능보존 체크리스트·빌드단계·검증 |
| `c:\client\*.html`, `c:\client\style.css` | **실제 사이트 원본 (소스 오브 트루스, 보존 기준)** |
| `docs/references/` | Sana/MediaBee/Maze 데스크탑·태블릿·모바일 스크린샷 |
| `ref-sana-desktop.jpeg` 등 | 2026-05-16 재분석 풀페이지 캡처 |

---

## 6. 금지사항

- 메뉴 구성·기능·메인 레드 변경 금지
- `any` 타입 / 인라인 스타일 금지 (Tailwind 클래스)
- 비즈니스 데이터(가격·통계·연락처) 임의 변경 금지
- 코드 구현 착수 전 사용자에게 계획 보고·승인 후 진행
