import { Link, useLocation } from 'react-router-dom'
import { GNB_ITEMS, LNB_MAP, SECTION_CONFIG } from '../constants/navigation'
import { useUI } from '../contexts/UIContext'

// ── GNB (Top Navigation) ───────────────────────────────────────
function TopNav() {
  const location = useLocation()
  const { isDrawing } = useUI()

  const isGnbActive = (item) => item.match.includes(location.pathname)

  return (
    <nav
      className={`w-full sticky top-0 z-50 backdrop-blur-md shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] transition-transform duration-300 ease-in-out md:translate-y-0 ${isDrawing ? '-translate-y-full' : 'translate-y-0'}`}
      style={{ backgroundColor: 'rgba(255,249,240,0.8)' }}
    >
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black text-primary font-headline tracking-tighter">
            Nakseo.io
          </Link>
          <div className="hidden md:flex gap-6">
            {GNB_ITEMS.map((item) => {
              const active = isGnbActive(item)
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`font-headline tracking-tighter font-bold transition-transform hover:scale-105 ${
                    active
                      ? 'text-primary border-b-4 border-primary pb-1'
                      : 'text-on-background opacity-70'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-2 text-primary transition-transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ── LNB (Sidebar, hover-expand) ────────────────────────────────
function Sidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  const activeSection = GNB_ITEMS.find((item) => item.match.includes(currentPath))
  if (!activeSection) return null

  const lnbItems = LNB_MAP[activeSection.key] || []
  const config = SECTION_CONFIG[activeSection.key]
  const btn = config?.bottomBtn

  return (
    <aside className="hidden lg:flex flex-col p-4 gap-8 h-[calc(100vh-5rem)] w-20 hover:w-64 group [transition:width_0.3s_cubic-bezier(0.4,0,0.2,1)] bg-surface-container rounded-r-[2rem] sticky top-20 shadow-[8px_0px_0px_0px_rgba(29,27,22,0.05)] z-40 overflow-hidden">

      {/* 섹션 헤더 */}
      <div className="flex flex-col gap-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <h2 className="text-xl font-bold text-on-surface font-headline">{config?.title}</h2>
        <p className="text-sm opacity-60">{config?.subtitle}</p>
      </div>

      {/* 상점 전용: VIBE 잔액 위젯 */}
      {activeSection.key === 'shop' && (
        <div className="bg-surface-container-highest p-4 rounded-lg flex flex-col group-hover:flex-row justify-between items-center sticker-shadow min-w-[50px] group-hover:min-w-[200px] transition-all duration-300">
          <span className="text-[10px] group-hover:text-sm font-bold">VIBE</span>
          <span className="text-primary font-black text-xs group-hover:text-base">12.4k</span>
        </div>
      )}

      {/* LNB 아이템 목록 */}
      <nav className="flex flex-col gap-2">
        {lnbItems.map((item) => {
          const active = currentPath === item.to
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`flex items-center gap-4 p-3 rounded-full transition-all active:translate-y-1 duration-75 min-w-[48px] overflow-hidden ${
                active
                  ? 'bg-primary-container text-on-primary-container sticker-shadow'
                  : 'text-on-surface opacity-80 hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined shrink-0">{item.icon}</span>
              <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* 섹션별 하단 액션 버튼 */}
      {btn && (
        <div className="mt-auto flex flex-col items-center group-hover:items-stretch">
          {btn.to ? (
            <Link
              to={btn.to}
              className="bg-primary text-on-primary font-bold py-4 rounded-full sticker-shadow hover:-translate-y-1 transition-all active:translate-y-0 flex items-center justify-center gap-3 w-12 h-12 group-hover:w-full group-hover:h-auto overflow-hidden"
            >
              <span className="material-symbols-outlined shrink-0">{btn.icon}</span>
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden group-hover:inline">
                {btn.label}
              </span>
            </Link>
          ) : (
            <button className="bg-primary text-on-primary font-bold h-12 group-hover:h-14 rounded-full sticker-shadow hover:-translate-y-1 transition-all active:translate-y-0 flex items-center justify-center overflow-hidden gap-0 group-hover:gap-2 w-full">
              <span className="material-symbols-outlined shrink-0">{btn.icon}</span>
              <span className="whitespace-nowrap w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                {btn.label}
              </span>
            </button>
          )}
        </div>
      )}
    </aside>
  )
}

// ── Bottom Nav (Mobile Only) ───────────────────────────────────
function BottomNav() {
  const location = useLocation()
  const { isDrawing } = useUI()
  const path = location.pathname

  const bottomItems = [
    { to: '/',         icon: 'explore',        label: '챌린지', match: ['/', '/community'] },
    { to: '/market',   icon: 'token',           label: '마켓',   match: ['/market']         },
    null, // FAB placeholder
    { to: '/shop',     icon: 'storefront',      label: '상점',   match: ['/shop']            },
    { to: '/profile',  icon: 'account_circle',  label: '프로필', match: ['/profile']         },
  ]

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 md:hidden backdrop-blur-md px-6 py-3 flex justify-around items-center z-50 transition-transform duration-300 ease-in-out ${isDrawing ? 'translate-y-full' : 'translate-y-0'}`}
      style={{ backgroundColor: 'rgba(243,237,228,0.8)' }}
    >
      {bottomItems.map((item) => {
        if (!item) {
          return (
            <div key="fab" className="relative -top-8">
              <Link to="/canvas" className="bg-primary-container text-on-primary-container p-4 rounded-full sticker-shadow block">
                <span className="material-symbols-outlined">add</span>
              </Link>
            </div>
          )
        }
        const active = item.match.includes(path)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center ${active ? 'text-primary' : 'opacity-60'}`}
          >
            <span
              className="material-symbols-outlined"
              style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

// ── Layout ─────────────────────────────────────────────────────
export default function Layout({ children }) {
  return (
    <div className="paper-bg text-on-background font-body min-h-[100svh]">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
