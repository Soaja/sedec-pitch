import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SedecLogo } from '../App'

function TargetReticle() {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)
  const progress = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = 280
    canvas.width = size
    canvas.height = size
    const cx = size / 2, cy = size / 2
    const R = size / 2 - 10

    const draw = () => {
      ctx.clearRect(0, 0, size, size)
      progress.current = (progress.current + 0.004) % 1

      const t = progress.current

      // Outer ring
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(59,83,47,0.3)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Inner rings
      [R * 0.7, R * 0.45, R * 0.2].forEach((r, i) => {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59,83,47,${0.15 + i * 0.05})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      // Rotating arc
      const arcStart = t * Math.PI * 2
      ctx.beginPath()
      ctx.arc(cx, cy, R, arcStart, arcStart + Math.PI * 0.4)
      ctx.strokeStyle = 'rgba(255,192,0,0.6)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.7, arcStart + Math.PI, arcStart + Math.PI + Math.PI * 0.3)
      ctx.strokeStyle = 'rgba(59,83,47,0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Cross ticks
      const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
      angles.forEach((a) => {
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * (R - 12), cy + Math.sin(a) * (R - 12))
        ctx.lineTo(cx + Math.cos(a) * (R + 0), cy + Math.sin(a) * (R + 0))
        ctx.strokeStyle = 'rgba(59,83,47,0.5)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Center crosshair
      ctx.strokeStyle = 'rgba(255,192,0,0.4)'
      ctx.lineWidth = 0.8
      ctx.beginPath(); ctx.moveTo(cx - R * 0.15, cy); ctx.lineTo(cx + R * 0.15, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - R * 0.15); ctx.lineTo(cx, cy + R * 0.15); ctx.stroke()

      // Center dot
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#FFC000'
      ctx.fill()

      // Range marks
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2
        const len = i % 9 === 0 ? 8 : i % 3 === 0 ? 4 : 2
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * (R - len), cy + Math.sin(a) * (R - len))
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R)
        ctx.strokeStyle = 'rgba(59,83,47,0.35)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return <canvas ref={canvasRef} />
}

export default function ContactSlide() {
  const [tick, setTick] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setTick(v => !v), 600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(59,83,47,0.07) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex flex-col md:flex-row items-center h-full px-10 md:px-24 gap-16">
        {/* Left: content */}
        <div className="flex-1 flex flex-col">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">READY TO DEPLOY</span>
          </motion.div>

          {/* Logo + company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-5 mb-6"
          >
            <SedecLogo size={60} color="#3B532F" />
            <div>
              <div className="font-headline text-white text-3xl md:text-4xl leading-none">SEDEC</div>
              <div className="font-headline text-mil-green text-sm tracking-[0.25em] mt-1">INTELLIGENT SYSTEMS</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="origin-left h-px bg-gradient-to-r from-mil-yellow via-mil-green to-transparent mb-6 w-72"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-body text-gray-400 text-base leading-relaxed mb-8 max-w-md"
          >
            SEDEC Intelligent Systems delivers battle-proven fire control and battlefield
            digitization solutions. The AFCS is available for immediate evaluation,
            demonstration, and integration.
          </motion.p>

          {/* Contact cards */}
          <div className="space-y-3">
            {[
              {
                icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
                label: 'CONTACT',
                value: 'info@sedec.rs',
              },
              {
                icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>,
                label: 'WEB',
                value: 'www.sedec.rs',
              },
              {
                icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="square" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                label: 'LOCATION',
                value: 'Belgrade, Serbia',
              },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.5 }}
                className="flex items-center gap-4 border border-mil-green/20 px-4 py-3 hover:border-mil-yellow/40 transition-colors group"
              >
                <div className="text-mil-green group-hover:text-mil-yellow transition-colors">{c.icon}</div>
                <div>
                  <div className="font-headline text-[9px] tracking-widest text-gray-600">{c.label}</div>
                  <div className="font-body text-gray-300 text-sm group-hover:text-white transition-colors">{c.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8"
          >
            <div
              className="inline-flex items-center gap-3 border border-mil-yellow bg-mil-yellow/5 hover:bg-mil-yellow/10 px-6 py-3 transition-all cursor-pointer group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            >
              <span className="font-headline text-mil-yellow text-sm tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
                REQUEST DEMONSTRATION
              </span>
              <svg className="w-4 h-4 text-mil-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Right: reticle + status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <TargetReticle />

          <div className="space-y-2 w-full">
            {[
              { label: 'SYSTEM STATUS', value: 'OPERATIONAL', color: '#3B532F', blink: true },
              { label: 'VERSION', value: 'AFCS v2.5', color: '#FFC000', blink: false },
              { label: 'CLASSIFICATION', value: 'CONFIDENTIAL', color: '#FFC000', blink: false },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center border-b border-mil-green/15 pb-1.5">
                <span className="font-headline text-[9px] tracking-widest text-gray-600">{s.label}</span>
                <div className="flex items-center gap-2">
                  {s.blink && (
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: s.color, opacity: tick ? 1 : 0.2, transition: 'opacity 0.1s' }}
                    />
                  )}
                  <span className="font-headline text-xs" style={{ color: s.color }}>{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-mil-green/20" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-mil-green/20" />
    </div>
  )
}
