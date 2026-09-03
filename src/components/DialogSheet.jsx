import { css, keyframes } from '@emotion/css'
import { Either, False, True, createEffect, createSignal, onCleanup } from '@plastic-js/plastic'
import Portal from './Portal.jsx'
import Icon from './Icon.jsx'
import {
	bodyClass,
	footerClass,
	headerClass,
	titleClass,
	titleIconClass,
	titleWrapClass,
} from './dialogParts.js'

// ---------------------------------------------------------------------------
// DialogSheet — the bottom-sheet presentation of Dialog (mode="sheet").
// Standalone, NOT the ark dialog.
//
// Why this exists (real-device bug, Aug 2026): the ark dialog is modal by
// default, and its body scroll-lock (@zag-js/remove-scroll) pins the document
// on iOS with `position: fixed`. On an installed standalone PWA
// (`viewport-fit=cover` + `black-translucent` status bar) that makes WebKit
// stop extending the layout viewport under the status bar, so `100dvh` /
// `innerHeight` shrink by ~47px (844 → 797 on the report device). Every
// `position: fixed` / `100dvh` surface (backdrop, sheet, app shell) then
// bottoms out above the real screen bottom, leaving a dark gap under the
// panel. The non-modal BottomSheet never shrinks, and its flush-to-true-bottom
// behavior is the agreed STANDARD. Sheet mode therefore cannot reuse the ark
// modal; it is rendered here as a BottomSheet-style overlay (fixed,
// presence-gated, no scroll lock) instead.
//
// This component covers only the FIRST of three layers:
//   1. Essential layer (implemented): dismiss semantics — cancel vs. close,
//      Escape, and (opt-in) backdrop dismissal; focus restore on close;
//      aria-labelledby wiring; background `inert` while open.
//   2. Optional layer (NOT implemented): a full focus trap. Deliberately left
//      out — on iOS it collides with the WebKit focus-lock bugs already hit
//      with portaled Select/Combobox inside overlays. Enable only if a real
//      desktop-keyboard requirement appears, and keep it opt-in.
//   3. NEVER implement: body scroll-lock. Restoring it re-introduces the iOS
//      viewport shrink above, which is the entire reason this component
//      exists.
//
// If someone needs BOTH a locked background AND a flush bottom on iOS
// standalone, present sheet content over tsumiki BottomSheet (or ark's Drawer,
// non-modal) — never route sheet mode through the ark modal.
//
// Note: this component deliberately mimics BottomSheet's mechanism (fixed
// overlay + presence gate + data-open transitions) rather than wrapping
// BottomSheet, so its dialog semantics stay decoupled from BottomSheet's
// drag/grabber API.
// ---------------------------------------------------------------------------

const sheetBackdropClass = css({
	position: 'fixed',
	inset: 0,
	zIndex: 1400,
	padding: 0,
	border: 'none',
	background: 'var(--tsu-bg-overlay-soft)',
	backdropFilter: 'blur(8px)',
	WebkitBackdropFilter: 'blur(8px)',
	opacity: 0,
	pointerEvents: 'none',
	cursor: 'default',
	transition: 'opacity var(--tsu-transition-overlay-exit)',
	'&[data-open]': { opacity: 1, pointerEvents: 'auto', transition: 'opacity var(--tsu-transition-overlay-enter)' },
})

const sheetOpenIn = keyframes({
	from: { transform: 'translateY(100%)' },
	to: { transform: 'translateY(0)' },
})

const sheetPanelClass = css({
	position: 'fixed',
	insetInline: 0,
	bottom: 0,
	zIndex: 1400,
	background: 'var(--tsu-bg-panel)',
	borderRadius: 'var(--tsu-radius-l3-md) var(--tsu-radius-l3-md) 0 0',
	width: '100%',
	maxHeight: '70vh',
	display: 'flex',
	flexDirection: 'column',
	color: 'var(--tsu-fg)',
	boxShadow: 'var(--tsu-shadow-lg)',
	// The panel is flush to the real screen bottom (no ark modal, so no
	// viewport shrink). Bottom clearance for the home indicator is applied ONCE
	// here — `max()` keeps the regular footer rhythm on devices without an
	// inset (env() = 0 → 24px) and expands to the safe-area height on iOS. The
	// sheet footer's own bottom padding is zeroed (sheetFooterClass) so the two
	// paddings do NOT stack into an oversized gap under the buttons (CSS
	// padding never collapses — stacking is exactly the bug this avoids).
	paddingBottom: 'max(var(--tsu-container-padding-lg), env(safe-area-inset-bottom, 0px))',
	transform: 'translateY(100%)',
	pointerEvents: 'none',
	transition: 'transform var(--tsu-transition-overlay-exit)',
	'&[data-open]': {
		transform: 'translateY(0)',
		pointerEvents: 'auto',
		transition: 'transform var(--tsu-transition-overlay-enter)',
		animation: `${sheetOpenIn} var(--tsu-duration-overlay-enter) var(--tsu-ease-out)`,
	},
})

// Zeroes the shared footer's bottom padding in sheet mode: the bottom
// clearance lives on the panel's `padding-bottom` (see sheetPanelClass), so
// keeping the footer's 24px here would double the gap.
const sheetFooterClass = css({
	paddingBottom: 0,
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

let titleSeq = 0

const DialogSheet = (props)=> {
	const isOpen = ()=> read(props.open)

	// Presence gate (mirrors BottomSheet): the panel emits DOM nodes only
	// after the first open and, with `unmountOnExit`, survives the exit
	// transition so the slide-down still plays.
	const render = createSignal(!read(props.lazyMount) || isOpen())
	let exitTimer = null

	// Essential-layer bookkeeping.
	let prevFocusEl = null // element focused before the sheet opened
	let inerted = [] // body children flagged `inert` while the sheet is open
	let prevOpen = isOpen()
	let sheetEl = null

	const measureExitDuration = ()=> {
		if (!sheetEl) return DEFAULT_EXIT_MS
		const duration = getComputedStyle(sheetEl).transitionDuration
		const ms = String(duration).split(',').reduce((max, d)=> Math.max(max, toMs(d)), 0)
		return ms > 0 ? ms : DEFAULT_EXIT_MS
	}

	// Layer 1 — background `inert`: while the sheet is open, everything else
	// in <body> is made inert (except the portal host that will hold this
	// overlay). Applied at open time; nodes appended later (our own host) are
	// naturally not inerted. Cleared again on close and on unmount.
	const applyInert = ()=> {
		if (inerted.length > 0) return
		const host = sheetEl?.parentElement
		inerted = Array.from(document.body.children)
			.filter((el)=> el !== host && el !== sheetEl)
			.map((el)=> {
				const was = el.inert
				el.inert = true
				return { el, was }
			})
	}

	const clearInert = ()=> {
		inerted.forEach(({ el, was })=> { el.inert = was })
		inerted = []
	}

	// Layer 1 — focus restore: remember the opener's focus and hand it back
	// once the exit transition has had time to play.
	const restoreFocus = (duration)=> {
		const el = prevFocusEl
		if (!el || el === document.body || !el.isConnected) return
		setTimeout(()=> {
			if (el.isConnected) el.focus?.({ preventScroll: true })
		}, duration + 50)
	}

	onCleanup(()=> {
		if (exitTimer) clearTimeout(exitTimer)
		clearInert()
	})

	// Open/close edge watcher: drives the presence gate, the essential-layer
	// side effects, and reports the transition to the parent so it can run
	// the cancel-vs-close semantics exactly once.
	createEffect(()=> {
		const cur = isOpen()
		if (cur && !prevOpen) {
			prevFocusEl = document.activeElement
			props.onOpenEdge?.()
		}
		if (cur) {
			if (exitTimer) { clearTimeout(exitTimer); exitTimer = null }
			render(true)
			applyInert()
		} else if (prevOpen) {
			clearInert()
			props.onCloseNotify?.()
			const duration = measureExitDuration()
			restoreFocus(duration)
			if (read(props.unmountOnExit) && render()) {
				exitTimer = setTimeout(()=> render(false), duration)
			}
		}
		prevOpen = cur
	})

	// Layer 1 — Escape dismisses (as a cancel). Independent of
	// `closeOnInteractOutside`: ark's dialog also closes on Escape by default.
	createEffect(()=> {
		if (!isOpen()) return
		const onKey = (e)=> {
			if (e.key === 'Escape' || e.key === 'Esc') {
				e.preventDefault()
				props.onDismiss?.()
			}
		}
		document.addEventListener('keydown', onKey)
		onCleanup(()=> document.removeEventListener('keydown', onKey))
	})

	const handleBackdropClick = ()=> {
		// Outside pointer dismissal is opt-in (closeOnInteractOutside). When
		// allowed it counts as an explicit cancel, matching the modal path.
		if (read(props.closeOnInteractOutside)) props.onDismiss?.()
	}

	const title = read(props.title)
	const titleId = title ? `tsu-dialog-sheet-title-${++titleSeq}` : undefined

	const renderOverlay = ()=> (
		<>
			<button
				type='button'
				tabIndex={-1}
				aria-label='Dismiss'
				className={sheetBackdropClass}
				data-open={isOpen() ? '' : undefined}
				onClick={handleBackdropClick}
			/>
			<div
				ref={(el)=> { sheetEl = el }}
				className={[sheetPanelClass, props.className].filter(Boolean).join(' ')}
				data-open={isOpen() ? '' : undefined}
				role='dialog'
				aria-modal='true'
				aria-labelledby={titleId}
				aria-label={titleId ? undefined : 'Dialog'}
				data-scope='dialog'
				data-part='sheet'
			>
				{(title || props.icon) && (
					<div className={headerClass} data-scope='dialog' data-part='header'>
						<div className={titleWrapClass}>
							{props.icon && <Icon className={titleIconClass} size={20} svg={props.icon} />}
							{title && <div id={titleId} className={titleClass}>{title}</div>}
						</div>
					</div>
				)}
				<div className={bodyClass} data-scope='dialog' data-part='body'>
					{props.children}
				</div>
				<div className={`${footerClass} ${sheetFooterClass}`} data-scope='dialog' data-part='footer'>
					{props.footer}
				</div>
			</div>
		</>
	)

	return (
		<Either condition={()=> render()}>
			<True>
				<Portal>{renderOverlay()}</Portal>
			</True>
			<False>{null}</False>
		</Either>
	)
}

export default DialogSheet
export { DialogSheet }
