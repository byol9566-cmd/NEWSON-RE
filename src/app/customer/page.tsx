import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '고객센터 — 뉴스온',
  description: '뉴스온 고객센터 — 공지사항, 자주 묻는 질문, 문의 채널 안내.',
}

export default function CustomerPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="SUPPORT"
        title="고객센터"
        sub="공지사항, 자주 묻는 질문, 1:1 상담 채널을 한 곳에서 확인하세요."
        breadcrumb="SUPPORT"
        sidebarHeading="고객센터"
        sidebarItems={[
          { label: '공지사항', href: '/customer', active: true },
          { label: '자주 묻는 질문', href: '/customer#faq' },
          { label: '1:1 문의', href: '/inquiry' },
        ]}
      >
        <h2 className="content-h2">공지사항</h2>
        <p className="content-lead">뉴스온의 서비스 업데이트, 시스템 점검, 이벤트 소식을 안내합니다.</p>

        <div className="board-list">
          <div className="board-head">
            <span>번호</span><span>제목</span><span>작성자</span><span>작성일</span>
          </div>
          <div className="board-row is-notice">
            <span className="br-num"><span className="br-notice-tag">공지</span></span>
            <span className="br-title"><Link href="#">2026년 4월 언론사 제휴 확대 안내 — 25개 신규 매체 추가</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2026.04.15</span>
          </div>
          <div className="board-row is-notice">
            <span className="br-num"><span className="br-notice-tag">공지</span></span>
            <span className="br-title"><Link href="#">네이버 블로그 게재 서비스 정식 출시</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2026.03.01</span>
          </div>
          <div className="board-row">
            <span className="br-num">18</span>
            <span className="br-title"><Link href="#">2026년 설 연휴 고객센터 운영 일정 안내</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2026.02.05</span>
          </div>
          <div className="board-row">
            <span className="br-num">17</span>
            <span className="br-title"><Link href="#">홈페이지 리뉴얼 완료 — 더 빠르고 직관적인 서비스</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2026.01.20</span>
          </div>
          <div className="board-row">
            <span className="br-num">16</span>
            <span className="br-title"><Link href="#">위기관리 커뮤니케이션 전담팀 신설</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2025.12.15</span>
          </div>
          <div className="board-row">
            <span className="br-num">15</span>
            <span className="br-title"><Link href="#">주요 언론사 200개 돌파 기념 이벤트</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2025.11.01</span>
          </div>
          <div className="board-row">
            <span className="br-num">14</span>
            <span className="br-title"><Link href="#">2025년 상반기 서비스 이용 현황 리포트</Link></span>
            <span className="br-author">관리자</span>
            <span className="br-date">2025.07.10</span>
          </div>
        </div>

        <h3 className="content-h3" id="faq">자주 묻는 질문</h3>
        <div className="faq-simple">
          <details open>
            <summary>배포 후 기사 확인까지 얼마나 걸리나요?</summary>
            <div className="faq-a">평균 2~24시간 내에 주요 언론사에 게재되며, 네이버·다음 포털 반영은 최대 48시간까지 소요됩니다. 실시간 URL 리스트로 확인하실 수 있습니다.</div>
          </details>
          <details>
            <summary>보도자료 원고가 없는데 대필이 가능한가요?</summary>
            <div className="faq-a">전문 카피라이터가 브랜드 핵심 메시지를 인터뷰한 뒤 기사 형식으로 작성해 드립니다. STANDARD 이상 패키지에 기본 포함됩니다.</div>
          </details>
          <details>
            <summary>부정 기사가 나왔을 때 정정 요청이 가능한가요?</summary>
            <div className="faq-a">PREMIUM 패키지에서 제공됩니다. 긍정 보도자료로 검색 순위를 밀어내 부정 콘텐츠의 도달을 최소화합니다.</div>
          </details>
          <details>
            <summary>주말·공휴일에도 송출 가능한가요?</summary>
            <div className="faq-a">네, 24시간 송출 가능합니다. 다만 주말·공휴일 송출은 평일 대비 노출 효율이 낮아 권장하지 않습니다.</div>
          </details>
          <details>
            <summary>세금계산서 발행이 되나요?</summary>
            <div className="faq-a">정식 사업자로 전자세금계산서 발행이 가능합니다. 결제 완료 후 익일 발행해 드립니다.</div>
          </details>
          <details>
            <summary>계약 기간과 취소 정책은 어떻게 되나요?</summary>
            <div className="faq-a">단건 결제와 월간·연간 계약 모두 가능합니다. 송출 전에는 100% 환불, 송출 진행 중에는 잔여분에 대한 비례 환불이 이뤄집니다.</div>
          </details>
        </div>

        <div className="cta-box">
          <div>
            <strong>더 궁금한 점이 있으신가요?</strong>
            <p>1:1 문의로 전담 AE가 직접 답변드립니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">문의하기 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}
