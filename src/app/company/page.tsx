import { Metadata } from 'next'
import Link from 'next/link'
import SubPageLayout from '@/components/SubPageLayout'

export const metadata: Metadata = {
  title: '회사소개 — 뉴스온',
  description: '(주)뉴스온미디어는 2014년부터 언론홍보 대행 서비스를 제공해온 전문 기업입니다. 회사 연혁, 운영 중인 미디어 사이트, 3,500여 주요 거래처, 900여 개 제휴 언론사 현황과 오시는 길까지 한눈에 확인하세요.',
  alternates: { canonical: '/company' },
  openGraph: {
    title: '회사소개 — 뉴스온',
    description: '(주)뉴스온미디어는 2014년부터 언론홍보 대행 서비스를 제공해온 전문 기업입니다. 회사 연혁, 운영 중인 미디어 사이트, 3,500여 주요 거래처, 900여 개 제휴 언론사 현황과 오시는 길까지 한눈에 확인하세요.',
    url: '/company',
    type: 'website',
  },
}

const COMPANY_HISTORY = [
  { date: '2011.07.26', text: '디자인에이풀 설립' },
  { date: '2014.07.14', text: '언론홍보 대행사 ‘뉴스온’ 서비스 개시' },
  { date: '2016.08.17', text: '언론사 신개념 배너광고 솔루션 ‘뉴스온배너’ 서비스 개시' },
  { date: '2016.08.18', text: '(주)뉴스온미디어 법인 설립' },
  { date: '2017.06.19', text: '대행사 전용 보도자료 배포 사이트 ‘이슈24’ 오픈' },
  { date: '2019.01.01', text: '드론전문지 ‘드론경제’ 창간' },
  { date: '2019.02.06', text: '‘드론경제’ 모바일 앱 출시' },
  { date: '2019.03.31', text: '뉴스온 네이버 블로그 개시' },
  { date: '2019.09.03', text: '크몽 언론홍보 서비스 개시' },
  { date: '2019.10.13', text: '보도자료 배포 서비스 ‘뉴스온와이어’ 오픈' },
  { date: '2020.10.23', text: '‘드론경제’ 포털사이트 ZUM 뉴스검색제휴' },
  { date: '2024.11.27', text: '통합 제보 플랫폼 ‘뉴스제보’ 런칭' },
  { date: '2025.03.14', text: '부동산 매수인 소개 플랫폼 ‘리얼딕(REALDIC)’ 런칭' },
  { date: '2025.03.20', text: '제보기사 온라인 웹진 ‘뉴스제보 웹진’ 발간' },
  { date: '2025.05.29', text: '‘뉴스제보 웹진’ 인터넷신문 정식 등록 (등록번호: 경기 아 54435)' },
  { date: '2025.07.24', text: '제보기사 전문 매체 ‘뉴스제보 웹진’ 창간' },
]

const OPERATED_SITES = [
  { name: '뉴스온', desc: '언론홍보 전문 사이트', url: 'https://www.newson.co.kr' },
  { name: '뉴스온와이어', desc: '보도자료 배포 전문 사이트', url: 'https://www.newsonwire.co.kr' },
  { name: '이슈24', desc: '대행사 전용 보도자료 배포 사이트', url: 'https://www.issue24.co.kr' },
  { name: '뉴스온 네이버 블로그', desc: '네이버 블로그', url: 'https://blog.naver.com/newpic2018' },
  { name: '뉴스제보', desc: '통합 제보 플랫폼 사이트', url: 'https://www.newsjebo.co.kr' },
  { name: '뉴스제보 웹진', desc: '제보기사 전문 매체', url: 'https://www.newsjebowebzine.co.kr' },
]

const PRESS_ARTICLES = [
  { label: '디지털타임스', url: 'https://www.dt.co.kr/contents.html?article_no=2019020102109923813012&ref=naver' },
  { label: '연합뉴스', url: 'https://www.yna.co.kr/view/AKR20160817142500848?input=1195m' },
  { label: '서울경제', url: 'https://www.sedaily.com/NewsView/1L06E6VAKX' },
  { label: '브릿지경제', url: 'https://www.viva100.com/main/view.php?key=20160817001144229' },
  { label: '인터뷰365', url: 'https://www.interview365.com/news/articleView.html?idxno=110253' },
  { label: 'IT비즈뉴스', url: 'https://www.itbiznews.com/news/articleView.html?idxno=177460' },
  { label: '글로벌경제', url: 'https://www.getnews.co.kr/news/articleView.html?idxno=835576' },
  { label: '한국목재신문', url: 'https://www.woodkorea.co.kr/news/articleView.html?idxno=86060' },
]

const PARTNERS =
  '린나이(주), 고진모터스, (주)한국오키시스템즈, (주)슈어소프트테크, 스낵24, (주)미래나노텍, (주)모션어드바이저, (주)벤타브이알, 일렉배리, 마이아트뮤지엄, 국선생 (주)홈스푸드, 쿨사인, 버텍스아이디, (주)엑스오비스, 서초문화원, (주)팜팜, 한강뮤지엄, (주)런케이에듀, 라이앤캐처스, 농어촌청소년육성재단, 리멤버피부과, 마켓비, 재단법인 선교, (주)피에스인터네셔널, 제트컨버터클라우드, 시사어학원, 아젠다북, (주)혼 미니골드, 계림당, 뷰소닉, 위시켓, 피코코리아, 한양그린파크, 용인비상에듀기숙학원, 하루하루움직임연구소, 어나더컴퍼니, 일만족발, 새로운학원, 유니컵컴퍼니, HY이공계편입학원, 경북시민재단, 엑스퍼트컨설팅, 코드잇, 트리포스, 파마칼인터내셔널, 위드윈인베스트먼트, 프린파크, 닥터효 등'

const MEDIA_OUTLETS = `1stLook(퍼스트룩) ABC뉴스 addyk AFP ANT뉴스통신 AP APTV BBCNews BIKorea BloombergNews bnt뉴스 CAD&Graphics(캐드앤그래픽스) CAR CBC뉴스 CBS CCTV CCTV뉴스 CCTV저널 CEO랭킹뉴스 CEO스코어데일리 ChinaRadioInternational CIOKorea CMN CNB뉴스 CNET코리아 CNN DowJonesNewswires DPA,GermanPressAgency e2cast East-Asia-Intel.com EBN Ebuzz enews24 EPA EVO e뉴스페이퍼 e헬스통신 Fetv FujiTV(후지TV) GQ(지큐) G밸리 h-뉴스 imbc IPN뉴스 ITNEWS ITWorld IT동아 IT매일 IT비즈 IT조선 IT타임스 IXD(아이엑스디자인) JATO JijiPress JJ매거진(J.J.magazine) Jlook(제이룩) JTBC JTN뉴스 KBN헬스뉴스 KBS KDA뉴스 KIPOST KJ타임즈 KNS뉴스통신 KyodoNews K모바일 M&C Mainichi신문 MBC MBN MBN스타 MK스포츠 MTV NAC미디어 ncn플러스 Newsbag NewYorkTimes NHK Nishinippon신문 nowntv NSP통신 NTDTV OBS OSEN PCbee People'sDailyOnline PNF뉴스 PressTV Queen(퀸) RadioFreeAsia Reuters ReutersTV ROOKIE(루키) RPM9 SBS SBSCNBC Science&TechnologyDaily ShogakukanInc. SK엔카매거진 smartPC사랑 StarN Stylerby주부생활 S신세계Style TaiwanMicroviewTV TBS THEBC매거진 TIN뉴스 TOKYO신문 Transtrendmagazine(하나은행) TVAsahi TVTokyo TV리포트 TV조선 UPI뉴스 VOA-SeoulNewsCenter VoiceofAmerica WallStreetJournal YTN 가스신문 강원일보 건설경제 건설이코노미뉴스 건설타임즈 검경일보 게임톡 게임포커스 겟잇케이 경기도민일보 경기매일 경기신문 경기일보 경남매일 경인매일 경인일보 경제투데이 경제풍월 경제플러스 경향신문 고아웃 공정뉴스 광남일보 광명지역신문 광주매일신문 광주일보 광주타임즈 교통뉴스 교통신문 국민일보 국방일보 국제뉴스 국제신문 국토산업신문 굿타임즈 그라치아(Grazia) 그린투데이 그린포스트코리아 글로벌경제 글로벌뉴스통신 글로벌오토뉴스 글로벌이코노믹 금융경제신문 금융소비자뉴스 급식뉴스 기능식품신문 기독일보 기어박스 기업&미디어 기호일보 까사리빙(CasaLiving) 나눔뉴스 나눔일보 나인스타즈 나일론(Nylon) 내외경제TV 내외통신 내일신문 네이버(Neighbor) 네일홀릭 네트워크타임즈 넥스트데일리 노동일보 노블레스(Noblesse) 노블리안(신라호텔) 노컷뉴스 노트포럼 녹색경제 농민신문 뉴데일리 뉴스1 뉴스데일리 뉴스라이즈 뉴스매거진 뉴스백 뉴스쉐어 뉴스에듀신문사 뉴스에이 뉴스에이드 뉴스엔 뉴스엔뷰 뉴스온 뉴스워치 뉴스워커 뉴스웍스 뉴스웨이 뉴스웨이브 뉴스위크 뉴스인 뉴스인사이드 뉴스인스타 뉴스지닷컴 뉴스캔 뉴스컬쳐 뉴스코리아 뉴스타운 뉴스탭 뉴스토마토 뉴스토피아 뉴스투데이 뉴스파인더 뉴스팩트 뉴스포스트 뉴스프리존 뉴스플러스 뉴스핌 뉴스한국 뉴시스 뉴시안 니혼게이자이신문 다나와뉴스 다이어트데일리 닥터 W 대경일보 대구신문 대기원시보 대전시티저널 대전일보 대전투데이 대한금융신문 대한급식신문 대한뉴스 대한투데이 더갤러리아(갤러리아백화점) 더기어 더닥터 더데일리뉴스 더드라이브 더리더 더모토 더벨 더블유코리아(WKorea) 더셀러브리티 더스쿠프 더스타 더인베스터 더코리아뉴스 더타임즈 더팩트 더퍼스트클래스 더피알뉴스 더하우스&리폼(TheHausReform) 데이즈드앤컨퓨즈드(Dazed&Confused) 데이터넷 데이터뉴스 데일리경제 데일리그리드 데일리메디팜 데일리스포츠한국 데일리시사닷컴 데일리시큐 데일리안 데일리연합 데일리와이 데일리중앙 데일리카 데일리투모로우 데일리팜 데일리팝 데일리한국 데일리환경 데코저널(DecoJournal) 덴(TheDEN) 독서신문 동아TV 동아경제신문 동아닷컴 동아일보 동양일보 디스패치 디아이투데이 디에디트 디오데오 디지털데일리 디지털밸리 디지털조선 디지털타임스 디트뉴스24 똑똑뉴스 라이드매거진 라이브뉴스 라이브엔 라포르시안 러브즈뷰티 럭셔리(LUXURY) 레져신문 로드테스트 로봇신문 로시피엘옴므(LofficielHommes) 로이슈 루엘(LUEL) 르몽드 리드맘 리뷰스타 리빙센스 리테일매거진 마리끌레르(MarieClaire) 마운틴TV 마이데일리 마이웨딩 마이크로소프트웨어 맘앤앙팡 매경닷컴 매경이코노미 매일경제 매일경제TV 매일신문 매일일보 맥스무비 맥심(Maxim) 머니S 머니투데이 머니투데이더리더 머니투데이더벨 머니투데이방송 머니투데이스타일M 메디게이트뉴스 메디소비자뉴스 메디칼럼 메디칼미디어 메디칼업저버 메디칼타임즈 메디칼통신 메디칼투데이 메디칼트리뷴 메디컬리포터 메디컬투데이 메디컬헤럴드 메디코파마뉴스 메디파나뉴스 메디팜헬스뉴스 메디포뉴스 메종(Maison) 메트로 모닝뉴스 모르니까타임즈 모비인사이드 모빌리스타 모터그래프 모터리언 모터매거진 모터바이크 모터트렌드 모터피디 모토야 무등일보 무비조이 문화일보 뮤인(Muine) 미디어메디 미디어스 미디어앤컨텐츠 미디어왓 미디어인뉴스 미디어펜 미래경제 미래한국 민주신문 민중의소리 바끄로 바앤다이닝 바이라인네트워크 바이커즈랩 바이킹 백세시대 베스트베이비 베스트일레븐 베이비뉴스 베이비타임즈 베타뉴스 벤처스퀘어 병원신문 보건뉴스 보건신문 보그(Vogue) 보드나라 보안뉴스 봉황망코리아 부산일보 불만닷컴 뷰티경제 뷰티누리 뷰티뉴스 뷰티쁠 뷰티코리아뉴스 뷰티한국 브레이크뉴스 브레인박스 브릿지경제 블로터닷넷 블록데일리 블록미디어 블록인프레스 블록체인뉴스 블록체인밸리 블록체인타임즈 블록체인타임즈TV 비석세스 비주얼다이브 비즈니스리포트 비즈니스워치 비즈니스포스트 비즈앤이슈 비즈업 비즈엔터 비즈트리뷴 비즈한국 비트뉴스 비하인드 빅데이터뉴스 사람과산 사이언스엠디 산업일보 산케이신문 새전북신문 생활/문화뉴스 생활/문화일보 생활/문화저널21 서울경제 서울경제 디센터 서울경제TV 서울경제매거진 서울경제스타 서울뉴스통신 서울생활/문화투데이 서울신문 서울신문STV 서울와이어 서울일보 서울투데이 서울파이낸스 선데이뉴스신문 성인병뉴스 세계닷컴 세계로칼타임즈 세계일보 세계타임즈 세계파이낸스 세정일보 셀룰러온라인 소년조선 소년한국일보 소믈리에타임즈 소비라이프 소비자가만드는신문 소비자를위한신문 수원일보 스냅 스마트경제 스카이데일리 스타뉴스 스타데일리뉴스 스타서울TV 스타에이지 스타엔뉴스 스타일H 스타일뉴스 스타일보 스타저널 스타투데이 스타패션 스텔라매거진 스트레이트뉴스 스틸앤메탈뉴스 스페셜경제 스포TV 스포츠Q 스포츠경향 스포츠동아 스포츠서울 스포츠월드 스포츠조선 스포츠투데이 스포츠포위민 스포탈코리아 시민일보 시사뉴스 시사뉴스피플 시사미디어 시사오늘 시사우리신문 시사위크 시사저널 시사저널e 시사코리아 시사타임즈 시사투데이 시사포커스 시선뉴스 시장경제신문 시크뉴스 식약신문 식약일보 식품외식경제 식품음료신문 식품저널 신아일보 신화통신 싱글리스트 싱글즈(Singles) 쎄씨(Ceci) 쎈뉴스 아레나(ARENA) 아망 아사히신문 아시아i 아시아경제 아시아경제TV 아시아뉴스통신 아시아에너지경제 아시아엔 아시아일보 아시아타임즈 아시아투데이 아시아헤럴드 아웃도어뉴스 아웃소싱타임스 아웃스탠딩 아유경제 아이뉴스24 아이씨엔웹 아이코리아뉴스 아이티데일리 아이티비즈 아이티투데이 아이팜뉴스 아주경제 아크로팬 아트코리아방송 애플경제 앳스타일(@star1) 약국신문 약사공론 약사신문 약업신문 어린이과학동아 어린이동아 어반라이크 어패럴뉴스 얼루어(Allure) 얼리어답터 업다운뉴스 업코리아 에너지경제 에너지코리아 에너지타임즈 에브리뉴스 에비뉴엘(Avenuel) 에스비즈뉴스 에스콰이어(Esquire) 에이블뉴스 에이빙뉴스 에이빙코리아 에코뉴스 엑스포츠뉴스 엔디엔뉴스 엔터미디어 엘르(ELLE) 엘르데코 엠디저널 엠프레스 여성경제신문 여성동아 여성소비자신문 여성신문 여성조선 여성종합뉴스 여성중앙 여행레저신문 연예투데이뉴스 연합뉴스 연합뉴스TV 연합마이더스 연합소비자타임스 연합인포맥스 영남일보 오가닉라이프신문 오늘뉴스 오마이뉴스 오토in 오토다이어리 오토데일리 오토모빌썬 오토뷰 오토카 오토카코리아 오토캠핑 오토타임즈 오토헤럴드 오픈뉴스 온케이웨더 올리브TV 와이드커버리지 왓처데일리 외식경영 요미우리신문 우리경제신문 우리아이뉴스 우먼센스 우먼컨슈머 울산매일 월간CA 월간IM 월간마운틴 월간산 월간식당 월간아웃도어 월간인테리어(Interiors) 월간캠핑 월드경제 월드스타 월드투데이 월요신문 웨딩21 웰페어뉴스 웹데일리 위클리오늘 위키리스크한국 위키트리 유저스프레스 유통데일리 의계신문 의료정보 의사신문 의학신문 의협신문 이뉴스코리아 이뉴스투데이 이데일리 이데일리TV 이버즈 이슈데일리 이슈와뉴스 이슈타임 이엠디 이지경제 이코노뉴스 이코노미21 이코노미조선 이코노믹리뷰 이코노믹톡뉴스 이코노믹포스트 이타임즈 이투뉴스 이투데이 이하우징(ehousing) 인데일리 인사이드저널 인사이트 인스타일(Instyle) 인터뷰365 인테르니앤데코(INTERNI&Décor) 인트로뉴스 일간ntn 일간대한뉴스 일간리더스경제 일간보사 일간스포츠 일간연예스포츠 일간투데이 일요경제 일요서울 일요시사 일요신문 일요저널 일요주간 임베디드월드 임프레션(Impression) 자동차생활 자유방송 장업신문 재경일보 전기신문 전남인터넷신문 전라매일 전라일보 전력신문 전민일보 전북도민일보 전북매일신문 전북중앙신문 전업농신문 전자신문 전파신문 점프볼 정경뉴스 정보통신신문 제니스뉴스 제민일보 제이칸뉴스 제주도민일보 제주신보 제주일보 조선닷컴 조선비즈 조선일보 조세금융신문 조세일보 조은뉴스 조이뉴스24 주간경향 주간동아 주간무역 주간조선 주간코스메틱(제니파크) 주간한국 주간현대 중도일보 중부매일 중부일보 중소기업신문 중앙뉴스 중앙뉴스통신 중앙이코노미스트 중앙일보 증권일보 지디넷코리아 지밸리 지앤이타임즈 지피코리아 창업&프랜차이즈 채널 틴투레이디 채널A 천지일보 청년의사 체인뉴스 초이스경제 충남일보 충북일보 충청매일 충청신문 충청일보 충청타임즈 충청투데이 카&테크 카랩 카미디어 카앤모델 카이즈유 카조선 카포스 캠퍼스잡앤조이(CAMPUSJOB&JOY) 컨슈머리포트 컨슈머와이드 컨슈머치 컨슈머타임스 컴타 케이벤치 코리아IT타임즈 코리아뉴스 코리아뉴스타임즈 코리아데일리 코리아메디케어 코리아쉬핑가제트 코리아저스티스타임즈 코리아중앙데일리 코리아타임스 코리아포스트 코리아헤럴드 코메디닷컴 코스모닝 코스모폴리탄(Cosmopolitan) 코스인코리아 코인데스크코리아 쿠키뉴스 키뉴스 키닥터 키즈맘 탑기어 탑라이더 테이크뉴스 테크M 테크노아 테크홀릭 텐아시아 토마토TV 토요경제 토큰포스트 톡톡뉴스 톱데일리뉴스 톱스타뉴스 통신일보 투데이경제 투데이신문 투데이에너지 투데이저널 투데이코리아 투어코리아 트래블투데이 트루스토리 티브이데일리 파이낸셜뉴스 파이낸셜신문 파이낸셜투데이 파이낸스투데이 팍스넷 팝콘TV 팝콘뉴스 패션비즈 패션인사이트 패션저널 패션지오 패션채널 펄스(콘래드호텔) 포브스코리아(FobesKorea) 포스터 포쓰저널 포춘코리아 포커스뉴스 포포투(FourFourTwo) 폴리뉴스 푸드앤메드 푸드투데이 푸른한국닷컴 프라임경제 프런티어타임스 프레스24 프레시안 프리빌리지(롯데명품관) 플래텀 플랫폼뉴스 플러스코리아 피플투데이 하드웨어랩 하이닥 하퍼스바자(Harper'sBazzar) 한강일보 한강타임즈 한겨레 한겨레21 한경닷컴 한경비즈니스 한국IDG 한국NGO신문 한국건설신문 한국건설신문사 한국경제 한국경제TV 한국금융신문 한국대학신문 한국면세뉴스 한국병원방송 한국사진방송 한국섬유경제신문사 한국섬유신문 한국소비자경제신문 한국스포츠경제 한국시정신문 한국식품의약신문 한국아이닷컴 한국에너지 한국에너지신문 한국이륜차신문 한국일보 한국정경신문 한국정책신문 한국증권신문 한국타임즈 한라일보 한민족신문 행복이가득한집 헤드라인뉴스 헤드라인제주 헤럴드POP 헤럴드경제 헤렌 헤이맨뉴스 헬로스포츠 헬로티 헬스데이뉴스 헬스미디어 헬스앤라이프 헬스앤마켓 헬스코리아뉴스 헬스포커스 현대건강신문 현대경제 현대경제신문 현대해양 호텔&레스토랑 호텔아비아 화이트페이퍼 화학경제연구원 환경TV 환경매일신문 환경미디어 환경법률신문 환경일보 후생신보`

export default function CompanyPage() {
  return (
    <main id="main-content">
      <SubPageLayout
        eyebrow="ABOUT NEWSON"
        title="회사소개"
        sub="(주)뉴스온미디어 — 언론홍보·기사광고·보도자료 배포·뉴스제보 대행 전문 홍보대행사."
        breadcrumb="COMPANY"
        sidebarHeading=""
        sidebarItems={[
          { label: '회사소개', href: '/company', active: true },
          { label: '오시는 길', href: '/location' },
        ]}
      >
        <h2 className="content-h2">(주)뉴스온미디어</h2>
        <p className="content-lead">
          ‘뉴스온(newson)’은 언론홍보, 기사광고, 보도자료 배포, 뉴스제보 대행 전문 홍보대행사입니다.
          국내 900여 개 언론사, 각 산업별 기자 3,000여 명에게 보도자료 배포 서비스를 제공하고 있습니다.
        </p>

        <h3 className="content-h3">회사 연혁</h3>
        <ul className="history-list">
          {COMPANY_HISTORY.map((item) => (
            <li key={item.date}>
              <span className="hl-date">{item.date}</span>
              <span className="hl-text">{item.text}</span>
            </li>
          ))}
        </ul>

        <h3 className="content-h3">운영 사이트</h3>
        <ul className="linkfeed-list">
          {OPERATED_SITES.map((site) => (
            <li key={site.url}>
              <span className="lf-name">{site.name}</span>
              <span className="lf-desc">{site.desc}</span>
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.url.replace(/^https?:\/\//, '')}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="content-h3">주요 거래처</h3>
        <p className="partner-text">{PARTNERS}</p>
        <p className="partner-more">
          <Link href="/clients">전체 클라이언트 보기 →</Link>
        </p>

        <h3 className="content-h3">제휴 언론사 현황</h3>
        <p className="content-lead">
          국내 900여 개 언론사, 각 산업별 기자 3,000여 명에게 보도자료를 배포합니다.
          종합지·경제지·전문지·방송·통신사·외신까지 폭넓은 매체 네트워크를 보유하고 있습니다.
        </p>
        <details className="media-box">
          <summary>제휴 언론사 전체 목록 보기</summary>
          <ul className="media-list">
            {MEDIA_OUTLETS.split(/\s+/).map((name, i) => (
              <li key={`${name}-${i}`}>{name}</li>
            ))}
          </ul>
        </details>

        <h3 className="content-h3">언론 보도</h3>
        <ul className="linkfeed-list">
          {PRESS_ARTICLES.map((article) => (
            <li key={article.url}>
              <span className="lf-name">{article.label}</span>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.url}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="content-h3">오시는 길</h3>
        <p className="content-lead">수도권 전철 5호선 하남풍산역에서 도보 3분 거리의 역세권입니다. 현대지식산업센터 한강미사 건물 엘리베이터 이용 후 10층으로 올라와 주세요.</p>

        <div className="location-map-wrap">
          <iframe
            src="https://maps.google.com/maps?q=%EA%B2%BD%EA%B8%B0%20%ED%95%98%EB%82%A8%EC%8B%9C%20%EB%AF%B8%EC%82%AC%EB%8C%80%EB%A1%9C%20550%20%ED%98%84%EB%8C%80%EC%A7%80%EC%8B%9D%EC%82%B0%EC%97%85%EC%84%BC%ED%84%B0%20%ED%95%9C%EA%B0%95%EB%AF%B8%EC%82%AC&hl=ko&z=16&output=embed"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="뉴스온 본사 위치"
          />
        </div>

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

        <div className="cta-box">
          <div>
            <strong>언론홍보가 필요하신가요?</strong>
            <p>전담 AE가 브랜드 상황에 맞춘 맞춤 전략을 제안합니다</p>
          </div>
          <Link href="/inquiry" className="btn btn-primary">무료 견적 신청 →</Link>
        </div>
      </SubPageLayout>
    </main>
  )
}
