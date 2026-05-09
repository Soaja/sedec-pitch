import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = [
  {
    id: 'bcp',
    label: 'BCP',
    fullLabel: 'Battery Command Post',
    color: '#FFC000',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="2" y="3" width="20" height="14" rx="1"/><path strokeLinecap="square" d="M8 21h8m-4-4v4"/></svg>,
    specs: [
      { label: 'Hardware', value: 'Panasonic ToughBook' },
      { label: 'Processor', value: 'Intel i7-1185G7 VPro' },
      { label: 'RAM', value: '8GB DDR4' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'OS', value: 'Windows 11 Pro' },
      { label: 'Battery', value: '10.8V / 6500mAh (38h)' },
      { label: 'Temp. Range', value: '-29°C to +60°C' },
      { label: 'Interfaces', value: '2× USB 3.2 / TB4 / HDMI / LAN' },
    ],
    functions: [
      'Target Data Management & priority assignment',
      'Firing plan creation and fire adjustment',
      'Battery firing elements â€” up to 8 weapons',
      'GIS Mapping System with satellite basemap',
      'Automatic MET data handling',
      'Hazard zone & firing zone definition',
      'Automatic data transfer to all units',
    ],
    badge: 'COMMAND NODE',
  },
  {
    id: 'fo',
    label: 'FO',
    fullLabel: 'Forward Observer Equipment',
    color: '#3B532F',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="11" cy="11" r="8"/><path strokeLinecap="square" d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>,
    specs: [
      { label: 'Tablet', value: 'ALGIZ 10X Ruggedized' },
      { label: 'Processor', value: 'Intel N2930 1.83GHz Quad-core' },
      { label: 'RAM', value: '8GB' },
      { label: 'Storage', value: '128GB' },
      { label: 'Display', value: '1920×1200 Touchscreen' },
      { label: 'Laser Range', value: '180 â€“ 20,000 m (±5 m)' },
      { label: 'GPS Accuracy', value: '2 m CEP (horizontal)' },
      { label: 'Thermal Camera', value: 'LWIR 640×512 / 8× zoom' },
    ],
    functions: [
      'Artillery Electronic Goniometer (AEG) integration',
      'Optical sight 7° FOV / 7× magnification',
      'Laser rangefinder 1064 nm, max 6 meas/min',
      'Digital magnetic compass (0.45° / 8 mil accuracy)',
      'Observed position calculation and transmission',
      'Direct data link to Battery Command Post',
      'Fire adjustment data management',
    ],
    badge: 'FORWARD NODE',
  },
  {
    id: 'grs',
    label: 'GRS',
    fullLabel: 'Gun Recording System',
    color: '#4E6E3E',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
    specs: [
      { label: 'Sensor Head', value: 'SH2/G Optoelectronic' },
      { label: 'Horizontal Range', value: '0 â€“ 6400 mils' },
      { label: 'Angle Accuracy', value: '1 mil' },
      { label: 'Met Sensor Wind', value: '0 â€“ 40 m/s' },
      { label: 'Met Temp Range', value: '-30°C to +60°C' },
      { label: 'Power Supply', value: 'Li-Ion 25.2V / 6.8Ah' },
      { label: 'Interface', value: 'RS-232' },
      { label: 'Mass', value: '21 kg (integrated)' },
    ],
    functions: [
      'Directs weapon to Center of Arc automatically',
      'Ground meteorological condition measurement',
      'Digital magnetic compass north reference',
      'Integrated Meteorological sensor MS-3/D',
      'Sends orientation data to BCP automatically',
      'Tablet PC interface for local operation',
      'Field-ready with carrying case & tripod',
    ],
    badge: 'WEAPON LEVEL',
  },
  {
    id: 'cdp',
    label: 'WCC',
    fullLabel: 'Weapon Commander Computer',
    color: '#3B532F',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="5" y="2" width="14" height="20" rx="1"/><path strokeLinecap="square" d="M12 18h.01"/></svg>,
    specs: [
      { label: 'Hardware', value: 'Panasonic ToughBook' },
      { label: 'Processor', value: 'Intel i7-1185G7 VPro' },
      { label: 'RAM', value: '8GB DDR4' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'OS', value: 'Windows 11 Pro' },
      { label: 'Battery', value: '10.8V / 6500mAh (38h)' },
      { label: 'Temp. Range', value: '-29°C to +60°C' },
      { label: 'GPS', value: 'Built-in receiver' },
    ],
    functions: [
      'Receives and displays firing elements from BCP',
      'Stand-alone ballistic calculation capability',
      'Automatic gun barrel alignment via INS',
      'Target data management per weapon',
      'Multi-mode: Topographic / New Target / MRSI',
      'Fire adjustment data management',
      'Real-time position display with GPS',
    ],
    badge: 'GUN LEVEL',
  },
  {
    id: 'met',
    label: 'MET',
    fullLabel: 'Automatic Meteorological Station',
    color: '#6B8F5B',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="square" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>,
    specs: [
      { label: 'System', value: 'Vaisala MARWIN MW32' },
      { label: 'Type', value: 'Upper-air Radiosonde' },
      { label: 'Setup Time', value: '< 15 minutes' },
      { label: 'MTTR', value: '< 30 minutes' },
      { label: 'Measurements', value: 'P / T / RH / Wind' },
      { label: 'Wind Profiles', value: 'All altitudes' },
      { label: 'Form Factor', value: 'Portable / Compact' },
      { label: 'Power', value: 'Self-diagnostic on startup' },
    ],
    functions: [
      'Radiosonde upper-air atmospheric profiling',
      'Pressure, temperature, humidity measurement',
      'Wind speed and direction at all altitudes',
      'Ground meteorological surface observations',
      'Meteo-ballistic bulletin generation',
      'Automatic data feed to BCP software',
      'Field-deployable in transport case',
    ],
    badge: 'SUPPORT SYSTEM',
  },
]

export default function ComponentsSlide() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(59,83,47,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-18 pb-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">SYSTEM COMPONENTS</span>
          </div>
          <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight">
            BATTERY <span className="text-mil-green">ELEMENTS</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 flex-wrap">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`font-headline text-xs tracking-wider px-4 py-2.5 transition-all duration-300 border ${
                active === i
                  ? 'bg-mil-green text-white border-mil-green'
                  : 'border-mil-green/30 text-gray-500 hover:border-mil-green/70 hover:text-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Left: info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ color: tab.color }}>{tab.icon}</div>
                <div>
                  <div className="font-headline text-white text-xl leading-tight">{tab.fullLabel}</div>
                  <div
                    className="font-headline text-xs tracking-widest mt-0.5"
                    style={{ color: tab.color }}
                  >
                    {tab.badge}
                  </div>
                </div>
              </div>

              <div className="font-body text-gray-500 text-xs mb-4">KEY FUNCTIONS</div>
              <div className="space-y-2 overflow-y-auto pr-2" style={{ maxHeight: '260px' }}>
                {tab.functions.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-2 items-start group"
                  >
                    <div className="w-1.5 h-1.5 mt-1.5 flex-shrink-0" style={{ background: tab.color, opacity: 0.7 }} />
                    <span className="font-body text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: specs table */}
            <div className="border border-mil-green/20 overflow-hidden flex flex-col"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}>
              <div
                className="px-4 py-2 flex items-center gap-2"
                style={{ background: `${tab.color}18`, borderBottom: `1px solid ${tab.color}30` }}
              >
                <span className="font-headline text-xs tracking-widest" style={{ color: tab.color }}>
                  TECHNICAL SPECIFICATIONS
                </span>
              </div>
              <div className="overflow-y-auto flex-1">
                <table className="w-full">
                  <tbody>
                    {tab.specs.map((s, i) => (
                      <motion.tr
                        key={s.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-mil-green/10 hover:bg-mil-green/5 transition-colors group"
                      >
                        <td className="px-4 py-2.5 font-body text-xs text-gray-600 w-2/5 group-hover:text-gray-400 transition-colors">
                          {s.label}
                        </td>
                        <td className="px-4 py-2.5 font-body text-xs text-gray-300 font-semibold">
                          {s.value}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-mil-green/15" />
    </div>
  )
}

