import { css } from '@emotion/css'
import { createSignal, splitProps } from '@plastic-js/plastic'
import Input from './Input.jsx'

const clearButtonClass = css({
  width: '28px',
  height: '28px',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  '& svg': { width: '100%', height: '100%' },
  '&:active': { color: 'var(--tsu-fg)', backgroundColor: 'var(--tsu-pressed)' },
})

function SearchIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const SearchInput = (props)=> {
  const [local, rest] = splitProps(props, ['placeholder', 'onInput'])
  const hasValue = createSignal(false)
  let inputEl = null

  const handleInput = (e) => {
    hasValue(e.target.value.length > 0)
    if (local.onInput) local.onInput(e)
  }

  const handleClear = () => {
    if (!inputEl) return
    hasValue(false)
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype, 'value'
    ).set
    nativeInputValueSetter.call(inputEl, '')
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    inputEl.focus()
  }

  return (
    <Input
      ref={el => { inputEl = el }}
      type="search"
      placeholder={local.placeholder ?? 'Search...'}
      onInput={handleInput}
      prefix={<SearchIcon />}
      suffix={() => hasValue() ? <button type="button" className={clearButtonClass} onClick={handleClear} aria-label="Clear search"><XIcon /></button> : null}
      {...rest}
    />
  )
}

export default SearchInput
export { SearchInput }
