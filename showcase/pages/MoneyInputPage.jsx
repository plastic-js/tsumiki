import { createSignal } from '@plastic-js/plastic'
import MoneyInput from '../../src/components/MoneyInput.jsx'

function MoneyInputPage(){
  const valueSignal = createSignal('1500000')
  const invalidSignal = createSignal(false)
  const disabledSignal = createSignal(false)
  const usdSignal = createSignal('250000')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>MoneyInput</h1>
        <p className='hero-copy'>
          A currency input with thousand-separator formatting. Keeps
          digits-only value but renders with commas for readability.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default (₱)</p>
        <MoneyInput value={valueSignal} onValueChange={v => valueSignal(v)} />
        <div className='demo-value'>Raw value: {() => valueSignal() || '0'}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>USD ($) with Affix (K)</p>
        <MoneyInput currency='$' affix='K' value={usdSignal} onValueChange={v => usdSignal(v)} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>States</p>
        <div className='demo-check-row'>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
          <label><input checked={invalidSignal} onChange={e => invalidSignal(e.target.checked)} type='checkbox' /> Invalid</label>
        </div>
        <MoneyInput
          disabled={disabledSignal()} invalid={invalidSignal()}
          onValueChange={v => valueSignal(v)} placeholder='Enter amount' value={valueSignal}
        />
      </div>
    </div>
  )
}

export default MoneyInputPage
