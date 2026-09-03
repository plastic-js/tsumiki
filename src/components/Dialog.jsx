import { css, keyframes } from '@emotion/css'
import { Dialog as ArkDialog, useDialogContext } from '@plastic-js/ark'
import { Either, False, True, mergeProps, splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'
import Icon from './Icon.jsx'
import Button from './Button.jsx'
import DialogSheet from './DialogSheet.jsx'
import {
	bodyClass,
	closeBtnClass,
	footerBtnClass,
	footerClass,
	headerClass,
	negativeBtnClass,
	positiveBtnClass,
	titleClass,
	titleIconClass,
	titleWrapClass,
} from './dialogParts.js'

// Center ("modal") mode stays on the ark dialog machine (modal, focus trap,
// scroll lock all enabled). A centered dialog never triggers the iOS viewport
// shrink documented in DialogSheet.jsx, so it needs no special handling.
const backdropModalClass = css({
	position: 'fixed',
	inset: 0,
	background: 'var(--tsu-bg-overlay)',
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

const modalContentIn = keyframes({
	from: { opacity: 0, transform: 'scale(0.95)' },
	to: { opacity: 1, transform: 'scale(1)' },
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

const read = (v)=> typeof v === 'function' ? v() : v

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

let warnedSheetNoTitle = false

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
	//
	// `closeInFlight` de-duplicates reporting in SHEET mode: dismissals are
	// reported eagerly here (while `open` is still true), and the consumer
	// reacts by flipping `open` to false. When the resulting open-false edge
	// arrives at DialogSheet, `onCloseNotify` must not report the same close a
	// second time. Modal mode never sets it, so behavior there is unchanged.
	const cancelRequested = { current: false }
	const closeInFlight = { current: false }

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
		closeInFlight.current = true
		handleOpenChange(false)
	}

	const handleConfirm = ()=> {
		local.onConfirm?.()
	}

	// Sheet-mode wiring (see `cancelRequested` / `closeInFlight` above).
	const notifyOpen = ()=> {
		closeInFlight.current = false
		handleOpenChange(true)
	}

	const notifyClose = ()=> {
		if (closeInFlight.current) {
			// Already reported by the dismissal/cancel path.
			closeInFlight.current = false
			return
		}
		// Consumer-driven close (e.g. right after `onConfirm`).
		handleOpenChange(false)
	}

	const dismiss = ()=> {
		cancelRequested.current = true
		closeInFlight.current = true
		handleOpenChange(false)
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

	if (isSheet) {
		return (
			<DialogSheet
				className={local.class}
				closeOnInteractOutside={local.closeOnInteractOutside}
				children={local.children}
				footer={footerContent}
				icon={local.icon}
				lazyMount={local.lazyMount}
				onCloseNotify={notifyClose}
				onDismiss={dismiss}
				onOpenEdge={notifyOpen}
				open={local.open}
				title={local.title}
				unmountOnExit={local.unmountOnExit}
			/>
		)
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
				<ArkDialog.Backdrop className={backdropModalClass} />
				<ArkDialog.Positioner className={positionerModalClass}>
					<ArkDialog.Content className={local.class ? `${contentModalClass} ${local.class}` : contentModalClass}>
					<div className={headerClass} data-scope='dialog' data-part='header'>
						<div className={titleWrapClass}>
							{local.icon && <Icon className={titleIconClass} size={20} svg={local.icon} />}
							{local.title && <ArkDialog.Title className={titleClass}>{local.title}</ArkDialog.Title>}
						</div>
						{(local.closeable ?? true) && (
							<ArkDialog.CloseTrigger aria-label='Close' className={closeBtnClass} onClick={() => { cancelRequested.current = true }}>×</ArkDialog.CloseTrigger>
						)}
					</div>
					<div className={bodyClass} data-scope='dialog' data-part='body'>
						{local.children}
					</div>
					<div className={footerClass} data-scope='dialog' data-part='footer'>
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
