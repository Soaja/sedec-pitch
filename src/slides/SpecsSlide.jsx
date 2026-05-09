import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ target, suffix = '', duration = 1.5 }) {
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const numeric = parseFloat(target)
    if (isNaN(numeric)) { setVal(target); return }
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const current = Math.round(ease * numeric * 10) / 10
      setVal(current)
      if (p < 1) requestAnimationFrame(tick)
      else setVal(numeric)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  return <>{typeof val === 'number' ? val : val}{suffix}</>
}

const specGroups = [
  {
    title: 'SENSOR HEAD (AEG)',
    color: '#FFC000',
    specs: [
      { label: 'Laser Wavelength', value: '1064', suffix: ' nm' },
      { label: 'Laser Energy', value: '15', suffix: ' mJ' },
      { label: 'Range Accuracy', value: '±5', suffix: ' m' },
      { label: 'Max Range', value: '20000', suffix: ' m' },
      { label: 'Min Range', value: '180', suffix: ' m' },
      { label: 'Measure Rate', value: '6', suffix: '/min' },
      { label: 'Magnification', value: '7', suffix: '×' },
      { label: 'FOV', value: '7', suffix: '°' },
    ],
  },
  {
    title: 'GONIOMETER (G)',
    color: '#3B532F',
    specs: [
      { label: 'H-Plane Range', value: '6400', suffix: ' mils' },
      { label: 'H-Plane Accuracy', value: '1', suffix: ' mil' },
      { label: 'V-Plane Range', value: '±500', suffix: ' mils' },
      { label: 'V-Plane Accuracy', value: '1', suffix: ' mil' },
      { label: 'Input Power', value: '20-36', suffix: ' VDC' },
      { label: 'Mass', value: '7', suffix: ' kg' },
    ],
  },
  {
    title: 'GPS (SYSTEM-WIDE)',
    color: '#4E6E3E',
    specs: [
      { label: 'Channels', value: '72', suffix: '' },
      { label: 'H-Plane CEP', value: '2', suffix: ' m*' },
      { label: 'V-Plane CEP', value: '4', suffix: ' m*' },
      { label: 'Datum', value: 'WGS', suffix: ' 84' },
      { label: 'Compass Accuracy', value: '0.45', suffix: '°' },
      { label: 'N. Accuracy', value: '8', suffix: ' mils' },
    ],
  },
  {
    title: 'THERMAL CAMERA',
    color: '#6B8F5B',
    specs: [
      { label: 'Spectral Range', value: '7.5-13.5', suffix: ' Î¼m' },
      { label: 'Resolution', value: '640×512', suffix: ' px' },
      { label: 'Digital Zoom', value: '8-64', suffix: '×' },
      { label: 'Lens', value: '100', suffix: ' mm' },
      { label: 'Detector', value: 'Uncooled', suffix: '' },
      { label: 'FOV', value: '6.2×5.0', suffix: '°' },
    ],
  },
]

const keyMetrics = [
  { val: '38', suffix: 'h', label: 'Battery Life (max)' },
  { val: '35', suffix: 'km', label: 'Network Range' },
  { val: '8', suffix: '', label: 'Weapons / Battery' },
  { val: '256', suffix: 'bit', label: 'Data Encryption' },
  { val: '2', suffix: 'm', label: 'GPS Accuracy (CEP)' },
  { val: '15', suffix: 'min', label: 'MET Station Setup' },
]

export default function SpecsSlide() {
  return (
    <div className="relative w-full h-full bg-mil-black grid-overlay flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(315deg, rgba(255,192,0,0.03) 0%, transparent 50%)' }} />

      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-18 pb-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-mil-yellow" />
            <span className="font-headline text-mil-yellow text-xs tracking-[0.35em]">TECHNICAL DATA</span>
          </div>
          <h2 className="font-headline text-white text-4xl md:text-6xl leading-tight">
            KEY <span className="text-mil-green">SPECIFICATIONS</span>
          </h2>
        </motion.div>

        {/* Key metrics strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-6 overflow-x-auto pb-1"
        >
          {keyMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
              className="border border-mil-yellow/30 px-6 py-4 flex-shrink-0 text-center hover:border-mil-yellow/70 hover:bg-mil-yellow/5 transition-all duration-300"
              style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            >
              <div className="font-headline text-mil-yellow text-4xl md:text-5xl leading-none">
                <AnimatedNumber target={parseFloat(m.val) || m.val} suffix={m.suffix} duration={1.2} />
              </div>
              <div className="font-body text-gray-500 text-xs mt-2 whitespace-nowrap tracking-wide">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Spec groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 min-h-0">
          {specGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * gi + 0.3 }}
              className="border border-mil-green/20 overflow-hidden flex flex-col"
            >
              {/* Group header */}
              <div
                className="px-3 py-2"
                style={{ background: `${group.color}18`, borderBottom: `1px solid ${group.color}30` }}
              >
                <span className="font-headline text-[10px] tracking-widest" style={{ color: group.color }}>
                  {group.title}
                </span>
              </div>

              {/* Specs */}
              <div className="overflow-y-auto flex-1">
                {group.specs.map((s, si) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * si + 0.4 + gi * 0.1 }}
                    className="flex items-center justify-between px-3 py-2 border-b border-mil-green/10 hover:bg-mil-green/5 transition-colors group"
                  >
                    <span className="font-body text-gray-600 text-[10px] group-hover:text-gray-400 transition-colors">
                      {s.label}
                    </span>
                    <span className="font-headline text-xs ml-2 whitespace-nowrap" style={{ color: group.color }}>
                      {s.value}{s.suffix}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-body text-gray-700 text-[10px] mt-3 text-right"
        >
          * GPS accuracy without differential, WAAS, or EGNOS correction mode
        </motion.p>
      </div>
    </div>
  )
}

