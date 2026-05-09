import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function RadarCanvas() {
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const frameRef = useRef(null)
  const blipsRef = useRef([
    { angle: 0.8, dist: 0.45, life: 1 },
    { angle: 2.1, dist: 0.62, life: 0.7 },
    { angle: 4.5, dist: 0.3, life: 0.4 },
    { angle: 5.2, dist: 0.7, life: 0.9 },
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = Math.min(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight) * 0.55

    canvas.width = size
    canvas.height = size

    const cx = size / 2
    const cy = size / 2
    const r = size / 2 - 4

    const draw = () => {
      ctx.clearRect(0, 0, size, size)

      // Background circle
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(59,83,47,0.04)'
      ctx.fill()

      // Rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (r * i) / 4, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(59,83,47,0.25)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Cross lines
      ctx.strokeStyle = 'rgba(59,83,47,0.2)'
      ctx.lineWidth = 0.5
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx - r * 0.707, cy - r * 0.707); ctx.lineTo(cx + r * 0.707, cy + r * 0.707); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx + r * 0.707, cy - r * 0.707); ctx.lineTo(cx - r * 0.707, cy + r * 0.707); ctx.stroke()

      // Sweep gradient (trail)
      const angle = angleRef.current
      const gradient = ctx.createConicalGradient
        ? ctx.createConicalGradient(cx, cy, angle - 1.2, angle)
        : null

      if (!gradient) {
        // Fallback: draw a simple sweep line
        const trailLen = 1.5
        for (let t = 0; t < 60; t++) {
          const a = angle - (t / 60) * trailLen
          ctx.beginPath()
          ctx.moveTo(cx, cy)
          ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
          ctx.strokeStyle = `rgba(59,83,47,${0.18 * (1 - t / 60)})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      // Sweep line
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
      ctx.strokeStyle = 'rgba(59,83,47,0.9)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Tip glow
      ctx.beginPath()
      ctx.arc(cx + Math.cos(angle) * r * 0.98, cy + Math.sin(angle) * r * 0.98, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#3B532F'
      ctx.fill()

      // Blips
      blipsRef.current.forEach((blip) => {
        const diff = angle - blip.angle
        const wrap = ((diff % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const fade = Math.max(0, 1 - wrap / (Math.PI * 2 / 1.5))
        if (fade > 0) {
          const bx = cx + Math.cos(blip.angle) * r * blip.dist
          const by = cy + Math.sin(blip.angle) * r * blip.dist
          ctx.beginPath()
          ctx.arc(bx, by, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,192,0,${fade * 0.9})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(bx, by, 6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,192,0,${fade * 0.2})`
          ctx.fill()
        }
      })

      // Center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#FFC000'
      ctx.fill()

      // Outer circle
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(59,83,47,0.5)'
      ctx.lineWidth = 1
      ctx.stroke()

      angleRef.current = (angleRef.current + 0.012) % (Math.PI * 2)
      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="opacity-80"
    />
  )
}

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.12 } } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
}

export default function HeroSlide() {
  const [tick, setTick] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setTick(v => !v), 800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col">
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Left: text content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-12 md:px-20 max-w-[55%]">
        {/* System tag */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-10 h-px bg-mil-yellow" />
          <span className="font-headline text-mil-yellow text-sm tracking-[0.4em]">
            BATTERY LEVEL SYSTEM
          </span>
          <span className="font-headline text-xs tracking-widest text-mil-green/60 ml-2">
            AFCS REV. 2025
          </span>
        </motion.div>

        <motion.div variants={stagger.container} initial="initial" animate="animate">
          <motion.h1
            variants={stagger.item}
            className="font-headline text-white leading-none mb-1"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            ARTILLERY
          </motion.h1>
          <motion.h1
            variants={stagger.item}
            className="font-headline text-mil-yellow leading-none mb-1"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            FIRE CONTROL
          </motion.h1>
          <motion.h1
            variants={stagger.item}
            className="font-headline text-white leading-none"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            SYSTEM
          </motion.h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="origin-left h-0.5 bg-gradient-to-r from-mil-green via-mil-yellow to-transparent my-8 w-80"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-body text-gray-300 text-lg leading-relaxed max-w-lg mb-12"
        >
          Fully automated, modular fire control solution for artillery batteries.
          From battlefield observation to firing element transmission â€” in seconds.
        </motion.p>

        {/* Key stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-5"
        >
          {[
            { val: '35 km', label: 'Network Range' },
            { val: '< 30s', label: 'Target-to-Fire' },
            { val: '8', label: 'Weapons / Battery' },
            { val: 'NATO', label: 'Standard' },
          ].map((stat) => (
            <div
              key={stat.val}
              className="border border-mil-green/40 px-6 py-3 hover:border-mil-yellow/60 transition-colors duration-300"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              <div className="font-headline text-mil-yellow text-3xl leading-tight">{stat.val}</div>
              <div className="font-body text-gray-500 text-sm tracking-wide mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right: radar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
        style={{ right: 'clamp(2rem, 5vw, 6rem)' }}
      >
        <RadarCanvas />
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full bg-mil-green"
            style={{ opacity: tick ? 1 : 0.2, transition: 'opacity 0.1s' }}
          />
          <span className="font-headline text-[10px] tracking-[0.3em] text-mil-green/70">
            SYSTEM ACTIVE
          </span>
        </div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-mil-green/20" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-mil-green/20" />
    </div>
  )
}

