import { css, keyframes } from '@emotion/css'
import { Popover as ArkPopover } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'

const popoverIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
})

const positionerClass = css({
  zIndex: 'var(--tsu-z-dropdown)',
  maxWidth: '100dvw',
  minWidth: '0 !important', // Override Zag's min-width:max-content to prevent the popover from overflowing the viewport
})

const contentClass = css({
  padding: 'var(--tsu-container-padding-sm)',
  backgroundColor: 'var(--tsu-bg-panel)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  boxShadow: 'var(--tsu-shadow-lg)',
  border: '1px solid var(--tsu-border)',
  animation: `${popoverIn} var(--tsu-transition-fast)`,
})

const arrowClass = css({
  '--arrow-size': '8px',
  '--arrow-background': 'var(--tsu-bg-panel)',
})

const closeTriggerClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '24px',
  height: '24px',
  padding: 0,
  border: 'none',
  borderRadius: 'var(--tsu-radius-l1-md)',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  cursor: 'pointer',
  touchAction: 'manipulation',
})

const titleClass = css({
  margin: 0,
  paddingRight: '24px',
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-fg)',
})

const descriptionClass = css({
  margin: 0,
  marginTop: '4px',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  color: 'var(--tsu-text-secondary)',
  lineHeight: 1.5,
})

const Popover = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ lazyMount: true, unmountOnExit: true, closeable: false }, props),
    ['title', 'description', 'closeable', 'className', 'children'],
  )
  const positioning = { ...rest.positioning, fitViewport: true }

  return (
    <ArkPopover.Root {...rest} positioning={positioning}>
      <ArkPopover.Trigger asChild>
        {local.children}
      </ArkPopover.Trigger>
      <Portal>
        <ArkPopover.Positioner className={positionerClass}>
          <ArkPopover.Content className={contentClass}>
            <ArkPopover.Arrow className={arrowClass}>
              <ArkPopover.ArrowTip className={arrowClass} />
            </ArkPopover.Arrow>
            {local.closeable && (
              <ArkPopover.CloseTrigger className={closeTriggerClass} aria-label='Close'>×</ArkPopover.CloseTrigger>
            )}
            {local.title && <ArkPopover.Title className={titleClass}>{local.title}</ArkPopover.Title>}
            {local.description && <ArkPopover.Description className={descriptionClass}>{local.description}</ArkPopover.Description>}
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  )
}

Popover.origin = {
  Root: ArkPopover.Root,
  Trigger: ArkPopover.Trigger,
  Positioner: ArkPopover.Positioner,
  Content: ArkPopover.Content,
  Arrow: ArkPopover.Arrow,
  ArrowTip: ArkPopover.ArrowTip,
  CloseTrigger: ArkPopover.CloseTrigger,
  Title: ArkPopover.Title,
  Description: ArkPopover.Description,
}

export default Popover
export { Popover }
