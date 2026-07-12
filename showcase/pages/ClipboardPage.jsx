import { createSignal } from '@plastic-js/plastic'
import Clipboard from '../../src/components/Clipboard.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function ClipboardPage(){
  const valueSignal = createSignal('https://tsumiki.dev/secret-code')
  const sizeSignal = createSignal('md')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Utility</p>
        <h1>Clipboard</h1>
        <p className='hero-copy'>
          A copy-to-clipboard button with icon feedback animation.
          Configurable <span className='tag'>size</span>,
          <span className='tag'>value</span>, and
          <span className='tag'>copiedDuration</span>.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row' style={{ gap: '12px' }}>
          {SIZES.map(s => (
            <Clipboard key={s} size={s} value={s} />
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Label</p>
        <div className='demo-check-row' style={{ gap: '12px', alignItems: 'flex-start' }}>
          <Clipboard size='sm' value='npm install @plastic-js/tsumiki'>Copy</Clipboard>
          <Clipboard size='md' value='npm install @plastic-js/tsumiki'>Copy Command</Clipboard>
          <Clipboard size='lg' value='npm install @plastic-js/tsumiki'>Copy</Clipboard>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Copy Different Values</p>
        <div className='demo-check-row' style={{ gap: '12px', alignItems: 'flex-start' }}>
          <Clipboard size='md' value='sk-live-abc123def456ghi789'>API Key</Clipboard>
          <Clipboard size='md' value='https://tsumiki.dev/dashboard'>URL</Clipboard>
          <Clipboard size='md' value='const name = "Tsumiki";'>Code</Clipboard>
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
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Value</span>
            <input className='demo-select' onChange={e => valueSignal(e.target.value)} style='width:220px' type='text' value={valueSignal()} />
          </label>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Clipboard size={sizeSignal} value={valueSignal}>Copy</Clipboard>
        </div>
      </div>
    </div>
  )
}

export default ClipboardPage
