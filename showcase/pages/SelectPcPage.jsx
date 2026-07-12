import { createSignal } from '@plastic-js/plastic'
import SelectPc, { SelectItem } from '../../src/components/SelectPc.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
const cities = [
  { value: 'tpe', label: 'Taipei' },
  { value: 'txg', label: 'Taichung' },
  { value: 'kxg', label: 'Kaohsiung' },
  { value: 'tnn', label: 'Tainan' },
  { value: 'tao', label: 'Taoyuan' },
]

function SelectPcPage(){
  const valueSignal = createSignal('')
  const sizeSignal = createSignal('md')
  const disabledSignal = createSignal(false)
  const solidSignal = createSignal(false)
  const invalidSignal = createSignal(false)
  const sizesSelectSignal = createSignal(['tpe'])
  const defaultSelectSignal = createSignal(['tpe'])
  const disabledSelectSignal = createSignal(['kxg'])
  const solidSelectSignal = createSignal(['tdc'])
  const invalidSelectSignal = createSignal(['tpe'])

  const renderItems = () => cities.map(c => <SelectItem key={c.value} item={c}>{c.label}</SelectItem>)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Picker</p>
        <h1>Select</h1>
        <p className='hero-copy'>
          A desktop dropdown select with five sizes, chevron indicator,
          and keyboard-accessible item navigation.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => (
            <SelectPc key={s} size={s} placeholder={s.toUpperCase()} items={cities} value={sizesSelectSignal} onValueChange={v => sizesSelectSignal(v)}>
              {renderItems()}
            </SelectPc>
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Solid Variant</p>
        <div className='demo-row' style="gap:16px">
          {SIZES.map(s => (
            <SelectPc key={s} variant="solid" size={s} placeholder={s.toUpperCase()} items={cities} value={solidSelectSignal} onValueChange={v => solidSelectSignal(v)}>
              {renderItems()}
            </SelectPc>
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <SelectPc value={valueSignal} onValueChange={v => valueSignal(v?.[0] ?? '')} items={cities} placeholder='Choose a city'>
          {renderItems()}
        </SelectPc>
        <div className='demo-value'>Selected: {() => valueSignal() || <em style="color:#999">none</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Value</p>
        <SelectPc value={defaultSelectSignal} onValueChange={v => defaultSelectSignal(v)} items={cities} placeholder='Choose'>
          {renderItems()}
        </SelectPc>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <SelectPc disabled value={disabledSelectSignal} onValueChange={v => disabledSelectSignal(v)} items={cities} placeholder='Locked'>
          {renderItems()}
        </SelectPc>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid / Error</p>
        <SelectPc invalid value={invalidSelectSignal} onValueChange={v => invalidSelectSignal(v)} items={cities} placeholder='Required field'>
          {renderItems()}
        </SelectPc>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label><select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
          <label><input checked={solidSignal} onChange={e => solidSignal(e.target.checked)} type='checkbox' /> Solid</label>
          <label><input checked={invalidSignal} onChange={e => invalidSignal(e.target.checked)} type='checkbox' /> Invalid</label>
        </div>
        <SelectPc
          disabled={disabledSignal()} invalid={invalidSignal()} variant={solidSignal() ? 'solid' : 'outline'}
          value={valueSignal} onValueChange={v => valueSignal(v?.[0] ?? '')}
          items={cities} placeholder='Choose a city' size={sizeSignal()}
        >
          {renderItems()}
        </SelectPc>
        <div className='demo-value'>Selected: {() => valueSignal() || <em style="color:#999">none</em>}</div>
      </div>
    </div>
  )
}

export default SelectPcPage
