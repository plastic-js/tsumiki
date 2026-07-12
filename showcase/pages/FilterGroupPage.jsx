import { createSignal } from '@plastic-js/plastic'
import FilterGroup from '../../src/components/FilterGroup.jsx'

function FilterGroupPage(){
  const statusSignal = createSignal([])
  const typeSignal = createSignal(['fruit'])
  const allLabelSignal = createSignal([])
  const sizeSignals = { xs: createSignal([]), sm: createSignal([]), md: createSignal([]), lg: createSignal([]), xl: createSignal([]) }

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Selection</p>
        <h1>FilterGroup</h1>
        <p className='hero-copy'>
          A generic multi-select filter bar built on the Button component.
          Selecting any item clears "All"; clearing everything falls back to "All".
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic (xs)</p>
        <FilterGroup
          size='xs'
          items={[
            { value: 'pending', label: 'Pending' },
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          value={statusSignal}
          onValueChange={v => statusSignal(v)}
        />
        <div className='demo-value'>Selected: {() => statusSignal().length === 0 ? <em style="color:#999">All</em> : statusSignal().join(', ')}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Default Values (xs)</p>
        <FilterGroup
          size='xs'
          items={[
            { value: 'fruit', label: 'Fruit' },
            { value: 'vegetable', label: 'Vegetable' },
            { value: 'meat', label: 'Meat' },
            { value: 'dairy', label: 'Dairy' },
            { value: 'seafood', label: 'Seafood' },
          ]}
          value={typeSignal}
          onValueChange={v => typeSignal(v)}
        />
        <div className='demo-value'>Selected: {() => typeSignal().length === 0 ? <em style="color:#999">All</em> : typeSignal().join(', ')}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom All Label (xs)</p>
        <FilterGroup
          size='xs'
          allLabel='All Status'
          items={[
            { value: 'mobile', label: 'Mobile' },
            { value: 'tablet', label: 'Tablet' },
            { value: 'desktop', label: 'Desktop' },
          ]}
          value={allLabelSignal}
          onValueChange={v => allLabelSignal(v)}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sticky + Horizontal Scroll</p>
        <FilterGroup
          sticky
          size='sm'
          items={[
            { value: 'pending', label: 'Pending' },
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
            { value: 'archived', label: 'Archived' },
            { value: 'on-hold', label: 'On Hold' },
            { value: 'blocked', label: 'Blocked' },
            { value: 'in-review', label: 'In Review' },
            { value: 'rejected', label: 'Rejected' },
            { value: 'awaiting', label: 'Awaiting Input' },
            { value: 'escalated', label: 'Escalated' },
            { value: 'resolved', label: 'Resolved' },
          ]}
          value={createSignal([])}
        />
        <p className='demo-hint'>Scroll the page to see the bar stick to the top; scroll horizontally to see all pills.</p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-col'>
          {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
            <div key={size} className='demo-col'>
              <span className='demo-label'>{size}</span>
              <FilterGroup
                size={size}
                items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }]}
                value={sizeSignals[size]}
                onValueChange={v => sizeSignals[size](v)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterGroupPage
