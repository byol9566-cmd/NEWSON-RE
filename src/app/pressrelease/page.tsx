import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { formatDateTime } from '@/lib/board/format'
import { postRepository } from '@/lib/board/repository'
import { BOARD_PAGE_SIZE, BOARD_SIDEBAR } from './board-nav'

export const metadata: Metadata = {
  title: '보도자료 사례 — 뉴스온',
  description: '뉴스온이 배포한 주요 보도자료 사례를 소개합니다. 금융·의료·IT·유통 등 다양한 산업 분야에서 실제로 진행한 언론홍보·뉴스마케팅 성공 사례를 통해 뉴스온의 실력을 직접 확인해보세요.',
  alternates: { canonical: '/pressrelease' },
  openGraph: {
    title: '보도자료 사례 — 뉴스온',
    description: '뉴스온이 배포한 주요 보도자료 사례를 소개합니다. 금융·의료·IT·유통 등 다양한 산업 분야에서 실제로 진행한 언론홍보·뉴스마케팅 성공 사례를 통해 뉴스온의 실력을 직접 확인해보세요.',
    url: '/pressrelease',
    type: 'website',
  },
}

const STATS = [
  { num: '468,000', suffix: '+', label: '누적 배포' },
  { num: '908', suffix: '+', label: '제휴 언론사' },
  { num: '98', suffix: '%', label: '네이버 노출' },
  { num: '2', suffix: 'h', label: '평균 게재 속도' },
] as const

const PAGER_BLOCK_SIZE = 5

interface PressSearchParams {
  q?: string | string[]
  page?: string | string[]
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function buildListHref(page: number, q: string): string {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `/pressrelease?${query}` : '/pressrelease'
}

export default async function PressReleasePage({
  searchParams,
}: {
  searchParams: Promise<PressSearchParams>
}) {
  const sp = await searchParams
  const q = (firstParam(sp.q) ?? '').trim().slice(0, 100)
  const rawPage = Number(firstParam(sp.page) ?? '1')
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1

  const [admin, { items, total }] = await Promise.all([
    isAdmin(),
    postRepository.list({ page, pageSize: BOARD_PAGE_SIZE, q: q || undefined }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / BOARD_PAGE_SIZE))
  const blockStart = Math.floor((page - 1) / PAGER_BLOCK_SIZE) * PAGER_BLOCK_SIZE + 1
  const blockEnd = Math.min(blockStart + PAGER_BLOCK_SIZE - 1, totalPages)
  const pageNumbers = Array.from(
    { length: blockEnd - blockStart + 1 },
    (_, index) => blockStart + index
  )

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CASE STUDY"
        title="보도자료 사례"
        sub="실제 언론에 게재된 주요 기사 리스트 — 산업별 메시지 전략과 노출 결과를 확인하세요."
        breadcrumb="PRESS"
        sidebarHeading={BOARD_SIDEBAR.heading}
        sidebarItems={[...BOARD_SIDEBAR.items]}
      >
        <h2 className="content-h2">주요 배포 사례</h2>
        <p className="content-lead">금융·의료·IT·유통 등 다양한 산업의 클라이언트가 뉴스온을 통해 주요 일간지와 포털 메인에 노출된 사례입니다. 클라이언트 보안상 브랜드명은 일부 마스킹 처리되었습니다.</p>

        <div className="stat-row">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-cell">
              <div className="stat-num">{stat.num}<span>{stat.suffix}</span></div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <h3 className="content-h3">최근 배포 리스트</h3>
        <table className="board-table bt-cases">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">글쓴이</th>
              <th scope="col">조회수</th>
              <th scope="col">등록일</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="br-empty">
                  {q ? '검색 결과가 없습니다.' : '등록된 게시물이 없습니다.'}
                </td>
              </tr>
            ) : (
              items.map((post) => (
                <tr key={post.id}>
                  <td className="br-num">{post.id}</td>
                  <td className="br-title">
                    <Link href={`/pressrelease/${post.id}`}>{post.title}</Link>
                  </td>
                  <td className="br-author">{post.author}</td>
                  <td className="br-views">{post.views}</td>
                  <td className="br-date">{formatDateTime(post.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="board-toolbar">
          <form className="board-search" action="/pressrelease" method="get" role="search">
            <label htmlFor="board-q" className="sr-only">제목 검색</label>
            <input
              id="board-q"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="제목 검색"
              maxLength={100}
            />
            <button type="submit" className="btn btn-line">검색</button>
          </form>
          {admin && (
            <Link href="/pressrelease/write" className="btn btn-primary">글쓰기</Link>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="board-pager" aria-label="페이지 이동">
            {page > 1 && (
              <Link className="bp-link" href={buildListHref(page - 1, q)}>이전</Link>
            )}
            {pageNumbers.map((n) =>
              n === page ? (
                <span key={n} className="bp-link is-current" aria-current="page">{n}</span>
              ) : (
                <Link key={n} className="bp-link" href={buildListHref(n, q)}>{n}</Link>
              )
            )}
            {page < totalPages && (
              <Link className="bp-link" href={buildListHref(page + 1, q)}>다음</Link>
            )}
          </nav>
        )}
      </SubPageLayout>
    </main>
  )
}
