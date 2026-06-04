---
name: migrate-html-to-nextjs
description: Use this skill to migrate one of the existing static 뉴스온 HTML pages (index/brand-award/business/clients/customer/inquiry/location/pressrelease/pricing) into a Next.js App Router route with content parity, design-system tokens, and the planned componentization. Triggers on "이 페이지 옮겨줘", "Next로 마이그레이션", "<페이지명> 구현해줘".
---

# Migrate a Static HTML Page → Next.js Route

A page-by-page migration recipe that keeps content/behavior parity while applying the new design system and removing the legacy debt called out in PRD §1.3.

## Preconditions
- `docs/design-system.md` exists (run `/extract-design-system` first if not).
- Next.js app is scaffolded (App Router + TypeScript). If not, scaffold first under the project root, then proceed.
- Read `PRD.md` §3 for the canonical route mapping and §4 for the page's functional requirements.

## Inputs
- The source HTML filename (e.g., `pressrelease.html`).
- Target route (default: PRD §3 mapping).

## Procedure
1. **Inventory the source**: Read the HTML file. List content blocks, scripts (slider/tab/form), and external image URLs. Note any content trapped in JPGs that must be re-authored as text (see PRD §1.3, §4).
2. **Extract shared shell**: If `<SiteHeader>`, `<TopBar>`, `<MobileNav>`, `<Footer>`, `<SubPageShell>` don't yet exist, create them from the first migration and reuse for all subsequent pages. The shell owns: sticky header behavior, mobile drawer, breadcrumb, sidebar nav, consult box.
3. **Compose the route**: Server component by default. Mark client components only where required (slider, mobile nav, tab switcher, form). Use tokens from `docs/design-system.md`; never hardcode hex/rem if a token exists.
4. **Re-author trapped content**: If the page renders content as a JPG, convert to semantic markup using the source data (e.g., `pressrelease.html` pricing tiers in PRD §4.2). Delegate copy polish to `korean-marketing-copywriter` if rewriting beyond the existing text.
5. **Replace external images**: Move any retained images from `newson.co.kr` to `/public/images/` and use `next/image`. Add meaningful `alt`.
6. **Wire interactions**:
   - Hero / sub slider → keyboard-operable, pause on hover, respect `prefers-reduced-motion`.
   - Mobile nav → `aria-expanded`, focus trap, ESC to close.
   - Customer tabs → URL `?tab=` synced, ARIA tab pattern.
   - Inquiry form → Route Handler `app/api/inquiry/route.ts` + Zod + real submit + success/error UI.
7. **SEO**: Add `generateMetadata` with title/description per PRD §1.1 keywords; OG tags; structured data on home/about.
8. **Build & lint**: `npm run build` (or `next lint`). Fix TS/ESLint errors before declaring done.
9. **QA handoff**: Trigger `visual-qa-engineer` for this route at 375/768/1280/1440.
10. **Update progress**: Tick the matching item in PRD §9 (mirror to `docs/migration-status.md`).

## Outputs
- New files under `app/<route>/page.tsx` (+ `layout.tsx` if needed)
- New components under `components/`
- Tokens consumed from the design system (no inline hex/rem if avoidable)
- An entry in `docs/migration-status.md`

## Anti-patterns
- Duplicating header/footer markup on each page instead of extracting `<Layout>`.
- Leaving `href="#"` placeholders silently — either implement, route to real page, or surface a TODO via a comment and checklist entry.
- Preserving `alert()`-only form behavior — the `/inquiry` page must actually transmit.
- Keeping external `newson.co.kr` image hotlinks.
- Adding unrequested infrastructure (state library, ORM, auth, Storybook).
