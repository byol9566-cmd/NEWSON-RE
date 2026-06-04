---
name: extract-design-system
description: Use this skill when the user provides a design reference website (URL or screenshot) for the 뉴스온 Next.js renewal and wants a reusable design system extracted. Triggers on phrases like "이 사이트 참고해서", "레퍼런스야", "이런 디자인으로", or when a URL is dropped alongside design intent. Produces `docs/design-system.md` with tokens + component specs and screenshot captures under `docs/references/<slug>/`.
---

# Extract Design System from Reference

A repeatable workflow for turning a reference site into an implementable design system tailored to the 뉴스온 renewal.

## When to use
- User shares one or more reference URLs/screenshots.
- User asks to "정리해줘 / 토큰 뽑아줘 / 디자인 시스템 만들어줘".

## Inputs
- One or more reference URLs (preferred) or image files.
- Optional: emphasis hints ("색감만", "타이포만", "히어로 중심").

## Procedure
1. **Delegate to `design-reference-analyzer` agent** with: the URL(s), emphasis hints, and the target output path `docs/design-system.md`. That agent owns the Playwright capture and DOM inspection.
2. **Validate output** has all required sections (tokens, components, layout, page application, open questions) per the agent's schema.
3. **Sanity check tokens** against the 뉴스온 baseline in `style.css` (`--primary: #e8234a`, `--accent: #0072bc`). Flag drift the user should confirm.
4. **Map components to PRD §4 pages** and confirm coverage for: 헤더/모바일 내비, 히어로 슬라이더, 인포 카드, 사이드바+상담박스, 가격 티어, 프로세스 스텝, 통계 카운터, 클라이언트 그리드, 문의 폼, 게시판, 푸터. If any component is missing from the spec, ask the user how to handle it before passing to implementation.
5. **Hand off** to `nextjs-frontend-developer` with: design-system path, screenshot paths, ordered priority of which pages to implement first.

## Outputs
- `docs/design-system.md`
- `docs/references/<slug>/{desktop,tablet,mobile}.png` per reference
- A short summary in chat: tokens captured, components specified, open questions for user.

## Anti-patterns
- Don't pick tokens by eyeballing screenshots when you can measure via `browser_evaluate`.
- Don't merge multiple references silently — attribute per-token origin.
- Don't proceed to implementation until open questions are resolved.
