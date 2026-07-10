import { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from '@/components/board/LoginForm'
import LogoutButton from '@/components/board/LogoutButton'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { BOARD_SIDEBAR } from '../board-nav'

export const metadata: Metadata = {
  title: '관리자 로그인 — 뉴스온',
  robots: { index: false, follow: false },
}

export default async function PressLoginPage() {
  const admin = await isAdmin()

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ADMIN"
        title="보도자료 사례"
        sub="게시물 관리를 위한 관리자 전용 페이지입니다."
        breadcrumb="PRESS"
        sidebarHeading={BOARD_SIDEBAR.heading}
        sidebarItems={[...BOARD_SIDEBAR.items]}
      >
        <h2 className="content-h2">관리자 로그인</h2>
        {admin ? (
          <>
            <p className="content-lead">이미 로그인되어 있습니다. 게시물을 작성하거나 로그아웃할 수 있습니다.</p>
            <div className="bf-actions">
              <Link href="/pressrelease/write" className="btn btn-primary">글쓰기</Link>
              <Link href="/pressrelease" className="btn btn-line">목록으로</Link>
              <LogoutButton />
            </div>
          </>
        ) : (
          <>
            <p className="content-lead">게시물 등록·수정·삭제는 관리자만 가능합니다. 비밀번호를 입력해 주세요.</p>
            <LoginForm />
          </>
        )}
      </SubPageLayout>
    </main>
  )
}
