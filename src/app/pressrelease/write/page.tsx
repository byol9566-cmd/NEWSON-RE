import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PostForm from '@/components/board/PostForm'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { BOARD_SIDEBAR } from '../board-nav'

export const metadata: Metadata = {
  title: '글쓰기 — 뉴스온',
  robots: { index: false, follow: false },
}

export default async function PressWritePage() {
  if (!(await isAdmin())) {
    redirect('/pressrelease/login')
  }

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ADMIN"
        title="보도자료 사례"
        sub="새 배포 사례를 등록합니다."
        breadcrumb="PRESS"
        sidebarHeading={BOARD_SIDEBAR.heading}
        sidebarItems={[...BOARD_SIDEBAR.items]}
      >
        <h2 className="content-h2">글쓰기</h2>
        <p className="content-lead">새로운 배포 사례를 등록합니다. 등록 즉시 목록에 노출됩니다.</p>
        <PostForm mode="create" />
      </SubPageLayout>
    </main>
  )
}
