import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import PostForm from '@/components/board/PostForm'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { postRepository } from '@/lib/board/repository'
import { parsePostId } from '@/lib/board/validation'
import { BOARD_SIDEBAR } from '../../board-nav'

export const metadata: Metadata = {
  title: '게시물 수정 — 뉴스온',
  robots: { index: false, follow: false },
}

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function PressEditPage({ params }: EditPageProps) {
  if (!(await isAdmin())) {
    redirect('/pressrelease/login')
  }

  const { id } = await params
  const postId = parsePostId(id)
  if (postId === null) notFound()

  const post = await postRepository.getById(postId)
  if (!post) notFound()

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ADMIN"
        title="보도자료 사례"
        sub="등록된 배포 사례를 수정합니다."
        breadcrumb="PRESS"
        sidebarHeading={BOARD_SIDEBAR.heading}
        sidebarItems={[...BOARD_SIDEBAR.items]}
      >
        <h2 className="content-h2">게시물 수정</h2>
        <p className="content-lead">수정한 내용은 저장 즉시 반영됩니다.</p>
        <PostForm
          mode="edit"
          post={{
            id: post.id,
            title: post.title,
            author: post.author,
            content: post.content,
          }}
        />
      </SubPageLayout>
    </main>
  )
}
