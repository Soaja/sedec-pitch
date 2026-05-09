import { motion } from 'framer-motion'

const differentiators = [
  {
    num: '01',
    title: 'FULLY AUTOMATED',
    headline: 'Zero Operator Error',
    desc: 'AFCS eliminates manual calculation steps entirely. From target data received by the Forward Observer to firing elements transmitted to the weapon â€” the system computes, validates, and delivers automatically.',
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    color: '#FFC000',
    highlight: '< 30s',
    highlightLabel: 'target-to-fire cycle',
  },
  {
    num: '02',
    title: 'MODULAR ARCHITECTURE',
    headline: 'Scalable to Any Force',
    desc: 'Open, modular design allows deployment on any platform â€” from a single battery to division-level integration. Scale from 1 weapon to 8 per battery. Integrate into existing C2 infrastructure without rearchitecting.',
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>,
    color: '#3B532F',
    highlight: '5+',
    highlightLabel: 'platform types supported',
  },
  {
    num: '03',
    title: 'FIELD-PROVEN HARDWARE',
    headline: 'Military Grade Ruggedization',
    desc: 'Panasonic ToughBook at the command level, ALGIZ 10X at the forward observer and weapon nodes. Shock and vibration protected, -29°C to +60°C operating range, vehicle-docking ready with 38-hour battery life.',
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    color: '#FFC000',
    highlight: '-29°C / +60°C',
    highlightLabel: 'full operational range',
  },
  {
    num: '04',
    title: 'NATO INTEROPERABLE',
    headline: 'Standards-Compliant',
    desc: 'Military Symbol Editor supports both 2525-D and APP6-D NATO standards. Communication via standard TCP/IP and UDP protocols over VHF/UHF radio networks. WGS 84 datum with local datum support.',
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path strokeLinecap="square" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    color: '#4E6E3E',
    highlight: 'NATO',
    highlightLabel: 'APP6-D & 2525-D',
  },
]

export default function WhySedecSlide() {
  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,192,0,0.04) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-24 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">COMPETITIVE ADVANTAGE</span>
          </div>
          <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight">
            WHY <span className="text-mil-yellow">SEDEC</span> <span className="text-mil-green">AFCS</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 min-h-0">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i + 0.2 }}
              className="group relative border border-mil-green/20 hover:border-mil-yellow/40 transition-all duration-400 p-6 overflow-hidden flex gap-5 cursor-default"
              style={{ clipPath: i % 2 === 0 ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' : 'polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mil-green/0 to-mil-green/0 group-hover:from-mil-green/3 group-hover:to-transparent transition-all duration-400" />
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-30 group-hover:opacity-70 transition-opacity duration-400"
                style={{ background: `linear-gradient(to right, ${d.color}, transparent)` }}
              />

              {/* Number */}
              <div className="font-headline text-4xl md:text-5xl leading-none opacity-10 group-hover:opacity-20 transition-opacity flex-shrink-0 self-start" style={{ color: d.color }}>
                {d.num}
              </div>

              <div className="flex flex-col flex-1">
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-2">
                  <div style={{ color: d.color }} className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {d.icon}
                  </div>
                  <div>
                    <div className="font-headline text-xs tracking-widest" style={{ color: d.color }}>{d.title}</div>
                    <div className="font-headline text-white text-lg leading-tight">{d.headline}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors flex-1">
                  {d.desc}
                </p>

                {/* Highlight */}
                <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-mil-green/15">
                  <span className="font-headline text-xl" style={{ color: d.color }}>{d.highlight}</span>
                  <span className="font-body text-gray-600 text-xs">{d.highlightLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-mil-green/15" />
    </div>
  )
}

