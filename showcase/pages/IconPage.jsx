import { createSignal } from '@plastic-js/plastic'
import Icon from '../../src/components/Icon.jsx'

const checkIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>'
const arrowIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>'
const heartIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>'
const starIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>'
const searchIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>'
const settingsIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z" /><circle cx="12" cy="12" r="3" /></svg>'
const cloudIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>'

const ICONS = [
  { name: 'Check', svg: checkIcon },
  { name: 'Arrow', svg: arrowIcon },
  { name: 'Heart', svg: heartIcon },
  { name: 'Star', svg: starIcon },
  { name: 'Search', svg: searchIcon },
  { name: 'Settings', svg: settingsIcon },
  { name: 'Cloud', svg: cloudIcon },
]

const SIZES = [14, 18, 22, 28, 36]

function IconPage(){
  const iconNameSignal = createSignal('Star')
  const sizeSignal = createSignal(22)
  const strokeSignal = createSignal(1.25)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Display</p>
        <h1>Icon</h1>
        <p className='hero-copy'>
          Render inline SVG icons. Accepts raw SVG markup, configurable
          <span className='tag'>size</span> and
          <span className='tag'>strokeWidth</span>.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Gallery</p>
        <div className='demo-row' style={{ gap: '16px' }}>
          {ICONS.map(ic => (
            <div key={ic.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <Icon svg={ic.svg} size={24} />
              <span style={{ fontSize: '10px', color: 'var(--tsu-neutral-11)' }}>{ic.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row' style={{ gap: '16px', alignItems: 'flex-end' }}>
          {SIZES.map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Icon svg={starIcon} size={s} />
              <span style={{ fontSize: '10px', color: 'var(--tsu-neutral-11)' }}>{s}px</span>
            </div>
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Stroke Width</p>
        <div className='demo-row' style={{ gap: '16px', alignItems: 'flex-end' }}>
          {[0.5, 1, 1.5, 2, 3].map(sw => (
            <div key={sw} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Icon svg={heartIcon} size={28} strokeWidth={sw} />
              <span style={{ fontSize: '10px', color: 'var(--tsu-neutral-11)' }}>{sw}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Inherits Color</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          Uses <span className='tag'>currentColor</span>, so it picks up the text color of its parent.
        </p>
        <div className='demo-row' style={{ gap: '16px' }}>
          <span style={{ color: 'var(--tsu-accent-9)' }}><Icon svg={searchIcon} size={24} /></span>
          <span style={{ color: 'var(--tsu-danger-9)' }}><Icon svg={heartIcon} size={24} /></span>
          <span style={{ color: 'var(--tsu-success-9)' }}><Icon svg={checkIcon} size={24} /></span>
          <span style={{ color: 'var(--tsu-warning-9)' }}><Icon svg={starIcon} size={24} /></span>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style={{ gap: '12px' }}>
          <label>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Icon</span>
            <select className='demo-select' onChange={e => iconNameSignal(e.target.value)} value={iconNameSignal()}>
              {ICONS.map(ic => <option key={ic.name} value={ic.name}>{ic.name}</option>)}
            </select>
          </label>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Size</span>
            <input className='demo-select' max='64' min='8' onChange={e => sizeSignal(Number(e.target.value))} style='width:60px' type='number' value={sizeSignal()} />
            px
          </label>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Stroke</span>
            <input className='demo-select' max='4' min='0.25' onChange={e => strokeSignal(Number(e.target.value))} step='0.25' style='width:60px' type='number' value={strokeSignal()} />
          </label>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Icon
            svg={ICONS.find(ic => ic.name === iconNameSignal())?.svg || starIcon}
            size={sizeSignal}
            strokeWidth={strokeSignal}
          />
        </div>
      </div>
    </div>
  )
}

export default IconPage
