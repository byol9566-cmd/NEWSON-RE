import { Metadata } from 'next'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '이용약관 — 뉴스온',
  description: '뉴스온(NEWSON) 서비스 이용약관 — 서비스 제공 범위, 이용자와 회사의 권리·의무 안내.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: '이용약관 — 뉴스온',
    description: '뉴스온(NEWSON) 서비스 이용약관 — 서비스 제공 범위, 이용자와 회사의 권리·의무 안내.',
    url: '/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="LEGAL"
        title="이용약관"
        sub="본 약관은 (주)뉴스온미디어(이하 '회사')가 제공하는 언론홍보·보도자료 배포 서비스 이용에 관한 조건을 규정합니다."
        breadcrumb="TERMS"
        sidebarHeading=""
        sidebarItems={[
          { label: '개인정보처리방침', href: '/privacy' },
          { label: '온라인 문의', href: '/inquiry' },
        ]}
      >
        <p className="content-lead">시행일자: 2026년 7월 9일</p>

        <h3 className="content-h3">제1조 (목적)</h3>
        <p className="content-lead">
          본 약관은 회사가 운영하는 웹사이트(www.newson.co.kr, 이하 '사이트')를 통해 제공하는 언론홍보·보도자료 배포·네이버 블로그 게재 등 제반 서비스(이하 '서비스')의 이용 조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>

        <h3 className="content-h3">제2조 (정의)</h3>
        <ul className="history-list">
          <li><span className="hl-text"><strong>이용자</strong> — 사이트를 통해 회사가 제공하는 서비스를 이용하는 개인 또는 법인</span></li>
          <li><span className="hl-text"><strong>서비스</strong> — 보도자료 기획·작성, 언론사 배포, 네이버 블로그 게재, 기사형 광고 등 회사가 제공하는 언론홍보 관련 제반 서비스</span></li>
          <li><span className="hl-text"><strong>견적 신청</strong> — 이용자가 사이트의 온라인 문의 또는 전화 상담을 통해 서비스 이용을 요청하는 행위</span></li>
        </ul>

        <h3 className="content-h3">제3조 (약관의 효력 및 변경)</h3>
        <p className="content-lead">
          본 약관은 사이트에 게시함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시 적용일자 및 개정 사유를 명시하여 최소 7일 전(이용자에게 불리한 변경은 30일 전)부터 사이트에 공지합니다.
        </p>

        <h3 className="content-h3">제4조 (서비스의 제공 및 변경)</h3>
        <p className="content-lead">
          회사는 다음 각 호의 서비스를 제공합니다. 회사는 서비스 내용을 추가·변경할 수 있으며, 변경 시 사이트를 통해 사전 공지합니다.
        </p>
        <ul className="history-list">
          <li><span className="hl-text">보도자료 기획, 작성 및 제휴 언론사 배포</span></li>
          <li><span className="hl-text">네이버 블로그 게재 대행</span></li>
          <li><span className="hl-text">기사형 광고 및 위기관리·정정 대응 컨설팅</span></li>
        </ul>

        <h3 className="content-h3">제5조 (이용계약의 성립)</h3>
        <p className="content-lead">
          이용계약은 이용자가 사이트의 온라인 문의 양식 또는 전화 상담을 통해 견적을 신청하고, 회사가 이를 승낙함으로써 성립합니다. 회사는 다음 각 호에 해당하는 경우 승낙을 유보하거나 거절할 수 있습니다.
        </p>
        <ul className="history-list">
          <li><span className="hl-text">신청 내용에 허위 정보가 포함된 경우</span></li>
          <li><span className="hl-text">공서양속에 반하거나 관계 법령을 위반하는 콘텐츠의 배포를 요청하는 경우</span></li>
          <li><span className="hl-text">기타 회사의 업무 수행상 현저히 지장이 있다고 판단되는 경우</span></li>
        </ul>

        <h3 className="content-h3">제6조 (이용자의 의무)</h3>
        <p className="content-lead">
          이용자는 견적 신청 및 콘텐츠 제공 시 정확한 정보를 제공해야 하며, 제공하는 보도자료·광고 콘텐츠에 대한 저작권 및 사실관계에 대한 책임은 이용자에게 있습니다. 이용자는 관계 법령, 본 약관 및 회사가 통지하는 사항을 준수하여야 합니다.
        </p>

        <h3 className="content-h3">제7조 (회사의 의무)</h3>
        <p className="content-lead">
          회사는 관련 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 계속적·안정적으로 서비스를 제공하기 위해 노력합니다. 회사는 이용자의 개인정보를 <a href="/privacy">개인정보처리방침</a>에 따라 보호합니다.
        </p>

        <h3 className="content-h3">제8조 (대금 결제 및 환불)</h3>
        <p className="content-lead">
          서비스 이용 대금은 견적 확정 시 안내되는 방법(계좌이체 등)으로 결제하며, 정식 세금계산서 발행이 가능합니다. 회사의 귀책사유로 서비스가 제공되지 못한 경우 결제 대금 전액을 환불하며, 배포가 개시된 이후에는 이미 수행된 업무 범위에 따라 환불 금액을 산정합니다.
        </p>

        <h3 className="content-h3">제9조 (계약 해지 및 이용 제한)</h3>
        <p className="content-lead">
          이용자는 서비스 개시 전까지 계약 해지를 요청할 수 있습니다. 회사는 이용자가 본 약관을 위반하거나 서비스의 정상적인 운영을 방해한 경우 사전 통지 후 서비스 제공을 중단하거나 계약을 해지할 수 있습니다.
        </p>

        <h3 className="content-h3">제10조 (면책조항)</h3>
        <p className="content-lead">
          회사는 천재지변, 언론사·포털의 정책 변경 등 회사의 통제범위를 벗어난 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다. 이용자가 제공한 콘텐츠의 사실관계 오류, 저작권 침해 등으로 발생한 분쟁에 대해 회사는 책임을 지지 않습니다.
        </p>

        <h3 className="content-h3">제11조 (분쟁해결 및 재판관할)</h3>
        <p className="content-lead">
          회사와 이용자 간 발생한 분쟁은 상호 협의하여 원만히 해결하는 것을 원칙으로 하며, 협의가 이루어지지 않을 경우 민사소송법상의 관할 법원에 소를 제기할 수 있습니다. 본 약관은 대한민국 법령에 따라 해석·적용됩니다.
        </p>

        <div className="address-block">
          <span className="ab-label">상호</span>
          <span className="ab-value">(주)뉴스온미디어 (대표 이은별)</span>
        </div>
        <div className="address-block">
          <span className="ab-label">사업자등록번호</span>
          <span className="ab-value">428-86-00314</span>
        </div>
        <div className="address-block">
          <span className="ab-label">주소</span>
          <span className="ab-value">경기도 하남시 미사대로 550, C동 10층 1001호 (현대지식산업센터 한강미사)</span>
        </div>

        <div className="cta-box">
          <div>
            <strong>이용약관 관련 문의가 있으신가요?</strong>
            <p>전담 AE에게 언제든 문의해 주세요</p>
          </div>
          <a href="tel:1544-4701" className="btn btn-primary">1544-4701</a>
        </div>
      </SubPageLayout>
    </main>
  )
}
