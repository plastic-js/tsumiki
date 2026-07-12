import { createSignal } from '@plastic-js/plastic'
import Toggle from '../../src/components/Toggle.jsx'

function TogglePage(){
  const pressedSignal = createSignal(false)
  const disabledSignal = createSignal(false)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>Toggle</h1>
        <p className='hero-copy'>
          A pressable toggle button with pressed state styling.
          Ideal for single-mode switches like bold/italic.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>States</p>
        <div className='demo-row'>
          <Toggle>Default</Toggle>
          <Toggle defaultPressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
        </div>
        <Toggle disabled={disabledSignal()} pressed={pressedSignal} onPressedChange={v => pressedSignal(v)}>
          {() => pressedSignal() ? 'ON' : 'OFF'}
        </Toggle>
      </div>
    </div>
  )
}

export default TogglePage
