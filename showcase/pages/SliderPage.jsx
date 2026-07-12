import { createSignal } from '@plastic-js/plastic'
import Slider from '../../src/components/Slider.jsx'

function SliderPage(){
  const valueSignal = createSignal([50])
  const minSignal = createSignal(0)
  const maxSignal = createSignal(100)
  const stepSignal = createSignal(1)
  const labelSignal = createSignal([75])
  const zoomSignal = createSignal([100])
  const customSignal = createSignal([50])

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>Slider</h1>
        <p className='hero-copy'>
          A single-thumb range slider with a dragging value indicator.
          Customizable min, max, and step.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <Slider value={valueSignal} onValueChange={v => valueSignal(v)} />
        <div className='demo-value'>Value: {() => valueSignal()[0]}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Label</p>
        <Slider label='Volume' value={labelSignal} onValueChange={v => labelSignal(v.value)} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom Range</p>
        <Slider label='Zoom' min={10} max={200} step={10} value={zoomSignal} onValueChange={v => zoomSignal(v.value)} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Interactive</p>
        <div className='demo-check-row' style="gap:16px;margin-bottom:12px">
          <label>Min: <input type='number' className='demo-select' style="width:60px" value={minSignal()} onChange={e => minSignal(Number(e.target.value))} /></label>
          <label>Max: <input type='number' className='demo-select' style="width:60px" value={maxSignal()} onChange={e => maxSignal(Number(e.target.value))} /></label>
          <label>Step: <input type='number' className='demo-select' style="width:60px" value={stepSignal()} onChange={e => stepSignal(Number(e.target.value))} /></label>
        </div>
        <Slider label='Custom' min={minSignal()} max={maxSignal()} step={stepSignal()} value={customSignal} onValueChange={v => customSignal(v.value)} />
      </div>
    </div>
  )
}

export default SliderPage
