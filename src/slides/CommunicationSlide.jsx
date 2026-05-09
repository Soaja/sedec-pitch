import { motion } from 'framer-motion'

const nodes = [
  { id: 'div', x: 50, y: 8, label: 'DIVISION\nCOMMANDER', sub: 'Higher Echelon', color: '#FFC000', size: 'lg' },
  { id: 'rpt', x: 50, y: 27, label: 'REPEATER', sub: 'VHF Relay', color: '#3B532F', size: 'sm' },
  { id: 'bcp', x: 50, y: 50, label: 'BATTERY\nCOMMAND POST', sub: 'BCP | BCV', color: '#FFC000', size: 'xl' },
  { id: 'obs', x: 82, y: 27, label: 'OBSERVER\n(BAT.CMDR)', sub: 'FO Vehicle', color: '#4E6E3E', size: 'md' },
  { id: 'dep', x: 18, y: 50, label: 'DEPUTY\nCOMMANDER', sub: 'BCV', color: '#4E6E3E', size: 'md' },
  { id: 'rpt2', x: 50, y: 72, label: 'REPEATER', sub: 'UHF Relay', color: '#3B532F', size: 'sm' },
  { id: 'w1', x: 22, y: 88, label: 'WEAPON 1', sub: 'GRS + CDP', color: '#3B532F', size: 'sm' },
  { id: 'w2', x: 42, y: 88, label: 'WEAPON 2', sub: 'GRS + CDP', color: '#3B532F', size: 'sm' },
  { id: 'w3', x: 62, y: 88, label: 'WEAPON 3', sub: 'GRS + CDP', color: '#3B532F', size: 'sm' },
  { id: 'w4', x: 82, y: 88, label: 'WEAPON 4', sub: 'GRS + CDP', color: '#3B532F', size: 'sm' },
]

const edges = [
  { from: 'div', to: 'rpt', type: 'vhf' },
  { from: 'rpt', to: 'bcp', type: 'vhf' },
  { from: 'rpt', to: 'obs', type: 'vhf' },
  { from: 'bcp', to: 'dep', type: 'vhf' },
  { from: 'bcp', to: 'rpt2', type: 'uhf' },
  { from: 'rpt2', to: 'w1', type: 'uhf' },
  { from: 'rpt2', to: 'w2', type: 'uhf' },
  { from: 'rpt2', to: 'w3', type: 'uhf' },
  { from: 'rpt2', to: 'w4', type: 'uhf' },
]

const sizeMap = { xl: 36, lg: 28, md: 24, sm: 18 }

export default function CommunicationSlide() {
  const W = 500, H = 340

  const getPos = (n) => ({ x: n.x / 100 * W, y: n.y / 100 * H })

  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(59,83,47,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-18 pb-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">NETWORK ARCHITECTURE</span>
          </div>
          <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight">
            COMMUNICATION <span className="text-mil-green">& DATA TRANSFER</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          {/* Network diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-1 border border-mil-green/20 p-4 overflow-hidden relative"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
              <defs>
                <marker id="arrowVHF" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <polygon points="0 0, 5 2.5, 0 5" fill="rgba(255,192,0,0.5)" />
                </marker>
                <marker id="arrowUHF" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <polygon points="0 0, 5 2.5, 0 5" fill="rgba(59,83,47,0.8)" />
                </marker>
              </defs>

              {edges.map((e, i) => {
                const na = nodes.find(n => n.id === e.from)
                const nb = nodes.find(n => n.id === e.to)
                const pa = getPos(na), pb = getPos(nb)
                const isVHF = e.type === 'vhf'
                return (
                  <motion.line
                    key={i}
                    x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke={isVHF ? 'rgba(255,192,0,0.35)' : 'rgba(59,83,47,0.6)'}
                    strokeWidth={isVHF ? 1 : 0.8}
                    strokeDasharray={isVHF ? '5 3' : '3 2'}
                    markerEnd={isVHF ? 'url(#arrowVHF)' : 'url(#arrowUHF)'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                )
              })}

              {nodes.map((n, i) => {
                const p = getPos(n)
                const r = sizeMap[n.size] / 2
                const isBcp = n.id === 'bcp'
                return (
                  <motion.g
                    key={n.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 * i + 0.2 }}
                    style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                  >
                    {isBcp && (
                      <motion.circle
                        cx={p.x} cy={p.y} r={r + 10}
                        fill="none" stroke="#FFC000" strokeWidth={0.5} opacity={0}
                        animate={{ r: [r + 8, r + 22], opacity: [0.3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    )}
                    <rect
                      x={p.x - r} y={p.y - r * 0.6}
                      width={r * 2} height={r * 1.4}
                      fill={isBcp ? 'rgba(255,192,0,0.1)' : 'rgba(10,10,10,0.8)'}
                      stroke={n.color}
                      strokeWidth={isBcp ? 1.2 : 0.6}
                    />
                    <text x={p.x} y={p.y - 1} textAnchor="middle"
                      fill={n.color} fontSize={r * 0.5}
                      fontFamily="Anton, Arial Black, sans-serif"
                      letterSpacing="0.3">
                      {n.id === 'bcp' ? 'BCP' : n.id === 'div' ? 'DIV' : n.id.startsWith('w') ? n.id.toUpperCase() : n.id.toUpperCase()}
                    </text>
                    {n.sub && (
                      <text x={p.x} y={p.y + r * 0.45} textAnchor="middle"
                        fill="rgba(255,255,255,0.35)" fontSize={r * 0.33}
                        fontFamily="Nunito, sans-serif">
                        {n.sub}
                      </text>
                    )}
                  </motion.g>
                )
              })}

              {/* Legend */}
              <g transform={`translate(${W - 120}, ${H - 40})`}>
                <line x1={0} y1={5} x2={20} y2={5} stroke="rgba(255,192,0,0.5)" strokeWidth={1} strokeDasharray="5 3" />
                <text x={25} y={9} fill="rgba(255,192,0,0.5)" fontSize={6} fontFamily="Nunito,sans-serif">VHF (30-88 MHz)</text>
                <line x1={0} y1={18} x2={20} y2={18} stroke="rgba(59,83,47,0.7)" strokeWidth={1} strokeDasharray="3 2" />
                <text x={25} y={22} fill="rgba(59,83,47,0.7)" fontSize={6} fontFamily="Nunito,sans-serif">UHF (225-400 MHz)</text>
              </g>
            </svg>
          </motion.div>

          {/* Right: specs */}
          <div className="md:w-64 flex flex-col gap-3">
            {[
              { label: 'VHF Radio Band', value: '30 — 88 MHz', color: '#FFC000', sub: 'Battery command level' },
              { label: 'UHF Radio Band', value: '225 — 400 MHz', color: '#3B532F', sub: 'Weapon coordination' },
              { label: 'RF Power Amp', value: '50 W', color: '#4E6E3E', sub: 'VHF extended range' },
              { label: 'Max Range', value: '35 km', color: '#FFC000', sub: 'Telescopic mast + repeater' },
              { label: 'Protocol', value: 'TCP/IP + UDP', color: '#3B532F', sub: 'Simultaneous voice & data' },
              { label: 'Encryption', value: '100%', color: '#FFC000', sub: 'All data transfers encrypted' },
              { label: 'Wire Backup', value: 'Available', color: '#4E6E3E', sub: 'Radio silence mode' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
                className="border border-mil-green/20 px-4 py-3 flex justify-between items-center group hover:border-mil-yellow/30 transition-colors"
              >
                <div>
                  <div className="font-body text-gray-500 text-xs group-hover:text-gray-400 transition-colors">{item.label}</div>
                  <div className="font-body text-[10px] text-gray-700">{item.sub}</div>
                </div>
                <div className="font-headline text-base" style={{ color: item.color }}>{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-mil-green/15" />
    </div>
  )
}

