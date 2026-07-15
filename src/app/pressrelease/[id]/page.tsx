import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeletePostButton from '@/components/board/DeletePostButton'
import LinkifiedText from '@/components/board/LinkifiedText'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { formatDateTime } from '@/lib/board/format'
import { postRepository } from '@/lib/board/repository'
import { parsePostId } from '@/lib/board/validation'
import { BOARD_SIDEBAR } from '../board-nav'

interface DetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id } = await params
  const postId = parsePostId(id)
  if (postId === null) return { title: '보도자료 사례 — 뉴스온' }

  const post = await postRepository.getById(postId)
  if (!post) return { title: '보도자료 사례 — 뉴스온' }

  return {
    title: `${post.title} — 뉴스온`,
    description: post.content.slice(0, 120),
    alternates: { canonical: `/pressrelease/${post.id}` },
  }
}

export default async function PressDetailPage({ params }: DetailPageProps) {
  const { id } = await params
  const postId = parsePostId(id)
  if (postId === null) notFound()

  const post = await postRepository.incrementViews(postId)
  if (!post) notFound()

  const admin = await isAdmin()

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
        <article className="post-view">
          <h2 className="pv-title">{post.title}</h2>
          <div className="pv-meta">
            <span>글쓴이 <strong>{post.author}</strong></span>
            <span>등록일 {formatDateTime(post.createdAt)}</span>
            <span>조회수 {post.views}</span>
          </div>
          <div className="pv-content"><LinkifiedText text={post.content} /></div>
        </article>

        <div className="pv-actions">
          <Link href="/pressrelease" className="btn btn-line">목록</Link>
          {admin && (
            <div className="pv-admin-actions">
              <Link href={`/pressrelease/${post.id}/edit`} className="btn btn-line">수정</Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>
      </SubPageLayout>
    </main>
  )
}
