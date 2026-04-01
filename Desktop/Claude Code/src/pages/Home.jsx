import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const leaderboard = [
  {
    rank: '01', handle: '@pixel_scrapper',
    desc: '추상적인 꿈을 세밀한 설계로 그려내는 아티스트',
    streak: '연속 12일', borderColor: 'border-primary-fixed', badgeColor: 'bg-tertiary-container/30', offset: '',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZXrDXrUS200LJV8767XASGys0qbfGvKt-JPuseZDtTwfkdMYvAX-FaVDpKhe2mWtjwIw-fiNwy-9Fyoc4J9rZtvHy2U8pCCEMVAfIdHlHhe8jPWiJHEeuntLcNzIrZJwvnLOJakAzWP65Z8-wzFdsGMkXySdHS8DscUIH1-EhwV7wDbVEAKwjLDqPouEFD3-RlRftLVZbbVZky4eBQ1cAwed03RHW_WSgiSyrkWNvM1N38hJI0UiRMcK4RENzxVbYNN-wKBtW-jE',
  },
  {
    rank: '02', handle: '@vibe_master_99',
    desc: '분위기 넘치는 스케치로 무드를 살려잡는 분',
    streak: '연속 8일', borderColor: 'border-secondary-fixed', badgeColor: 'bg-secondary-container/30', offset: 'translate-x-2',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeqp7kw_ZFGj7z4UsnZgQUR4LQ-LL_Mg3DU2wgEeNvyXESiUCXqCQMmZ2bC0ze9EM27pG0mFhIyk7ogCwwwyqxgR33ooxdFHAwUjhbHx7evcCj816xdK8G16LDEbRGqdGCIqPUB5ObuLk8QMVSvdPS0rl9RD6XfhVqJDsQsFLuDtC7nDVRE7jkE7pk2QmMnDVtp4AHJtCAJ7ipvVQjd053SPcX4KmTt6T8z3lHGRXrmOygc4OckFNe_0NMyuKCbrUreq92N1ZOOQ8',
  },
  {
    rank: '03', handle: '@spec_junkie',
    desc: '낙서를 넘어선 완벽한 디테일을 추구합니다',
    streak: '연속 5일', borderColor: 'border-tertiary-fixed', badgeColor: 'bg-primary-container/30', offset: '-translate-x-1',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQEIrPRG4liINPZ_8tOEuRcoWL_b2FtNw72zSAJJKRWow6e5GBb_FWKNOAw0InowAQY9QSvvHpbIfquEN-XFdeS0q6ybqIPVoxmI2vwneurGlxi48J_sf_9qO1WyVWjMG9ii91cVmBMrgahJO5adXQxePUlQfaFDUSp9yUtbR8peHumHBUvK1DiydEevYVVC166vw7x1nbaLPRbg6aIne3eyW-3VY07UYfazlQ1SY6mADFbofpWpFlysN7IRBzMn8hP_CS263d6NM',
  },
]

const avatarStacks = [
  { cls: '-rotate-6 bg-primary-fixed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo1f5ENGJohq0kN7yDAjUpShT8AP6Rnl35_r4Olik4-RSmNy-abBoKAOWqy6NfQsFsxAkljKMF4fv57B-7aCft4C7xyQeTrs-dpLGuMfejJNiKYIk34egiVR_uFVWGFjhx4hhl2L3L73dIskvk1YgfCzNnNVRrw44lwnnEA3-lwjzBqaFwwGPUyKWMFaHRZhcFGdmdg3ZD1qnT1YjC48KhtzaJxJaZA4ukFMGgI_EQR1hx76pYhDmWcD2CbPGaxScJ59Ffg7S2-po' },
  { cls: 'rotate-3 bg-secondary-fixed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGnkt3n3E-LNzXgypCkIdYovMxIfSh4QrId3-Bizbt7JwjLj6jFmMcr8q350G_abAZeQJISaWLNIPhOsnOfUMyhG6vRYGa83kfEgliwZf5ahfv1PccScUpsPvt0hoaaVVLCJ5ck_tP1VLz25loWVE3Cty6m6gg8-3XQlofwarspP4csNOJrONcrEvoNXQVrlVGhFG4aL0BrzO8Ig3yC-S80hBRWasUHITje3fMkLJ9VCy7LYt_KU292tDLCxByyZOhdG_0hkf-fvY' },
  { cls: '-rotate-3 bg-tertiary-fixed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjy9CZ7At7XdxAN7gwCXhZ_RUnbIe_Lxuhcz9UcFKtHUHV2kUELPSlGbPbHVZCeakySx21L6T6p9bbqLXTfqhzgBX-5tnUb4bMusuKTZKJ_ASXWMpAFFWIZKQthJfFj6lt4V9gnMQqPABBdHsAfn9Y4wFDZFRWEVncP1xgvQjTwN1vQVft4_UXvAGIrzr_MBPqB2GIHHI_xa0KEoGECkamBAqpsNWs7Jxij8OzFAKP2f4G29-5nk5WlTma5OsZBe7UUelfnjwq57M' },
]

export default function Home() {
  return (
    <Layout>
      <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-16">

        {/* Shop Banner */}
        <section className="bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-[1rem] sticker-shadow flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-on-tertiary-fixed text-tertiary-fixed px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">신규 이벤트</div>
            <h2 className="text-3xl font-black font-headline tracking-tighter keep-all">낙서의 퀄리티를 높여줄<br/>아이템 상점 오픈!</h2>
            <p className="font-medium opacity-80 keep-all">나만의 브러쉬, 텍스처, 스티커 팩으로 더 특별한 낙서를 완성하세요.</p>
          </div>
          <div className="flex items-center gap-4 z-10">
            <Link to="/shop" className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold sticker-shadow hover:-translate-y-1 transition-transform flex items-center gap-2">
              상점 구경하기 <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[180px]">shopping_cart</span>
          </div>
        </section>

        {/* Hero */}
        <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-block bg-tertiary-container text-on-tertiary-fixed px-4 py-1 rounded-full font-bold text-sm sticker-shadow">
              낙서 → 예술
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-headline tracking-tighter leading-[1.1] text-on-background keep-all">
              당신의 <span className="text-primary whitespace-nowrap">특별한 낙서</span>가<br/>특별한 예술이 되는 곳
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-md keep-all leading-relaxed">
              그저 낙서 속의 감성을 담아보세요.<br/>Nakseo.io는 당신의 거친 스케치를 정밀하고 가치 있는 결과물로 바꿔 드립니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/studio" className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full text-lg font-bold sticker-shadow flex items-center gap-2 hover:-translate-y-1 transition-transform">
                <span className="material-symbols-outlined">upload</span>
                낙서 업로드하기
              </Link>
              <Link to="/market" className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full text-lg font-bold hover:rotate-1 transition-transform">
                샘플 구경하기
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square bg-surface-container rounded-[1rem] p-4 rotate-2 sticker-shadow overflow-hidden">
              <img
                alt="Creative Journal"
                className="w-full h-full object-cover rounded-[0.5rem] grayscale hover:grayscale-0 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBseOuL3fxIVOyl2pk_lduhusfkA4CazY2WnB8ckQ0XDPCt4CZfs98nbSs6Kles1atLFA-UOB8ffevUsNyhjXYD5-Z99ZoTiWY-xQya_48N6T-rAsun98awUkATublROmel5xDSc4canmH_nkjVYoBtztHJ8LZxWsFjVFcTh6Z5pOTWMbmlaeExb2LBmf5HJ2r956KsHDx8sRLVAPnV8t-ebS2EuaKFQKCKZBltfE6JvYjWBOSwCbaWmCYSbFRQeU1FOlep5PpAUkg"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            <div className="absolute -top-6 -right-6 bg-secondary text-on-secondary p-6 rounded-full rotate-12 sticker-shadow font-headline font-bold flex flex-col items-center">
              <span className="text-2xl">100%</span>
              <span className="text-xs uppercase">진짜</span>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-tertiary text-on-tertiary p-4 rounded-[1rem] -rotate-6 sticker-shadow font-bold">
              #감성체크
            </div>
          </div>
        </section>

        {/* Featured Challenge */}
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-4xl font-black font-headline tracking-tighter">이번 주 챌린지</h2>
            <a className="text-primary font-bold underline decoration-4 underline-offset-4" href="#">전체 주제 보기</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface-container-low rounded-[1rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[400px] border-2 border-outline-variant/20">
              <div className="space-y-4 max-w-md z-10 relative">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  <span className="font-bold text-sm tracking-widest uppercase">이번 주의 테마</span>
                </div>
                <h3 className="text-5xl font-black font-headline leading-tight keep-all">비 오는 날의<br/>창밖 풍경</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed keep-all">
                  창가에 맺힌 빗방울,<br/>몽글몽글 피어오르는 커피 김을 그려보세요.<br/>포근한 감성을 멋진 창작물로 완성해보는 건 어떨까요?
                </p>
                <div className="pt-4">
                  <Link to="/canvas" className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold flex items-center gap-2 sticker-shadow w-fit">
                    챌린지 참여하기 <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-40 md:opacity-100 pointer-events-none">
                <img
                  alt="Cabin"
                  className="w-full h-full object-contain mix-blend-multiply rotate-3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl7eIAZ2wgyNKYAUPT2ZHp8oiX6EcWJefD-lGBsf9r-6Ydsy1420SBrecRvmbhb-VOwKzIGOhCrlkE9xY9VjmsyGRQ0o930J6ZQzBxH9bnyrQytJI3I9IrZSu7oBoam3JLSzZm62kJR20seSoV0CdP2oStg5jGW_VKGYSPiBjnrcD-D3QgrcPNbk_AT5yOYMsc1-cagP36x7Yy8mFDNdH-g5bTQZAXZyvRO5I6FED8nWCf5wKeZiP1ax-VhriBmrwbFKjUEQ7cPFg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-secondary-container text-on-secondary-container p-6 rounded-[1rem] sticker-shadow flex-1">
                <span className="material-symbols-outlined text-4xl mb-4 block">groups</span>
                <h4 className="text-3xl font-black font-headline">1,240</h4>
                <p className="font-bold opacity-80 keep-all">이번 주 모인 낙서들</p>
              </div>
              <div className="bg-surface p-6 rounded-[1rem] flex-1 flex flex-col items-center justify-center text-center" style={{ border: '2px dashed #ddc1b3' }}>
                <span className="material-symbols-outlined text-primary text-3xl mb-2">history</span>
                <p className="font-bold text-lg">다음 발표까지:</p>
                <div className="text-3xl font-black font-headline tabular-nums">02:14:55</div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-surface-container-highest/50 rounded-[1rem] p-8 md:p-12 relative overflow-hidden">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-4xl font-black font-headline tracking-tighter">명예의 전당</h2>
            <p className="text-lg text-on-surface-variant keep-all leading-relaxed">
              일상의 조각을 특별한 작품으로 탈바꿈시킨<br/>이번 주의 최고 크리에이터를 소개합니다.
            </p>
            <div className="flex -space-x-4">
              {avatarStacks.map((a, i) => (
                <div key={i} className={`w-16 h-16 rounded-full border-4 border-surface sticker-shadow overflow-hidden ${a.cls}`}>
                  <img src={a.img} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-16 h-16 rounded-full border-4 border-surface bg-surface-container-low flex items-center justify-center font-bold text-sm rotate-6 sticker-shadow">+12</div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {leaderboard.map((user) => (
              <div key={user.rank} className={`bg-surface p-4 rounded-full sticker-shadow flex items-center justify-between hover:-translate-y-1 transition-all ${user.offset}`}>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 font-black font-headline text-primary-container text-center">{user.rank}</span>
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${user.borderColor}`}>
                    <img src={user.avatar} alt={user.handle} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold">{user.handle}</h5>
                    <p className="text-xs text-on-surface-variant font-medium keep-all">{user.desc}</p>
                  </div>
                </div>
                <div className={`px-4 py-1 ${user.badgeColor} rounded-full text-xs font-bold`}>{user.streak}</div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Link to="/canvas" className="hidden md:flex fixed bottom-8 right-8 bg-primary-container text-on-primary-container p-6 rounded-full sticker-shadow hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>
    </Layout>
  )
}
