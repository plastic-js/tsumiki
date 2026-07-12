import { createSignal } from '@plastic-js/plastic'
import NumberInput from '../../src/components/NumberInput.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function NumberInputPage(){
  const valueSignal = createSignal(0)
  const disabledSignal = createSignal(false)
  const sizeSignal = createSignal('md')
  const sizesDemoSignal = createSignal(0)
  const boundsSignal = createSignal(5)
  const stepSignal = createSignal(25)
  const disabledDemoSignal = createSignal(42)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>NumberInput</h1>
        <p className='hero-copy'>
          A numeric input with built-in increment and decrement
          buttons. Supports five sizes and custom min/max/step.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <NumberInput key={s} size={s} value={sizesDemoSignal} onValueChange={v => sizesDemoSignal(v.valueAsNumber)} />)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Bounds</p>
        <NumberInput min={0} max={10} value={boundsSignal} onValueChange={v => boundsSignal(v.valueAsNumber)} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Step</p>
        <NumberInput step={5} value={stepSignal} onValueChange={v => stepSignal(v.valueAsNumber)} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <NumberInput disabled value={disabledDemoSignal} onValueChange={v => disabledDemoSignal(v.valueAsNumber)} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label><select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
        </div>
        <NumberInput disabled={disabledSignal} size={sizeSignal} value={valueSignal} onValueChange={v => valueSignal(v.valueAsNumber)} />
        <div className='demo-value'>Value: {() => valueSignal()}</div>
      </div>
    </div>
  )
}

export default NumberInputPage
