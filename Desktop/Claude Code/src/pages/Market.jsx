import { useState } from 'react'
import Layout from '../components/Layout'

const auctionItems = [
  {
    id: 1,
    title: '레트로 렌즈 #042',
    itemId: 'ID-9921',
    time: '마감까지 2시간 45분',
    bidLabel: '지금 최고 입찰가',
    bid: '12.4',
    action: '입찰 참여',
    badge: { text: '인기 급상승', pos: 'top-3 left-3' },
    rotate: 'hover:-rotate-1',
    bg: 'bg-surface-container-lowest',
    filter: 'grayscale-[20%]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6UQ4BNs89d8GWRc1A3RxP-MxgeAJUDHq4S90UfiQg26X4AXHOwivMA99PxFu06xDEg6qIaGOv4ad0b9YVLwpRjqPhoLS9irn6QMnLvDsEu4Ax7zeDqUA1KWvTucSu1AFOZkcElghv_WnSlh47fmzQWZuhGDA2Ai9TMXQJ7HOi1XqRQL5_j5d1yX3vnu1HBh_o6BnAGDE8GxwLosdH72HLRZYRMx-Hs-H761B2E_0nDeKVEpltE8aFNa5y_GVqLqxIvg3LbWpy3Ks',
  },
  {
    id: 2,
    title: '픽셀 메모리',
    itemId: 'ID-1024',
    time: '내일 마감이에요',
    bidLabel: '경매 시작가',
    bid: '45.0',
    action: '입찰 참여',
    badge: { text: '전설 등급', pos: 'bottom-3 right-3' },
    rotate: 'rotate-1 hover:rotate-0',
    bg: 'bg-surface-container',
    filter: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0VExaJywsu7YYduzV-OPKLfYE0YCSOSZV2zFuxq2Co-GyltgD64PEAHYZCZKDcIW5IkdsfEUXoipsjAjVFLwSKtCfxOk_b5F1IBj6K4hzhtu94noO-CCzuXdciyG1So2FCR1wrHBttQePQSxBEItt7pel_It9D-zN_LHR_SxVhg5QHX1e380Ql7HBwR1TbtBf5vV0RnnoCLOQXBE5vWejeDMJrFNvw2z8wbn5yzaeYGVxypxzYEJYMbBFbLBDzv4EHxK2VDiMlyQ',
  },
  {
    id: 3,
    title: '소닉 그루브',
    itemId: 'ID-4401',
    time: '5분 뒤 바로 종료!',
    bidLabel: '현재 최고 낙찰가',
    bid: '128.5',
    action: '바로 가로채기',
    badge: null,
    rotate: '-rotate-1 hover:rotate-0',
    bg: 'bg-surface-container-highest',
    filter: 'sepia-[30%]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRTC2Ft0xGbIpwEwOU6DcRaZCbF_sFyVx9UWajWAMgEVQcf1ixrTv8a9lSuMUYG8otnyQzszAuyrPOmhugkO6MH8IFnT3wWGrsp3MpS8yjuw8Du7FfXUw24yc1FUVmkyG5dJfhwN56J-KOfrNr64IWuVezjQVe971b1CcHQqHXCPfK1K33EW26BrdsERg_RkEfQxz7_nq4yQmovvnOpzZ1YfpTuZtwS93w9wKSBcWyXHeQlrx7MrAoiRAESBd854YprjvyUpt8tpY',
  },
  {
    id: 4,
    title: '유리 구슬 컬렉션',
    itemId: '',
    time: '실시간 핫 아이템',
    bidLabel: '현재 입찰가',
    bid: '5.2',
    action: '입찰 참여',
    badge: null,
    trending: true,
    rotate: 'rotate-2 hover:rotate-0',
    bg: 'bg-surface-container-lowest',
    filter: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2kmod4Roa1sxCEEfAMA2TOXPyAeV9B5KC4nuPikldQgcQPwfsRdNQsPwMCVFZQ6vZcKQCq4eFtpmaVBjVVj4jGCfLYvas2H3VZbsImiWyjKgBwpCraf5SjlIrCcGjwUUjGtBggEOHCCVqKwM4763mZYhUQ1wWEOuPVEYr4TuqlKc_NKVT-EeOu8ETt9iBLw-NoC1SBBKoN_kXhoDrLoXRj2xTA4qUnU8S9dFqc0QnOlqGs3R6sqgjtj3HxXXAvQw0FFrlchtpDI0',
  },
  {
    id: 5,
    title: '고대의 기록들',
    itemId: '',
    time: '하루 남았어요',
    bidLabel: '현재 입찰가',
    bid: '22.0',
    action: '입찰 참여',
    badge: null,
    rotate: '-rotate-2 hover:rotate-0',
    bg: 'bg-surface-container-low',
    filter: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tKQ3cV1KFa-v3RzBCmleXYQ-0E01FV1eGIJbq5cHBPBVswgko9U2iTa92dEEBYoLPATWGqL5MxmxMoPOEJwJFdHct-QZGBDkg8Yn6b1D9GaqfQ4_Cz20JNgS_hdff1Z5Fgz0LxEYWneh2qrgnpqTVNS9cutq4oXQzP1dGdrvHp5DGR0wAJXXUnIddhg9gbY2RdpqMlHkqacxgGOwimTxvk3BJw5AWkQGKqWwNwzW8XpJpkGti93UyMwBTjhEtym0tOQA4bcMF04',
  },
  {
    id: 6,
    title: '영령 시간',
    itemId: '',
    time: '오늘 밤 8시 마감',
    bidLabel: '현재 입찰가',
    bid: '31.4',
    action: '입찰 참여',
    badge: null,
    rotate: 'hover:rotate-1',
    bg: 'bg-surface-container',
    filter: '',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkBb1FPFOdA2PSr42akf9nNTpeViGWP9ro9mOzVp-BUUEw1akXTIxoJGbMJ_iPNnIWw3LkmJcmfuE8HpBdmde4yWqJRWKJliJ9zzIySWgMRxjM7x2dZgMoI5utGOp7NBidICqq86lGX6P20LF5mlD5ZqhGMIvBjLQ2laEnZp3rwVi6HNryQMaTTSWKXGQDWy_BOLeoNIwACGPTCJVAuGOoPcrFHWFKBWCZjZTq1ObaYo-6h-O0gVeqWXEOfRVoifCOubm2oSEeo78',
  },
]

const tabs = ['요즘 뜨는 중', '방금 올라온', '곧 마감이에요']

export default function Market() {
  const [activeTab, setActiveTab] = useState('요즘 뜨는 중')

  return (
    <Layout>
      <div className="p-6 md:p-12">

        {/* Hero Header */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="bg-tertiary-container text-on-tertiary-fixed px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-4 -rotate-1">
                디지털 보물창고
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-black text-on-surface leading-none tracking-tighter">
                토큰 <span className="text-primary">마켓</span>
              </h1>
              <p className="mt-4 text-lg text-on-surface-variant max-w-lg leading-relaxed keep-all">
                인류의 흔적뿐인 디지털 보물들을 발견하고 수집해보세요. 모든 토큰은 NakseoVault에 안전하게 보관된 추억들이랍니다.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <input
                className="w-full bg-surface-container-highest border-0 border-b-4 border-primary focus:ring-0 focus:bg-surface-container-lowest transition-colors px-4 py-3 placeholder:text-on-surface-variant/40 outline-none"
                placeholder="관심 있는 컬렉션 검색..."
                type="text"
              />
              <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant">search</span>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10 items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-headline font-bold text-lg transition-transform ${
                activeTab === tab
                  ? 'bg-primary-container text-on-primary-container shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] -rotate-1 hover:rotate-0'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {tab}
            </button>
          ))}
          <div className="ml-auto hidden md:flex items-center gap-2 text-on-surface-variant opacity-60">
            <span className="material-symbols-outlined">filter_list</span>
            <span className="text-sm font-bold tracking-tight">정렬: 추천순</span>
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {auctionItems.map((item) => (
            <div key={item.id} className={`group relative ${item.bg} polaroid-frame rounded-sm ${item.rotate} transition-all duration-300`}>
              <div className="relative aspect-square overflow-hidden mb-4 rounded-sm">
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${item.filter}`}
                />
                {item.badge && (
                  <div className={`absolute ${item.badge.pos} bg-tertiary-container text-on-tertiary-fixed px-3 py-1 rounded-sm text-[10px] font-black uppercase shadow-sm`}>
                    {item.badge.text}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-headline font-black tracking-tighter">{item.title}</h3>
                  {item.itemId && <span className="text-xs text-on-surface-variant/40 font-mono">{item.itemId}</span>}
                </div>
                <div className={`flex items-center gap-1 mb-6 ${item.trending ? 'text-error' : 'text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined text-sm">
                    {item.trending ? 'local_fire_department' : 'schedule'}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide">{item.time}</span>
                </div>
                <div className="flex items-end justify-between pt-4 border-t-2 border-surface-container-high">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-widest">{item.bidLabel}</p>
                    <p className="text-3xl font-headline font-black text-primary">{item.bid} <span className="text-lg">VIBE</span></p>
                  </div>
                  <button className="bg-tertiary-container text-on-tertiary-fixed px-6 py-3 rounded-full font-black text-sm shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:scale-105 active:translate-y-1 transition-all">
                    {item.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Stats */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: '누적 거래 바이브', value: '1.2M', unit: 'VIBE', border: 'border-secondary-container' },
            { label: '진행 중인 경매', value: '4,821', unit: '건', border: 'border-tertiary-container' },
            { label: '최저 시작가', value: '0.85', unit: 'VIBE', border: 'border-primary-container' },
          ].map((stat) => (
            <div key={stat.label} className={`bg-surface-container-low p-8 rounded-[1rem] border-b-8 ${stat.border} shadow-[8px_8px_0px_0px_rgba(29,27,22,0.05)]`}>
              <p className="text-[10px] uppercase font-black text-on-surface-variant/50 tracking-widest mb-2">{stat.label}</p>
              <h4 className="text-4xl font-headline font-black text-on-surface leading-none">
                {stat.value} {stat.unit && <span className="text-xl opacity-60">{stat.unit}</span>}
              </h4>
            </div>
          ))}
        </section>

      </div>
    </Layout>
  )
}
