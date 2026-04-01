export const GNB_ITEMS = [
  {
    key: 'challenge',
    label: '챌린지',
    to: '/',
    match: ['/', '/community'],
  },
  {
    key: 'market',
    label: '마켓',
    to: '/market',
    match: ['/market'],
  },
  {
    key: 'shop',
    label: '아이템 상점',
    to: '/shop',
    match: ['/shop'],
  },
  {
    key: 'studio',
    label: '내 스튜디오',
    to: '/studio',
    match: ['/studio', '/canvas', '/profile'],
  },
]

export const LNB_MAP = {
  challenge: [
    { key: 'home',      icon: 'explore',  label: '메인 페이지',         to: '/'          },
    { key: 'community', icon: 'campaign', label: '게시글 강조 및 홍보',  to: '/community' },
  ],
  market: [
    { key: 'token-market', icon: 'currency_exchange', label: '가상 토큰 마켓', to: '/market' },
  ],
  shop: [
    { key: 'item-shop', icon: 'storefront', label: '아이템 상점', to: '/shop' },
  ],
  studio: [
    { key: 'profile', icon: 'account_circle', label: '유저 프로필 & 바이브 센터', to: '/profile' },
    { key: 'canvas',  icon: 'draw',           label: '낙서 캔버스',              to: '/canvas'  },
    { key: 'studio',  icon: 'science',        label: '낙서 실험실',              to: '/studio'  },
  ],
}

export const SECTION_CONFIG = {
  challenge: {
    title: '챌린지 허브',
    subtitle: '오늘의 도전을 시작하세요',
    bottomBtn: { icon: 'edit', label: '새 게시글 작성', to: '/community' },
  },
  market: {
    title: '토큰 마켓',
    subtitle: '희귀 아이템을 발견하세요',
    bottomBtn: null,
  },
  shop: {
    title: '아이템 상점',
    subtitle: '나만의 스타일을 찾아보세요',
    bottomBtn: { icon: 'redeem', label: '선물하기', to: null },
  },
  studio: {
    title: '크리에이터 스튜디오',
    subtitle: '오늘의 생각을 기록하세요',
    bottomBtn: { icon: 'auto_awesome', label: '새로운 낙서', to: '/canvas' },
  },
}
