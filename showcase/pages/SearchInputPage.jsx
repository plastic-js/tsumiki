import { createSignal } from '@plastic-js/plastic'
import SearchInput from '../../src/components/SearchInput.jsx'

function SearchInputPage(){
  const valueSignal = createSignal('')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>SearchInput</h1>
        <p className='hero-copy'>
          A search input with a magnifying glass icon. Pure native input
          with no popover — use it for filtering or navigation.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <SearchInput
          onInput={e => valueSignal(e.target.value)}
          placeholder='Search components…'
          value={valueSignal}
        />
        <div className='demo-value'>Value: {() => valueSignal() || <em style="color:#999">empty</em>}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Disabled</p>
        <SearchInput disabled placeholder='Search disabled' />
      </div>
    </div>
  )
}

export default SearchInputPage
