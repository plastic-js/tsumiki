import { css } from '@emotion/css'
import { Dialog } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'
import Icon from './Icon.jsx'

const backdropClass = css({
	position: 'fixed',
	inset: 0,
	background: 'rgba(0, 0, 0, 0.6)',
	backdropFilter: 'blur(4px)',
	'&[hidden]': { display: 'none' },
})

const positionerClass = css({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	'@media (min-width: 640px)': {
		alignItems: 'center',
		padding: '24px',
	},
})

const contentClass = css({
	background: 'var(--surface)',
	border: '1px solid var(--border)',
	borderRadius: '20px 20px 0 0',
	width: '100%',
	maxWidth: '480px',
	maxHeight: '92vh',
	display: 'flex',
	flexDirection: 'column',
	color: 'var(--ink)',
	boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
	'&[hidden]': { display: 'none' },
	'@media (min-width: 640px)': {
		borderRadius: '20px',
	},
})

const headClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '18px 20px',
	borderBottom: '1px solid var(--border)',
})

const titleWrapClass = css({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	minWidth: 0,
})

const titleIconClass = css({
	flexShrink: 0,
	color: 'var(--accent)',
})

const titleClass = css({
	fontSize: '18px',
	fontWeight: 700,
	margin: 0,
})

const closeBtnClass = css({
	width: '32px',
	height: '32px',
	borderRadius: '50%',
	background: 'transparent',
	border: 'none',
	color: 'var(--muted)',
	fontSize: '22px',
	lineHeight: 1,
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'&:hover': { background: 'rgba(255,255,255,0.06)', color: 'var(--ink)' },
	'&[hidden]': { display: 'none' },
})

const bodyClass = css({
	padding: '20px',
	overflowY: 'auto',
})

const footClass = css({
	display: 'flex',
	gap: '10px',
	padding: '14px 20px 20px',
	borderTop: '1px solid var(--border)',
})

const btnClass = css({
	flex: 1,
	height: '46px',
	borderRadius: '10px',
	border: '1px solid var(--border)',
	background: 'transparent',
	color: 'var(--ink)',
	fontSize: '15px',
	fontWeight: 600,
	fontFamily: 'inherit',
	cursor: 'pointer',
	'&:hover': { borderColor: 'rgba(255,255,255,0.2)' },
})

const btnPrimaryClass = css({
	background: 'var(--accent)',
	borderColor: 'var(--accent)',
	color: '#fff',
	'&:hover': { filter: 'brightness(1.08)' },
	'&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
})

const OriginalRoot = Dialog.Root

const Root = (props = {})=> {
	const [local, rest] = splitProps(props, ['onOpen', 'onClose', 'onOpenChange', 'closeOnInteractOutside', 'lazyMount', 'zIndex'])
	return OriginalRoot(mergeProps(rest, {
		zIndex: local.zIndex ?? null,
		closeOnInteractOutside: local.closeOnInteractOutside ?? false,
		// Defer rendering the dialog body until it is first opened, then keep it
		// mounted. ark's Positioner gates its subtree on this via presence strategy.
		lazyMount: local.lazyMount ?? true,
		onOpenChange: (open)=> {
			local.onOpenChange?.(open)
			if (open){ local.onOpen?.() } else { local.onClose?.() }
		},
	}))
}

const Preset = (props)=> {
	const [local, rootProps] = splitProps(props, ['title', 'icon', 'cancelText', 'confirmText', 'onConfirm', 'loading', 'children'])
	return (
		<Root {...rootProps}>
			<Portal>
				<Dialog.Backdrop className={backdropClass} />
				<Dialog.Positioner className={positionerClass}>
					<Dialog.Content className={contentClass}>
						<div className={headClass}>
							<div className={titleWrapClass}>
								{local.icon && <Icon className={titleIconClass} size={20} svg={local.icon} />}
								<Dialog.Title className={titleClass}>
									{local.title}
								</Dialog.Title>
							</div>
							<Dialog.CloseTrigger aria-label='Close' className={closeBtnClass} hidden>×</Dialog.CloseTrigger>
						</div>
						<div className={bodyClass}>
							{local.children}
						</div>
						{((local.cancelText ?? 'Cancel') || (local.confirmText ?? 'Confirm')) && (
							<div className={footClass}>
								<Dialog.CloseTrigger className={btnClass} type='button'>
									{local.cancelText ?? 'Cancel'}
								</Dialog.CloseTrigger>
								{(local.confirmText ?? 'Confirm') && (
									<button className={`${btnClass} ${btnPrimaryClass}`} disabled={local.loading?.()} onClick={local.onConfirm} type='button'>
										{local.loading?.() ? 'Loading…' : local.confirmText ?? 'Confirm'}
									</button>
								)}
							</div>
						)}
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Root>
	)
}

export default Object.assign(Root, {
	...Dialog, OriginalRoot: Root, Root: Preset,
})
