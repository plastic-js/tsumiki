import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const read = (v) => (typeof v === 'function' ? v() : v)

const baseClass = css({
  boxSizing: 'border-box',
})

const positionClasses = {
  top: css({ paddingTop: 'env(safe-area-inset-top)' }),
  bottom: css({ paddingBottom: 'env(safe-area-inset-bottom)' }),
  left: css({ paddingLeft: 'env(safe-area-inset-left)' }),
  right: css({ paddingRight: 'env(safe-area-inset-right)' }),
}

const SafeArea = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ position: 'top' }, props),
    ['className', 'children', 'position'],
  )

  return (
    <div
      {...rest}
      className={() => [baseClass, positionClasses[read(local.position)], local.className].filter(Boolean).join(' ')}
    >
      {local.children}
    </div>
  )
}

SafeArea.origin = { Root: 'div' }

export default SafeArea
export { SafeArea }
