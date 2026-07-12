import { createSignal } from '@plastic-js/plastic'
import RadioGroup from '../../src/components/RadioGroup.jsx'

function RadioGroupPage(){
  const valueSignal = createSignal('tpe')
  const orientationSignal = createSignal('vertical')
  const disabledGroupSignal = createSignal(false)
  const horizontalSignal = createSignal('md')
  const disabledItemsSignal = createSignal('react')
  const fullyDisabledSignal = createSignal('card')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>RadioGroup</h1>
        <p className='hero-copy'>
          A radio button group for selecting a single option.
          Supports vertical and horizontal layouts.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Vertical Layout</p>
        <RadioGroup
          label='City'
          value={valueSignal}
          onValueChange={v => valueSignal(v)}
          items={[
            { value: 'tpe', label: 'Taipei' },
            { value: 'txg', label: 'Taichung' },
            { value: 'kxg', label: 'Kaohsiung' },
          ]}
        />
        <div className='demo-value'>Selected: {() => valueSignal()}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Horizontal Layout</p>
        <RadioGroup
          label='Size'
          orientation='horizontal'
          value={horizontalSignal}
          onValueChange={v => horizontalSignal(v.value)}
          items={[
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ]}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled Items</p>
        <RadioGroup
          label='Framework'
          value={disabledItemsSignal}
          onValueChange={v => disabledItemsSignal(v.value)}
          items={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular (disabled)', disabled: true },
          ]}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Entire Group Disabled</p>
        <RadioGroup
          label='Payment Method'
          value={fullyDisabledSignal}
          onValueChange={v => fullyDisabledSignal(v.value)}
          disabled
          items={[
            { value: 'card', label: 'Credit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'wire', label: 'Bank Wire' },
          ]}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label>
            <select
              className='demo-select'
              onChange={e => orientationSignal(e.target.value)}
              value={orientationSignal()}
            >
              <option value='vertical'>vertical</option>
              <option value='horizontal'>horizontal</option>
            </select>
          </label>
          <label>
            <input
              checked={disabledGroupSignal}
              onChange={e => disabledGroupSignal(e.target.checked)}
              type='checkbox'
            /> Disabled
          </label>
        </div>
        <RadioGroup
          label='Theme'
          value={valueSignal}
          onValueChange={v => valueSignal(v)}
          orientation={orientationSignal()}
          disabled={disabledGroupSignal()}
          items={[
            { value: 'tpe', label: 'Light' },
            { value: 'txg', label: 'Dark' },
            { value: 'kxg', label: 'System' },
          ]}
        />
        <div className='demo-value'>Selected: {() => valueSignal()}</div>
      </div>
    </div>
  )
}

export default RadioGroupPage
