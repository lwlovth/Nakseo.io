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

const CANVAS_W = 800
const CANVAS_H = 600

export default function Canvas() {
  const [activeTool, setActiveTool] = useState('pencil')
  const [activeColor, setActiveColor] = useState('#9B4500')
  const [activeSize, setActiveSize] = useState(1)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [hexInput, setHexInput] = useState('#9B4500')
  const canvasRef = useRef(null)
const pickerRef = useRef(null)
  const isDrawing = useRef(false)
  const lastPoint = useRef(null)
  const history = useRef([])
  const historyStep = useRef(-1)
  const navigate = useNavigate()

  // 캔버스 초기화 (크림색 배경)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FFF9F0'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
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
    const scaleX = CANVAS_W / rect.width
    const scaleY = CANVAS_H / rect.height
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
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
      // pencil (default)
      ctx.strokeStyle = activeColor
      ctx.fillStyle = activeColor
      ctx.lineWidth = size
      ctx.globalAlpha = 0.9
    }
  }

  // 목탄: 거친 파티클 스프레이 텍스처
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
          Math.random() * 1.5 + 0.3,
          0, Math.PI * 2
        )
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }

  const startDraw = (e) => {
    e.preventDefault()
    const pos = getPos(e)

    // 채우기: 클릭 즉시 플러드 필 실행 후 종료
    if (activeTool === 'finetip') {
      floodFill(pos.x, pos.y)
      return
    }

    isDrawing.current = true
    lastPoint.current = pos

    // 점 찍기 (클릭만 해도 점이 찍힘)
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

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
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
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#FFF9F0'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
    saveHistory()
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

  // 채우기: 스택 기반 플러드 필 알고리즘
  const floodFill = useCallback((startX, startY) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H)
    const data = imageData.data
    const sx = Math.floor(Math.max(0, Math.min(CANVAS_W - 1, startX)))
    const sy = Math.floor(Math.max(0, Math.min(CANVAS_H - 1, startY)))
    const startPos = sy * CANVAS_W + sx
    const tR = data[startPos * 4], tG = data[startPos * 4 + 1], tB = data[startPos * 4 + 2]
    const fill = hexToRgb(activeColor)
    if (tR === fill.r && tG === fill.g && tB === fill.b) return
    const tol = 30
    const matches = (p) =>
      Math.abs(data[p * 4] - tR) <= tol &&
      Math.abs(data[p * 4 + 1] - tG) <= tol &&
      Math.abs(data[p * 4 + 2] - tB) <= tol
    const visited = new Uint8Array(CANVAS_W * CANVAS_H)
    const stack = [startPos]
    while (stack.length) {
      const pos = stack.pop()
      if (visited[pos] || !matches(pos)) continue
      visited[pos] = 1
      data[pos * 4] = fill.r
      data[pos * 4 + 1] = fill.g
      data[pos * 4 + 2] = fill.b
      data[pos * 4 + 3] = 255
      const x = pos % CANVAS_W, y = Math.floor(pos / CANVAS_W)
      if (x > 0) stack.push(pos - 1)
      if (x < CANVAS_W - 1) stack.push(pos + 1)
      if (y > 0) stack.push(pos - CANVAS_W)
      if (y < CANVAS_H - 1) stack.push(pos + CANVAS_W)
    }
    ctx.putImageData(imageData, 0, 0)
    saveHistory()
  }, [activeColor, saveHistory])

  const handleHexInput = (val) => {
    setHexInput(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setActiveColor(val)
  }

  useEffect(() => { setHexInput(activeColor) }, [activeColor])

  useEffect(() => {
    if (!showColorPicker) return
    const handleOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setShowColorPicker(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [showColorPicker])

  const rgb = hexToRgb(activeColor)

  const saveToJournal = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `doodle-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const finishAndAnalyze = () => {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL('image/png')
    localStorage.setItem('canvas_doodle', dataUrl)
    navigate('/studio')
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="font-headline text-5xl font-black text-on-background tracking-tighter mb-4">내 캔버스</h1>
            <div className="flex items-center gap-3 bg-tertiary-container/20 text-on-tertiary-container px-5 py-2.5 rounded-full border border-tertiary-container/30 text-base keep-all">
              <span className="material-symbols-outlined text-xl">lightbulb</span>
              <span>오늘의 영감: <span className="font-bold">비 온 뒤 오후의 기분</span>을 그려보세요.</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={saveToJournal}
              className="bg-surface-container-highest text-on-surface px-6 py-3 rounded-full font-bold sticker-shadow-hover transition-all flex items-center gap-2 text-base"
            >
              <span className="material-symbols-outlined">save</span>
              일기에 저장
            </button>
            <button
              onClick={finishAndAnalyze}
              className="bg-primary-container text-on-primary-container px-8 py-3 rounded-full font-bold sticker-shadow sticker-shadow-hover transition-all flex items-center gap-2 text-base"
            >
              <span className="material-symbols-outlined">temp_preferences_custom</span>
              완성 &amp; 분석하기
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Canvas */}
          <div className="flex flex-col gap-4">
            <div className="w-full bg-surface-container-low rounded-lg p-1 sticker-shadow overflow-hidden border-8 border-surface-container-high">
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="w-full block"
                style={{ cursor: activeTool === 'eraser' ? 'cell' : activeTool === 'finetip' ? 'copy' : 'crosshair', touchAction: 'none', background: '#FFF9F0' }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={stopDraw}
              />
            </div>
            {/* Canvas Controls */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(29,27,22,0.15)] hover:-translate-y-0.5 transition-all" style={{ backgroundColor: 'rgba(255,249,240,0.80)', backdropFilter: 'blur(20px)', border: '1px solid rgba(221,193,179,0.20)' }}>
                <button
                  onClick={undo}
                  className="material-symbols-outlined p-2 hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors"
                  title="실행 취소"
                >undo</button>
                <button
                  onClick={redo}
                  className="material-symbols-outlined p-2 hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors"
                  title="다시 실행"
                >redo</button>
                <div className="w-px h-6 bg-outline-variant/50 mx-1" />
                <button
                  onClick={clearCanvas}
                  className="material-symbols-outlined p-2 hover:bg-error/10 text-error rounded-full transition-colors"
                  title="전체 지우기"
                >delete</button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-6 bg-surface-container-high p-6 rounded-lg sticker-shadow w-full md:w-48 sticky top-28">
            {/* Tools */}
            <div>
              <h3 className="font-bold text-xs mb-4 uppercase tracking-wider text-on-surface-variant">그리기 도구</h3>
              <div className="flex flex-col gap-3">
                {tools.map((tool) => (
                  <button
                    key={tool.key}
                    onClick={() => setActiveTool(tool.key)}
                    className={`flex items-center gap-3 p-3 rounded-full transition-all active:scale-95 ${
                      activeTool === tool.key
                        ? 'bg-[#FF8C42] text-[#6A2D00] shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)]'
                        : 'bg-[#F9F3EA] text-on-surface hover:shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="material-symbols-outlined">{tool.icon}</span>
                    <span className="text-sm font-bold">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="font-bold text-xs mb-4 uppercase tracking-wider text-on-surface-variant">굵기 조절</h3>
              <div className="flex justify-between items-center px-2">
                {brushSizes.map((sz, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSize(i)}
                    className={`rounded-full bg-on-surface transition-all cursor-pointer ${activeSize === i ? 'outline outline-2 outline-offset-4 outline-primary' : 'opacity-40'}`}
                    style={{ width: sz * 2.5 + 4, height: sz * 2.5 + 4 }}
                  />
                ))}
              </div>
            </div>

            {/* Palette */}
            <div>
              <h3 className="font-bold text-xs mb-4 uppercase tracking-wider text-on-surface-variant">색상 선택</h3>
              <div className="grid grid-cols-2 gap-3">
                {palette.map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveColor(color)}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 sticker-shadow ${activeColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Current Color Preview + Custom Picker */}
            <div ref={pickerRef} className="flex flex-col gap-3 pt-3 border-t border-outline-variant/20 relative">
              <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface-variant">현재 색상</h3>
              <button
                onClick={() => setShowColorPicker(v => !v)}
                className="flex items-center gap-3 w-full p-2 rounded-[1rem] bg-surface-container-highest hover:bg-surface-dim transition-colors"
              >
                <span
                  className="w-8 h-8 rounded-full sticker-shadow shrink-0"
                  style={{ backgroundColor: activeColor }}
                />
                <span className="text-xs font-bold text-on-surface-variant tracking-wider uppercase font-korean">{activeColor}</span>
                <span className="material-symbols-outlined text-base text-on-surface-variant ml-auto">
                  {showColorPicker ? 'expand_more' : 'chevron_right'}
                </span>
              </button>

              {/* Picker Popover */}
              {showColorPicker && (
                <div className="absolute right-full bottom-0 mr-3 z-50 w-60 bg-surface-container-high rounded-lg sticker-shadow p-5 flex flex-col gap-4">
                  {/* Color Preview Bar */}
                  <div
                    className="w-full h-14 rounded-[1rem] sticker-shadow"
                    style={{ backgroundColor: activeColor }}
                  />

                  {/* RGB Sliders */}
                  {[
                    { ch: 'r', label: 'R', from: `rgb(0,${rgb.g},${rgb.b})`, to: `rgb(255,${rgb.g},${rgb.b})`, val: rgb.r },
                    { ch: 'g', label: 'G', from: `rgb(${rgb.r},0,${rgb.b})`, to: `rgb(${rgb.r},255,${rgb.b})`, val: rgb.g },
                    { ch: 'b', label: 'B', from: `rgb(${rgb.r},${rgb.g},0)`, to: `rgb(${rgb.r},${rgb.g},255)`, val: rgb.b },
                  ].map(({ ch, label, from, to, val }) => (
                    <div key={ch}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{label}</span>
                        <span className="text-xs font-bold text-on-surface-variant font-korean">{val}</span>
                      </div>
                      <div className="relative h-3 rounded-full" style={{ background: `linear-gradient(to right, ${from}, ${to})` }}>
                        <input
                          type="range" min="0" max="255" value={val}
                          onChange={(e) => handleRgb(ch, e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-surface-container-lowest sticker-shadow pointer-events-none"
                          style={{ left: `calc(${(val / 255) * 100}% - 8px)`, border: '2px solid rgba(221,193,179,0.4)' }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Hex Input */}
                  <div>
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 block">HEX</span>
                    <input
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexInput(e.target.value)}
                      maxLength={7}
                      className="w-full bg-surface-container-highest focus:bg-surface-container-lowest text-on-surface text-sm font-bold tracking-wider uppercase px-3 py-2 rounded-[0.5rem] outline-none border-b-2 border-primary transition-colors font-korean"
                      spellCheck={false}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bento Inspiration */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-secondary-container rounded-lg p-8 sticker-shadow flex flex-col justify-between min-h-[220px] group overflow-hidden relative">
            <div className="relative z-10">
              <span className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase mb-4 inline-block">오늘의 챌린지</span>
              <h3 className="font-headline text-4xl font-black text-on-secondary-container leading-tight max-w-md keep-all">비 오는 날의
창밖 풍경</h3>
              <p className="text-on-secondary-container/80 mt-3 text-lg font-medium keep-all">이 낙서를 제출하고 50 바이브포인트를 받아가세요!</p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <button
              onClick={finishAndAnalyze}
              className="mt-8 w-fit bg-on-secondary-container text-secondary-container px-8 py-3 rounded-full font-bold text-base transition-transform active:scale-95 z-10"
            >챌린지 참여하기</button>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-8 sticker-shadow flex flex-col items-center text-center justify-center border-dashed border-2 border-outline">
            <span className="material-symbols-outlined text-5xl text-primary mb-5" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h4 className="text-xl font-bold text-on-surface">바이브 체크 AI</h4>
            <p className="text-base text-on-surface-variant mt-3 keep-all font-medium leading-relaxed">
              AI가<br />당신의 선이 담고 있는<br />리듬을 읽을 준비를 마쳤어요!
            </p>
            <button
              onClick={finishAndAnalyze}
              className="mt-6 bg-primary text-on-primary px-6 py-2.5 rounded-full text-sm font-bold sticker-shadow hover:scale-105 transition-transform"
            >지금 분석하기</button>
          </div>
        </section>
      </div>
    </Layout>
  )
}
