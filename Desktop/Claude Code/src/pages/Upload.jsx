import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1']

const inspirations = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD2Xf7DEhUntJ9zZnD7cgGpNStrKpjAWxjBqarx6dsNmWrcLvHmr8VPInuU7dPW4wHYMUjZhYmEaVM3WgHuCNemPL3xxN_3WTxceD3RqBdppqgdks3bZfhdPxrqe_mdBUk6dW398nr7k5Lr1RA6S5CE9vBzASlBf-vhZ3JqGkcUTXF5RHG5gM6S5E-J5EgpXhdhkHtUC31BDq7X3mE9JEq4pVyXAarxMja8_9D3OHgw-lS898jJNa0NyIOLyIRn012_HsEhiXYBzdU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAO48OCfbHCHIwOtTPFGV5TVvBdiYXICa6BrIIWkpaqZ6zKZ3KKFbC6Syey5XKe8GqVX6nAR7mWaTp-xGHOZHTPqdfEA-6IKy7odr0-V3sFgFt2gubOnCv3jJJJFVPb8B3YXFTZMxBYPx0qe5wdOXdzpDq67qjhikOHMTwk7LiPWb8JUtHTkAjUFtpqEO0soaHlrOb30Bj9KPz4-od8qLHe7a4GnRDz9Wyn3M5RwM3pq_fQo3H2BR0kIzook_pklEmyqlEzpq_mMF8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLfa_3kt0_pOBKzHcXo1EjERfDJSXoft_athztctctYHdFi0N-uC4nr4aT-5PLCmwk0_tB4Vqw3r4wKuc3maKGGAFP11zrHheDhQTfgCOHxY_CEwufyVmAOdsy11Km9qBUWs0_hhsBr_fbaFDk6_w6J_YlKL17dcNTd9sPCWkxJ_Qkut4OK_s5N3Hz0bGrPsaZxuZ23UmsMi9myMrzQjqxrVQsdM08E6cS1wbbAyPNcyUqwkze_QTAGKp4FR9x1SMkfCbHuyblyR4',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAgGVoAvQy_cMnDyTNkUxGKzjBLPru_z6ptMj58EXkXJZCPD_Eo8uuKQFOUyZexuBywbeEH2yXJG-0BZ0xgzB5dJ1qyFnxxpE_nteRPLZATSp4d0I6uSsk4TkxLPEpgVGGgZfX0miwXtNPGyO4GK15jN8LpRjlIg3el2PbiEAlqjG5Mbxl0GwHDd1MCrXCkoVYPXNWHYf6T0K3um8FH59FH9Vdf7092T5Fp0_H-ZQDS2tFEcMR4yD7QuonvraUsgIUGW6hWYgKdrVQ',
]

const MOCK_CRITIQUE = {
  score: 76,
  text: '오~ 대단한데요? 왼쪽 상단에 과감하게 뻗은 선이 마치 1950년대 스토리보드 스케치를 보는 것 같아요. 선들이 이리저리 겹치게 되면 훨씬 감성 있어 보일 거예요!',
  suggestion: '해칭의 넓이를 조금만 늘려서 이전 부분의 깊이감을 더해볼까요?',
  tags: [
    { text: '#유연한-흐름', color: 'bg-tertiary-container text-on-tertiary-fixed', rotate: '-rotate-2', shadow: 'shadow-[4px_4px_0px_0px_rgba(81,60,0,0.1)]' },
    { text: '#레트로-감성', color: 'bg-secondary-fixed text-on-secondary-fixed', rotate: 'rotate-1', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,31,36,0.1)]' },
    { text: '#강렬한-터치', color: 'bg-primary-fixed-dim text-on-primary-fixed', rotate: '-rotate-1', shadow: 'shadow-[4px_4px_0px_0px_rgba(51,18,0,0.1)]' },
  ],
}

// 아날로그 반원 게이지 — conic-gradient + mask로 구현
function AnalogMeter({ score }) {
  // 바늘: 점수 0% = -90deg, 50% = 0deg, 100% = +90deg
  const needleDeg = score != null ? (score / 100) * 180 - 90 : -90

  return (
    <div className="bg-surface-container-lowest p-6 rounded-lg border-b-4 border-primary/20">
      <h5 className="text-center font-korean font-bold text-on-surface-variant mb-6 uppercase tracking-widest text-xs">
        영감 지수
      </h5>
      <div className="relative w-64 h-32 mx-auto overflow-hidden">
        {/* 반원 게이지 */}
        <div
          className="w-64 h-64 rounded-full"
          style={{
            background: 'conic-gradient(from -90deg at 50% 100%, #ba1a1a 0deg, #d4a407 60deg, #006875 120deg, #006875 180deg)',
            maskImage: 'radial-gradient(circle at 50% 100%, transparent 60%, black 61%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 100%, transparent 60%, black 61%)',
          }}
        />
        {/* 피벗 점 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-on-surface rounded-full z-10" />
        {/* 바늘 */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-28 bg-on-surface origin-bottom transition-[transform] duration-1000"
          style={{ transform: `rotate(${needleDeg}deg)` }}
        />
      </div>
      <div className="flex justify-between mt-2 font-korean text-on-surface-variant text-lg">
        <span>심플</span>
        <span>영감 뿜뿜!</span>
      </div>
    </div>
  )
}

export default function Upload() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [critique, setCritique] = useState(null)
  const [source, setSource] = useState(null)
  const fileInputRef = useRef(null)

  // Canvas에서 "Finish & Analyze"로 넘어왔을 때 처리
  useEffect(() => {
    const canvasData = localStorage.getItem('canvas_doodle')
    if (canvasData) {
      setUploadedImage(canvasData)
      setSource('canvas')
      localStorage.removeItem('canvas_doodle')
      runAnalysis()
    }
  }, [])

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있어요 (PNG, JPG, SVG)')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target.result)
      setSource('file')
      setCritique(null)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }

  const handleFileInput = (e) => handleFile(e.target.files[0])

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    setCritique(null)
    // TODO: 실제 Claude API 연동 예정
    await new Promise((r) => setTimeout(r, 2000))
    setCritique(MOCK_CRITIQUE)
    setIsAnalyzing(false)
  }

  const resetUpload = () => {
    setUploadedImage(null)
    setCritique(null)
    setSource(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Layout>
      <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-korean font-black tracking-tighter text-primary mb-4 leading-tight">
            내 스튜디오
          </h1>
          <p className="text-xl font-korean text-on-surface-variant max-w-2xl leading-relaxed">
            냅킨 위의 낙서가 디지털 걸작으로 변신하는 곳!<br />
            AI 멘토가 당신의 선 속에 숨겨진 아름다움을 찾아줄 거예요.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          {/* ── 왼쪽: 업로드 영역 ───────────────────────── */}
          <section className="xl:col-span-7 space-y-8">
            <div className="relative group">
              <div className={`absolute -inset-2 bg-primary-fixed-dim rounded-lg blur transition-opacity ${isDragging ? 'opacity-40' : 'opacity-20 group-hover:opacity-30'}`} />

              {uploadedImage ? (
                <div className="relative bg-surface-container-low rounded-lg overflow-hidden sticker-shadow border-8 border-surface-container-high">
                  <img
                    src={uploadedImage}
                    alt="업로드된 낙서"
                    className="w-full object-contain max-h-[480px]"
                  />
                  {source === 'canvas' && (
                    <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-korean font-bold">
                      캔버스에서 불러옴
                    </div>
                  )}
                  <button
                    onClick={resetUpload}
                    className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm p-2 rounded-full text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors sticker-shadow"
                    title="다른 이미지로 교체"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ) : (
                <div
                  className={`relative dashed-doodle min-h-[400px] flex flex-col items-center justify-center p-12 bg-surface-container-low rounded-lg cursor-pointer overflow-hidden transition-all ${isDragging ? 'bg-primary-fixed-dim/30 scale-[1.01]' : 'hover:bg-surface-container'}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <div className="text-center space-y-4 pointer-events-none">
                    <div className={`w-24 h-24 bg-tertiary-container rounded-full flex items-center justify-center mx-auto shadow-[6px_6px_0px_0px_rgba(29,27,22,0.1)] transition-transform ${isDragging ? 'rotate-12 scale-110' : '-rotate-3 group-hover:rotate-6'}`}>
                      <span className="material-symbols-outlined text-4xl text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {isDragging ? 'download' : 'auto_fix_high'}
                      </span>
                    </div>
                    <h3 className="text-3xl font-korean font-bold text-primary-fixed-variant">
                      {isDragging ? '여기에 놓으세요!' : '여기에 낙서를 탁! 던져주세요'}
                    </h3>
                    <p className="font-korean text-on-surface-variant text-lg">파일을 드래그하거나 노트북 사진을 찍어 올려보세요.</p>
                    <p className="text-sm font-korean text-on-surface-variant/60">클릭해도 파일을 선택할 수 있어요</p>
                  </div>
                </div>
              )}
            </div>

            {/* 최근 영감들 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-korean font-bold text-on-surface">요즘 영감들</h4>
                <button className="font-korean text-secondary font-bold text-sm hover:underline">스크랩북 전체보기</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {inspirations.map((src, i) => (
                  <div
                    key={i}
                    className={`aspect-square bg-surface-container-highest rounded-lg ${rotations[i]} shadow-[4px_4px_0px_0px_rgba(29,27,22,0.05)] overflow-hidden border-4 border-white cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => { setUploadedImage(src); setSource('file'); setCritique(null) }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 오른쪽: AI 평론 ───────────────────────────── */}
          <aside className="xl:col-span-5 space-y-8">
            <div className="bg-surface-container-high rounded-lg p-8 shadow-[8px_8px_0px_0px_rgba(155,69,0,0.1)] relative">
              <div className="absolute -top-4 -right-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-korean font-bold shadow-[4px_4px_0px_0px_rgba(0,104,117,0.2)] rotate-6">
                실시간 감상중
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-primary">psychology</span>
                  </div>
                  <h2 className="text-4xl font-korean font-bold text-on-surface">AI 멘토 한마디</h2>
                </div>

                {/* 아날로그 미터 */}
                <AnalogMeter score={critique?.score ?? null} />

                {/* 평론 텍스트 or 로딩 */}
                {isAnalyzing ? (
                  <div className="flex flex-col items-center gap-4 py-6 text-on-surface-variant">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="font-korean text-lg">AI 멘토가 낙서를 감상 중…</p>
                  </div>
                ) : critique ? (
                  <>
                    <div className="space-y-4 font-korean text-on-surface leading-relaxed text-lg">
                      <p className="bg-primary-fixed p-5 rounded-lg rounded-tl-none shadow-[4px_4px_0px_0px_rgba(155,69,0,0.05)]">
                        "{critique.text}"
                      </p>
                      <p className="text-on-surface-variant pl-4 border-l-4 border-tertiary font-medium">
                        추천: {critique.suggestion}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4">
                      {critique.tags.map((tag) => (
                        <span key={tag.text} className={`font-korean ${tag.color} ${tag.rotate} ${tag.shadow} px-4 py-2 rounded-full font-bold text-sm`}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 font-korean text-on-surface leading-relaxed text-lg opacity-40 pointer-events-none">
                    <p className="bg-primary-fixed p-5 rounded-lg rounded-tl-none">
                      "낙서를 올리면 AI 멘토가 평론을 시작합니다…"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 액션 카드 */}
            <div className="bg-on-background text-surface p-8 rounded-lg shadow-[12px_12px_0px_0px_rgba(155,69,0,0.2)]">
              <h4 className="text-2xl font-korean font-black mb-4 leading-tight">벡터로 만들 준비 되셨나요?</h4>
              <p className="font-korean opacity-80 mb-6 text-lg leading-relaxed">
                작가님의 고유한 화체는 그대로 유지하면서, AI가 이 낙서를 깔끔한 4K 벡터 파일로 자동 변환해 드릴 수 있어요.
              </p>

              {uploadedImage && !critique && !isAnalyzing && (
                <button
                  onClick={runAnalysis}
                  className="w-full bg-primary text-on-primary font-korean font-bold py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg mb-3"
                >
                  <span className="material-symbols-outlined">psychology</span>
                  AI 평론 받기
                </button>
              )}

              <Link
                to="/canvas"
                className="w-full bg-primary-container text-on-primary-container font-korean font-bold py-4 rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 text-xl tracking-tight"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                마법 시작하기
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}
