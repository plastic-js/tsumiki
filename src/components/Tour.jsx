import { css } from '@emotion/css'
import { Tour as ArkTour } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const contentClass = css({
  padding: 'var(--tsu-container-padding-sm) var(--tsu-container-padding-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  boxShadow: 'var(--tsu-shadow-lg)',
  border: '1px solid var(--tsu-border)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  color: 'var(--tsu-fg)',
  maxWidth: '280px',
})

const closeClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '6px',
  right: '6px',
  width: '22px',
  height: '22px',
  padding: 0,
  border: 'none',
  borderRadius: 'var(--tsu-radius-l1-xs)',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  fontSize: '16px',
  cursor: 'pointer',
})

const Tour = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkTour.Root {...rest} className={[local.className].filter(Boolean).join(' ')}>{local.children}</ArkTour.Root>
}

const TourContent = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkTour.Content {...rest} className={[contentClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkTour.Content>
}

const TourCloseTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkTour.CloseTrigger {...rest} className={[closeClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkTour.CloseTrigger>
}

Tour.origin = {
  Root: ArkTour.Root,
  Content: ArkTour.Content,
  CloseTrigger: ArkTour.CloseTrigger,
}

export default Tour
export { Tour, TourContent, TourCloseTrigger }
