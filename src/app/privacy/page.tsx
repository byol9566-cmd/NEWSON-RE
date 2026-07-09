import { Metadata } from 'next'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '개인정보처리방침 — 뉴스온',
  description: '뉴스온(NEWSON) 개인정보처리방침 — 수집 항목, 이용 목적, 보유 기간 및 정보주체의 권리 안내.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: '개인정보처리방침 — 뉴스온',
    description: '뉴스온(NEWSON) 개인정보처리방침 — 수집 항목, 이용 목적, 보유 기간 및 정보주체의 권리 안내.',
    url: '/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="LEGAL"
        title="개인정보처리방침"
        sub="(주)뉴스온미디어(이하 '회사')는 이용자의 개인정보를 소중히 여기며, 개인정보보호법 등 관련 법령을 준수합니다."
        breadcrumb="PRIVACY"
        sidebarHeading=""
        sidebarItems={[
          { label: '이용약관', href: '/terms' },
          { label: '온라인 문의', href: '/inquiry' },
        ]}
      >
        <p className="content-lead">
          시행일자: 2026년 7월 9일<br />
          본 방침은 회사가 운영하는 웹사이트(www.newson.co.kr) 및 관련 서비스 이용 시 수집하는 개인정보의 처리에 관한 사항을 안내합니다.
        </p>

        <h3 className="content-h3">1. 수집하는 개인정보 항목</h3>
        <p className="content-lead">
          회사는 온라인 문의·견적 신청 접수를 위해 아래 항목을 수집합니다.
        </p>
        <ul className="history-list">
          <li><span className="hl-text"><strong>필수 항목</strong> — 담당자 성함, 회사명, 연락처, 문의 서비스, 상세 문의 내용</span></li>
          <li><span className="hl-text"><strong>선택 항목</strong> — 이메일 주소</span></li>
          <li><span className="hl-text"><strong>자동 수집 항목</strong> — 접속 IP, 쿠키, 서비스 이용 기록, 접속 로그</span></li>
        </ul>

        <h3 className="content-h3">2. 개인정보의 수집 및 이용 목적</h3>
        <ul className="history-list">
          <li><span className="hl-text">언론홍보·보도자료 배포 등 견적 상담 및 문의 응대</span></li>
          <li><span className="hl-text">서비스 계약의 이행 및 대금 정산</span></li>
          <li><span className="hl-text">공지사항 전달 및 민원 처리</span></li>
          <li><span className="hl-text">서비스 부정이용 방지 및 통계 분석을 통한 서비스 개선</span></li>
        </ul>

        <h3 className="content-h3">3. 개인정보의 보유 및 이용 기간</h3>
        <p className="content-lead">
          원칙적으로 개인정보 수집·이용 목적이 달성된 후에는 지체 없이 파기합니다. 다만 문의·상담 이력은 서비스 품질 관리를 위해 <strong>수집일로부터 1년간</strong> 보관 후 파기하며, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.
        </p>
        <ul className="history-list">
          <li><span className="hl-text"><strong>계약 또는 청약철회 등에 관한 기록</strong> — 5년 (전자상거래법)</span></li>
          <li><span className="hl-text"><strong>대금결제 및 재화 등의 공급에 관한 기록</strong> — 5년 (전자상거래법)</span></li>
          <li><span className="hl-text"><strong>소비자의 불만 또는 분쟁처리에 관한 기록</strong> — 3년 (전자상거래법)</span></li>
          <li><span className="hl-text"><strong>웹사이트 방문 기록</strong> — 3개월 (통신비밀보호법)</span></li>
        </ul>

        <h3 className="content-h3">4. 개인정보의 파기 절차 및 방법</h3>
        <p className="content-lead">
          보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구·재생이 불가능한 기술적 방법을 사용하여 삭제하며, 종이 문서에 출력된 개인정보는 분쇄하거나 소각하여 파기합니다.
        </p>

        <h3 className="content-h3">5. 개인정보의 제3자 제공</h3>
        <p className="content-lead">
          회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 이용자가 사전에 동의하거나 법령의 규정에 의거한 경우에는 예외로 합니다.
        </p>

        <h3 className="content-h3">6. 개인정보처리의 위탁</h3>
        <p className="content-lead">
          회사는 현재 개인정보 처리업무를 외부에 위탁하고 있지 않습니다. 향후 위탁이 발생할 경우 위탁받는 자, 위탁업무 내용을 본 방침을 통해 사전에 고지하고 필요 시 동의를 받겠습니다.
        </p>

        <h3 className="content-h3">7. 정보주체의 권리·의무 및 행사 방법</h3>
        <p className="content-lead">
          이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며, 수집·이용에 대한 동의 철회 및 삭제를 요청할 수 있습니다. 권리 행사는 아래 개인정보 보호책임자에게 서면, 전화, 이메일로 연락하시면 지체 없이 조치합니다.
        </p>

        <h3 className="content-h3">8. 개인정보의 안전성 확보 조치</h3>
        <ul className="history-list">
          <li><span className="hl-text">개인정보에 대한 접근 권한을 최소한의 인원으로 제한</span></li>
          <li><span className="hl-text">개인정보 처리 시스템에 대한 접근 통제 및 접근 기록 보관</span></li>
          <li><span className="hl-text">개인정보를 안전하게 저장·전송할 수 있는 암호화 기술 적용</span></li>
        </ul>

        <h3 className="content-h3">9. 개인정보 보호책임자</h3>
        <div className="address-block">
          <span className="ab-label">성명</span>
          <span className="ab-value">이은별 (대표)</span>
        </div>
        <div className="address-block">
          <span className="ab-label">연락처</span>
          <span className="ab-value"><a href="tel:1544-4701">1544-4701</a></span>
        </div>
        <div className="address-block">
          <span className="ab-label">이메일</span>
          <span className="ab-value"><a href="mailto:newsmarketing@daum.net">newsmarketing@daum.net</a></span>
        </div>

        <h3 className="content-h3">10. 고지의 의무</h3>
        <p className="content-lead">
          본 방침은 법령·정책 변경에 따라 개정될 수 있으며, 내용 추가·삭제 및 수정이 있을 경우 시행일 최소 7일 전에 홈페이지를 통해 공지합니다.
        </p>

        <div className="cta-box">
          <div>
            <strong>개인정보 관련 문의가 있으신가요?</strong>
            <p>개인정보 보호책임자에게 언제든 문의해 주세요</p>
          </div>
          <a href="mailto:newsmarketing@daum.net" className="btn btn-primary">이메일로 문의</a>
        </div>
      </SubPageLayout>
    </main>
  )
}
