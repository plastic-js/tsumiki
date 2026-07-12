import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const read = (v) => (typeof v === 'function' ? v() : v)

const baseClass = css({
  position: 'sticky',
  zIndex: 'var(--tsu-z-dropdown)',
  backgroundColor: 'var(--tsu-bg)',
})

const shadowClass = css({
  boxShadow: 'var(--tsu-shadow-sm)',
})

const StickyHeader = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ offsetTop: 0 }, props),
    ['className', 'children', 'offsetTop', 'shadow', 'style'],
  )

  return (
    <div
      {...rest}
      className={() => [baseClass, read(local.shadow) && shadowClass, local.className].filter(Boolean).join(' ')}
      style={() => ({
        top: `${read(local.offsetTop)}px`,
        ...(typeof local.style === 'object' && local.style ? local.style : undefined),
      })}
    >
      {local.children}
    </div>
  )
}

StickyHeader.origin = { Root: 'div' }

export default StickyHeader
export { StickyHeader }
