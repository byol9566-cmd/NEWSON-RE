import { Metadata } from 'next'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '오시는 길 — 뉴스온',
  description: '뉴스온 본사 위치 및 오시는 길 안내. 서울특별시 금천구 가산디지털2로 98, 2동 1306호.',
}

export default function LocationPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="CONTACT"
        title="오시는 길"
        sub="서울특별시 금천구 가산디지털2로 98, 2동 1306호"
        breadcrumb="LOCATION"
        sidebarHeading="회사소개"
        sidebarItems={[
          { label: '브랜드대상', href: '/brand-award' },
          { label: '오시는 길', href: '/location', active: true },
        ]}
      >
        <h2 className="content-h2">뉴스온 본사 오시는 길</h2>
        <p className="content-lead">지하철 1·7호선 가산디지털단지역 5번 출구에서 도보 5분 거리입니다. 엘리베이터 이용 후 13층으로 올라와 주세요.</p>

        <div className="location-map-wrap">
          <iframe
            src="https://maps.google.com/maps?q=%EA%B0%80%EC%82%B0%EB%94%94%EC%A7%80%ED%84%B82%EB%A1%9C+98&hl=ko&z=16&output=embed"
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
          <span className="ab-value">서울특별시 금천구 가산디지털2로 98, 2동 1306호</span>
        </div>
        <div className="address-block">
          <span className="ab-label">대표번호</span>
          <span className="ab-value"><a href="tel:031-758-0215">031-758-0215</a></span>
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
            <div className="tr-text"><strong>1·7호선 가산디지털단지역</strong><br />5번 출구 도보 5분</div>
          </div>
          <div className="transport-row">
            <span className="tr-type">버스</span>
            <div className="tr-text"><strong>가산디지털단지역 정류장</strong><br />500, 504, 5616, 5618, 6515</div>
          </div>
          <div className="transport-row">
            <span className="tr-type">주차</span>
            <div className="tr-text"><strong>건물 내 주차장 이용</strong><br />시간당 2,000원 (방문 시 할인)</div>
          </div>
        </div>
      </SubPageLayout>
    </main>
  )
}
