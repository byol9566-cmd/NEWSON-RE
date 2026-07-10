import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import type {
  CreatePostInput,
  ListPostsParams,
  ListPostsResult,
  Post,
  PostRepository,
  UpdatePostInput,
} from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'board.json')
const BASE_ID = 1101

const SEED_POSTS: readonly Post[] = [
  {
    id: 1101,
    title: "(2026-07-10) 국제학교 재학생 251명 참여… 베테랑스에듀 '커넥트 4기' 개최",
    author: '베테랑스에듀',
    content:
      "국내외 국제학교 재학생 251명이 참여한 진로 네트워킹 행사 '커넥트 4기'가 성황리에 개최됐다. 베테랑스에듀는 재학생과 졸업생 멘토를 연결하는 프로그램을 통해 국제학교 진학·진로 로드맵을 제시했다고 밝혔다.\n행사 관계자는 참가 규모가 매년 확대되고 있으며, 하반기에는 학부모 대상 세션도 신설할 계획이라고 전했다.",
    views: 0,
    createdAt: '2026-07-10T13:39:00+09:00',
    updatedAt: '2026-07-10T13:39:00+09:00',
  },
  {
    id: 1100,
    title: '(2026-07-09) 명가꽈배기, 신세계시흥프리미엄아울렛 판매',
    author: '(주)에이플',
    content:
      '수제 꽈배기 브랜드 명가꽈배기가 신세계시흥프리미엄아울렛에서 정식 판매를 시작했다. 당일 생산·당일 판매 원칙을 앞세워 오픈 첫 주말 준비 물량이 조기 완판되는 등 뜨거운 반응을 얻었다.\n회사 측은 수도권 주요 아울렛으로 입점을 순차 확대할 계획이라고 밝혔다.',
    views: 0,
    createdAt: '2026-07-09T10:12:00+09:00',
    updatedAt: '2026-07-09T10:12:00+09:00',
  },
  {
    id: 1099,
    title:
      '(2026-07-08) 스카이큐브, 단위큐브 기반 공간 표준화 특허 전용실시권 등록 완료…디지털 공중공간 플랫폼 사업',
    author: '스카이큐브',
    content:
      '스카이큐브가 단위큐브 기반 공간 표준화 특허의 전용실시권 등록을 완료했다고 밝혔다. 회사는 이번 등록을 계기로 디지털 공중공간 플랫폼 사업을 본격화한다는 계획이다.\n표준화된 단위큐브 체계를 통해 공중공간의 구획·거래·관리를 하나의 플랫폼에서 처리할 수 있다는 설명이다.',
    views: 4,
    createdAt: '2026-07-08T16:45:00+09:00',
    updatedAt: '2026-07-08T16:45:00+09:00',
  },
  {
    id: 1098,
    title:
      '(2026-07-08) 포스코홀딩스 사내벤처 윈스톤, 리튬 부산물 활용 친환경 건설소재 기술로 출사표',
    author: '브릭코리아',
    content:
      '포스코홀딩스 사내벤처 윈스톤이 리튬 부산물을 활용한 친환경 건설소재 기술을 공개했다. 폐기물로 처리되던 부산물을 고부가가치 소재로 전환해 탄소 배출과 처리 비용을 동시에 줄이는 것이 핵심이다.\n윈스톤은 브릭코리아와 협력해 연내 시범 생산 라인을 구축할 예정이다.',
    views: 4,
    createdAt: '2026-07-08T09:30:00+09:00',
    updatedAt: '2026-07-08T09:30:00+09:00',
  },
  {
    id: 1097,
    title:
      "(2026-07-06) 현대화, TV조선 '미스트롯 포유' 초대 우승자 최초 4연승 프로그램 '첫 명예졸업' 영예",
    author: '어게인엔터',
    content:
      "가수 현대화가 TV조선 '미스트롯 포유'에서 초대 우승자 최초로 4연승을 달성하며 '첫 명예졸업'의 영예를 안았다. 방송 직후 포털 실시간 검색어에 오르며 화제성을 입증했다.\n소속사 어게인엔터는 팬들의 성원에 보답하기 위해 전국 투어 콘서트를 준비 중이라고 밝혔다.",
    views: 6,
    createdAt: '2026-07-06T14:20:00+09:00',
    updatedAt: '2026-07-06T14:20:00+09:00',
  },
  {
    id: 1096,
    title: '(2026-07-05) 추적60분 키성장 영양제 실태',
    author: '키성장',
    content:
      '키성장 영양제 시장이 급성장하는 가운데 제품 성분과 광고 실태를 짚어보는 방송이 전파를 탄다. 전문가들은 성장기 아동의 영양 보충은 균형 잡힌 식단이 우선이라며 과장 광고에 대한 주의를 당부했다.\n방송에서는 주요 제품의 성분 분석 결과와 소비자 유의 사항이 함께 소개될 예정이다.',
    views: 11,
    createdAt: '2026-07-05T11:05:00+09:00',
    updatedAt: '2026-07-05T11:05:00+09:00',
  },
  {
    id: 1095,
    title:
      '(2026-07-03) 배우 박서준 공식 앰버서더 미트트리(meet tree), 성수동 팝업스토어 17일 개막',
    author: '미트트리코',
    content:
      '배우 박서준이 공식 앰버서더로 활동 중인 프리미엄 정육 브랜드 미트트리(meet tree)가 오는 17일 성수동에서 팝업스토어를 연다. 시식 존과 포토 존 등 체험형 콘텐츠를 마련해 방문객을 맞이할 예정이다.\n브랜드 측은 이번 팝업을 시작으로 오프라인 고객 접점을 늘려간다는 계획이다.',
    views: 13,
    createdAt: '2026-07-03T15:48:00+09:00',
    updatedAt: '2026-07-03T15:48:00+09:00',
  },
  {
    id: 1094,
    title:
      '(2026-07-03) 여름철 짙어지는 기미·잔주름과 노출 고민. 여름, 얼굴 바디 솔루션',
    author: '애드알엔',
    content:
      '여름철 자외선과 냉방으로 기미·잔주름 고민이 깊어지는 계절이 돌아왔다. 피부과 전문의들은 노출 부위별 맞춤 관리와 생활 습관 개선을 병행해야 한다고 조언한다.\n업계는 얼굴과 바디를 아우르는 여름 시즌 솔루션을 잇달아 선보이며 소비자 공략에 나서고 있다.',
    views: 10,
    createdAt: '2026-07-03T09:27:00+09:00',
    updatedAt: '2026-07-03T09:27:00+09:00',
  },
]

function ensureStore(): void {
  if (existsSync(DATA_FILE)) return
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(DATA_FILE, JSON.stringify(SEED_POSTS, null, 2), 'utf-8')
}

function readPosts(): Post[] {
  ensureStore()
  const raw = readFileSync(DATA_FILE, 'utf-8')
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      throw new Error('board.json 형식이 올바르지 않습니다.')
    }
    return parsed as Post[]
  } catch (error) {
    console.error('Failed to parse board data file', error)
    throw new Error('게시판 데이터를 읽을 수 없습니다. data/board.json 파일을 확인해 주세요.')
  }
}

function writePosts(posts: readonly Post[]): void {
  ensureStore()
  writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

function sortNewestFirst(posts: readonly Post[]): Post[] {
  return [...posts].sort((a, b) => b.id - a.id)
}

async function list({ page, pageSize, q }: ListPostsParams): Promise<ListPostsResult> {
  const posts = sortNewestFirst(readPosts())
  const keyword = q?.trim().toLowerCase()
  const filtered = keyword
    ? posts.filter((post) => post.title.toLowerCase().includes(keyword))
    : posts
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  }
}

async function getById(id: number): Promise<Post | null> {
  return readPosts().find((post) => post.id === id) ?? null
}

async function create(data: CreatePostInput): Promise<Post> {
  const posts = readPosts()
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), BASE_ID - 1)
  const now = new Date().toISOString()
  const newPost: Post = {
    id: maxId + 1,
    title: data.title,
    author: data.author,
    content: data.content,
    views: 0,
    createdAt: now,
    updatedAt: now,
  }
  writePosts([...posts, newPost])
  return newPost
}

async function update(id: number, data: UpdatePostInput): Promise<Post | null> {
  const posts = readPosts()
  const target = posts.find((post) => post.id === id)
  if (!target) return null

  const updated: Post = {
    ...target,
    ...data,
    updatedAt: new Date().toISOString(),
  }
  writePosts(posts.map((post) => (post.id === id ? updated : post)))
  return updated
}

async function remove(id: number): Promise<boolean> {
  const posts = readPosts()
  const next = posts.filter((post) => post.id !== id)
  if (next.length === posts.length) return false
  writePosts(next)
  return true
}

async function incrementViews(id: number): Promise<Post | null> {
  const posts = readPosts()
  const target = posts.find((post) => post.id === id)
  if (!target) return null

  const updated: Post = { ...target, views: target.views + 1 }
  writePosts(posts.map((post) => (post.id === id ? updated : post)))
  return updated
}

export const postRepository: PostRepository = {
  list,
  getById,
  create,
  update,
  remove,
  incrementViews,
}
