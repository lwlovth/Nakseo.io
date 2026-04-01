import Layout from '../components/Layout'

const creations = [
  {
    id: 441, title: '레트로 호라이즌',
    desc: '향수를 불러일으키는 그레인 질감과 미드센추리 미학의 곡선이 조화를 이룹니다.',
    price: '1.2 ETH',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKAOIaeRRop4HsknOz4kQ74iNizlgKz9Fyu1-bP3lxW3aEmxKIQyBE0VMkeQ2fjJ5CLGG9igAmRREy9pWdhG4b58rZwrEOAtPh4BFoYeKHGaa2Ta9cl45-rIvpuRsxkmfuWB8CdAubG1nxiPSCzst232SdTJNAFteLinufifeh6Qsz3rh_SeWLaLZRQWZwenIA5K44U8cV4JjAafDA704rWTFuAynrBp1ccGYX1899bKCK_b2MHnJhNJkwdYM6FrUywIOrx9X3u7s',
  },
  {
    id: 892, title: '질감의 침묵',
    desc: '따뜻한 그림자에 집중한 실험적인 디지털 임파스토 기법을 선보입니다.',
    price: '0.85 ETH',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAttvIY7q5rmIoH8ARv1QdU_qiEBczhj0m6SHPOYOU3pgQfD8Qkf7RkkQDgJKAFt-c21w_Zmlqhgy4V-OthS2o9wXfyIRWQb_EuH8I5zeJnrHdABeXPSXegvTeic_LNNSxSMqLEjnW2SSqD01-8BC9A2n4-6f1UgNb6d2I8IEiulbYdhIMC2JD_ByX9Jt0HjQp1CVdNdx25hLxtbdKMeC8Ec_FBfeDo5yrBvCDb44_kpq1rld56zENY2MQWLwwLCn3eBSGQIqtVoeI',
  },
  {
    id: 102, title: '종이의 영혼',
    desc: '손수 만든 종이의 질감에서 발견한 불완전함의 아름다움을 담았습니다.',
    price: '2.1 ETH',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5eyqXkJmMmC8O4J46Z33gvZ2jG5TKqbZEqpQJxi6X4UCEraoODrGDtlRu9L7F2H7scrICiONcR7YZ38E4djK6ypEMs2aGv9MSh9Ex-Jzfgz5uP9OHOorqTYkDq_VbFDojDlQA--FcrOtWpE6Na8S3L1sxjSbRYGV651ase5KrpAjpaiSeAR69oo8f3DhPkz4d8EocAiprcgl3LSm1u3i-E1yQ-t6MMM-aqI7ap7mcwX_H78Yh0PMRTZPsd73bgwbQpt6DWR4oqhs',
  },
]

const journal = [
  { icon: 'palette', color: 'text-primary', date: '10월 14일 화요일', title: '"레트로 호라이즌" 작품을 컬렉터 풀에 민팅했습니다', note: '이번 작업의 색감이 아주 좋았어. 고해상도 화면에서 색감이 아주 선명하게 표현되더라요.' },
  { icon: 'payments', color: 'text-secondary', date: '10월 13일 월요일', title: '로열티 수입 완료: +0.22 ETH', note: '2차 시장이 활기를 띠고 있습니다. "네온 더스크" 시리즈가 새로운 주인을 만났습니다.' },
  { icon: 'star', color: 'text-tertiary', date: '10월 12일 일요일', title: '업적 달성: "하이 퍼블리티"', note: '스튜디오 세션의 실시간 청취자가 1,000명에 달했습니다. 오늘 밤 에너지가 정말 대단했다요!' },
]

export default function Profile() {
  return (
    <Layout>
      <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">

        {/* Profile Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Identity Card */}
          <div className="lg:col-span-4 bg-surface-container-low rounded-[1rem] p-8 shadow-[8px_8px_0px_0px_rgba(29,27,22,0.05)] relative overflow-hidden flex flex-col items-center">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-container rounded-full opacity-20" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-6 -rotate-2 bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] rounded-[0.75rem] overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtclFMVgLg_D8GO4Yy90Sxmx4dbzPRsl1WZK1THzp7n9LPuYJ8TQ8SOWZWxPBNNAUYLEXlEBZUwPIROt21cZtbmUwmaXsYEld9vpalZeO6Ga3bhjsZot6bE_hvmhkppfUoJf_fSKca1tx85HMNPFCAZqEPjFX6bdPFJbE91AqutTcCB5eNO-LGsCGZQ7VnvSqMIAVfH3nMVH2lw3BHAgyWkERknzounsUJZ2FCqvyy1wbl2jUW9iqa2mtf-2mWG4ID4dlsCu_kJ6o"
                  alt="Taehyung_Kim 프로필 사진"
                  className="w-full h-full object-cover rounded-[0.5rem]"
                />
              </div>
              <h1 className="text-4xl font-headline font-black tracking-tight text-primary mb-1">Taehyung_Kim</h1>
              <p className="text-on-surface-variant font-medium mb-4">@vibe_master_99</p>
              <div className="flex flex-col gap-3 mt-4 w-full">
                <span className="px-4 py-1.5 bg-tertiary-container text-on-tertiary-fixed rounded-full text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] rotate-2 text-center">엘리트 크리에이터</span>
                <span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] -rotate-1 text-center">무드 플레이어</span>
              </div>
            </div>
          </div>

          {/* Wallet & Stats */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface-container rounded-[1rem] p-8 shadow-[8px_8px_0px_0px_rgba(29,27,22,0.05)]" style={{ backgroundImage: 'radial-gradient(#d1ccc4 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">현재 보유 VIBE</span>
                  <div className="text-6xl font-headline font-black text-on-surface flex items-baseline gap-2">
                    2,480<span className="text-2xl text-on-surface-variant opacity-50 font-bold ml-1">VIBE</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-secondary-fixed-dim text-on-secondary-fixed px-8 py-4 rounded-full font-black font-headline shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:scale-105 active:translate-y-1 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">history</span>
                    사용 내역 보기
                  </button>
                  <button className="bg-primary-container text-on-primary-container p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:rotate-12 transition-transform">
                    <span className="material-symbols-outlined text-3xl">redeem</span>
                  </button>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 justify-center md:justify-start">
                {[
                  { value: '12k', label: '조회수', color: 'text-primary', border: 'border-primary/20', rotate: 'rotate-3' },
                  { value: '85', label: '드롭수', color: 'text-secondary', border: 'border-secondary/20', rotate: '-rotate-6' },
                  { value: '4.9', label: '평점', color: 'text-tertiary', border: 'border-tertiary/20', rotate: 'rotate-12' },
                ].map((stat) => (
                  <div key={stat.label} className="group">
                    <div className={`w-20 h-20 bg-white rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center border-4 ${stat.border} ${stat.rotate} group-hover:rotate-0 transition-transform`}>
                      <span className={`text-2xl font-black font-headline ${stat.color}`}>{stat.value}</span>
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VIBE 획득 센터 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-headline font-black text-on-surface">VIBE 획득 센터</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daily Check-in */}
            <div className="bg-[#F3EBC9] rounded-[1rem] p-6 shadow-[8px_8px_0px_0px_rgba(212,164,7,0.1)] flex flex-col items-center justify-between border-2 border-tertiary-container/20 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
                <span className="material-symbols-outlined text-4xl text-tertiary">calendar_today</span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">매일매일 출석체크</h3>
                <p className="text-sm font-bold text-on-tertiary-fixed-variant mb-4 keep-all">벌써 7일 연속<br/>출석 중이에요!</p>
              </div>
              <button className="w-full bg-tertiary text-on-tertiary py-3 rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:bg-tertiary/90 transition-colors">
                출석 완료하기
              </button>
            </div>

            {/* Daily Missions */}
            <div className="lg:col-span-2 bg-surface-container-high rounded-[1rem] p-8 shadow-[8px_8px_0px_0px_rgba(29,27,22,0.05)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">assignment</span>
                <h3 className="text-xl font-bold">오늘의 미션</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-[1rem] shadow-sm border border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <p className="font-medium keep-all">새로운 낙서<br/>1개 업로드하기</p>
                  </div>
                  <span className="text-primary font-black font-headline">+10 VIBE</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-[1rem] shadow-sm border border-outline-variant/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center text-secondary font-bold">2</div>
                    <p className="font-medium keep-all">다른 작가의 작품에<br/>댓글 남기기</p>
                  </div>
                  <span className="text-secondary font-black font-headline">+5 VIBE</span>
                </div>
                <button className="w-full mt-4 bg-surface-container-highest text-on-surface-variant py-4 rounded-full font-bold border-2 border-dashed border-outline/30 flex items-center justify-center gap-3 hover:bg-primary-container hover:text-on-primary-container hover:border-solid transition-all">
                  <span className="material-symbols-outlined">play_circle</span>
                  광고 보고 +15 VIBE 더 받기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* My Creations */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-headline font-black text-on-surface">나의 창작물</h2>
            <a className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-colors" href="#">전체 아카이브 보기</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creations.map((item) => (
              <div key={item.id} className="bg-surface-container-high rounded-[1rem] p-4 shadow-[12px_12px_0px_0px_rgba(29,27,22,0.05)] hover:-translate-y-1 transition-all">
                <div className="aspect-square rounded-[1rem] overflow-hidden mb-4 relative">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black shadow-sm">
                    VIBE #{item.id}
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-1">{item.title}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 keep-all">{item.desc}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-black font-headline text-primary">{item.price}</span>
                  <button className="bg-surface-container-lowest text-on-surface-variant p-2 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journal */}
        <section className="max-w-3xl mx-auto space-y-8 bg-surface-container-lowest rounded-[1rem] p-10 border-l-8 border-primary-fixed shadow-[8px_8px_0px_0px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-4xl text-primary">edit_note</span>
            <h2 className="text-3xl font-headline font-black text-on-surface">기록 보관함</h2>
          </div>
          <div className="space-y-10 relative">
            <div className="absolute left-[17px] top-4 bottom-4 w-0.5 bg-outline-variant opacity-30" />
            {journal.map((entry, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-0 top-1 w-9 h-9 bg-surface-container-high rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
                  <span className={`material-symbols-outlined scale-75 ${entry.color}`}>{entry.icon}</span>
                </div>
                <div>
                  <span className="text-xs font-black text-on-surface-variant/40 uppercase tracking-tighter">{entry.date}</span>
                  <h4 className="font-bold text-lg text-on-surface leading-tight mt-1 keep-all">{entry.title}</h4>
                  <p className="text-on-surface-variant mt-2 keep-all">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  )
}
