import { createSignal } from '@plastic-js/plastic'
import RatingGroup from '../../src/components/RatingGroup.jsx'

function RatingGroupPage(){
  const value = createSignal(3)
  const defaultValueSignal = createSignal(4)
  const disabledValueSignal = createSignal(5)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>RatingGroup</h1>
        <p className='hero-copy'>
          A star rating control. Click to rate, hover to preview.
          Supports keyboard navigation and disabled state.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <RatingGroup count={5} value={value} onValueChange={v => value(v.value)} label="Rating" />
        <div className='demo-value'>Value: {() => value()} / 5</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Value</p>
        <RatingGroup count={5} value={defaultValueSignal} onValueChange={v => defaultValueSignal(v.value)} label="Quality" />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <RatingGroup count={5} value={disabledValueSignal} onValueChange={v => disabledValueSignal(v.value)} disabled label="Fixed" />
      </div>
    </div>
  )
}

export default RatingGroupPage
