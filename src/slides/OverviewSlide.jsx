import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

function SystemDiagram() {
  const drawn = useRef(false)
  const svgRef = useRef(null)

  const nodes = [
    { id: 'bcp', x: 50, y: 50, label: 'BATTERY\nCOMMAND POST', sub: 'BCP', color: '#FFC000' },
    { id: 'fo1', x: 18, y: 20, label: 'FORWARD\nOBSERVER', sub: 'FO-1', color: '#3B532F' },
    { id: 'fo2', x: 82, y: 20, label: 'FORWARD\nOBSERVER', sub: 'FO-2', color: '#3B532F' },
    { id: 'g1', x: 18, y: 80, label: 'WEAPON 1', sub: 'GRS+CDP', color: '#3B532F' },
    { id: 'g2', x: 38, y: 80, label: 'WEAPON 2', sub: 'GRS+CDP', color: '#3B532F' },
    { id: 'g3', x: 58, y: 80, label: 'WEAPON 3', sub: 'GRS+CDP', color: '#3B532F' },
    { id: 'g4', x: 78, y: 80, label: 'WEAPON 4', sub: 'GRS+CDP', color: '#3B532F' },
    { id: 'met', x: 50, y: 15, label: 'MET\nSTATION', sub: 'Vaisala', color: '#6B8F5B' },
  ]

  const edges = [
    ['bcp', 'fo1'], ['bcp', 'fo2'],
    ['bcp', 'g1'], ['bcp', 'g2'], ['bcp', 'g3'], ['bcp', 'g4'],
    ['bcp', 'met'],
  ]

  const W = 400, H = 260

  const getPos = (n) => ({ x: n.x / 100 * W, y: n.y / 100 * H })

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(59,83,47,0.6)" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const na = nodes.find(n => n.id === a)
        const nb = nodes.find(n => n.id === b)
        const pa = getPos(na), pb = getPos(nb)
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
            stroke="rgba(59,83,47,0.4)"
            strokeWidth={0.8}
            strokeDasharray="4 3"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const p = getPos(n)
        const isBcp = n.id === 'bcp'
        const r = isBcp ? 20 : 14
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            {/* Pulse ring for BCP */}
            {isBcp && (
              <motion.circle
                cx={p.x} cy={p.y} r={r + 8}
                fill="none"
                stroke="#FFC000"
                strokeWidth={0.5}
                opacity={0.3}
                animate={{ r: [r + 6, r + 18], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <rect
              x={p.x - r} y={p.y - (isBcp ? 14 : 10)}
              width={r * 2} height={isBcp ? 28 : 20}
              fill={isBcp ? 'rgba(255,192,0,0.08)' : 'rgba(59,83,47,0.08)'}
              stroke={n.color}
              strokeWidth={isBcp ? 1.2 : 0.7}
            />
            <text x={p.x} y={p.y - 3} textAnchor="middle" fill={n.color}
              fontSize={isBcp ? 7 : 5.5} fontFamily="Anton, Arial Black, sans-serif" letterSpacing="0.5">
              {n.sub}
            </text>
            {n.label.split('\n').map((line, li) => (
              <text
                key={li}
                x={p.x}
                y={p.y + (isBcp ? 8 : 6) + li * (isBcp ? 7 : 5.5)}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize={isBcp ? 4.5 : 3.5}
                fontFamily="Nunito, sans-serif"
              >
                {line}
              </text>
            ))}
          </motion.g>
        )
      })}

      {/* Labels */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fill="rgba(59,83,47,0.5)"
        fontSize={5} fontFamily="Anton, sans-serif" letterSpacing="2">
        VHF / UHF ENCRYPTED RADIO NETWORK
      </text>
    </svg>
  )
}

const features = [
  'Modular, scalable open architecture',
  'Fully automated — minimal human input',
  'Battery-level deployment (up to 8 weapons)',
  'Real-time GIS digital mapping',
  'Blue force tracking',
  'NATO APP6-D & 2525-D military symbols',
  'GPS + INS dual navigation',
  'Meteo-ballistic preparation integrated',
]

export default function OverviewSlide() {
  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(225deg, rgba(59,83,47,0.07) 0%, transparent 50%)' }} />

      <div className="relative z-10 flex flex-col h-full px-10 md:px-20 pt-20 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="font-headline text-white text-3xl md:text-4xl leading-tight">
            WHAT IS <span className="text-mil-green">AFCS</span>
          </h2>
        </motion.div>

        {/* Body: description + diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1 min-h-0">
          {/* Left: description */}
          <div className="flex flex-col justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-body text-gray-400 text-sm leading-relaxed mb-6"
            >
              The Artillery Fire Control System (AFCS) is a fully automated digital solution
              supporting the complete fire mission cycle — from battlefield observation and
              target acquisition through ballistic computation to firing element transmission.
            </motion.p>

            <div className="space-y-2">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-1.5 h-1.5 bg-mil-green group-hover:bg-mil-yellow transition-colors flex-shrink-0" />
                  <span className="font-body text-gray-400 text-xs group-hover:text-gray-200 transition-colors">{f}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom KPIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-3 mt-6"
            >
              {[
                { n: '5', l: 'Weapon Types' },
                { n: 'All', l: 'Calibers' },
                { n: '100%', l: 'Encrypted' },
              ].map((k) => (
                <div key={k.n} className="border border-mil-green/25 p-3 text-center">
                  <div className="font-headline text-mil-yellow text-xl">{k.n}</div>
                  <div className="font-body text-gray-600 text-[10px]">{k.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border border-mil-green/20 p-4 flex items-center justify-center overflow-hidden"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}
          >
            <SystemDiagram />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-mil-green/15" />
    </div>
  )
}
