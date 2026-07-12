import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const baseClass = css({
  color: 'var(--tsu-accent-plain-fg)',
  textDecoration: 'none',
  cursor: 'pointer',
  fontWeight: 'var(--tsu-font-weight-medium)',
  transition: 'color var(--tsu-transition-fast), text-decoration-color var(--tsu-transition-fast)',
  '&:hover': {
    textDecoration: 'underline',
    textDecorationColor: 'var(--tsu-accent-subtle-bg-hover)',
  },
  '&:focus-visible': {
    outline: '2px solid var(--tsu-focus-border)',
    outlineOffset: '2px',
    borderRadius: '2px',
  },
})

const Link = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({}, props),
    ['className', 'children'],
  )

  return (
    <a {...rest} className={[baseClass, local.className].filter(Boolean).join(' ')}>
      {local.children}
    </a>
  )
}

Link.origin = { Root: 'a' }

export default Link
export { Link }
