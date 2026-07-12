import { createSignal } from '@plastic-js/plastic'
import Listbox from '../../src/components/Listbox.jsx'

const frameworks = ['Plastic JS', 'React', 'Vue', 'Svelte', 'Solid', 'Angular']

function ListboxPage(){
  const valueSignal = createSignal(null)
  const defaultValueSignal = createSignal(['React'])
  const disabledDefaultSignal = createSignal(['Plastic JS'])

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Picker</p>
        <h1>Listbox</h1>
        <p className='hero-copy'>
          A scrollable select list with highlighted keyboard navigation.
          Supports single and multiple selection modes.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Single Select</p>
        <Listbox value={valueSignal} onValueChange={v => valueSignal(v.value)} selectionMode='single'>
          <Listbox.origin.Label style="font-size:13px;font-weight:500;color:var(--tsu-neutral-11);margin-bottom:4px">Framework</Listbox.origin.Label>
          <Listbox.origin.Content>
            {frameworks.map(f => <Listbox.origin.Item key={f} value={f}><Listbox.origin.ItemText>{f}</Listbox.origin.ItemText></Listbox.origin.Item>)}
          </Listbox.origin.Content>
        </Listbox>
        <div className='demo-value'>Selected: {() => valueSignal() || <em style="color:#999">none</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Value</p>
        <Listbox value={defaultValueSignal} onValueChange={v => defaultValueSignal(v.value)} selectionMode='single'>
          <Listbox.origin.Content>
            {frameworks.map(f => <Listbox.origin.Item key={f} value={f}><Listbox.origin.ItemText>{f}</Listbox.origin.ItemText></Listbox.origin.Item>)}
          </Listbox.origin.Content>
        </Listbox>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled Items</p>
        <Listbox value={disabledDefaultSignal} onValueChange={v => disabledDefaultSignal(v.value)} selectionMode='single'>
          <Listbox.origin.Content>
            <Listbox.origin.Item value='Plastic JS'><Listbox.origin.ItemText>Plastic JS</Listbox.origin.ItemText></Listbox.origin.Item>
            <Listbox.origin.Item value='React'><Listbox.origin.ItemText>React</Listbox.origin.ItemText></Listbox.origin.Item>
            <Listbox.origin.Item value='Angular' disabled><Listbox.origin.ItemText>Angular (disabled)</Listbox.origin.ItemText></Listbox.origin.Item>
          </Listbox.origin.Content>
        </Listbox>
      </div>
    </div>
  )
}

export default ListboxPage
