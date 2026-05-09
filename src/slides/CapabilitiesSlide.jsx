import { motion } from 'framer-motion'

const capabilities = [
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="11" cy="11" r="8"/><path strokeLinecap="square" d="m21 21-4.35-4.35"/></svg>,
    title: 'Target Acquisition',
    desc: 'Battlefield observation and target identification with AEG electronic goniometer',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>,
    title: 'Topographic Calc.',
    desc: 'Unknown point coordinates, firing zones, hazard zones, true north via INS',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>,
    title: 'Object Database',
    desc: 'Persistent target database with location, type, priority management',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    title: 'Ballistic Computation',
    desc: 'External ballistic elements for all weapon/projectile/charge combinations in real time',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M15 10l4.553-2.276A1 1 0 0121 8.618V7m-6 3l-6-3m6 3v10m-6-13l-4.447-2.276A1 1 0 003 5.618v9.764a1 1 0 00.553.894L9 18m0-10V18"/></svg>,
    title: 'Fire Modes',
    desc: 'Systematic fire, fire for effect, line target engagement â€” classic and auto LOS',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>,
    title: 'Encrypted Comms',
    desc: 'VHF/UHF radio, TCP/IP & UDP protocols, simultaneous voice and data transfer',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>,
    title: 'GIS Mapping',
    desc: 'Digital terrain mapping with satellite and topographic basemaps, military symbols',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="square" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    title: 'Blue Force Tracking',
    desc: 'Real-time navigation of all units with GPS and INS with odometer redundancy',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
    title: 'Meteo Integration',
    desc: 'Ground meteorological preparation and upper-air meteorological bulletin support',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    title: 'Multi-Weapon Ctrl',
    desc: 'Battery firing elements from single to 8 weapons simultaneously from one BCP',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    title: 'Fire Adjustment',
    desc: 'Real-time fire adjustment and fire for effect capability with data management',
  },
  {
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
    title: 'Standalone Mode',
    desc: 'CDP capable of independent fire element calculation when operating as stand-alone',
  },
]

export default function CapabilitiesSlide() {
  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(59,83,47,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex flex-col h-full px-10 md:px-16 pt-24 pb-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 pt-2"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">OPERATIONAL CAPABILITIES</span>
          </div>
          <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight">
            CORE <span className="text-mil-green">FUNCTIONS</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 flex-1 overflow-hidden">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.05 * i + 0.1 }}
              className="group relative border border-mil-green/20 hover:border-mil-yellow/50 transition-all duration-300 p-4 flex flex-col overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 bg-mil-green/0 group-hover:bg-mil-green/5 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-px bg-mil-yellow transition-all duration-400" />

              <div className="text-mil-green/80 group-hover:text-mil-yellow transition-colors duration-300 mb-3 relative z-10">
                {cap.icon}
              </div>
              <div className="font-headline text-white text-sm tracking-wider mb-1.5 relative z-10 group-hover:text-mil-yellow transition-colors duration-300">
                {cap.title}
              </div>
              <p className="font-body text-gray-600 text-xs leading-relaxed relative z-10 group-hover:text-gray-400 transition-colors duration-300 line-clamp-3">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

