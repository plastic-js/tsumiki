import { createSignal } from '@plastic-js/plastic'
import Switch from '../../src/components/Switch.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function SwitchPage(){
  const checkedSignal = createSignal(false)
  const disabledSignal = createSignal(false)
  const sizeSignal = createSignal('md')
  const demoOnSignal = createSignal(true)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>Switch</h1>
        <p className='hero-copy'>
          An accessible toggle switch with five sizes and smooth thumb animation.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Off Sizes</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Switch key={s} size={s}>{s.toUpperCase()}</Switch>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>On Sizes</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => <Switch key={s} size={s} checked={demoOnSignal} onCheckedChange={v => demoOnSignal(v.checked)}>{s.toUpperCase()}</Switch>)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <div className='demo-row' style="gap:16px">
          <Switch disabled>Off</Switch>
          <Switch disabled checked={demoOnSignal} onCheckedChange={v => demoOnSignal(v.checked)}>On</Switch>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label><select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
        </div>
        <Switch
          checked={checkedSignal} disabled={disabledSignal()}
          onCheckedChange={v => checkedSignal(v)} size={sizeSignal()}
        >
          {() => checkedSignal() ? 'On' : 'Off'}
        </Switch>
      </div>
    </div>
  )
}

export default SwitchPage
