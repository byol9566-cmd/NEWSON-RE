import { Metadata } from 'next'
import LoginForm from '@/components/board/LoginForm'
import LogoutButton from '@/components/board/LogoutButton'
import ClientListEditForm from '@/components/clients/ClientListEditForm'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { clientListRepository } from '@/lib/clients/repository'

export const metadata: Metadata = {
  title: '고객사 관리 — 뉴스온',
  robots: { index: false, follow: false },
}

export default async function ClientsAdminPage() {
  const admin = await isAdmin()

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ADMIN"
        title="클라이언트"
        sub="주요 고객사 리스트를 관리하는 관리자 전용 페이지입니다."
        breadcrumb="CLIENTS"
        sidebarHeading="Clients"
        sidebarItems={[
          { label: '파트너 목록', href: '/clients' },
        ]}
      >
        <h2 className="content-h2">고객사 관리</h2>
        {admin ? (
          <>
            <p className="content-lead">
              고객사를 한 줄에 하나씩 입력해 주세요. 저장하면 클라이언트 페이지에 입력한 순서대로 노출됩니다.
            </p>
            <div className="bf-actions" style={{ marginBottom: 24 }}>
              <LogoutButton redirectTo="/clients" />
            </div>
            <ClientListEditor />
          </>
        ) : (
          <>
            <p className="content-lead">고객사 리스트 수정은 관리자만 가능합니다. 비밀번호를 입력해 주세요.</p>
            <LoginForm redirectTo="/clients/admin" />
          </>
        )}
      </SubPageLayout>
    </main>
  )
}

async function ClientListEditor() {
  const clients = await clientListRepository.list()

  return (
    <div className="ptier-admin-block">
      <ClientListEditForm clients={clients} />
    </div>
  )
}
