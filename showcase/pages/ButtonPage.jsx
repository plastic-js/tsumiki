import { createSignal } from '@plastic-js/plastic'
import Button from '../../src/components/Button.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

const ButtonPage = ()=> {
  const sizeSignal = createSignal('md')
  const solidSignal = createSignal(false)
  const intentSignal = createSignal('default')
  const loadingSignal = createSignal(false)
  const disabledSignal = createSignal(false)

  return (
    <div className="container">
      <div className="hero">
        <p className='eyebrow'>Controls</p>
        <h1>Button</h1>
        <p className='hero-copy'>
          Solid &amp; outline variants, default / neutral / danger intents, five sizes.
          Driven by <span className='tag'>--tsu-*</span> design tokens.
        </p>
      </div>

      <div className="feature-card">
        <p className="demo-label">Solid / Default</p>
        <div className="demo-row">
          {SIZES.map(s => <Button key={s} size={s} variant="solid">{s.toUpperCase()}</Button>)}
        </div>
      </div>

      <div className="feature-card">
        <p className="demo-label">Solid / Danger</p>
        <div className="demo-row">
          {SIZES.map(s => <Button intent="danger" key={s} size={s} variant="solid">{s.toUpperCase()}</Button>)}
        </div>
      </div>

      <div className="feature-card">
        <p className="demo-label">Outline / Default</p>
        <div className="demo-row">
          {SIZES.map(s => <Button key={s} size={s}>{s.toUpperCase()}</Button>)}
        </div>
      </div>

      <div className="feature-card">
        <p className="demo-label">Outline / Neutral</p>
        <div className="demo-row">
          {SIZES.map(s => <Button intent="neutral" key={s} size={s}>{s.toUpperCase()}</Button>)}
        </div>
      </div>

      <div className="feature-card">
        <p className="demo-label">Outline / Danger</p>
        <div className="demo-row">
          {SIZES.map(s => <Button intent="danger" key={s} size={s}>{s.toUpperCase()}</Button>)}
        </div>
      </div>

      <div className="feature-card">
        <p className="demo-label">States</p>
        <div className="demo-row">
          <Button disabled variant="solid">Disabled Solid</Button>
          <Button disabled>Disabled Outline</Button>
          <Button loading variant="solid">Loading</Button>
        </div>
      </div>

      <div className="feature-card">
        <p className="demo-label">Interactive</p>
        <div className="demo-check-row">
          <label>
            <select className="demo-select" onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>
              {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label><input checked={solidSignal} onChange={e => solidSignal(e.target.checked)} type="checkbox" /> Solid</label>
          <label>
            <select className="demo-select" onChange={e => intentSignal(e.target.value)} value={intentSignal()}>
              <option value="default">Default</option>
              <option value="neutral">Neutral</option>
              <option value="danger">Danger</option>
            </select>
          </label>
          <label><input checked={loadingSignal} onChange={e => loadingSignal(e.target.checked)} type="checkbox" /> Loading</label>
          <label><input checked={disabledSignal} onChange={e => disabledSignal(e.target.checked)} type="checkbox" /> Disabled</label>
        </div>
        <Button
          disabled={disabledSignal} intent={intentSignal} loading={loadingSignal}
          size={sizeSignal} variant={() => (solidSignal() ? 'solid' : 'outline')}
        >
          Click me
        </Button>
      </div>
    </div>
  )
}

export default ButtonPage
