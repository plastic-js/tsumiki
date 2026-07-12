import { createSignal } from '@plastic-js/plastic'
import CloseButton from '../../src/components/CloseButton.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg']

function CloseButtonPage(){
  const sizeSignal = createSignal('md')
  const disabledSignal = createSignal(false)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Elements</p>
        <h1>Close Button</h1>
        <p className='hero-copy'>
          A generic close button with an X icon. Supports four
          <span className='tag'>size</span> variants, customizable children,
          and follows the design system's accessibility patterns.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row' style={{ gap: '12px' }}>
          {SIZES.map(s => (
            <CloseButton key={s} size={s} aria-label={`Close ${s}`} />
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom Icon</p>
        <div className='demo-row' style={{ gap: '12px' }}>
          <CloseButton size='md'>
            <span style={{ fontSize: '18px', lineHeight: 1 }}>×</span>
          </CloseButton>
          <CloseButton size='md'>
            <span style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1 }}>X</span>
          </CloseButton>
          <CloseButton size='md' aria-label='Dismiss'>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </CloseButton>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>In Context (Dialog Header)</p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--tsu-container-padding-md)',
          border: '1px solid var(--tsu-neutral-7)',
          borderRadius: 'var(--tsu-radius-l2-md)',
          background: 'var(--tsu-bg)',
        }}>
          <span style={{ fontSize: 'var(--tsu-comp-font-size-md)', fontWeight: 600 }}>Dialog Title</span>
          <CloseButton size='md' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <div className='demo-row' style={{ gap: '12px' }}>
          <CloseButton size='sm' disabled />
          <CloseButton size='md' disabled />
          <CloseButton size='lg' disabled />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style={{ gap: '12px' }}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Size</span>
            <select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>
              {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>
            <input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled
          </label>
        </div>
        <div style={{ marginTop: '12px' }}>
          <CloseButton size={sizeSignal} disabled={disabledSignal} onClick={() => alert('Close clicked!')} />
        </div>
      </div>
    </div>
  )
}

export default CloseButtonPage
