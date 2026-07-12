import { css, keyframes } from '@emotion/css'
import { Either, False, True, createEffect, createSignal, mergeProps, onCleanup, splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'

const CLOSE_DISTANCE_RATIO = 0.3
const CLOSE_VELOCITY = 0.5
const RUBBER_BAND_FACTOR = 3

const backdropClass = css({
	position: 'fixed',
	inset: 0,
	zIndex: 1400,
	background: 'var(--tsu-bg-overlay-soft)',
	opacity: 0,
	pointerEvents: 'none',
	transition: 'opacity var(--tsu-transition-overlay-exit)',
	'&[data-open]': { opacity: 1, pointerEvents: 'auto', transition: 'opacity var(--tsu-transition-overlay-enter)' },
})

const backdropBlurClass = css({
	backdropFilter: 'blur(8px)',
	WebkitBackdropFilter: 'blur(8px)',
})

const sheetOpenIn = keyframes({
	from: { transform: 'translateY(100%)' },
	to: { transform: 'translateY(0)' },
})

const sheetClass = css({
	position: 'fixed',
	insetInline: 0,
	bottom: 0,
	zIndex: 1400,
	background: 'var(--tsu-surface)',
	borderRadius: 'var(--tsu-radius-l3-md) var(--tsu-radius-l3-md) 0 0',
	boxShadow: 'var(--tsu-shadow-lg)',
	maxHeight: '70vh',
	'@supports (height: 100dvh)': {
		maxHeight: 'min(70dvh, 70vh)',
	},
	display: 'flex',
	flexDirection: 'column',
	transform: 'translateY(100%)',
	pointerEvents: 'none',
	transition: 'transform var(--tsu-transition-overlay-exit)',
	'&[data-open]': { transform: 'translateY(0)', pointerEvents: 'auto', transition: 'transform var(--tsu-transition-overlay-enter)', animation: `${sheetOpenIn} var(--tsu-duration-overlay-enter) var(--tsu-ease-out)` },
	'&::after': {
		content: '""',
		position: 'absolute',
		top: 'calc(100% - 1px)',
		left: 0,
		right: 0,
		height: '30vh',
		background: 'var(--tsu-surface)',
	},
})

const draggingClass = css({
	transition: 'none',
	animation: 'none',
})

const grabberAreaClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '24px',
	flexShrink: 0,
	cursor: 'grab',
	touchAction: 'none',
	'&:active': { cursor: 'grabbing' },
})

const grabberClass = css({
	width: '36px',
	height: '5px',
	borderRadius: '2.5px',
	background: 'var(--tsu-neutral-alpha-6)',
})

const contentClass = css({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	minHeight: 0,
})

const read = (v)=> typeof v === 'function' ? v() : v

const DEFAULT_EXIT_MS = 200

const toMs = (s)=> {
	const v = String(s).trim().toLowerCase()
	if (!v) return 0
	if (v.endsWith('ms')) return parseFloat(v) || 0
	if (v.endsWith('s')) return (parseFloat(v) || 0) * 1000
	return parseFloat(v) || 0
}

const BottomSheet = (props)=> {
	const [local] = splitProps(
		mergeProps({ dismissible: true, backdropBlur: true, draggable: true, lazyMount: true, unmountOnExit: true, portal: true }, props),
		['open', 'onOpen', 'onClose', 'onOpenChange', 'dismissible', 'draggable', 'backdropBlur', 'backdropClassName', 'backdropStyle', 'contentClassName', 'lazyMount', 'unmountOnExit', 'portal', 'class', 'children'],
	)

	const dragging = createSignal(false)

	// Presence gate: a closed sheet that was never opened emits no DOM nodes.
	// `render` is the single source of truth — it becomes true on first open and,
	// when `unmountOnExit` is set, stays true through the exit transition so the
	// slide-out / fade-out animation still plays before the nodes are removed.
	const isOpen = ()=> read(local.open)
	const render = createSignal(!local.lazyMount || isOpen())
	let exitTimer = null

	const measureExitDuration = ()=> {
		const el = sheetEl
		if (!el) return DEFAULT_EXIT_MS
		const duration = getComputedStyle(el).transitionDuration
		const ms = String(duration).split(',').reduce((max, d)=> Math.max(max, toMs(d)), 0)
		return ms > 0 ? ms : DEFAULT_EXIT_MS
	}

	let sheetEl = null
	let startY = 0
	let currentDy = 0
	let lastY = 0
	let lastT = 0
	let velocity = 0

	const handleOpenChange = (detail)=> {
		if (!detail.open){
			local.onClose?.()
		}
		local.onOpenChange?.(detail)
	}

	// Fire `onOpen` on the closed → open transition and drive the presence
	// gate. The sheet is controlled (`open` is a getter), so openings only
	// arrive as prop changes; the previous value is tracked so the initial
	// state (e.g. already open) does not trigger a spurious `onOpen`. On
	// close, when `unmountOnExit` is set, the nodes stay mounted long enough
	// for the exit transition to play, then `render` flips to false.
	let prevOpen = isOpen()
	createEffect(()=> {
		const cur = isOpen()
		if (cur && !prevOpen) local.onOpen?.()
		if (cur) {
			if (exitTimer) { clearTimeout(exitTimer); exitTimer = null }
			render(true)
		} else if (prevOpen && local.unmountOnExit && render()) {
			exitTimer = setTimeout(()=> render(false), measureExitDuration())
		}
		prevOpen = cur
	})

	onCleanup(()=> {
		if (exitTimer) clearTimeout(exitTimer)
	})

	const handleBackdropClick = ()=> {
		if (read(local.dismissible)) {
			handleOpenChange({ open: false })
		}
	}

	const onGrabberPointerDown = (e)=> {
		e.currentTarget.setPointerCapture?.(e.pointerId)
		startY = lastY = e.clientY
		lastT = e.timeStamp
		velocity = 0
		currentDy = 0
		dragging(true)
	}

	const onGrabberPointerMove = (e)=> {
		if (!dragging()) return
		const dy = e.clientY - startY
		const dt = e.timeStamp - lastT
		if (dt > 0) velocity = (e.clientY - lastY) / dt
		lastY = e.clientY
		lastT = e.timeStamp
		currentDy = dy
		const translate = dy >= 0 ? dy : dy / RUBBER_BAND_FACTOR
		if (sheetEl) sheetEl.style.transform = `translateY(${translate}px)`
	}

	const settle = (shouldClose)=> {
		dragging(false)
		if (sheetEl) sheetEl.style.transform = ''
		if (shouldClose && read(local.dismissible)) handleOpenChange({ open: false })
	}

	const onGrabberPointerUp = ()=> {
		if (!dragging()) return
		const sheetHeight = sheetEl?.offsetHeight || 1
		const passedDistance = currentDy > sheetHeight * CLOSE_DISTANCE_RATIO
		const flicked = currentDy > 0 && velocity > CLOSE_VELOCITY
		settle(passedDistance || flicked)
	}

	const onGrabberPointerCancel = ()=> {
		if (!dragging()) return
		settle(false)
	}

	const draggable = read(local.draggable)
	const showGrabber = draggable

	// When `portal` is false the overlay renders inline instead of into
	// <body>. This keeps the sheet inside a parent Dialog's focus-trap
	// boundary — the primary fix for the WebKit focus-lock bug where an input
	// in a portaled sheet has its focus stolen back by the dialog's trap.
	//
	// NOTE: `renderOverlay` is a function (not a hoisted JSX value) so every
	// open re-materializes fresh descriptors — a reused value would carry dead
	// bindings from the previous close and render an empty list.
	const renderOverlay = ()=> (
		<>
			<div
				className={[backdropClass, local.backdropBlur && backdropBlurClass, local.backdropClassName].filter(Boolean).join(' ')}
				style={local.backdropStyle}
				data-part='backdrop'
				data-open={read(local.open) ? '' : undefined}
				onClick={handleBackdropClick}
			/>
			<div
				ref={(el)=> { sheetEl = el }}
				className={[sheetClass, dragging() && draggingClass, local.class].filter(Boolean).join(' ')}
				data-open={read(local.open) ? '' : undefined}
				role="dialog"
				aria-modal="true"
				aria-label="BottomSheet"
			>
				{showGrabber && (
					<div
						className={grabberAreaClass}
						data-part='grabber'
						onPointerDown={onGrabberPointerDown}
						onPointerMove={onGrabberPointerMove}
						onPointerUp={onGrabberPointerUp}
						onPointerCancel={onGrabberPointerCancel}
					>
						<div className={grabberClass} />
					</div>
				)}
				<div className={[contentClass, local.contentClassName].filter(Boolean).join(' ')} data-part='content'>
					{local.children}
				</div>
			</div>
		</>
	)

	return (
		<Either condition={()=> render()}>
			<True>
				{read(local.portal) ? <Portal>{renderOverlay()}</Portal> : renderOverlay()}
			</True>
			<False>
				{null}
			</False>
		</Either>
	)
}

export default BottomSheet
export { BottomSheet }
