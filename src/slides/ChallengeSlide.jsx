import { motion } from 'framer-motion'

const challenges = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'SPEED',
    sub: 'Shrinking Decision Windows',
    desc: 'Modern engagements demand sub-minute response cycles from target detection to fire delivery. Manual computation is no longer viable.',
    stat: '< 30s',
    statLabel: 'Target-to-Fire Time',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'PRECISION',
    sub: 'Zero Margin for Error',
    desc: 'External ballistic computation across multiple weapon types and calibers must account for real-time meteorological and topographic variables.',
    stat: '±2 m',
    statLabel: 'GPS Position Accuracy',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'COORDINATION',
    sub: 'Multi-Echelon Integration',
    desc: 'Simultaneous coordination between Forward Observers, Battery Command Post, and individual weapon crews across encrypted digital networks.',
    stat: '35 km',
    statLabel: 'Secure Radio Range',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'MODULARITY',
    sub: 'Platform Agnostic Demand',
    desc: 'A single fire control solution must serve SP howitzers, towed guns, rocket launchers, and mortars — from 76mm to all calibers.',
    stat: '5+',
    statLabel: 'Weapon Platform Types',
  },
]

export default function ChallengeSlide() {
  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(59,83,47,0.06) 0%, transparent 60%)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-10 md:px-20 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">OPERATIONAL CONTEXT</span>
          </div>
          <h2 className="font-headline text-white text-4xl md:text-5xl leading-tight">
            THE MODERN<br />
            <span className="text-mil-green">BATTLEFIELD</span> DEMANDS
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 flex-1">
          {challenges.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
              className="group relative border border-mil-green/25 hover:border-mil-yellow/50 transition-all duration-400 p-7 flex flex-col overflow-hidden cursor-default"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-mil-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mil-green to-transparent opacity-60 group-hover:from-mil-yellow transition-colors duration-400" />

              {/* Icon â€” bigger */}
              <div className="text-mil-green group-hover:text-mil-yellow transition-colors duration-300 mb-5 scale-125 origin-left">
                {c.icon}
              </div>

              {/* Title */}
              <div className="font-headline text-white text-2xl tracking-widest mb-2">{c.title}</div>
              <div className="font-body text-mil-yellow/80 text-sm mb-4">{c.sub}</div>

              {/* Desc */}
              <p className="font-body text-gray-400 text-sm leading-relaxed flex-1">{c.desc}</p>

              {/* Stat */}
              <div className="mt-5 pt-5 border-t border-mil-green/20">
                <div className="font-headline text-mil-yellow text-4xl">{c.stat}</div>
                <div className="font-body text-gray-500 text-xs tracking-wide mt-1">{c.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-5 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-mil-green/15" />
          <p className="font-body text-gray-500 text-sm italic text-center">
            AFCS addresses all four demands in a single integrated, automated platform
          </p>
          <div className="flex-1 h-px bg-mil-green/15" />
        </motion.div>
      </div>

      {/* Corner deco */}
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-mil-green/15" />
    </div>
  )
}

