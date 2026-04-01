import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useUI } from '../contexts/UIContext'

const tools = [
  { key: 'pencil',   icon: 'edit',              label: '연필'  },
  { key: 'charcoal', icon: 'brush',             label: '목탄'  },
  { key: 'finetip',  icon: 'format_color_fill', label: '채우기' },
  { key: 'eraser',   icon: 'ink_eraser',        label: '지우개' },
]

const palette = ['#9B4500','#D4A407','#006875','#1D1B16','#FFB68D','#849679','#8FB08F','#897266']
const brushSizes = [2, 6, 14]
const CANVAS_SIZE = 600

export default function Canvas() {
  const [activeTool,      setActiveTool]      = useState('pencil')
  const [activeColor,     setActiveColor]     = useState('#9B4500')
  const [activeSize,      setActiveSize]      = useState(1)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [hexInput,        setHexInput]        = useState('#9B4500')
  const [isUIVisible,     setIsUIVisible]     = useState(true)

  const { setIsDrawing: setGlobalDrawing } = useUI()

  // 드로잉 함수에서 읽는 값은 전부 ref로 미러링 (stale closure 방지)
  const toolRef      = useRef('pencil')
  const colorRef     = useRef('#9B4500')
  const sizeRef      = useRef(1)
  // 캔버스는 단 하나
  const canvasRef    = useRef(null)
  const pickerRef    = useRef(null)
  const mobilePickerRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPoint    = useRef(null)
  const history      = useRef([])
  const historyStep  = useRef(-1)
  const navigate     = useNavigate()

  useEffect(() => { toolRef.current  = activeTool  }, [activeTool])
  useEffect(() => { colorRef.current = activeColor }, [activeColor])
  useEffect(() => { sizeRef.current  = activeSize  }, [activeSize])

  // 캔버스 초기화
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

  const restoreStep = useCallback((step) => {
    const img = new Image()
    img.src = history.current[step]
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d')
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(img, 0, 0)
    }
  }, [])

  const undo = useCallback(() => {
    if (historyStep.current > 0) restoreStep(--historyStep.current)
  }, [restoreStep])

  const redo = useCallback(() => {
    if (historyStep.current < history.current.length - 1) restoreStep(++historyStep.current)
  }, [restoreStep])

  const clearCanvas = useCallback(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#FFF9F0'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    saveHistory()
  }, [saveHistory])

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current
    const rect   = canvas.getBoundingClientRect()
    const scale  = CANVAS_SIZE / rect.width
    if (e.touches) return {
      x: (e.touches[0].clientX - rect.left) * scale,
      y: (e.touches[0].clientY - rect.top)  * scale,
    }
    return {
      x: (e.clientX - rect.left) * scale,
      y: (e.clientY - rect.top)  * scale,
    }
  }, [])

  const applyToolStyle = useCallback((ctx) => {
    const size = brushSizes[sizeRef.current]
    ctx.lineCap  = 'round'
    ctx.lineJoin = 'round'
    ctx.setLineDash([])
    ctx.globalCompositeOperation = 'source-over'
    if (toolRef.current === 'eraser') {
      ctx.strokeStyle = '#FFF9F0'
      ctx.fillStyle   = '#FFF9F0'
      ctx.lineWidth   = size * 4
      ctx.globalAlpha = 1
    } else {
      ctx.strokeStyle = colorRef.current
      ctx.fillStyle   = colorRef.current
      ctx.lineWidth   = size
      ctx.globalAlpha = 0.9
    }
  }, [])

  const drawCharcoal = useCallback((ctx, from, to) => {
    const size  = brushSizes[sizeRef.current]
    const dx    = to.x - from.x
    const dy    = to.y - from.y
    const dist  = Math.max(1, Math.sqrt(dx*dx + dy*dy))
    const steps = Math.ceil(dist / 3)
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = colorRef.current
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const cx = from.x + dx * t
      const cy = from.y + dy * t
      for (let p = 0; p < 14; p++) {
        ctx.globalAlpha = Math.random() * 0.12 + 0.03
        const angle  = Math.random() * Math.PI * 2
        const radius = Math.random() * size * 1.8
        ctx.beginPath()
        ctx.arc(cx + Math.cos(angle)*radius, cy + Math.sin(angle)*radius, Math.random()*1.5+0.3, 0, Math.PI*2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  }, [])

  const floodFill = useCallback((startX, startY) => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    const data   = imageData.data
    const sx = Math.floor(Math.max(0, Math.min(CANVAS_SIZE-1, startX)))
    const sy = Math.floor(Math.max(0, Math.min(CANVAS_SIZE-1, startY)))
    const sp = sy * CANVAS_SIZE + sx
    const tR = data[sp*4], tG = data[sp*4+1], tB = data[sp*4+2]
    const fill = {
      r: parseInt(colorRef.current.slice(1,3), 16),
      g: parseInt(colorRef.current.slice(3,5), 16),
      b: parseInt(colorRef.current.slice(5,7), 16),
    }
    if (tR===fill.r && tG===fill.g && tB===fill.b) return
    const tol = 30
    const matches = (p) =>
      Math.abs(data[p*4]-tR)<=tol && Math.abs(data[p*4+1]-tG)<=tol && Math.abs(data[p*4+2]-tB)<=tol
    const visited = new Uint8Array(CANVAS_SIZE * CANVAS_SIZE)
    const stack = [sp]
    while (stack.length) {
      const pos = stack.pop()
      if (visited[pos] || !matches(pos)) continue
      visited[pos] = 1
      data[pos*4]=fill.r; data[pos*4+1]=fill.g; data[pos*4+2]=fill.b; data[pos*4+3]=255
      const x = pos%CANVAS_SIZE, y = Math.floor(pos/CANVAS_SIZE)
      if (x>0) stack.push(pos-1)
      if (x<CANVAS_SIZE-1) stack.push(pos+1)
      if (y>0) stack.push(pos-CANVAS_SIZE)
      if (y<CANVAS_SIZE-1) stack.push(pos+CANVAS_SIZE)
    }
    ctx.putImageData(imageData, 0, 0)
    saveHistory()
  }, [saveHistory])

  // 드로잉 핸들러 — deps []로 한 번만 생성, ref로 최신값 읽음
  const startDraw = useCallback((e) => {
    if (e.cancelable) e.preventDefault()
    setIsUIVisible(false)
    setGlobalDrawing(true)
    const pos = getPos(e)
    if (toolRef.current === 'finetip') { floodFill(pos.x, pos.y); return }
    isDrawingRef.current = true
    lastPoint.current    = pos
    const ctx = canvasRef.current.getContext('2d')
    if (toolRef.current === 'charcoal') {
      drawCharcoal(ctx, pos, pos)
    } else {
      applyToolStyle(ctx)
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, ctx.lineWidth/2, 0, Math.PI*2)
      ctx.fill()
    }
  }, [getPos, floodFill, drawCharcoal, applyToolStyle, setGlobalDrawing])

  const draw = useCallback((e) => {
    if (e.cancelable) e.preventDefault()
    if (!isDrawingRef.current || !lastPoint.current) return
    if (toolRef.current === 'finetip') return
    const ctx = canvasRef.current.getContext('2d')
    const pos = getPos(e)
    if (toolRef.current === 'charcoal') {
      drawCharcoal(ctx, lastPoint.current, pos)
    } else {
      applyToolStyle(ctx)
      ctx.beginPath()
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
    }
    lastPoint.current = pos
  }, [getPos, drawCharcoal, applyToolStyle])

  const stopDraw = useCallback(() => {
    if (!isDrawingRef.current) return
    isDrawingRef.current = false
    lastPoint.current    = null
    saveHistory()
    setIsUIVisible(true)
    setGlobalDrawing(false)
  }, [saveHistory, setGlobalDrawing])

  // passive:false 터치 이벤트 — 캔버스가 하나이므로 정확히 해당 요소에 등록됨
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.addEventListener('touchstart', startDraw, { passive: false })
    canvas.addEventListener('touchmove',  draw,      { passive: false })
    canvas.addEventListener('touchend',   stopDraw)
    return () => {
      canvas.removeEventListener('touchstart', startDraw)
      canvas.removeEventListener('touchmove',  draw)
      canvas.removeEventListener('touchend',   stopDraw)
    }
  }, [startDraw, draw, stopDraw])

  const handleHexInput = useCallback((val) => {
    setHexInput(val)
    if (/^#[0-9a-fA-F]{6}$/.test(val)) setActiveColor(val)
  }, [])

  const handleRgb = useCallback((ch, val) => {
    setActiveColor(prev => {
      const c = { r: parseInt(prev.slice(1,3),16), g: parseInt(prev.slice(3,5),16), b: parseInt(prev.slice(5,7),16) }
      c[ch] = parseInt(val)
      return '#' + [c.r,c.g,c.b].map(v => Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('')
    })
  }, [])

  useEffect(() => { setHexInput(activeColor) }, [activeColor])

  useEffect(() => {
    if (!showColorPicker) return
    const close = (e) => {
      if (!pickerRef.current?.contains(e.target) && !mobilePickerRef.current?.contains(e.target))
        setShowColorPicker(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('touchstart', close) }
  }, [showColorPicker])

  const hexToRgb = (hex) => ({
    r: parseInt(hex.slice(1,3), 16),
    g: parseInt(hex.slice(3,5), 16),
    b: parseInt(hex.slice(5,7), 16),
  })
  const rgb = hexToRgb(activeColor)

  const saveToJournal = useCallback(() => {
    const link = document.createElement('a')
    link.download = `doodle-${Date.now()}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }, [])

  const finishAndAnalyze = useCallback(() => {
    localStorage.setItem('canvas_doodle', canvasRef.current.toDataURL('image/png'))
    navigate('/studio')
  }, [navigate])

  const ColorPickerContent = () => (
    <>
      <div className="w-full h-12 rounded-xl sticker-shadow" style={{ backgroundColor: activeColor }} />
      {[
        { ch:'r', label:'R', from:`rgb(0,${rgb.g},${rgb.b})`,     to:`rgb(255,${rgb.g},${rgb.b})`,     val:rgb.r },
        { ch:'g', label:'G', from:`rgb(${rgb.r},0,${rgb.b})`,     to:`rgb(${rgb.r},255,${rgb.b})`,     val:rgb.g },
        { ch:'b', label:'B', from:`rgb(${rgb.r},${rgb.g},0)`,     to:`rgb(${rgb.r},${rgb.g},255)`,     val:rgb.b },
      ].map(({ ch, label, from, to, val }) => (
        <div key={ch}>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{label}</span>
            <span className="text-xs font-bold text-on-surface-variant">{val}</span>
          </div>
          <div className="relative h-3 rounded-full" style={{ background:`linear-gradient(to right, ${from}, ${to})` }}>
            <input type="range" min="0" max="255" value={val}
              onChange={(e) => handleRgb(ch, e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white sticker-shadow pointer-events-none"
              style={{ left:`calc(${(val/255)*100}% - 8px)`, border:'2px solid rgba(221,193,179,0.4)' }}
            />
          </div>
        </div>
      ))}
      <div>
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1 block">HEX</span>
        <input type="text" value={hexInput} onChange={(e) => handleHexInput(e.target.value)} maxLength={7}
          className="w-full bg-surface-container-highest text-on-surface text-sm font-bold tracking-wider uppercase px-3 py-2 rounded-lg outline-none border-b-2 border-primary transition-colors"
          spellCheck={false}
        />
      </div>
    </>
  )

  const toolBtnBase     = 'flex items-center justify-center min-h-[48px] min-w-[48px] rounded-full transition-all duration-150 active:scale-95'
  const toolBtnActive   = 'bg-[#FF8C42] text-[#6A2D00] shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)]'
  const toolBtnInactive = 'bg-[#F9F3EA] text-on-surface'

  const canvasStyle = {
    cursor: activeTool==='eraser' ? 'cell' : activeTool==='finetip' ? 'copy' : 'crosshair',
    touchAction: 'none',
    background: '#FFF9F0',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    display: 'block',
    width: '100%',
    height: '100%',
  }

  // ── 단일 캔버스 엘리먼트 ──
  const CanvasElement = (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onContextMenu={(e) => e.preventDefault()}
      style={canvasStyle}
      onMouseDown={startDraw}
      onMouseMove={draw}
      onMouseUp={stopDraw}
      onMouseLeave={stopDraw}
    />
  )

  return (
    <Layout>

      {/* ══════════ 모바일 (md 미만) ══════════ */}
      <div className="md:hidden flex flex-col max-w-[414px] mx-auto px-4 pt-3 pb-[140px]"
        onClick={() => setIsUIVisible(true)}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-3" onClick={(e) => e.stopPropagation()}>
          <h1 className="font-headline text-2xl font-black text-on-background tracking-tighter">내 캔버스</h1>
          <div className="flex gap-2">
            <button onClick={saveToJournal} className={`${toolBtnBase} px-3 bg-surface-container-highest text-on-surface sticker-shadow-hover`}>
              <span className="material-symbols-outlined text-xl">save</span>
            </button>
            <button onClick={finishAndAnalyze} className={`${toolBtnBase} px-3 bg-primary-container text-on-primary-container sticker-shadow sticker-shadow-hover`}>
              <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
            </button>
          </div>
        </div>

        {/* 캔버스 — 단일 ref 사용 */}
        <div className="w-full rounded-2xl overflow-hidden border-4 border-surface-container-high sticker-shadow select-none"
          style={{ height: '60svh' }}
          onClick={(e) => e.stopPropagation()}
        >
          {CanvasElement}
        </div>

        {!isUIVisible && (
          <div className="mt-3 flex justify-center pointer-events-none">
            <span className="text-xs text-on-surface-variant/60 font-medium">화면을 탭하면 도구가 나타나요</span>
          </div>
        )}
      </div>

      {/* 모바일 하단 툴바 */}
      <div className={`md:hidden fixed bottom-[60px] left-0 right-0 z-40 px-3 pb-2 transition-transform duration-300 ease-in-out ${isUIVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-[414px] mx-auto rounded-2xl sticker-shadow overflow-x-auto"
          style={{ backgroundColor: 'rgba(237,231,223,0.97)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-2 px-3 py-2 min-w-max">
            <button onClick={undo} className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors text-xl">undo</button>
            <button onClick={redo} className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant transition-colors text-xl">redo</button>
            <button onClick={clearCanvas} className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-error hover:bg-error/10 transition-colors text-xl">delete</button>
            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />
            {tools.map((tool) => (
              <button key={tool.key} onClick={() => setActiveTool(tool.key)}
                className={`${toolBtnBase} ${activeTool===tool.key ? toolBtnActive : toolBtnInactive}`}>
                <span className="material-symbols-outlined text-xl">{tool.icon}</span>
              </button>
            ))}
            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />
            {brushSizes.map((sz, i) => (
              <button key={i} onClick={() => setActiveSize(i)}
                className={`min-w-[40px] min-h-[48px] flex items-center justify-center transition-all ${activeSize===i ? 'outline outline-2 outline-offset-2 outline-primary rounded-full' : 'opacity-40'}`}>
                <span className="rounded-full bg-on-surface block shrink-0" style={{ width: sz*2.5+4, height: sz*2.5+4 }} />
              </button>
            ))}
            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />
            {palette.map((color) => (
              <button key={color} onClick={() => setActiveColor(color)}
                className={`w-9 h-9 rounded-full shrink-0 active:scale-90 transition-transform ${activeColor===color ? 'ring-2 ring-offset-1 ring-primary' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
            <div className="w-px h-8 bg-outline-variant/40 shrink-0" />
            <div ref={mobilePickerRef} className="relative shrink-0">
              <button onClick={() => setShowColorPicker(v => !v)}
                className="w-9 h-9 rounded-full sticker-shadow"
                style={{ backgroundColor: activeColor, border: '2.5px solid rgba(255,255,255,0.7)' }}
              />
              {showColorPicker && (
                <div className="absolute bottom-full right-0 mb-3 z-50 w-64 bg-surface-container-high rounded-xl sticker-shadow p-5 flex flex-col gap-4">
                  <ColorPickerContent />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ 데스크탑 (md 이상) ══════════ */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex justify-between items-end gap-6 mb-8">
            <div>
              <h1 className="font-headline text-5xl font-black text-on-background tracking-tighter mb-3">내 캔버스</h1>
              <div className="flex items-center gap-3 bg-tertiary-container/20 text-on-tertiary-container px-5 py-2.5 rounded-full border border-tertiary-container/30 text-base keep-all">
                <span className="material-symbols-outlined text-xl">lightbulb</span>
                <span>오늘의 영감: <span className="font-bold">비 온 뒤 오후의 기분</span>을 그려보세요.</span>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <button onClick={saveToJournal} className="flex items-center gap-2 bg-surface-container-highest text-on-surface min-h-[48px] px-6 rounded-full font-bold sticker-shadow-hover transition-all">
                <span className="material-symbols-outlined">save</span>
                <span className="text-base">일기에 저장</span>
              </button>
              <button onClick={finishAndAnalyze} className="flex items-center gap-2 bg-primary-container text-on-primary-container min-h-[48px] px-8 rounded-full font-bold sticker-shadow sticker-shadow-hover transition-all">
                <span className="material-symbols-outlined">temp_preferences_custom</span>
                <span className="text-base">완성 &amp; 분석하기</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-8 items-start">
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square bg-surface-container-low rounded-2xl overflow-hidden border-8 border-surface-container-high sticker-shadow max-w-[750px] select-none">
                {CanvasElement}
              </div>
              <div className="flex justify-center">
                <div className="flex items-center gap-1 px-4 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)]"
                  style={{ backgroundColor:'rgba(255,249,240,0.95)', backdropFilter:'blur(20px)', border:'1px solid rgba(221,193,179,0.2)' }}>
                  <button onClick={undo} title="실행 취소" className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors">undo</button>
                  <button onClick={redo} title="다시 실행" className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-surface-variant rounded-full text-on-surface-variant transition-colors">redo</button>
                  <div className="w-px h-6 bg-outline-variant/50 mx-1" />
                  <button onClick={clearCanvas} title="전체 지우기" className="material-symbols-outlined min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-error/10 text-error rounded-full transition-colors">delete</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-surface-container-high p-6 rounded-2xl sticker-shadow w-52 sticky top-28">
              <div>
                <h3 className="font-bold text-xs mb-4 uppercase tracking-wider text-on-surface-variant">그리기 도구</h3>
                <div className="flex flex-col gap-2">
                  {tools.map((tool) => (
                    <button key={tool.key} onClick={() => setActiveTool(tool.key)}
                      className={`${toolBtnBase} justify-start gap-3 px-4 w-full ${activeTool===tool.key ? toolBtnActive : toolBtnInactive+' hover:shadow-[4px_4px_0px_0px_rgba(29,27,22,0.15)] hover:-translate-y-0.5'}`}>
                      <span className="material-symbols-outlined">{tool.icon}</span>
                      <span className="text-sm font-bold">{tool.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs mb-4 uppercase tracking-wider text-on-surface-variant">굵기 조절</h3>
                <div className="flex justify-between items-center px-2">
                  {brushSizes.map((sz, i) => (
                    <button key={i} onClick={() => setActiveSize(i)}
                      className={`min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full transition-all ${activeSize===i ? 'outline outline-2 outline-offset-4 outline-primary' : 'opacity-40'}`}>
                      <span className="rounded-full bg-on-surface block" style={{ width:sz*2.5+4, height:sz*2.5+4 }} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs mb-4 uppercase tracking-wider text-on-surface-variant">색상 선택</h3>
                <div className="grid grid-cols-4 gap-2">
                  {palette.map((color) => (
                    <button key={color} onClick={() => setActiveColor(color)}
                      className={`w-10 h-10 rounded-full transition-transform hover:scale-110 sticker-shadow ${activeColor===color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
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
                    <ColorPickerContent />
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="mt-16 grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-secondary-container rounded-2xl p-8 sticker-shadow flex flex-col justify-between min-h-[200px] group overflow-hidden relative">
              <div className="relative z-10">
                <span className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-xs font-black uppercase mb-3 inline-block">오늘의 챌린지</span>
                <h3 className="font-headline text-4xl font-black text-on-secondary-container leading-tight keep-all">비 오는 날의 창밖 풍경</h3>
                <p className="text-on-secondary-container/80 mt-2 text-base font-medium keep-all">완성 후 제출하고 50 바이브포인트를 받아가세요!</p>
              </div>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <button onClick={finishAndAnalyze} className="mt-6 w-fit bg-on-secondary-container text-secondary-container px-8 py-3 rounded-full font-bold text-base active:scale-95 z-10">
                챌린지 참여하기
              </button>
            </div>
            <div className="bg-surface-container-highest rounded-2xl p-8 sticker-shadow flex flex-col items-center text-center justify-center border-dashed border-2 border-outline">
              <span className="material-symbols-outlined text-5xl text-primary mb-4" style={{ fontVariationSettings:"'FILL' 1" }}>auto_awesome</span>
              <h4 className="text-xl font-bold text-on-surface">바이브 체크 AI</h4>
              <p className="text-sm text-on-surface-variant mt-2 keep-all font-medium leading-relaxed">AI가 당신의 선이 담고 있는 리듬을 읽을 준비를 마쳤어요!</p>
              <button onClick={finishAndAnalyze} className="mt-5 bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-bold sticker-shadow hover:scale-105 transition-transform">
                지금 분석하기
              </button>
            </div>
          </section>
        </div>
      </div>

    </Layout>
  )
}
