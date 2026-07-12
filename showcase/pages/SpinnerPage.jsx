import Spinner from '../../src/components/Spinner.jsx'

const WAIT_TIMES = [
  { label: 'SM', start: 's', end: 's', duration: '0.6s', easing: 'ease' },
  { label: 'MD', start: 'm', end: 'm', duration: '0.9s', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { label: 'LG', start: 'l', end: 'g', duration: '1.5s', easing: 'linear' },
]

const COLORS = [
  { label: 'Accent', value: 'var(--tsu-accent-9)' },
  { label: 'Neutral', value: 'var(--tsu-neutral-9)' },
  { label: 'Danger', value: 'var(--tsu-danger-9)' },
]

function SizesSection(){
  return (
    <div className='feature-card'>
      <p className='demo-label'>Sizes & Timing</p>
      <div className='demo-row' style="align-items:center; gap:20px">
        {[16, 24, 32, 48].map(s => (
          <div style="display:flex; flex-direction:column; align-items:center; gap:6px" key={s}>
            <span style="font-size:11px; color:var(--tsu-neutral-11)">{`${s}px`}</span>
            <Spinner size={s} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ColorsSection(){
  return (
    <div className='feature-card'>
      <p className='demo-label'>Colors</p>
      <div className='demo-row' style="align-items:center; gap:20px">
        {COLORS.map(c => (
          <div style="display:flex; flex-direction:column; align-items:center; gap:6px" key={c.label}>
            <span style="font-size:11px; color:var(--tsu-neutral-11)">{c.label}</span>
            <Spinner size={28} color={c.value} />
          </div>
        ))}
      </div>
    </div>
  )
}

function PresetsSection(){
  return (
    <div className='feature-card'>
      <p className='demo-label'>Duration & Easing Presets</p>
      {WAIT_TIMES.map(w => (
        <div className='demo-row' style="align-items:center; gap:16px; margin-bottom:10px" key={w.label}>
          <span className='tag'>{w.label}</span>
          <Spinner size={24} duration={w.duration} easing={w.easing} />
          <span style="font-size:12px; color:var(--tsu-neutral-11); font-family:monospace">{w.duration} {w.easing}</span>
        </div>
      ))}
    </div>
  )
}

export default function SpinnerPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Indicators</p>
        <h1>Spinner</h1>
        <p className='hero-copy'>
          A rotating loader indicator using the Lucide Loader2 path.
          Customize duration, easing curve, stroke width, size, and color.
        </p>
      </div>

      <div style="display:flex; gap:16px">
        <div style="flex:1">
          <SizesSection />
          <ColorsSection />
        </div>
        <div style="flex:1">
          <PresetsSection />
        </div>
      </div>
    </div>
  )
}
