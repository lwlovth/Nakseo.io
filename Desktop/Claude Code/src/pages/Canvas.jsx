import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const tools = [
  { key: 'pencil', icon: 'edit', label: '연필' },
  { key: 'charcoal', icon: 'brush', label: '목탄' },
  { key: 'finetip', icon: 'format_color_fill', label: '채우기' },
  { key: 'eraser', icon: 'ink_eraser', label: '지우개' },
]

const palette = ['#9B4500', '#D4A407', '#006875', '#1D1B16', '#FFB68D', '#849679', '#8FB08F', '#897266']
const brushSizes = [2, 6, 14]

const CANVAS_SIZE = 600

export default function Canvas() {
  const [activeTool, setActiveTool] = useState('pencil')
  const [activeColor, setActiveColor] = useState('#9B4500')
  const [activeSize, setActiveSize] = useState(1)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [hexInput, setHexInput] = useState('#9B4500')
  const canvasRef = useRef(null)
  const pickerRef = useRef(null)
  const mobilePickerRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPoint = useRef(null)
  const history = useRef([])
  const historyStep = useRef(-1)
  const navigate = useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FFF9F0'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    saveHistory()
  }, [])

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    history.current = history.current.slice(0, historyStep.current + 1)
    history.current.push(canvas.toDataURL())
    historyStep.current = history.current.length - 1
  }, [])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scale = CANVAS_SIZE / rect.width
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scale,
        y: (e.touches[0].clientY - rect.top) * scale,
      }
    }
    return {
      x: (e.clientX - rect.left) * scale,
      y: (e.clientY - rect.top) * scale,
    }
  }

  const applyToolStyle = (ctx) => {
    const size = brushSizes[activeSize]
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.setLineDash([])
    ctx.globalCompositeOperation = 'source-over'
    if (activeTool === 'eraser') {
      ctx.strokeStyle = '#FFF9F0'
      ctx.fillStyle = '#FFF9F0'
      ctx.lineWidth = size * 4
      ctx.globalAlpha = 1
    } else {
      ctx.strokeStyle = activeColor
      ctx.fillStyle = activeColor
      ctx.lineWidth = size
      ctx.globalAlpha = 0.9
    }
  }

  const drawCharcoal = (ctx, from, to) => {
    const size = brushSizes[activeSize]
    const dx = to.x - from.x
    const dy = to.y - from.y
    const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy))
    const steps = Math.ceil(dist / 3)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = activeColor
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const cx = from.x + dx * t
      const cy = from.y + dy * t
      const spread = size * 1.8
      for (let p = 0; p < 14; p++) {
        ctx.globalAlpha = Math.random() * 0.12 + 0.03
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * spread
        ctx.beginPath()
        ctx.arc(
          cx + Math.cos(angle) * radius,
          cy + Math.sin(angle) * radius,
          Math.random() * 1.5 + 0.3, 0, Math.PI * 2
        )
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }

  const hexToRgb = (hex) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  })

  const rgbToHex = (r, g, b) =>
    '#' + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')

  const handleRgb = (channel, value) => {
    const cur = hexToRgb(activeColor)
    const next = { ...cur, [channel]: parseInt(value) }
    setActiveColor(rgbToHex(next.r, next.g, next.b))
  }

  const floodFill = useCallback((startX, startY) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    const data = imageData.data
    const sx = Math.floor(Math.max(0, Math.min(CANVAS_SIZE - 1, startX)))
    const sy = Math.floor(Math.max(0, Math.min(CANVAS_SIZE - 1, startY)))
    const startPos = sy * CANVAS_SIZE + sx
    const tR = data[startPos * 4], tG = data[startPos * 4 + 1], tB = data[startPos * 4 + 2]
    const fill = hexToRgb(activeColor)
    if (tR === fill.r && tG === fill.g && tB === fill.b) return
    const tol = 30
    const matches = (p) =>
      Math.abs(data[p * 4] - tR) <= tol &&
      Math.abs(data[p * 4 + 1] - tG) <= tol &&
      Math.abs(data[p * 4 + 2] - tB) <= tol
    const visited = new Uint8Array(CANVAS_SIZE * CANVAS_SIZE)
    const stack = [startPos]
    while (stack.length) {
      const pos = stack.pop()
      if (visited[pos] || !matches(pos)) continue
      visited[pos] = 1
      data[pos * 4] = fill.r
      data[pos * 4 + 1] = fill.g
      data[pos * 4 + 2] = fill.b
      data[pos * 4 + 3] = 255
      const x = pos % CANVAS_SIZE, y = Math.floor(pos / CANVAS_SIZE)
      if (x > 0) stack.push(pos - 1)
      if (x < CANVAS_SIZE - 1) stack.push(pos + 1)
      if (y > 0) stack.push(pos - CANVAS_SIZE)
      if (y < CANVAS_SIZE - 1) stack.push(pos + CANVAS_SIZE)
    }
    ctx.putImageData(imageData, 0, 0)
    saveHistory()
  }, [activeColor, saveHistory])

  const startDraw = (e) => {
    e.preventDefault()
    const pos = getPos(e)
    if (activeTool === 'finetip') { floodFill(pos.x, pos.y); return }
    isDrawing.current = true
    lastPoint.current = pos
    const ctx = canvasRef.current.getContext('2d')
    if (activeTool === 'charcoal') {
      drawCharcoal(ctx, pos, pos)
    } else {
      applyToolStyle(ctx)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, ctx.lineWidth / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const draw = (e) => {
    e.preventDefault()
    if (!isDrawing.current || !lastPoint.current) return
    if (activeTool === 'finetip') return
    const ctx = canvasRef.current.getContext('2d')
    const pos = getPos(e)
    if (activeTool === 'charcoal') {
      drawCharcoal(ctx, lastPoint.current, pos)
    } else {
      applyToolStyle(ctx)
      ctx.beginPath()
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
    lastPoint.current = pos
  }

  const stopDraw = () => {
    if (!isDrawing.current) return
    isDrawing.current = false
    lastPoint.current = null
    saveHistory()
  }

  const undo = () => {
    if (historyStep.current <= 0) return
    historyStep.current -= 1
    restoreStep(historyStep.current)
  }

  const redo = () => {
    if (historyStep.current >= history.current.length - 1) return
    historyStep.current += 1
    restoreStep(historyStep.current)
  }

  const restoreStep = (step) => {
    const img = new Image()
    img.src = history.current[step]
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d')
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(img, 0, 0)
    }
  }

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#FFF9F0'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    saveHistory()
  }

  const handleHexInput = (val) => {
    setHexInput(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setActiveColor(val)
  }

  useEffect(() => { setHexInput(activeColor) }, [activeColor])

  useEffect(() => {
    if (!showColorPicker) return
    const handleOutside = (e) => {
      const inDesktop = pickerRef.current?.contains(e.target)
      const inMobile = mobilePickerRef.current?.contains(e.target)
      if (!inDesktop && !inMobile) setShowColorPicker(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [showColorPicker])

  const rgb = hexToRgb(activeColor)

  const saveToJournal = () => {
    const link = document.createElement('a')
    link.download = `doodle-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const finishAndAnalyze = () => {
    localStorage.setItem('canvas_doodle', canvasRef.current.toDataURL('image/png'))
    navigate('/studio')
  }

  // 색상 피커 슬라이더 + HEX 입력 공유 콘텐츠
  const colorPickerContent = (
    <>
      <div className="w-full h-12 rounded-xl sticker-shadow" style={{ backgroundColor: activeColor }} />
      {[
        { ch: 'r', label: 'R', from: `rgb(0,${rgb.g},${rgb.b})`, to: `rgb(255,${rgb.g},${rgb.b})`, val: rgb.r },
        { ch: 'g', label: 'G', from: `rgb(${rgb.r},0,${rgb.b})`, to: `rgb(${rgb.r},255,${rgb.b})`, val: rgb.g },
        { ch: 'b', label: 'B', from: `rgb(${rgb.r},${rgb.g},0)`, to: `rgb(${rgb.r},${rgb.g},255)`, val: rgb.b },
      ].map(({ ch, label, from, to, val }) => (
        <div key={ch}>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{label}</span>
            <span className="text-xs font-bold text-on-surface-variant">{val}</span>
          </div>
          <div className="relative h-3 rounded-full" style={{ background: `linear-gradient(to right, ${from}, ${to})` }}>
            <input type="range" min="0" max="255" value={val}
              onChange={(e) => handleRgb(ch, e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white sticker-shadow pointer-events-none"
              style={{ left: `calc(${(val / 255) * 100}% - 8px)`, border: '2px solid rgba(221,193,179,0.4)' }}
            />
          </div>
        </div>
      ))}
      <div>
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">HEX</span>
        <input type="text" value={hexInput} onChange={(e) => handleHexInput(e.target.value)}
          maxLength={7}
          className="w-full bg-surface-container-highest text-on-surface text-sm font-bold tracking-wider uppercase px-3 py-2 rounded-lg outline-none border-b-2 border-primary transition-colors"
          spellCheck={false}
        />
      </div>
    </>
  )

  const toolBtnBase = 'flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full transition-all active:scale-95'
  const toolBtnActive = 'bg-[#FF8C42] text-[#6A2D00] shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)]'
  const toolBtnInactive = 'bg-[#F9F3EA] text-on-surface'

  return (
    <Layout>
      {/* ── 페이지 래퍼: 모바일 max-w-[414px] | 데스크탑 full ── */}
      <div className="w-full max-w-[414px] lg:max-w-none mx-auto px-4 lg:px-6 pt-4 lg:pt-8 pb-16 lg:pb-12">

        {/* ── 헤더 ── */}
        <div className="flex justify-between items-center gap-3 mb-4 lg:mb-8">
          <div>
            <h1 className="font-headline text-2xl lg:text-5xl font-black text-on-background tracking-tighter">내 캔버스</h1>
            <p className="hidden lg:block text-sm text-on-surface-variant mt-1">오늘의 영감: <span className="font-bold text-on-surface">비 온 뒤 오후의 기분</span></p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={saveToJournal}
              className={`${toolBtnBase} px-3 lg:px-5 gap-2 bg-surface-container-highest text-on-surface sticker-shadow-hover`}>
              <span className="material-symbols-outlined text-xl">save</span>
              <span className="hidden lg:inline text-sm font-bold">저장</span>
            </button>
            <button onClick={finishAndAnalyze}
              className={`${toolBtnBase} px-3 lg:px-6 gap-2 bg-primary-container text-on-primary-container sticker-shadow sticker-shadow-hover`}>
              <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
              <span className="hidden lg:inline text-sm font-bold">완성 &amp; 분석</span>
            </button>
          </div>
        </div>

        {/* ── 워크스페이스 ── */}
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr] gap-4 lg:gap-8 items-start">

          {/* 데스크탑 툴바 (왼쪽 사이드바) */}
          <div className="hidden lg:flex flex-col gap-6 bg-surface-container-high p-5 rounded-2xl sticker-shadow sticky top-28">

            <div>
              <h3 className="font-bold text-xs mb-3 uppercase tracking-wider text-on-surface-variant">그리기 도구</h3>
              <div className="flex flex-col gap-2">
                {tools.map((tool) => (
                  <button key={tool.key} onClick={() => setActiveTool(tool.key)}
                    className={`${toolBtnBase} justify-start gap-3 px-4 w-full ${activeTool === tool.key ? toolBtnActive : toolBtnInactive + ' hover:shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:-translate-y-0.5'}`}>
                    <span className="material-symbols-outlined">{tool.icon}</span>
                    <span className="text-sm font-bold">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xs mb-3 uppercase tracking-wider text-on-surface-variant">굵기 조절</h3>
              <div className="flex justify-between items-center px-2">
                {brushSizes.map((sz, i) => (
                  <button key={i} onClick={() => setActiveSize(i)}
                    className={`rounded-full bg-on-surface transition-all min-w-[48px] min-h-[48px] flex items-center justify-center ${activeSize === i ? 'outline outline-2 outline-offset-4 outline-primary' : 'opacity-40'}`}>
                    <span className="rounded-full bg-on-surface block"
                      style={{ width: sz * 2.5 + 4, height: sz * 2.5 + 4 }} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xs mb-3 uppercase tracking-wider text-on-surface-variant">색상 선택</h3>
              <div className="grid grid-cols-4 gap-2">
                {palette.map((color) => (
                  <button key={color} onClick={() => setActiveColor(color)}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 sticker-shadow ${activeColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* 데스크탑 커스텀 컬러 피커 */}
            <div ref={pickerRef} className="relative pt-3 border-t border-outline-variant/20">
              <h3 className="font-bold text-xs mb-3 uppercase tracking-wider text-on-surface-variant">현재 색상</h3>
              <button onClick={() => setShowColorPicker(v => !v)}
                className="flex items-center gap-3 w-full p-2 rounded-xl bg-surface-container-highest hover:bg-surface-dim transition-colors min-h-[48px]">
                <span className="w-8 h-8 rounded-full sticker-shadow shrink-0" style={{ backgroundColor: activeColor }} />
                <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase">{activeColor}</span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant ml-auto">
                  {showColorPicker ? 'expand_less' : 'chevron_right'}
                </span>
              </button>
              {showColorPicker && (
                <div className="absolute left-full top-0 ml-3 z-50 w-60 bg-surface-container-high rounded-xl sticker-shadow p-5 flex flex-col gap-4">
                  {colorPickerContent}
                </div>
              )}
            </div>
          </div>

          {/* 캔버스 영역 */}
          <div className="flex flex-col gap-3 w-full">
            {/* 정사각형 캔버스 */}
            <div className="w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden border-4 lg:border-8 border-surface-container-high sticker-shadow">
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="w-full h-full block"
                style={{
                  cursor: activeTool === 'eraser' ? 'cell' : activeTool === 'finetip' ? 'copy' : 'crosshair',
                  touchAction: 'none',
                  background: '#FFF9F0',
                }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
            </div>

            {/* 데스크탑 전용 캔버스 컨트롤 */}
            <div className="hidden lg:flex justify-center">
              <div className="flex items-center gap-1 px-4 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)]"
                style={{ backgroundColor: 'rgba(255,249,240,0.90)', backdropFilter: 'blur(20px)', border: '1px solid rgba(221,193,179,0.20)' }}>
                <button onClick={undo} title="실행 취소"
                  className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors">undo</button>
                <button onClick={redo} title="다시 실행"
                  className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors">redo</button>
                <div className="w-px h-6 bg-outline-variant/50 mx-1" />
                <button onClick={clearCanvas} title="전체 지우기"
                  className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-error/10 text-error rounded-full transition-colors">delete</button>
              </div>
            </div>
          </div>
        </div>

        {/* 데스크탑 전용 벤토 섹션 */}
        <section className="hidden lg:grid mt-16 grid-cols-3 gap-6">
          <div className="col-span-2 bg-secondary-container rounded-xl p-8 sticker-shadow flex flex-col justify-between min-h-[200px] group overflow-hidden relative">
            <div className="relative z-10">
              <span className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase mb-3 inline-block">오늘의 챌린지</span>
              <h3 className="font-headline text-4xl font-black text-on-secondary-container leading-tight keep-all">비 오는 날의 창밖 풍경</h3>
              <p className="text-on-secondary-container/80 mt-2 text-base font-medium keep-all">완성 후 제출하고 50 바이브포인트를 받아가세요!</p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <button onClick={finishAndAnalyze}
              className="mt-6 w-fit bg-on-secondary-container text-secondary-container px-8 py-3 rounded-full font-bold text-base active:scale-95 z-10">
              챌린지 참여하기
            </button>
          </div>
          <div className="bg-surface-container-highest rounded-xl p-8 sticker-shadow flex flex-col items-center text-center justify-center border-dashed border-2 border-outline">
            <span className="material-symbols-outlined text-5xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h4 className="text-xl font-bold text-on-surface">바이브 체크 AI</h4>
            <p className="text-sm text-on-surface-variant mt-2 keep-all font-medium leading-relaxed">AI가 당신의 선이 담고 있는 리듬을 읽을 준비를 마쳤어요!</p>
            <button onClick={finishAndAnalyze}
              className="mt-5 bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-bold sticker-shadow hover:scale-105 transition-transform">
              지금 분석하기
            </button>
          </div>
        </section>
      </div>

      {/* ── 모바일 고정 하단 툴바 (lg 미만에서만 표시) ── */}
      <div className="lg:hidden fixed bottom-[60px] md:bottom-0 left-0 right-0 z-40 px-3 pb-2">
        <div className="max-w-[414px] mx-auto bg-surface-container-high rounded-2xl sticker-shadow overflow-x-auto"
          style={{ backgroundColor: 'rgba(237,231,223,0.95)', backdropFilter: 'blur(16px)' }}>
          <div className="flex items-center gap-2.5 px-3 py-2 min-w-max">

            {/* 실행 취소 / 다시 실행 / 지우기 */}
            <div className="flex gap-1">
              <button onClick={undo} title="실행 취소"
                className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors text-xl">undo</button>
              <button onClick={redo} title="다시 실행"
                className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors text-xl">redo</button>
              <button onClick={clearCanvas} title="전체 지우기"
                className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-error/10 text-error rounded-full transition-colors text-xl">delete</button>
            </div>

            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />

            {/* 도구 선택 */}
            <div className="flex gap-1.5">
              {tools.map((tool) => (
                <button key={tool.key} onClick={() => setActiveTool(tool.key)}
                  className={`${toolBtnBase} ${activeTool === tool.key ? toolBtnActive : toolBtnInactive}`}>
                  <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />

            {/* 굵기 */}
            <div className="flex items-center gap-3 px-1">
              {brushSizes.map((sz, i) => (
                <button key={i} onClick={() => setActiveSize(i)}
                  className={`min-w-[32px] min-h-[32px] flex items-center justify-center transition-all ${activeSize === i ? 'outline outline-2 outline-offset-2 outline-primary' : 'opacity-40'}`}>
                  <span className="rounded-full bg-on-surface block shrink-0"
                    style={{ width: sz * 2.5 + 4, height: sz * 2.5 + 4 }} />
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />

            {/* 팔레트 */}
            <div className="flex gap-1.5">
              {palette.map((color) => (
                <button key={color} onClick={() => setActiveColor(color)}
                  className={`w-9 h-9 rounded-full transition-transform active:scale-90 shrink-0 ${activeColor === color ? 'ring-2 ring-offset-1 ring-primary' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />

            {/* 커스텀 컬러 */}
            <div ref={mobilePickerRef} className="relative shrink-0">
              <button onClick={() => setShowColorPicker(v => !v)}
                className="w-9 h-9 rounded-full sticker-shadow"
                style={{ backgroundColor: activeColor, border: '2.5px solid rgba(255,255,255,0.6)' }}
              />
              {showColorPicker && (
                <div className="absolute bottom-full right-0 mb-3 z-50 w-64 bg-surface-container-high rounded-xl sticker-shadow p-5 flex flex-col gap-4">
                  {colorPickerContent}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}
