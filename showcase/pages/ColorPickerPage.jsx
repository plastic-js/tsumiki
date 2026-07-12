import { createSignal } from '@plastic-js/plastic'
import ColorPicker from '../../src/components/ColorPicker.jsx'

function ColorPickerPage(){
  const valueSignal = createSignal('#6366f1')
  const alphaSignal = createSignal('#ec4899')
  const eyedropperSignal = createSignal('#10b981')
  const hiddenInputSignal = createSignal('#f59e0b')
  const sizesSignal = createSignal('#6366f1')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Picker</p>
        <h1>ColorPicker</h1>
        <p className='hero-copy'>
          A full-featured color picker with swatch trigger, area
          selector, channel sliders, and eyedropper.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Simplified API</p>
        <p className='demo-desc' style="margin-bottom:16px;color:var(--tsu-neutral-11);font-size:13px">
          One-liner — just pass <code>value</code> and <code>onChange</code>.
        </p>
        <ColorPicker value={valueSignal} onChange={v => valueSignal(v)} />
        <div className='demo-value'>Selected: {() => valueSignal()}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Label &amp; Alpha</p>
        <ColorPicker value={alphaSignal} onChange={v => alphaSignal(v)} label='Accent Color' showAlpha />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Eyedropper</p>
        <ColorPicker value={eyedropperSignal} onChange={v => eyedropperSignal(v)} label='Brand Color' eyedropper />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Hidden Input</p>
        <ColorPicker value={hiddenInputSignal} onChange={v => hiddenInputSignal(v)} hiddenInput />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Trigger Sizes</p>
        <div className='demo-row' style="gap:16px">
          {['xs','sm','md','lg','xl'].map(s => (
            <ColorPicker key={s} size={s} value={sizesSignal} onChange={v => sizesSignal(v)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ColorPickerPage
