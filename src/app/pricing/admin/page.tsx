import { Metadata } from 'next'
import LoginForm from '@/components/board/LoginForm'
import LogoutButton from '@/components/board/LogoutButton'
import TierEditForm from '@/components/pricing/TierEditForm'
import SubPageLayout from '@/components/SubPageLayout'
import { isAdmin } from '@/lib/board/auth'
import { pricingRepository } from '@/lib/pricing/repository'

export const metadata: Metadata = {
  title: '가격 등급 관리 — 뉴스온',
  robots: { index: false, follow: false },
}

export default async function PricingAdminPage() {
  const admin = await isAdmin()

  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ADMIN"
        title="언론홍보 비용"
        sub="등급별 이름·가격·게재 가능 매체를 관리하는 관리자 전용 페이지입니다."
        breadcrumb="PRICING"
        sidebarHeading="언론홍보 비용"
        sidebarItems={[
          { label: '비용 및 절차', href: '/pricing' },
        ]}
      >
        <h2 className="content-h2">가격 등급 관리</h2>
        {admin ? (
          <>
            <p className="content-lead">
              등급명·가격·요약 설명·게재 가능 매체 리스트를 수정할 수 있습니다. 매체는 한 줄에 하나씩 입력해 주세요.
            </p>
            <div className="bf-actions" style={{ marginBottom: 24 }}>
              <LogoutButton redirectTo="/pricing" />
            </div>
            <PricingTierEditor />
          </>
        ) : (
          <>
            <p className="content-lead">가격 등급 수정은 관리자만 가능합니다. 비밀번호를 입력해 주세요.</p>
            <LoginForm redirectTo="/pricing/admin" />
          </>
        )}
      </SubPageLayout>
    </main>
  )
}

async function PricingTierEditor() {
  const tiers = await pricingRepository.list()

  return (
    <>
      {tiers.map((tier) => (
        <div key={tier.id} className="ptier-admin-block">
          <TierEditForm tier={tier} />
        </div>
      ))}
    </>
  )
}
