import { css } from '@emotion/css'
import { Drawer as ArkDrawer } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'
import Icon from './Icon.jsx'

const backdropClass = css({
	position: 'fixed',
	inset: 0,
	background: 'var(--tsu-bg-overlay)',
	backdropFilter: 'blur(4px)',
	'&[hidden]': { display: 'none' },
})

const positionerClass = css({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	justifyContent: 'flex-end',
	pointerEvents: 'none',
	'&[hidden]': { display: 'none' },
})

const contentClass = css({
	pointerEvents: 'auto',
	background: 'var(--tsu-bg-panel)',
	borderLeft: '1px solid var(--tsu-border)',
	width: 'min(320px, calc(100vw - 24px))',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	color: 'var(--tsu-fg)',
	boxShadow: 'var(--tsu-shadow-lg)',
	'&[hidden]': { display: 'none' },
})

const headClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '18px var(--tsu-container-padding-lg)',
	borderBottom: '1px solid var(--tsu-border)',
	flexShrink: 0,
})

const titleWrapClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	minWidth: 0,
})

const titleIconClass = css({
	flexShrink: 0,
	color: 'var(--tsu-accent-solid-bg)',
})

const titleClass = css({
	fontSize: '18px',
	fontWeight: 'var(--tsu-font-weight-semibold)',
	margin: 0,
})

const closeBtnClass = css({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	background: 'transparent',
	border: 'none',
	color: 'var(--tsu-text-secondary)',
	fontSize: '22px',
	lineHeight: 1,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'&[hidden]': { display: 'none' },
})

const bodyClass = css({
	padding: 'var(--tsu-container-padding-lg)',
	overflowY: 'auto',
	flex: 1,
})

const descClass = css({
	margin: '8px 0 0',
	fontSize: 'var(--tsu-comp-font-size-sm)',
	color: 'var(--tsu-text-secondary)',
	lineHeight: 1.5,
})

const ArkRoot = ArkDrawer.Root

const Root = (props = {})=> {
	const [local, rest] = splitProps(props, ['onOpen', 'onClose', 'onOpenChange', 'closeOnInteractOutside', 'lazyMount', 'zIndex'])
	return <ArkRoot {...mergeProps(rest, {
		placement: rest.placement ?? 'right',
		zIndex: local.zIndex ?? null,
		closeOnInteractOutside: local.closeOnInteractOutside ?? false,
		lazyMount: local.lazyMount ?? true,
		onOpenChange: (open)=> {
			local.onOpenChange?.(open)
			if (open) { local.onOpen?.() } else { local.onClose?.() }
		},
	})} />
}

const DrawerContent = (props)=> {
  const [local] = splitProps(props, ['title', 'icon', 'description', 'children'])
  return (
    <Portal>
      <ArkDrawer.Backdrop className={backdropClass} />
      <ArkDrawer.Positioner className={positionerClass}>
        <ArkDrawer.Content className={contentClass}>
          <div className={headClass}>
            <div className={titleWrapClass}>
              {local.icon && <Icon className={titleIconClass} size={20} svg={local.icon} />}
              <ArkDrawer.Title className={titleClass}>
                {local.title}
              </ArkDrawer.Title>
            </div>
            <ArkDrawer.CloseTrigger aria-label='Close' className={closeBtnClass} hidden>×</ArkDrawer.CloseTrigger>
          </div>
          <div className={bodyClass}>
            {local.description && <ArkDrawer.Description className={descClass}>{local.description}</ArkDrawer.Description>}
            {local.children}
          </div>
        </ArkDrawer.Content>
      </ArkDrawer.Positioner>
    </Portal>
  )
}

const DrawerTrigger = ArkDrawer.Trigger

Root.origin = {
  Root: ArkDrawer.Root,
  Trigger: ArkDrawer.Trigger,
  Backdrop: ArkDrawer.Backdrop,
  Positioner: ArkDrawer.Positioner,
  Content: ArkDrawer.Content,
  Title: ArkDrawer.Title,
  Description: ArkDrawer.Description,
  CloseTrigger: ArkDrawer.CloseTrigger,
}

export default Root
export { Root as Drawer, DrawerTrigger, DrawerContent }
