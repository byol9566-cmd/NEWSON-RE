import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '고객센터 — 뉴스온',
  description: '뉴스온 고객센터에서 최신 공지사항과 서비스 이용 관련 자주 묻는 질문(FAQ), 1:1 문의 채널을 한 곳에서 확인하세요. 언론홍보 서비스 이용 중 궁금한 점을 빠르게 해결해 드립니다.',
  alternates: { canonical: '/customer' },
  openGraph: {
    title: '고객센터 — 뉴스온',
    description: '뉴스온 고객센터에서 최신 공지사항과 서비스 이용 관련 자주 묻는 질문(FAQ), 1:1 문의 채널을 한 곳에서 확인하세요. 언론홍보 서비스 이용 중 궁금한 점을 빠르게 해결해 드립니다.',
    url: '/customer',
    type: 'website',
  },
}

const NOTICES = [
  { title: '2026년 7월 9일 뉴스온 사이트가 리뉴얼 오픈했습니다.', date: '2026.07.09' },
]

const FAQ_ITEMS = [
  {
    q: '보도자료 배포 서비스는 어떤건가요?',
    a: '보도자료 배포 서비스는 908개 매체에 이메일로 기사를 뿌려드리는 서비스로, 매체 기자분께서 해당 보도자료를 보시고 기사거리가 될만하다고 생각하시면 기사화 해 주십니다. 단, 대기업 기사, 업계 1위 기사, 스타급 연예인 기사를 제외한 소규모업체 단순 광고기사는 기사거리로는 부족하기 때문에 1건도 기사화가 안되는 경우가 많습니다.',
  },
  {
    q: '블로그 게재 서비스는 어떤건가요?',
    a: '뉴스온에서 운영하는 네이버 블로그에 기사 게재해 드려서 네이버 뉴스 뿐만 아니라 블로그에도 추가로 기사를 노출해 드립니다.',
  },
  {
    q: '매체 선택이 가능한가요?',
    a: '가능합니다. 원하시는 매체 1,2,3순위 적어서 전달해 주시면 1순위 매체에 요청 후 반려되면 2,3순위 매체에 순차적으로 재요청드립니다.',
  },
  {
    q: '송출 시간 지정 및 예약이 가능한가요?',
    a: '당일 게재 요청시에는 시간 지정이 불가하며, 이전 날짜에 미리 예약하시면 시간 지정 송출 가능합니다.',
  },
  {
    q: '당일 송출 가능한가요?',
    a: '가능합니다. 언론사에 기사 송출 요청 후 평균 2시간 내외로 기사 게재됩니다. 다만, 일부매체는 오후 늦게 게재됩니다.',
  },
  {
    q: '보도자료 원고가 없는데 대필이 가능한가요?',
    a: '가능합니다. 기사대필료는 33,000원(VAT 포함)이며, 익일 오전까지 기사 작성해서 전달드립니다.',
  },
  {
    q: '기사 게재 후 수정 또는 삭제가 가능한가요?',
    a: '기사 수정/삭제는 정당한 사유가 있어야 가능하며, 대부분 매체들이 무료로 수정/삭제해 주시지만, 일부 매체는 수정/삭제 비용을 받기도 합니다.',
  },
  {
    q: '주말, 공휴일에도 송출 가능한가요?',
    a: '일부 마이너/중급매체는 주말, 공휴일에도 송출 가능합니다.',
  },
  {
    q: '세금계산서 발행이 되나요?',
    a: '정식 법인사업자로 사업자등록증 보내주시면 세금계산서 발급해 드립니다.',
  },
  {
    q: '기사와 이미지에 전화번호/홈페이지 주소 기재 가능한가요?',
    a: '2016년 3월 1일 N포털-D포털 뉴스제휴평가위원회가 출범하면서, 신문사들의 기사를 가장한 광고에 대한 규제가 시작되었습니다. 이로 인해 포털에 전송되는 모든 매체에서 기사와 사진에 전화번호와 URL, 번지수가 포함된 상세주소, 약도, 이메일 주소, QR코드, 카카오톡/페이스북/인스타그램 아이디 등의 표기가 금지되었습니다. 때문에 현재 전화번호와 URL를 넣을 수 있는 매체가 없습니다.',
  },
  {
    q: '법적 소송/고소/고발, 비리 제보, 억울한 누명, 직장내 괴롭힘/갑질 등과 시사성 기사도 송출 가능한가요?',
    a: '해당 기사는 <뉴스제보> 사이트(www.newsjebo.co.kr)에서 신청 가능합니다.',
  },
]

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

        <table className="board-table">
          <caption className="sr-only">공지사항 목록</caption>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {NOTICES.map((notice) => (
              <tr key={notice.title} className="is-notice">
                <td className="br-num"><span className="br-notice-tag">공지</span></td>
                <td className="br-title">{notice.title}</td>
                <td className="br-author">관리자</td>
                <td className="br-date">{notice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="content-h3" id="faq">자주 묻는 질문</h3>
        <div className="faq-simple">
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
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
