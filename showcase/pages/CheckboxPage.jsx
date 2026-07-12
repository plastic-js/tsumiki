import { createSignal } from '@plastic-js/plastic'
import Checkbox from '../../src/components/Checkbox.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function CheckboxPage(){
  const checkedSignal = createSignal(false)
  const disabledSignal = createSignal(false)
  const roundedSignal = createSignal(true)
  const invalidSignal = createSignal(false)
  const sizeSignal = createSignal('md')
  const demoChecked = createSignal(true)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>Checkbox</h1>
        <p className='hero-copy'>
          A checkbox with five sizes, indeterminate state, and built-in check icon.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Unchecked Sizes</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Checked Sizes</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} checked={demoChecked} onCheckedChange={v => demoChecked(v.checked)}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid — Unchecked</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} invalid>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid — Checked</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} invalid checked={demoChecked} onCheckedChange={v => demoChecked(v.checked)}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid — Disabled</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} invalid disabled checked={demoChecked} onCheckedChange={v => demoChecked(v.checked)}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled — Unchecked</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} disabled>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled — Checked</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} disabled checked={demoChecked} onCheckedChange={v => demoChecked(v.checked)}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Not Rounded</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} rounded={false}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Not Rounded — Checked</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Checkbox key={s} size={s} rounded={false} checked={demoChecked} onCheckedChange={v => demoChecked(v.checked)}>{s.toUpperCase()}</Checkbox>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Indeterminate</p>
        <Checkbox checked="indeterminate">Select all</Checkbox>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid — Indeterminate</p>
        <Checkbox checked="indeterminate" invalid>Select all</Checkbox>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label><select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
          <label><input checked={roundedSignal} onChange={e => roundedSignal(e.target.checked)} type='checkbox' /> Rounded</label>
          <label><input checked={invalidSignal} onChange={e => invalidSignal(e.target.checked)} type='checkbox' /> Invalid</label>
        </div>
        <Checkbox
          checked={checkedSignal} disabled={disabledSignal} invalid={invalidSignal}
          onCheckedChange={v => checkedSignal(v)} rounded={roundedSignal} size={sizeSignal}
        >
          {() => `Checked: ${String(checkedSignal())}`}
        </Checkbox>
      </div>
    </div>
  )
}

export default CheckboxPage
