import { useState } from 'react'
import Layout from '../components/Layout'

// ── 아이템 데이터 ──────────────────────────────────────────
const FRAMES = [
  {
    id: 'f1', name: '로이 골든 프레임',
    desc: '아바타 주위에 황금빛 잎사귀가 흘러내립니다.',
    price: 2500,
    borderColor: '#D4A407',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzJM_trGffzTYXpxuTrYW_fpwY0UpufWlK71r2zXx3hU0v1oWGfF0PfcbE2MK0WA8gEt2MmnBupnRIsqplMmuugUGecBvaQAvJk5AH2wif4iOUAnziz11OeMHNatMxt6tu2uHQDwlcJV3vleXjC267EkErf-Hm8ej98TRikJi2_3FbLSPBqmrkaghWdXMjXDpuzX7HHPp0mBQj934wGS4vKpqpqDRJVQ0fGubBAFSHyqaTpYVyc_tIcHrGvoucvRmWNZ6Z_3BtiKE',
  },
  {
    id: 'f2', name: '사이버 네온 블루',
    desc: '밤을 밝히는 강렬한 네온 블루 빛이 아바타를 감쌉니다.',
    price: 1800,
    borderColor: '#9FEFFE',
    glow: '0 0 15px #9FEFFE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4IhVQSA1UnMWcEOlgsKx9JA6z7qa9mR7WPm-FlQwOWDoMXf6iDMruz0daSW8GSPaqq9sHkp-lXDu7NnQ7yCbjOM4vk1OcJ29DiAxETeOhaQetRcC4HnWDQnGmeP2YHdqNJPY_3ygMh8dtovM9II32ffAvWCX98LRnd-zZNZiC6hJbzwYs3ChgAe1PA0n_DXK4wYbmgcbTy330w9VnVn9RXNuuwYXvvErs1VNuda-ktd72DNbHxym0ecsDAPCBP0L89VqeFLnca4M',
  },
  {
    id: 'f3', name: '스타필링 스타',
    desc: '아바타 주변에서 반짝이는 작은 별 가루가 소용돌이칩니다.',
    price: 3200,
    animated: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjTLUvih6bAUDW8TARDMwFd6977g4cS5n4Qt6nmcHu6J52ns-82JvFD7mrHhh6y6rLZfkVZXJ5YZ2s2RD5nmzwhExGHI4QJ2M5aok30m3JOWSQt8KCIC-07rrP41CoxOkUNiI8dN0D5CC5tLC-wIUixbmLCK48Os0O6DRZKwaqJp2bGulokfRJhpmWb762GxCRjjl_Ngj_Vv1kNNPZvyHwXevMUcjqm7oaW1-OgHDAUK0PGHSh6eluFAEXiVgVrjGXnacXnLbwJEQ',
  },
]

const EFFECTS = [
  {
    id: 'e1', name: '황금색 닉네임 변경',
    desc: '어디서든 눈에 보이는 눈부신 황금빛 닉네임으로 변경합니다.',
    price: 4500,
    displayName: 'Gold_Nakseo',
    nameColor: '#D4A407',
    badge: 'VIP',
    borderColor: '#9B4500',
  },
  {
    id: 'e2', name: '크리에이터 인증 배지',
    desc: '닉네임 옆에 신뢰를 상징하는 공식 인증 배지를 부착합니다.',
    price: 2000,
    displayName: 'Nakseo_Art',
    verified: true,
    borderColor: '#006875',
  },
]

const BACKGROUNDS = [
  {
    id: 'b1', name: '석양 그라디언트',
    desc: '포근한 노을빛 석양이 프로필 배경에 담아보세요.',
    price: 1200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfNvNWsjx0FeX-44Cpa_PY0CB20vGQY50yFy0FcGj3sOKe6q8pZqHv4gLwH8PFCgtd41Vhr_Zk5Nbglbke94tShCMlPuUbYDba1F25c1RCPcBeMVi3Ab3BVcYFhnSK0nsmAUzRo4pOTZvD-mgvq9LtFhPkGlXAv6ikh5TIz8UBNL8fu-OHwEwvBKE4W0zjTrAGX1wO7a4uHGbteB2GZ7MDJ6OvlZtEQ5d_Ioe9J9GNG0oS8dpsENGLL417UZeUafnDvKMF055ZEV0',
  },
  {
    id: 'b2', name: '트로피컬 정글',
    desc: '싱그러운 이국적인 잎사귀로 프로필에 생기를 더하세요.',
    price: 1500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMazH3Q77PpMo-6oC2Epq5RTOlgS_gnl-4sGCttNa9lUxxYOFsua4sRt4sKYNOLYGI_21tXraxib8xCPRrxUme5VYsTzM2Ins8jCivkTHsdklgS-Yv36NWYMvI5JjUz3YAEBRadCoCLV1_HWsUyL3YDnc66zuFc-cHNOUycvKUPxWBujIlWA_h4Sl5RD7jzI0CMkg7g2ljXoi0Twgh9eCOk5bHoneXo7LqmSyfXheC6iLSBl_oNgU0dF-ckF7ZVgUuZDZqO1HbSt8',
  },
  {
    id: 'b3', name: '미니멀 스타더버스',
    desc: '깊고 푸른 우주의 신비로운 프로필 배경으로 설정합니다.',
    price: 2200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfyle5mKAofwUZxAZsflkxPQYg_OaV8nJ1E0Z-1_LKYW8SvT0XKIgCxalai2-LeT56itLTi42RWQ68f1AEAELGeHKFTPLxeeM2-hEEFzf71OgYOYCJzfUJlI8WT6KK2AAUf2QCgzgf-D8pvIV7yh3ef4kLHyj3k0uJKcLk_kNybo2sVXGDdE-x3jOdKOHIOuIh34JbT4fZKPzCxFM3RHEdCMVa2mIm90usnNWSFBzqHJM0NAi7NabBr3kdPuJuvF_GTH3UF9p3dac',
  },
]

const PREVIEW_PROFILE_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuADBhltL92ga3Yv3LTmY9fO_padF-wWjH2Xm9LTvBaZyrEsGxKQzkgPH9CzmeRYjKDL8MvTmj8HCvxch6_lbAWBuqnvpphm7xFEzJOhoIMvEtnFZaShLLanF6HLng_f-pXSEjNW_3ZKrxpMb1feZKpoPEeKJsHN7i3ysdp5VCGj3FUl7uVM7XkDzHcj2-cbH8QE-31nwJ0UJ-Kv3hK95oK9Bwa-Fh1efqryrZoHvYd3yN30pxHShz5pGiVAecwj0LNb1Px33JrCyd4'
const PREVIEW_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRQXQsqrhbe-nvIXsb1vTXqblhF2_g5s48xVGujnrn5D6ubuMnWrsKeKna6ngfZKpoPEeKJsHN7i3ysdp5VCGj3FUl7uVM7XkDzHcj2-cbH8QE-31nwJ0UJ-Kv3hK95oK9Bwa-Fh1efqryrZoHvYd3yN30pxHShz5pGiVAecwj0LNb1Px33JrCyd4'

// ── 공통 버튼 ──────────────────────────────────────────────
function BuyButton({ selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-bold text-sm shadow-[4px_4px_0px_#1D1B1626] transition-all hover:-translate-y-0.5 active:translate-y-0 ${
        selected
          ? 'bg-primary text-on-primary'
          : 'bg-primary-container text-on-primary-container'
      }`}
    >
      {selected ? '선택됨 ✓' : '구매하기'}
    </button>
  )
}

export default function Shop() {
  const [cart, setCart] = useState(new Set())
  const [previewOpen, setPreviewOpen] = useState(false)

  const allItems = [...FRAMES, ...EFFECTS, ...BACKGROUNDS]

  const toggle = (id) =>
    setCart((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const cartItems = allItems.filter((item) => cart.has(item.id))
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  const reset = () => setCart(new Set())

  // 선택된 프레임/배경으로 preview
  const selectedFrame = FRAMES.find((f) => cart.has(f.id))
  const selectedBg = BACKGROUNDS.find((b) => cart.has(b.id))

  return (
    <Layout>
      {/* ── 메인 컨텐츠 ─────────────────────────────────────── */}
      <section className="flex-1 p-8 space-y-14 pb-48">

        {/* ① 아바타 프레임 */}
        <div>
          <header className="mb-6 flex items-center gap-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-on-surface whitespace-nowrap">아바타 프레임</h3>
            <div className="h-[2px] flex-1 bg-outline-variant/20" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {FRAMES.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-low p-6 rounded-lg relative overflow-hidden hover:-translate-y-1 transition-transform sticker-shadow"
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-tertiary-container/20 rounded-full blur-2xl" />
                {/* 아바타 */}
                <div
                  className={`w-20 h-20 mb-4 rounded-full border-4 p-1 mx-auto bg-white flex items-center justify-center ${item.animated ? 'relative' : ''}`}
                  style={{ borderColor: item.borderColor, boxShadow: item.glow }}
                >
                  {item.animated && (
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-tertiary-fixed-dim animate-spin [animation-duration:10s]" />
                  )}
                  <img src={item.image} alt={item.name} className="w-full h-full rounded-full object-cover" />
                  {item.animated && (
                    <span className="material-symbols-outlined absolute -top-1 -right-1 text-sm text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  )}
                </div>
                <h4 className="font-bold text-lg mb-1 text-center">{item.name}</h4>
                <p className="text-sm text-on-surface-variant mb-4 text-center">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-black text-lg">{item.price.toLocaleString()} V</span>
                  <BuyButton selected={cart.has(item.id)} onClick={() => toggle(item.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ② 닉네임 효과 */}
        <div>
          <header className="mb-6 flex items-center gap-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-on-surface whitespace-nowrap">닉네임 효과</h3>
            <div className="h-[2px] flex-1 bg-outline-variant/20" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EFFECTS.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-low p-6 rounded-lg flex gap-6 items-center border-l-8 sticker-shadow"
                style={{ borderColor: item.borderColor }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold" style={{ color: item.nameColor || 'inherit' }}>
                      {item.displayName}
                    </span>
                    {item.badge && (
                      <span className="bg-tertiary-container text-white px-2 py-0.5 rounded-full font-black" style={{ fontSize: 10 }}>{item.badge}</span>
                    )}
                    {item.verified && (
                      <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className="text-primary font-black text-lg whitespace-nowrap">{item.price.toLocaleString()} V</span>
                  <BuyButton selected={cart.has(item.id)} onClick={() => toggle(item.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ③ 프로필 배경 */}
        <div>
          <header className="mb-6 flex items-center gap-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-on-surface whitespace-nowrap">프로필 배경</h3>
            <div className="h-[2px] flex-1 bg-outline-variant/20" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BACKGROUNDS.map((item) => (
              <div
                key={item.id}
                className={`bg-surface-container rounded-lg overflow-hidden shadow-[4px_4px_0px_#1D1B1610] transition-transform hover:-translate-y-1 ${cart.has(item.id) ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                <div className="p-4">
                  <h4 className="font-bold mb-1">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant mb-3">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-black text-sm">{item.price.toLocaleString()} V</span>
                    <button
                      onClick={() => toggle(item.id)}
                      className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-[2px_2px_0px_#1D1B1626] transition-all ${
                        cart.has(item.id) ? 'bg-primary text-on-primary' : 'bg-primary-container text-on-primary-container'
                      }`}
                    >
                      {cart.has(item.id) ? '선택됨 ✓' : '구매'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 플로팅 미리보기 위젯 ───────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl z-[100] px-4 md:px-0">

        {/* 확장 패널 */}
        {previewOpen && (
          <div className="backdrop-blur-xl bg-white/85 border-x border-t border-outline-variant/30 rounded-t-lg shadow-[8px_-4px_24px_rgba(29,27,22,0.1)] p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-primary">아이템 미리보기</h3>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">visibility</span>
            </div>

            {/* 미리보기 프로필 카드 */}
            <div className="relative">
              <div className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 sticker-shadow">
                {/* 배경 */}
                <div
                  className="h-16 bg-cover bg-center transition-all duration-500"
                  style={{ backgroundImage: `url('${selectedBg ? selectedBg.image : PREVIEW_PROFILE_BG}')` }}
                />
                <div className="px-4 pb-4 -mt-8 flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full border-4 p-1 bg-white mb-2 shadow-lg transition-all duration-300"
                    style={{
                      borderColor: selectedFrame ? selectedFrame.borderColor : '#D4A407',
                      boxShadow: selectedFrame?.glow,
                    }}
                  >
                    <img src={PREVIEW_AVATAR} alt="프로필" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold" style={{ color: '#D4A407' }}>낙서닉네임</span>
                    <span className="bg-tertiary-container text-white px-1.5 py-0.5 rounded-full font-black" style={{ fontSize: 8 }}>VIP</span>
                  </div>
                  <p className="text-on-surface-variant" style={{ fontSize: 10 }}>@nakseo_user_01</p>
                </div>
              </div>
              {cart.size > 0 && (
                <div className="absolute -top-3 -right-3 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-full shadow-[2px_2px_0px_#1D1B1626]">
                  선택한 효과 적용됨
                </div>
              )}
            </div>

            {/* 선택 아이템 목록 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-on-surface-variant px-1">
                <span>선택된 아이템</span>
                <span>{cart.size}개</span>
              </div>
              {cart.size === 0 ? (
                <p className="text-xs text-on-surface-variant text-center py-3 opacity-60">선택된 아이템이 없습니다</p>
              ) : (
                <div className="bg-surface-container-highest p-3 rounded-lg flex flex-col gap-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                        <span>{item.name}</span>
                      </div>
                      <button
                        onClick={() => toggle(item.id)}
                        className="text-error hover:underline"
                      >제거</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 전체 구매 버튼 */}
            <button
              disabled={cart.size === 0}
              className="w-full bg-primary py-3 rounded-full text-white font-bold shadow-[4px_4px_0px_#1D1B1626] hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              전체 구매 ({totalPrice.toLocaleString()} V)
            </button>
            <button
              onClick={reset}
              className="w-full py-1 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              선택 초기화
            </button>
          </div>
        )}

        {/* 항상 표시되는 슬림 바 */}
        <button
          onClick={() => setPreviewOpen((v) => !v)}
          className="w-full cursor-pointer backdrop-blur-md rounded-b-lg p-3 shadow-[8px_8px_0px_#1D1B1615] border-x border-b border-outline-variant/20 bg-white flex items-center justify-between"
        >
          <div className="w-10" />
          <span className="font-bold text-sm text-primary">
            {cart.size > 0 ? `미리보기 (${cart.size}개 선택됨)` : '미리보기'}
          </span>
          <div className="flex items-center gap-1 text-primary">
            <span className="text-[10px] font-bold">{previewOpen ? '접기' : '펼치기'}</span>
            <span className="material-symbols-outlined text-lg">
              {previewOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </span>
          </div>
        </button>
      </div>
    </Layout>
  )
}
