import { motion } from 'framer-motion'
import { useState } from 'react'

const armaments = [
  {
    type: 'SP Howitzer',
    calibers: ['All calibers'],
    example: '155mm / 122mm / 105mm',
    firing: ['Systematic Fire', 'Fire for Effect', 'MRSI'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="2" y="10" width="14" height="7" rx="0.5" />
        <path strokeLinecap="square" d="M16 13h3l2-1v2l-2-1h-3M4 10V8a2 2 0 012-2h6a2 2 0 012 2v2M6 17v2M10 17v2M3 13h2" />
        <circle cx="5" cy="19" r="1.5" />
        <circle cx="11" cy="19" r="1.5" />
      </svg>
    ),
    color: '#FFC000',
  },
  {
    type: 'Towed Howitzer',
    calibers: ['155mm', '122mm', '105mm'],
    example: 'D-30 / M777 / M114',
    firing: ['Systematic Fire', 'Fire for Effect', 'Classic Optical'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="square" d="M2 14h16M18 14l2-2M4 14v2M12 14v2M7 11V8M7 8h8M15 8l4 2" />
        <circle cx="5" cy="17" r="1.5" />
        <circle cx="11" cy="17" r="1.5" />
      </svg>
    ),
    color: '#3B532F',
  },
  {
    type: 'Towed Gun',
    calibers: ['76mm'],
    example: 'Anti-tank / Field Gun',
    firing: ['Direct Fire Support', 'Topographic Mode'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="square" d="M2 13h12M14 13l6-2M6 13v3M10 13v3" />
        <circle cx="5" cy="17" r="1.5" />
        <circle cx="11" cy="17" r="1.5" />
        <path strokeLinecap="square" d="M4 11V9h8v2" />
      </svg>
    ),
    color: '#4E6E3E',
  },
  {
    type: 'MLRS / Rocket Launcher',
    calibers: ['122mm', '128mm'],
    example: 'BM-21 / M-87 Orkan',
    firing: ['Area Fire', 'Rocket Salvo', 'Auto Launch Align'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <rect x="2" y="9" width="12" height="8" rx="0.5" />
        <path strokeLinecap="square" d="M14 11h4v4h-4M18 13l3-1v2l-3-1" />
        <line x1="5" y1="9" x2="5" y2="17" />
        <line x1="8" y1="9" x2="8" y2="17" />
        <line x1="11" y1="9" x2="11" y2="17" />
        <circle cx="4" cy="19" r="1.5" />
        <circle cx="10" cy="19" r="1.5" />
      </svg>
    ),
    color: '#FFC000',
  },
  {
    type: 'Mortar',
    calibers: ['All calibers', '81mm', '120mm'],
    example: 'M252 / 2B11 / RT61',
    firing: ['Indirect Fire', 'Fire for Effect', 'Systematic'],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="square" d="M12 4v10M8 14h8M9 14v4M15 14v4M10 18h4" />
        <ellipse cx="12" cy="4" rx="2" ry="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    ),
    color: '#3B532F',
  },
]

export default function ArmamentSlide() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(59,83,47,0.05) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-18 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">PLATFORM COMPATIBILITY</span>
          </div>
          <h2 className="font-headline text-white text-3xl md:text-4xl leading-tight">
            SUPPORTED <span className="text-mil-green">ARMAMENT</span>
          </h2>
          <p className="font-body text-gray-500 text-sm mt-2">
            Single software platform — multiple weapon systems
          </p>
        </motion.div>

        {/* Armament cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
          {armaments.map((arm, i) => (
            <motion.div
              key={arm.type}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative border transition-all duration-400 p-5 flex flex-col overflow-hidden cursor-default"
              style={{
                borderColor: hovered === i ? arm.color : 'rgba(59,83,47,0.25)',
                background: hovered === i ? `${arm.color}08` : 'transparent',
                clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
              }}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-400"
                style={{ background: arm.color, opacity: hovered === i ? 0.7 : 0.2 }}
              />

              {/* Icon */}
              <div
                className="mb-4 transition-colors duration-300"
                style={{ color: hovered === i ? arm.color : 'rgba(59,83,47,0.6)' }}
              >
                {arm.icon}
              </div>

              {/* Type */}
              <div
                className="font-headline text-sm tracking-wide mb-2 transition-colors duration-300"
                style={{ color: hovered === i ? arm.color : '#E0E0E0' }}
              >
                {arm.type}
              </div>

              {/* Example */}
              <div className="font-body text-gray-600 text-[10px] mb-3">{arm.example}</div>

              {/* Calibers */}
              <div className="flex flex-wrap gap-1 mb-3">
                {arm.calibers.map((cal) => (
                  <span
                    key={cal}
                    className="font-headline text-[9px] tracking-widest px-2 py-0.5"
                    style={{
                      background: `${arm.color}18`,
                      color: arm.color,
                      border: `1px solid ${arm.color}30`,
                    }}
                  >
                    {cal}
                  </span>
                ))}
              </div>

              {/* Firing modes */}
              <div className="mt-auto space-y-1">
                {arm.firing.map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <div className="w-1 h-1" style={{ background: arm.color, opacity: 0.5 }} />
                    <span className="font-body text-[9px] text-gray-600 group-hover:text-gray-400 transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-5 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-mil-green/15" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-mil-green/50" />
            <span className="font-body text-gray-600 text-xs">
              AFCS supports both classic optical LOS and automatic inertial LOS modes for all platforms
            </span>
          </div>
          <div className="flex-1 h-px bg-mil-green/15" />
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-mil-green/15" />
    </div>
  )
}
