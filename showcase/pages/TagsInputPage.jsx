import { createSignal } from '@plastic-js/plastic'
import TagsInput from '../../src/components/TagsInput.jsx'

function TagsInputPage(){
  const valueSignal = createSignal([])
  const defaultTagsSignal = createSignal(['React', 'Vue', 'Svelte'])

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>TagsInput</h1>
        <p className='hero-copy'>
          A tag input field. Type and press Enter to add tags, click × to remove.
          Wraps input with accent-styled tag chips.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <TagsInput
          value={valueSignal}
          onValueChange={v => valueSignal(v)}
          label="Tags"
          placeholder="Add a tag…"
        />
        <div className='demo-value'>Value: {() => valueSignal().join(', ') || <em style="color:#999">empty</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default Tags</p>
        <TagsInput
          value={defaultTagsSignal}
          onValueChange={v => defaultTagsSignal(v)}
        />
      </div>
    </div>
  )
}

export default TagsInputPage
