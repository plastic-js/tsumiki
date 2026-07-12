import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const baseClass = css({
  backgroundColor: 'var(--tsu-surface)',
  borderRadius: 'var(--tsu-radius-l2-md)',
})

const Card = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({}, props),
    ['className', 'children'],
  )

  return (
    <div {...rest} className={[baseClass, local.className].filter(Boolean).join(' ')}>
      {local.children}
    </div>
  )
}

Card.origin = { Root: 'div' }

export default Card
export { Card }
