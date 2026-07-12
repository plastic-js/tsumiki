import { createSignal } from '@plastic-js/plastic'
import Button from '../../src/components/Button.jsx'
import Collapsible, { CollapsibleTrigger, CollapsibleContent } from '../../src/components/Collapsible.jsx'

function CollapsiblePage(){
  const openSignal = createSignal(false)
  const defaultOpenSignal = createSignal(true)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>Collapsible</h1>
        <p className='hero-copy'>
          A single-section show/hide panel with animated chevron.
          Use <span className='tag'>Collapsible</span> as the root, with
          <span className='tag'>CollapsibleTrigger</span> and
          <span className='tag'>CollapsibleContent</span> sub-components.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default</p>
        <Collapsible>
          <CollapsibleTrigger>View Details</CollapsibleTrigger>
          <CollapsibleContent>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              This content is hidden by default and revealed when the trigger is clicked.
              The chevron icon rotates to indicate the open/closed state.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Open</p>
        <Collapsible open={defaultOpenSignal} onOpenChange={v => defaultOpenSignal(v.open)}>
          <CollapsibleTrigger>Project Information</CollapsibleTrigger>
          <CollapsibleContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0 }}>This section starts open by default.</p>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: 'var(--tsu-comp-font-size-sm)', color: 'var(--tsu-neutral-11)' }}>
                <li>Version: 2.1.0</li>
                <li>License: MIT</li>
                <li>Author: Plastic JS</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Controlled (External Toggle)</p>
        <div style={{ marginBottom: '12px' }}>
          <Button size='sm' onClick={() => openSignal(!openSignal())}>
            {openSignal() ? 'Collapse' : 'Expand'}
          </Button>
        </div>
        <Collapsible open={openSignal}>
          <CollapsibleTrigger>Details</CollapsibleTrigger>
          <CollapsibleContent>
            <p style={{ margin: 0 }}>
              This collapsible is controlled externally. The button above toggles its open state.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <Collapsible>
          <CollapsibleTrigger disabled>Restricted Content</CollapsibleTrigger>
          <CollapsibleContent>
            <p style={{ margin: 0 }}>This content requires authentication to access.</p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default CollapsiblePage
