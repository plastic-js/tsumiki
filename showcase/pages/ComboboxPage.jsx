import { createSignal } from '@plastic-js/plastic'
import Combobox, {
  ComboboxInput,
  ComboboxItem,
  ComboboxContent,
} from '../../src/components/Combobox.jsx'

const fruits = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Orange', 'Peach', 'Pear', 'Strawberry']
const cities = [
  { value: 'tpe', label: 'Taipei' },
  { value: 'txg', label: 'Taichung' },
  { value: 'kxg', label: 'Kaohsiung' },
]

function ComboboxPage(){
  const valueSignal = createSignal(null)
  const defaultValueSignal = createSignal('Mango')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Picker</p>
        <h1>Combobox</h1>
        <p className='hero-copy'>
          A filterable single-select dropdown. Type to narrow down
          options with highlighted keyboard navigation.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <Combobox onValueChange={v => valueSignal(v)} value={valueSignal}>
          <ComboboxInput placeholder='Search fruit...' />
          <ComboboxContent>
            {fruits.map(f => (
              <ComboboxItem key={f} value={f}>{f}</ComboboxItem>
            ))}
          </ComboboxContent>
        </Combobox>
        <div className='demo-value'>Selected: {() => valueSignal() || <em style="color:#999">none</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Value</p>
        <Combobox value={defaultValueSignal} onValueChange={v => defaultValueSignal(v)}>
          <ComboboxInput placeholder='Pick...' />
          <ComboboxContent>
            {fruits.map(f => <ComboboxItem key={f} value={f}>{f}</ComboboxItem>)}
          </ComboboxContent>
        </Combobox>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Object Items</p>
        <Combobox
          items={cities} itemToValue={item => item.value} itemToString={item => item.label}
          placeholder='Search city...'
        >
          <ComboboxInput />
          <ComboboxContent>
            {cities.map(c => <ComboboxItem key={c.value} value={c.value}>{c.label}</ComboboxItem>)}
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}

export default ComboboxPage
