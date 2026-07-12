import { createSignal } from '@plastic-js/plastic'
import ToggleGroup, { ToggleGroupItem } from '../../src/components/ToggleGroup.jsx'

function ToggleGroupPage(){
  const singleValueSignal = createSignal(['plastic'])
  const multiValueSignal = createSignal(['plastic'])
  const disabledValueSignal = createSignal(['md'])
  const neutralValueSignal = createSignal(['plastic'])
  const sizeSignals = { xs: createSignal(['xs']), sm: createSignal(['sm']), md: createSignal(['md']), lg: createSignal(['lg']), xl: createSignal(['xl']) }

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>ToggleGroup</h1>
        <p className='hero-copy'>
          A segmented button group supporting single or multiple
          selection. Items have connected borders for a unified look.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Single Select</p>
        <ToggleGroup value={singleValueSignal} onValueChange={v => singleValueSignal(v)}>
          <ToggleGroupItem value='plastic'>Plastic</ToggleGroupItem>
          <ToggleGroupItem value='react'>React</ToggleGroupItem>
          <ToggleGroupItem value='vue'>Vue</ToggleGroupItem>
          <ToggleGroupItem value='svelte'>Svelte</ToggleGroupItem>
        </ToggleGroup>
        <div className='demo-value'>Selected: {() => singleValueSignal().join(', ') || <em style="color:#999">none</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Multiple Select</p>
        <ToggleGroup multiple value={multiValueSignal} onValueChange={v => multiValueSignal(v)}>
          <ToggleGroupItem value='plastic'>Plastic</ToggleGroupItem>
          <ToggleGroupItem value='react'>React</ToggleGroupItem>
          <ToggleGroupItem value='vue'>Vue</ToggleGroupItem>
          <ToggleGroupItem value='svelte'>Svelte</ToggleGroupItem>
        </ToggleGroup>
        <div className='demo-value'>Selected: {() => multiValueSignal().join(', ') || <em style="color:#999">none</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled Items</p>
        <ToggleGroup value={disabledValueSignal} onValueChange={v => disabledValueSignal(v)}>
          <ToggleGroupItem value='sm'>S</ToggleGroupItem>
          <ToggleGroupItem value='md'>M</ToggleGroupItem>
          <ToggleGroupItem value='lg'>L</ToggleGroupItem>
          <ToggleGroupItem value='xl' disabled>XL</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Neutral</p>
        <ToggleGroup intent='neutral' value={neutralValueSignal} onValueChange={v => neutralValueSignal(v)}>
          <ToggleGroupItem value='plastic'>Plastic</ToggleGroupItem>
          <ToggleGroupItem value='react'>React</ToggleGroupItem>
          <ToggleGroupItem value='vue'>Vue</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid</p>
        <ToggleGroup invalid value={neutralValueSignal} onValueChange={v => neutralValueSignal(v)}>
          <ToggleGroupItem value='plastic'>Plastic</ToggleGroupItem>
          <ToggleGroupItem value='react'>React</ToggleGroupItem>
          <ToggleGroupItem value='vue'>Vue</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-col'>
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
            <div key={size} className='demo-col'>
              <span className='demo-label'>{size}</span>
              <ToggleGroup size={size} value={sizeSignals[size]} onValueChange={v => sizeSignals[size](v)}>
                <ToggleGroupItem value='xs'>XS</ToggleGroupItem>
                <ToggleGroupItem value='sm'>SM</ToggleGroupItem>
                <ToggleGroupItem value='md'>MD</ToggleGroupItem>
                <ToggleGroupItem value='lg'>LG</ToggleGroupItem>
              </ToggleGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToggleGroupPage
