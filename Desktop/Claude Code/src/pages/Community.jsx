import { useState } from 'react'
import Layout from '../components/Layout'

const posts = [
  {
    type: 'pinned',
    title: 'Nakseo.io 10월 창작 챌린지: \'그리움의 색\' 가이드 안내',
    author: '운영자',
    time: '2시간 전',
    badges: [
      { label: '상단 고정', color: 'bg-primary text-white' },
      { label: '필독', color: 'bg-error text-white', icon: 'priority_high' },
    ],
  },
  {
    type: 'highlight-yellow',
    title: '90년대 레트로 감성을 담은 브러쉬 팩 공유합니다 (무료 나눔)',
    desc: '제가 직접 커스텀해서 사용하던 포토샵 & 프로크리에이트 브러쉬들을 정리해봤어요.',
    category: '베스트 갤러리',
    likes: 128,
    comments: 42,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY9yiYZgMVWfIzVSqk6M2RCqlboYUsV6O-3aNpo9pJiQIH3puJXzJWKsmquk9dcuB6RLPUlL6P8L_GgEkR-aG4t24pp5EfEg3wLS27NWMkVZvgRZtmcEIivrCZr8fSp5LaxoNYLJzf5TDqMap8-slHLtsUSiirPJ6SMPtFbxiH8wkKXMm4UepnXJaltFIF4M-DuJAwU0LWzuO5TvSutIMFJz3Rfl_r-sOMUwYyBMPW-KPqZj78NwTGwPbqa-bbtt-psDVMM92qo9I',
  },
  {
    type: 'highlight-blue',
    title: '요즘 창작자들이 가장 많이 사용하는 AI 툴 랭킹 5',
    author: '디지털노마드A',
    time: '15분 전',
    category: '자유 게시판',
  },
  {
    type: 'normal',
    title: '크리에이터 스튜디오 설정하는 방법 질문드립니다.',
    author: '익명작가',
    time: '48분 전',
    views: 420,
  },
]

const promoOptions = [
  {
    key: 'highlight',
    icon: 'format_paint',
    iconColor: 'text-tertiary-container',
    label: '배경색 강조',
    desc: '목록에서 은은한 배경색으로 주목도를 높입니다.',
    price: 50,
  },
  {
    key: 'pin',
    icon: 'vertical_align_top',
    iconColor: 'text-primary',
    label: '상단 고정 (1시간)',
    desc: '게시판 리스트 최상단에 고정되어 노출됩니다.',
    price: 100,
  },
  {
    key: 'badge',
    icon: 'stars',
    iconColor: 'text-error',
    label: '특수 아이콘 부착',
    desc: '[HOT], [필독] 등 아이콘을 선택하여 부착합니다.',
    price: 30,
  },
]

export default function Community() {
  const [promoEnabled, setPromoEnabled] = useState(true)
  const [promoType, setPromoType] = useState('highlight')

  return (
    <Layout>
      <div className="pt-8 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── 왼쪽: 게시판 ───────────────────────────────── */}
          <div className="lg:col-span-8 space-y-6">
            <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-on-background font-korean">커뮤니티 광장</h2>
                <p className="text-on-surface-variant mt-1 font-korean">오늘의 뜨거운 영감과 창작물들을 만나보세요.</p>
              </div>
              <div className="bg-tertiary-container/30 px-4 py-2 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
                <span className="text-sm font-bold text-on-tertiary-container font-korean">2,450 VIBE</span>
              </div>
            </header>

            <div className="space-y-4">
              {/* 상단 고정 포스트 */}
              <div className="bg-surface-container-lowest p-6 rounded-lg border-l-8 border-primary shadow-[4px_4px_0px_rgba(29,27,22,0.08)] relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider font-korean">상단 고정</span>
                      <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 font-korean">
                        <span className="material-symbols-outlined text-xs">priority_high</span>
                        필독
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-on-background leading-tight font-korean">
                      Nakseo.io 10월 창작 챌린지: '그리움의 색' 가이드 안내
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant font-korean">
                      <span>운영자</span>
                      <span className="w-1 h-1 bg-outline-variant rounded-full" />
                      <span>2시간 전</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>push_pin</span>
                </div>
              </div>

              {/* 하이라이트 포스트 (노란) */}
              <div className="bg-tertiary-fixed/30 p-6 rounded-lg border-2 border-dashed border-tertiary-container/50 shadow-[4px_4px_0px_rgba(212,164,7,0.15)] hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="flex gap-4">
                  <img
                    alt="예술적 표현"
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0 shadow-sm"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY9yiYZgMVWfIzVSqk6M2RCqlboYUsV6O-3aNpo9pJiQIH3puJXzJWKsmquk9dcuB6RLPUlL6P8L_GgEkR-aG4t24pp5EfEg3wLS27NWMkVZvgRZtmcEIivrCZr8fSp5LaxoNYLJzf5TDqMap8-slHLtsUSiirPJ6SMPtFbxiH8wkKXMm4UepnXJaltFIF4M-DuJAwU0LWzuO5TvSutIMFJz3Rfl_r-sOMUwYyBMPW-KPqZj78NwTGwPbqa-bbtt-psDVMM92qo9I"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 font-korean">
                        <span className="material-symbols-outlined text-xs">thumb_up</span>
                        강추
                      </span>
                      <span className="text-xs font-medium text-tertiary font-korean">베스트 갤러리</span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-on-background leading-tight font-korean">
                      90년대 레트로 감성을 담은 브러쉬 팩 공유합니다 (무료 나눔)
                    </h3>
                    <p className="text-sm text-on-surface-variant line-clamp-1 font-korean">
                      제가 직접 커스텀해서 사용하던 포토샵 & 프로크리에이트 브러쉬들을 정리해봤어요.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-on-surface-variant pt-1">
                      <span className="flex items-center gap-1 font-korean">
                        <span className="material-symbols-outlined text-sm">favorite</span> 128
                      </span>
                      <span className="flex items-center gap-1 font-korean">
                        <span className="material-symbols-outlined text-sm">chat_bubble</span> 42
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하이라이트 포스트 (파랑) */}
              <div className="bg-secondary-container/30 p-6 rounded-lg shadow-[4px_4px_0px_rgba(0,104,117,0.1)] hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 font-korean">
                      <span className="material-symbols-outlined text-xs">local_fire_department</span>
                      HOT
                    </span>
                    <span className="text-xs font-medium text-secondary font-korean">자유 게시판</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-on-background leading-tight font-korean">
                    요즘 창작자들이 가장 많이 사용하는 AI 툴 랭킹 5
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-on-surface-variant font-korean">
                    <span>디지털노마드A</span>
                    <span className="w-1 h-1 bg-outline-variant rounded-full" />
                    <span>15분 전</span>
                  </div>
                </div>
              </div>

              {/* 일반 포스트 */}
              <div className="bg-surface-container-low p-6 rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer border border-transparent hover:border-outline-variant/20">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-on-background leading-tight font-korean">
                    크리에이터 스튜디오 설정하는 방법 질문드립니다.
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant font-korean">
                      <span>익명작가</span>
                      <span className="w-1 h-1 bg-outline-variant rounded-full" />
                      <span>48분 전</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-on-surface-variant/60 font-korean">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                      <span>420</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center pt-8">
              <nav className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`w-10 h-10 rounded-full font-bold transition-colors ${
                      n === 1
                        ? 'bg-primary text-white shadow-[2px_2px_0px_rgba(29,27,22,0.15)]'
                        : 'hover:bg-surface-variant text-on-surface-variant'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>

          {/* ── 오른쪽: 게시글 홍보 ────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-[8px_8px_0px_rgba(29,27,22,0.06)] border border-outline-variant/10">
              <h3 className="text-2xl font-black text-on-background mb-6 flex items-center gap-2 font-korean">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                내 글 홍보하기
              </h3>

              <div className="space-y-6">
                {/* VIBE 토큰 활성화 */}
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="promo-activate"
                      checked={promoEnabled}
                      onChange={(e) => setPromoEnabled(e.target.checked)}
                      className="w-5 h-5 text-primary rounded-md border-outline focus:ring-primary focus:ring-offset-background accent-primary"
                    />
                    <label htmlFor="promo-activate" className="text-sm font-bold text-on-surface font-korean cursor-pointer">
                      VIBE 토큰 사용 활성화
                    </label>
                  </div>
                  <span className={`text-xs font-medium ${promoEnabled ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                    {promoEnabled ? 'ON' : 'OFF'}
                  </span>
                </div>

                {/* 홍보 옵션 */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest px-1 font-korean">홍보 옵션 선택</p>
                  {promoOptions.map((opt) => {
                    const isActive = promoType === opt.key
                    return (
                      <button
                        key={opt.key}
                        onClick={() => setPromoType(opt.key)}
                        className={`w-full flex items-center p-4 rounded-lg border-2 text-left transition-all ${
                          isActive
                            ? 'border-primary bg-primary/5'
                            : 'border-transparent hover:border-outline-variant bg-surface-container-low'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`material-symbols-outlined ${opt.iconColor}`}>{opt.icon}</span>
                            <span className="font-bold text-on-surface font-korean">{opt.label}</span>
                          </div>
                          <p className="text-xs text-on-surface-variant font-korean">{opt.desc}</p>
                        </div>
                        <div className="text-right ml-4 shrink-0">
                          <span className="block font-black text-primary">{opt.price}</span>
                          <span className="text-[10px] text-on-surface-variant">VIBE</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* 업로드 버튼 */}
                <button className="w-full bg-primary text-white py-4 rounded-full font-black text-lg shadow-[4px_4px_0px_rgba(29,27,22,0.15)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(29,27,22,0.15)] active:translate-y-0 transition-all flex items-center justify-center gap-2 font-korean">
                  게시글 업로드하기
                  <span className="material-symbols-outlined">send</span>
                </button>

                <p className="text-center text-[11px] text-on-surface-variant/70 leading-relaxed font-korean">
                  홍보 옵션 적용 시 토큰이 즉시 차감되며,<br />게시글 삭제 시에도 토큰은 반환되지 않습니다.
                </p>
              </div>
            </div>

            {/* 팁 패널 */}
            <div className="bg-secondary-container/20 p-6 rounded-lg border border-secondary/10 space-y-4">
              <h4 className="font-bold text-secondary flex items-center gap-2 font-korean">
                <span className="material-symbols-outlined">lightbulb</span>
                주목도를 높이는 팁
              </h4>
              <ul className="text-xs text-on-surface-variant space-y-2 list-disc list-inside font-korean">
                <li>명확하고 궁금증을 유발하는 제목을 지어보세요.</li>
                <li>고화질의 대표 이미지는 클릭률을 2배 높입니다.</li>
                <li>적절한 해시태그를 활용해 검색 유입을 늘리세요.</li>
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  )
}
