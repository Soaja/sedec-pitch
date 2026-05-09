import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HeroSlide from './slides/HeroSlide'
import ChallengeSlide from './slides/ChallengeSlide'
import OverviewSlide from './slides/OverviewSlide'
import CapabilitiesSlide from './slides/CapabilitiesSlide'
import ComponentsSlide from './slides/ComponentsSlide'
import SpecsSlide from './slides/SpecsSlide'
import CommunicationSlide from './slides/CommunicationSlide'
import ArmamentSlide from './slides/ArmamentSlide'
import WhySedecSlide from './slides/WhySedecSlide'
import ContactSlide from './slides/ContactSlide'

const SLIDES = [
  { id: 0, component: HeroSlide, label: 'AFCS' },
  { id: 1, component: ChallengeSlide, label: 'Challenge' },
  { id: 2, component: OverviewSlide, label: 'Overview' },
  { id: 3, component: CapabilitiesSlide, label: 'Capabilities' },
  { id: 4, component: ComponentsSlide, label: 'Components' },
  { id: 5, component: SpecsSlide, label: 'Specs' },
  { id: 6, component: CommunicationSlide, label: 'Network' },
  { id: 7, component: ArmamentSlide, label: 'Armament' },
  { id: 8, component: WhySedecSlide, label: 'Why SEDEC' },
  { id: 9, component: ContactSlide, label: 'Contact' },
]

const variants = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
}

export function SedecLogo({ size = 32, color = '#3B532F' }) {
  const spacing = size / 4
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * spacing + spacing / 2}
            cy={r * spacing + spacing / 2}
            r={spacing * 0.18}
            fill={color}
            opacity={0.4 + (r + c) * 0.08}
          />
        ))
      )}
    </svg>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback((index) => {
    if (index < 0 || index >= SLIDES.length) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo])

  const SlideComponent = SLIDES[current].component

  return (
    <div className="relative w-full h-full overflow-hidden bg-mil-black select-none">
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-mil-green/20 z-50">
        <motion.div
          className="h-full bg-mil-yellow"
          animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* SEDEC watermark */}
      <div className="absolute top-5 left-6 z-50 flex items-center gap-3">
        <SedecLogo size={26} color="#3B532F" />
        <span className="font-headline text-[10px] tracking-[0.25em] text-mil-green/60 hidden sm:block">
          SEDEC INTELLIGENT SYSTEMS
        </span>
      </div>

      {/* Confidential badge */}
      <div className="absolute top-5 right-6 z-50 border border-mil-yellow/25 px-3 py-1">
        <span className="font-headline text-[9px] tracking-[0.3em] text-mil-yellow/50">CONFIDENTIAL</span>
      </div>

      {/* Slide */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Prev arrow */}
      {current > 0 && (
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 flex items-center justify-center border border-mil-green/40 hover:border-mil-yellow/70 hover:bg-mil-green/15 transition-all duration-300 group"
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)' }}
        >
          <svg className="w-4 h-4 text-mil-green group-hover:text-mil-yellow transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {current < SLIDES.length - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 flex items-center justify-center border border-mil-green/40 hover:border-mil-yellow/70 hover:bg-mil-green/15 transition-all duration-300 group"
          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)' }}
        >
          <svg className="w-4 h-4 text-mil-green group-hover:text-mil-yellow transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="square" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Dot nav */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-none ${
              i === current ? 'w-7 h-1.5 bg-mil-yellow' : 'w-1.5 h-1.5 bg-mil-green/40 hover:bg-mil-green'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 right-16 z-50 font-headline text-[10px] text-mil-green/40 tracking-widest">
        {String(current + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, '0')}
      </div>
    </div>
  )
}
