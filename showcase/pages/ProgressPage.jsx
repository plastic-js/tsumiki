import { createSignal } from '@plastic-js/plastic'
import Progress, { ProgressLabel } from '../../src/components/Progress.jsx'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

function ProgressPage(){
  const valueSignal = createSignal(65)
  const sizeSignal = createSignal('md')
  const stripedSignal = createSignal(false)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Feedback</p>
        <h1>Progress</h1>
        <p className='hero-copy'>
          A progress bar with five sizes, optional striped animation,
          and label support.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div style="display:flex;flex-direction:column;gap:12px">
          {SIZES.map(s => (
            <Progress key={s} size={s} value={40 + SIZES.indexOf(s) * 15} />
          ))}
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Label</p>
        <Progress value={75} label="File Upload" />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Striped Animated</p>
        <Progress striped value={60} label="Downloading" />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style="gap:16px">
          <label><select className='demo-select' onChange={e => sizeSignal(e.target.value)} value={sizeSignal()}>{SIZES.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
          <label><input checked={stripedSignal} onChange={e => stripedSignal(e.target.checked)} type='checkbox' /> Striped</label>
          <label>Value: <input className='demo-select' max='100' min='0' onChange={e => valueSignal(Number(e.target.value))} style="width:60px" type='number' value={valueSignal()} /></label>
        </div>
        <Progress size={sizeSignal} striped={stripedSignal} value={valueSignal}>
          <ProgressLabel>Completion</ProgressLabel>
        </Progress>
      </div>
    </div>
  )
}

export default ProgressPage
