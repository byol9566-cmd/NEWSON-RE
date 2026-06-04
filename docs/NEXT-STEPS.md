# 다음 단계 — Claude Code 재시작 후 이어서 진행

## 현재 상태 (완료된 것)
- ✅ `PRD.md` 작성 (사용자가 회사 정보 수정 반영: 대표 이은별 / 사업자 428-86-00314 / 하남 주소)
- ✅ `.mcp.json` 에 Context7 + Playwright MCP 등록 (둘 다 Connected 확인)
- ✅ 서브 에이전트 5종 `.claude/agents/` 작성
  - design-reference-analyzer
  - nextjs-frontend-developer
  - visual-qa-engineer
  - korean-marketing-copywriter (PRD 변경분 동기화 완료)
  - seo-accessibility-auditor
- ✅ 스킬 2종 `.claude/skills/`
  - extract-design-system
  - migrate-html-to-nextjs

## 막힌 지점
이번 세션에 Playwright MCP 도구가 surfacing되지 않아 디자인 레퍼런스 분석을 시작하지 못함. `claude mcp list`는 ✓ Connected를 반환하지만 세션 도구 목록에 미노출. **Claude Code 재시작 시 .mcp.json의 MCP가 세션에 로드됨**.

## 재시작 후 첫 메시지 예시 (사용자에게)
> "디자인 레퍼런스 3개 분석 이어서 해줘:
> 1. https://sanalabs.com/
> 2. https://www.mediabee.com/
> 3. https://maze.co/"

## 재시작 후 Claude가 수행할 작업
1. `/extract-design-system` 스킬에 진입.
2. Playwright MCP로 각 사이트를 375 / 768 / 1440 뷰포트에서 캡처 → `docs/references/<slug>/{mobile,tablet,desktop}.png` 저장. 슬러그: sanalabs, mediabee, maze.
3. `browser_evaluate`로 헤더·히어로·primary CTA·카드·H1·본문에서 computed style(폰트/색/간격/라디우스/그림자) 측정.
4. 컴포지트 디자인 시스템을 `docs/design-system.md`에 저장. 토큰별 출처(attribution) 명시. 뉴스온 B2B 톤(신뢰감·전문성) 어댑테이션 노트 포함 — 특히 maze가 플레이풀할 경우 톤다운 방안.
5. PRD §3 라우트별로 어떤 레퍼런스 패턴을 적용할지 매핑.
6. 5-bullet 요약 + 미해결 질문 리스트 리턴.
7. 다음 단계: Next.js 스캐폴딩 → `migrate-html-to-nextjs` 스킬로 페이지별 이관.

## 참고 — 레퍼런스 톤 가설 (재시작 후 검증 필요)
- **sanalabs.com**: AI/B2B SaaS, 코퍼레이트 톤 — 뉴스온에 가장 직접 적용 가능성 높음.
- **mediabee.com**: 미디어 관련 — 업종 인접, 컬러·헤드라인 패턴 참고.
- **maze.co**: 리서치 SaaS, 다소 플레이풀할 수 있음 — 인터랙션·마이크로 모션 참고하되 톤은 어댑테이션 필요.
