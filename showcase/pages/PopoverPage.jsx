import Button from '../../src/components/Button.jsx'
import Popover from '../../src/components/Popover.jsx'

const DIRECTIONS = [
  { placement: 'top', label: 'Top' },
  { placement: 'bottom', label: 'Bottom' },
  { placement: 'left', label: 'Left' },
  { placement: 'right', label: 'Right' },
]

function PopoverPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Overlay</p>
        <h1>Popover</h1>
        <p className='hero-copy'>
          A floating card anchored to a trigger. Supports title,
          description, close trigger, and an animated arrow.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <div style="display:flex;gap:12px">
          <Popover title="Account Upgrade" description="Upgrade to Pro for advanced features and priority support.">
            <Button size='sm'>Open Popover</Button>
          </Popover>

          <Popover closeable title="Need Help?" description="Visit our docs or contact support.">
            <Button size='sm'>Info</Button>
          </Popover>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Direction (placement)</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          {DIRECTIONS.map(d => (
            <Popover
              key={d.placement}
              positioning={{ placement: d.placement }}
              title={d.label}
              description={`Placed on the ${d.label.toLowerCase()} of the trigger.`}
            >
              <Button size='sm'>{d.label}</Button>
            </Popover>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopoverPage
