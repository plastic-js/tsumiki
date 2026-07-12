import { createSignal } from '@plastic-js/plastic'
import Tag from '../../src/components/Tag.jsx'

const INTENTS = ['default', 'success', 'warning', 'danger', 'info']
const VARIANTS = ['solid', 'surface', 'subtle', 'outline']

function TagPage(){
  const [tags, setTags] = createSignal(['React', 'Vue', 'Solid', 'Svelte'])

  const removeTag = (label)=> {
    setTags((prev)=> prev.filter((t)=> t !== label))
  }

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Elements</p>
        <h1>Tag</h1>
        <p className='hero-copy'>
          Small labels for categorization, filtering, or metadata.
          Solid, surface, subtle and outline variants with success/warning/danger/info intents and optional close button.
        </p>
      </div>

      {VARIANTS.map((variant)=> (
        <div className='feature-card' key={variant}>
          <p className='demo-label'>{variant[0].toUpperCase() + variant.slice(1)} — all intents</p>
          <div className='demo-row' style="gap:8px;flex-wrap:wrap">
            {INTENTS.map((intent)=> <Tag key={intent} variant={variant} intent={intent}>{intent}</Tag>)}
          </div>
        </div>
      ))}

      <div className='feature-card'>
        <p className='demo-label'>Sizes — subtle default</p>
        <div className='demo-row' style="gap:8px;align-items:center;flex-wrap:wrap">
          <Tag size="xs">xs</Tag>
          <Tag size="sm">sm</Tag>
          <Tag size="md">md</Tag>
          <Tag size="lg">lg</Tag>
          <Tag size="xl">xl</Tag>
          <Tag size="2xl">2xl</Tag>
        </div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Closable</p>
        <div className='demo-row' style="gap:8px;align-items:center;flex-wrap:wrap">
          {tags().map((label)=> (
            <Tag key={label} closable onClose={()=> removeTag(label)}>{label}</Tag>
          ))}
        </div>
        <div className='demo-value'>Value: {() => tags().join(', ') || <em style="color:#999">empty</em>}</div>
      </div>
    </div>
  )
}

export default TagPage
