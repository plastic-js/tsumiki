import { css, keyframes } from '@emotion/css'
import { Dialog as ArkDialog, useDialogContext } from '@plastic-js/ark'
import { Either, False, True, mergeProps, splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'
import Icon from './Icon.jsx'
import Button from './Button.jsx'

const backdropModalClass = css({
	position: 'fixed',
	inset: 0,
	background: 'var(--tsu-bg-overlay)',
	backdropFilter: 'blur(8px)',
	WebkitBackdropFilter: 'blur(8px)',
})

const backdropSheetClass = css({
	position: 'fixed',
	inset: 0,
	background: 'var(--tsu-bg-overlay-soft)',
	backdropFilter: 'blur(8px)',
	WebkitBackdropFilter: 'blur(8px)',
})

const positionerModalClass = css({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 'var(--tsu-spacing-lg)',
})

const positionerSheetClass = css({
	position: 'fixed',
	inset: 0,
	display: 'flex',
	alignItems: 'flex-end',
	justifyContent: 'center',
	padding: 0,
})

const modalContentIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.95)' },
	to: { opacity: 1, transform: 'scale(1)' },
})

const sheetContentIn = keyframes({
	from: { transform: 'translateY(100%)' },
	to: { transform: 'translateY(0)' },
})

const contentModalClass = css({
	background: 'var(--tsu-bg-panel)',
	borderRadius: 'var(--tsu-radius-l3-md)',
	width: '100%',
	maxWidth: '440px',
	maxHeight: 'min(calc(100vh - var(--tsu-spacing-lg) * 2), 560px)',
	'@supports (height: 100dvh)': {
		maxHeight: 'min(calc(100dvh - var(--tsu-spacing-lg) * 2), 560px)',
	},
	display: 'flex',
	flexDirection: 'column',
	color: 'var(--tsu-fg)',
	boxShadow: 'var(--tsu-shadow-lg)',
	animation: `${modalContentIn} 200ms ease`,
})

const contentSheetClass = css({
	background: 'var(--tsu-bg-panel)',
	borderRadius: 'var(--tsu-radius-l3-md) var(--tsu-radius-l3-md) 0 0',
	width: '100%',
	maxHeight: '70vh',
	display: 'flex',
	flexDirection: 'column',
	color: 'var(--tsu-fg)',
	boxShadow: 'var(--tsu-shadow-lg)',
	animation: `${sheetContentIn} 250ms ease`,
})

const headerClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '18px var(--tsu-container-padding-lg) var(--tsu-spacing-lg)',
	marginBottom: 'var(--tsu-spacing-sm)',
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
	flexShrink: 0,
})

const bodyClass = css({
	padding: '0 var(--tsu-container-padding-lg)',
	flex: 1,
	minHeight: 0,
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
})

const footerClass = css({
	display: 'flex',
	gap: 'var(--tsu-spacing-md)',
	padding: 'var(--tsu-container-padding-lg)',
	flexShrink: 0,
})

// Sheet-mode footer sits at the bottom of the screen; pad below the buttons so
// they clear the iOS home indicator (env() is 0 on non-iOS).
const footerSheetClass = css({
	paddingBottom: 'calc(var(--tsu-container-padding-lg) + env(safe-area-inset-bottom, 0px))',
})

const footerBtnClass = css({
	display: 'flex',
	gap: '20px',
	width: '100%',
	justifyContent: 'flex-end',
	'&.tsu-dialog-footer--center': {
		justifyContent: 'center',
	},
})

const negativeBtnClass = css({
	flex: 1,
	borderRadius: 'var(--tsu-radius-l1-lg)',
	fontSize: 'var(--tsu-comp-font-size-lg)',
	fontWeight: 'var(--tsu-font-weight-semibold)',
	fontFamily: 'inherit',
})

const positiveBtnClass = css({
	flex: 1,
	borderRadius: 'var(--tsu-radius-l1-lg)',
	fontSize: 'var(--tsu-comp-font-size-lg)',
	fontWeight: 'var(--tsu-font-weight-semibold)',
	fontFamily: 'inherit',
})

const read = (v)=> typeof v === 'function' ? v() : v

let warnedSheetNoTitle = false

const DialogPortal = (props)=> {
	const dialog = useDialogContext()
	return (
		<Either condition={() => !dialog()?.unmounted}>
			<True>
				<Portal>{props.children}</Portal>
			</True>
			<False>{null}</False>
		</Either>
	)
}

const Dialog = (props)=> {
	const merged = mergeProps({
		mode: 'sheet',
		showCancel: true,
		showConfirm: true,
		cancelText: 'Cancel',
		confirmText: 'Confirm',
		loading: false,
		intent: 'default',
		closeable: true,
		lazyMount: true,
		unmountOnExit: true,
		closeOnInteractOutside: false,
	}, props)

	const [local, rest] = splitProps(merged, [
		'mode', 'open', 'onOpen', 'onClose', 'onOpenChange',
		'title', 'icon',
		'showCancel', 'showConfirm', 'cancelText', 'confirmText', 'onCancel', 'onConfirm',
		'loading', 'intent', 'closeable',
		'lazyMount', 'unmountOnExit', 'closeOnInteractOutside',
		'footer', 'class', 'children',
	])

	// `onCancel` must fire only for an explicit cancel (Cancel button, ×
	// trigger, Escape, or outside pointer when `closeOnInteractOutside` is
	// set). A close that follows `onConfirm` (consumers typically set `open`
	// to `false` after confirming) must NOT be reported as a cancel — it only
	// fires `onClose`. `cancelRequested` records an explicit cancel before the
	// close is applied; it is consumed (and reset) in `handleOpenChange`.
	const cancelRequested = { current: false }

	const handleOpenChange = (open)=> {
		if (!open) {
			const wasCancelled = cancelRequested.current
			cancelRequested.current = false
			if (wasCancelled) local.onCancel?.()
			local.onClose?.()
		} else {
			cancelRequested.current = false
			local.onOpen?.()
		}
		local.onOpenChange?.(open)
	}

const handleCancel = ()=> {
	cancelRequested.current = true
	handleOpenChange(false)
}

	const handleConfirm = ()=> {
		local.onConfirm?.()
	}

	const isSheet = local.mode === 'sheet'
	const onlyOneBtn = (local.showCancel ? 1 : 0) + (local.showConfirm ? 1 : 0) === 1

	const footerContent = local.footer
		? local.footer
		: (local.showCancel || local.showConfirm) ? (
			<div className={onlyOneBtn ? `${footerBtnClass} tsu-dialog-footer--center` : footerBtnClass}>
				{local.showCancel && (
					<Button
						className={negativeBtnClass}
						data-part='negative-trigger'
						disabled={read(local.loading)}
						intent='neutral'
						onClick={handleCancel}
						size='xl'
						type='button'
					>
						{local.cancelText}
					</Button>
				)}
				{local.showConfirm && (
					<Button
						className={positiveBtnClass}
						data-part='positive-trigger'
						intent={local.intent}
						loading={read(local.loading)}
						onClick={handleConfirm}
						size='xl'
						variant='solid'
						type='button'
					>
						{local.confirmText}
					</Button>
				)}
			</div>
		) : undefined

	if (isSheet && !local.title && !warnedSheetNoTitle) {
		warnedSheetNoTitle = true
		console.warn('[Dialog] sheet mode requires a title; use BottomSheet for header-less content.')
	}

	return (
		<ArkDialog.Root
			open={read(local.open)}
			onOpenChange={handleOpenChange}
			onEscapeKeyDown={() => { cancelRequested.current = true }}
			onInteractOutside={() => { if (read(local.closeOnInteractOutside)) cancelRequested.current = true }}
			lazyMount={local.lazyMount}
			unmountOnExit={local.unmountOnExit}
			closeOnInteractOutside={local.closeOnInteractOutside}
			modal
			{...rest}
		>
			<DialogPortal>
				<ArkDialog.Backdrop className={isSheet ? backdropSheetClass : backdropModalClass} />
				<ArkDialog.Positioner className={isSheet ? positionerSheetClass : positionerModalClass}>
					<ArkDialog.Content className={local.class ? `${isSheet ? contentSheetClass : contentModalClass} ${local.class}` : (isSheet ? contentSheetClass : contentModalClass)}>
					<div className={headerClass} data-scope='dialog' data-part='header'>
						<div className={titleWrapClass}>
							{local.icon && <Icon className={titleIconClass} size={20} svg={local.icon} />}
							{local.title && <ArkDialog.Title className={titleClass}>{local.title}</ArkDialog.Title>}
						</div>
						{!isSheet && (local.closeable ?? true) && (
							<ArkDialog.CloseTrigger aria-label='Close' className={closeBtnClass} onClick={() => { cancelRequested.current = true }}>×</ArkDialog.CloseTrigger>
						)}
					</div>
					<div className={bodyClass} data-scope='dialog' data-part='body'>
						{local.children}
					</div>
					<div className={isSheet ? `${footerClass} ${footerSheetClass}` : footerClass} data-scope='dialog' data-part='footer'>
						{footerContent}
					</div>
					</ArkDialog.Content>
				</ArkDialog.Positioner>
			</DialogPortal>
		</ArkDialog.Root>
	)
}

Dialog.origin = {
	Root: ArkDialog.Root,
	Trigger: ArkDialog.Trigger,
	Backdrop: ArkDialog.Backdrop,
	Positioner: ArkDialog.Positioner,
	Content: ArkDialog.Content,
	Title: ArkDialog.Title,
	Description: ArkDialog.Description,
	CloseTrigger: ArkDialog.CloseTrigger,
}

export default Dialog
export { Dialog }
