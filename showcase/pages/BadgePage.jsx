import Badge from '../../src/components/Badge.jsx'

const INTENTS = ['default', 'danger', 'success', 'warning', 'info', 'intent']
const VARIANTS = ['solid', 'surface', 'subtle', 'outline']

function BadgePage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Elements</p>
        <h1>Badge</h1>
        <p className='hero-copy'>
          Small status indicators for counts, states, or labels.
          Solid, surface, subtle and outline variants with danger/success/warning/info/intent intents and an optional dot.
        </p>
      </div>

      {VARIANTS.map((variant)=> (
        <div className='feature-card' key={variant}>
          <p className='demo-label'>{variant[0].toUpperCase() + variant.slice(1)} — all intents</p>
          <div className='demo-row' style="gap:8px;flex-wrap:wrap">
            {INTENTS.map((intent)=> <Badge key={intent} variant={variant} intent={intent}>{intent}</Badge>)}
          </div>
        </div>
      ))}

      <div className='feature-card'>
        <p className='demo-label'>Sizes</p>
        <div className='demo-row' style="gap:8px;align-items:center;flex-wrap:wrap">
          <Badge size="xs">xs</Badge>
          <Badge size="sm">sm</Badge>
          <Badge size="md">md</Badge>
          <Badge size="lg">lg</Badge>
          <Badge size="xl">xl</Badge>
          <Badge size="2xl">2xl</Badge>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With dot</p>
        <div className='demo-row' style="gap:8px;align-items:center;flex-wrap:wrap">
          <Badge dot variant="subtle" intent="success">Online</Badge>
          <Badge dot variant="outline" intent="warning">Pending</Badge>
          <Badge dot variant="surface" intent="danger">Offline</Badge>
          <Badge dot variant="solid" intent="info">New</Badge>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Use cases</p>
        <div className='demo-row' style="gap:8px;align-items:center;flex-wrap:wrap">
          <Badge>Beta</Badge>
          <Badge variant="outline" intent="danger">3 unread</Badge>
          <Badge variant="subtle" intent="success" dot>Active</Badge>
          <Badge variant="outline" intent="intent">v0.1.55</Badge>
        </div>
      </div>
    </div>
  )
}

export default BadgePage
