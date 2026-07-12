import { createSignal } from '@plastic-js/plastic'
import DatePicker from '../../src/components/DatePicker.jsx'

function DatePickerPage(){
  const valueSignal = createSignal('2024-12-25')
  const disabledSignal = createSignal(false)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Input</p>
        <h1>Date Picker</h1>
        <p className='hero-copy'>
          A date picker with a read-only trigger and a bottom-sheet three-column
          wheel picker for year, month, and day. Supports <code>value</code>, <code>onValueChange</code>,
          <code>placeholder</code>, and <code>disabled</code> time props.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default</p>
        <DatePicker placeholder='Select date' />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Label</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Birth Date</label>
          <DatePicker placeholder='Pick a date' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Value</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Appointment</label>
          <DatePicker value='2024-12-25' placeholder='Select date' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Unavailable</label>
          <DatePicker value='2024-12-25' disabled placeholder='Select date' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Neutral</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Appointment</label>
          <DatePicker intent='neutral' placeholder='Select date' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Expired</label>
          <DatePicker invalid placeholder='Select date' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Backdrop Dismissible</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Appointment</label>
          <DatePicker closeOnBackdrop placeholder='Select date' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style={{ gap: '12px', marginBottom: '12px' }}>
          <label>
            <input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled
          </label>
          <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>
            Selected: {() => valueSignal() || <em style='color:#999'>none</em>}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>Date</label>
          <DatePicker
            value={valueSignal}
            onValueChange={(d) => valueSignal(d ? d.toISOString().slice(0, 10) : '')}
            disabled={disabledSignal}
            placeholder='Pick a date'
          />
        </div>
      </div>
    </div>
  )
}

export default DatePickerPage
