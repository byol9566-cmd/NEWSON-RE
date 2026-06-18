import { Metadata } from 'next'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '오시는 길 — 뉴스온',
  description: '뉴스온 본사 위치 및 오시는 길 안내. 경기도 하남시 미사대로 550, 현대지식산업센터 한강미사 C동 10층 1001호.',
}

export default function LocationPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CONTACT"
        title="오시는 길"
        sub="경기도 하남시 미사대로 550, 현대지식산업센터 한강미사 C동 10층"
        breadcrumb="LOCATION"
        sidebarHeading=""
        sidebarItems={[
          { label: '회사소개', href: '/company' },
          { label: '오시는 길', href: '/location', active: true },
        ]}
      >
        <h2 className="content-h2">뉴스온 본사 오시는 길</h2>
        <p className="content-lead">수도권 전철 5호선 하남풍산역에서 도보 3분 거리의 역세권입니다. 현대지식산업센터 한강미사 건물 엘리베이터 이용 후 10층으로 올라와 주세요.</p>

        <div className="location-map-wrap">
          <iframe
            src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%20%ED%95%98%EB%82%A8%EC%8B%9C%20%EB%AF%B8%EC%82%AC%EB%8C%80%EB%A1%9C%20550%20%ED%98%84%EB%8C%80%EC%A7%80%EC%8B%9D%EC%82%B0%EC%97%85%EC%84%BC%ED%84%B0%20%ED%95%9C%EA%B0%95%EB%AF%B8%EC%82%AC&hl=ko&z=16&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="뉴스온 본사 위치"
          />
        </div>

        <h3 className="content-h3">주소 및 연락처</h3>
        <div className="address-block">
          <span className="ab-label">주소</span>
          <span className="ab-value">경기도 하남시 미사대로 550, C동 10층 1001호 브이17 (덕풍동, 현대지식산업센터 한강미사)</span>
        </div>
        <div className="address-block">
          <span className="ab-label">대표번호</span>
          <span className="ab-value"><a href="tel:1544-4701">1544-4701</a></span>
        </div>
        <div className="address-block">
          <span className="ab-label">이메일</span>
          <span className="ab-value"><a href="mailto:newsmarketing@daum.net">newsmarketing@daum.net</a></span>
        </div>
        <div className="address-block">
          <span className="ab-label">운영시간</span>
          <span className="ab-value">평일 09:00 ~ 18:00 <span className="ab-sub">토·일·공휴일 휴무</span></span>
        </div>

        <h3 className="content-h3">교통 안내</h3>
        <div className="transport-list">
          <div className="transport-row">
            <span className="tr-type">지하철</span>
            <div className="tr-text"><strong>5호선 하남풍산역</strong><br />도보 3분 (역세권)</div>
          </div>
          <div className="transport-row">
            <span className="tr-type">버스</span>
            <div className="tr-text"><strong>하남풍산역·미사대로 정류장</strong><br />하차 후 도보 3분</div>
          </div>
          <div className="transport-row">
            <span className="tr-type">주차</span>
            <div className="tr-text"><strong>건물 지하주차장 이용</strong><br />방문 상담 시 주차 안내</div>
          </div>
        </div>
      </SubPageLayout>
    </main>
  )
}
