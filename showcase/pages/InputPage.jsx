import { createSignal } from '@plastic-js/plastic'
import Input from '../../src/components/Input.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function SearchIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function InputPage(){
  const sizeSignal = createSignal('md')
  const solidSignal = createSignal(false)
  const intentSignal = createSignal('default')
  const disabledSignal = createSignal(false)
  const invalidSignal = createSignal(false)
  const valueSignal = createSignal('')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>Input</h1>
        <p className='hero-copy'>
          A text input with solid &amp; outline variants, five sizes,
          invalid state, and prefix / suffix slots.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Outline Sizes</p>
        <div className='demo-row'>
          {SIZES.map(s => <Input key={s} size={s} placeholder={s.toUpperCase()} />)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Solid Sizes</p>
        <div className='demo-row'>
          {SIZES.map(s => <Input key={s} variant="solid" size={s} placeholder={s.toUpperCase()} />)}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Outline Intents</p>
        <div className='demo-row'>
          <Input placeholder='Default' />
          <Input intent='neutral' placeholder='Neutral' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid</p>
        <div className='demo-row'>
          <Input placeholder='Invalid' invalid />
          <Input variant='solid' placeholder='Invalid solid' invalid />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Password</p>
        <div className='demo-row'>
          <Input type='password' placeholder='Enter password' />
          <Input type='password' variant="solid" placeholder='Solid password' />
          <Input type='password' placeholder='Invalid password' invalid />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Prefix &amp; Suffix (Text)</p>
        <div className='demo-row'>
          <Input prefix='$' placeholder='0.00' />
          <Input suffix='.com' placeholder='domain' />
          <Input prefix='https://' suffix='.com' placeholder='example' />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Prefix &amp; Suffix (Icon)</p>
        <div className='demo-row'>
          <Input prefix={<SearchIcon />} placeholder='Search components…' />
          <Input
            suffix="Go"
            placeholder='domain'
          />
          <Input
            prefix='$'
            suffix={<SearchIcon />}
            placeholder='0.00'
          />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Prefix &amp; Suffix with Disabled</p>
        <div className='demo-row'>
          <Input prefix='$' placeholder='0.00' disabled />
          <Input prefix={<SearchIcon />} placeholder='Search…' disabled />
          <Input suffix=".com" placeholder='domain' disabled />
          <Input prefix='$' suffix={<SearchIcon />} placeholder='0.00' disabled />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>States</p>
        <div className='demo-row'>
          <Input placeholder='Disabled' disabled />
          <Input placeholder='Invalid' invalid />
          <Input variant="solid" placeholder='Disabled Solid' disabled />
          <Input variant="solid" placeholder='Invalid Solid' invalid />
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row'>
          <label><select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
          <label><input checked={solidSignal} onChange={e => solidSignal(e.target.checked)} type='checkbox' /> Solid</label>
          <label>
            <select className='demo-select' onChange={e => intentSignal(e.target.value)} value={intentSignal()}>
              <option value='default'>Default</option>
              <option value='neutral'>Neutral</option>
            </select>
          </label>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type='checkbox' /> Disabled</label>
          <label><input checked={invalidSignal} onChange={e => invalidSignal(e.target.checked)} type='checkbox' /> Invalid</label>
        </div>
        <Input
          disabled={disabledSignal} intent={intentSignal} invalid={invalidSignal} placeholder='Type something…'
          size={sizeSignal} variant={() => (solidSignal() ? 'solid' : 'outline')}
          value={valueSignal} onChange={e => valueSignal(e.target.value)}
        />
        <div className='demo-value'>Value: {() => valueSignal() || <em style="color:#999">empty</em>}</div>
      </div>
    </div>
  )
}

export default InputPage
