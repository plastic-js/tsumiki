import { css } from '@emotion/css'
import { createEffect, createSignal, splitProps } from '@plastic-js/plastic'
import Icon from '../Icon.jsx'
import { CENTER_OFFSET, ITEM_HEIGHT, expandCircular, makeWheel } from './wheel.js'

// ── Date helpers ──────────────────────────────────────────────────────────
const MONTH_NAMES_SHORT = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

const YEARS = Array.from({ length: 200 }, (_, i) => 1900 + i)
const MONTHS = Array.from({ length: 12 }, (_, i) => i)

const getDays = (year, month) => {
	const count = daysInMonth(year, month)
	return Array.from({ length: count }, (_, i) => i + 1)
}

const toDate = (year, month, day) => new Date(year, month, day)

const formatDateLabel = (date) => {
	if (!date) return ''
	return `${MONTH_NAMES_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

// ── SVGs ───────────────────────────────────────────────────────────────────
const calendarSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'

// ── Styles ─────────────────────────────────────────────────────────────────
const triggerWrapperClass = css({
	position: 'relative',
	width: '100%',
	background: 'none',
	border: 'none',
	padding: 0,
	font: 'inherit',
	cursor: 'pointer',
	color: 'inherit',
	outline: 'none',
	borderRadius: '10px',
	'&:focus-visible': { boxShadow: '0 0 0 2px var(--accent)' },
})

const triggerDisabledClass = css({
	opacity: 0.4,
	cursor: 'not-allowed',
})

const triggerClass = css({
	width: '100%',
	height: '42px',
	padding: '0 36px 0 14px',
	background: 'rgba(255,255,255,0.06)',
	border: '1px solid var(--border)',
	borderRadius: '10px',
	color: 'var(--ink)',
	fontSize: '16px',
	fontFamily: 'inherit',
	outline: 'none',
	boxSizing: 'border-box',
	display: 'flex',
	alignItems: 'center',
	cursor: 'pointer',
})

const triggerPlaceholderClass = css({
	color: 'var(--muted)',
})

const triggerValueClass = css({
	color: 'var(--ink)',
})

const calendarIconClass = css({
	position: 'absolute',
	right: '10px',
	top: '50%',
	transform: 'translateY(-50%)',
	width: '18px',
	height: '18px',
	color: 'var(--muted)',
	pointerEvents: 'none',
})

const overlayClass = css({
	position: 'fixed',
	inset: 0,
	zIndex: 1000,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	pointerEvents: 'none',
})

const backdropClass = css({
	position: 'absolute',
	inset: 0,
	background: 'rgba(0,0,0,0.5)',
	opacity: 0,
	transition: 'opacity 240ms ease',
})

const sheetClass = css({
	position: 'relative',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	background: 'var(--surface)',
	borderTop: '1px solid var(--border)',
	borderRadius: '18px 18px 0 0',
	boxShadow: '0 -8px 32px rgba(0,0,0,0.4)',
	paddingBottom: 'env(safe-area-inset-bottom, 0px)',
	transform: 'translateY(100%)',
	transition: 'transform 280ms cubic-bezier(0.32, 0.72, 0, 1)',
})

const openClass = css({
	pointerEvents: 'auto',
	[`& .${backdropClass}`]: { opacity: 1 },
	[`& .${sheetClass}`]: { transform: 'translateY(0)' },
})

const toolbarClass = css({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '12px 16px',
	borderBottom: '1px solid var(--border)',
	flexShrink: 0,
})

const toolbarBtnClass = css({
	background: 'none',
	border: 'none',
	padding: '6px 0',
	color: 'var(--accent)',
	fontSize: '16px',
	fontFamily: 'inherit',
	cursor: 'pointer',
	WebkitTapHighlightColor: 'transparent',
})

const toolbarTitleClass = css({
	fontSize: '15px',
	fontWeight: 600,
	color: 'var(--ink)',
})

const wheelAreaClass = css({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'stretch',
	padding: '12px 0 20px',
	position: 'relative',
})

const gradientOverlayClass = css({
	position: 'absolute',
	left: 0,
	right: 0,
	pointerEvents: 'none',
	zIndex: 2,
})

const columnWrapperClass = css({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	overflow: 'hidden',
	position: 'relative',
})

const columnLabelClass = css({
	fontSize: '11px',
	color: 'var(--muted)',
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
	marginBottom: '6px',
	fontWeight: 500,
})

const columnViewportClass = css({
	width: '100%',
	height: `${CENTER_OFFSET * 2 + ITEM_HEIGHT}px`,
	overflow: 'hidden',
	position: 'relative',
	touchAction: 'none',
	// Gradient overlays for iOS-style edge fade
	'&::before, &::after': {
		content: '""',
		position: 'absolute',
		left: 0,
		right: 0,
		height: `${CENTER_OFFSET}px`,
		pointerEvents: 'none',
		zIndex: 2,
	},
	'&::before': {
		top: 0,
		background: 'linear-gradient(to bottom, var(--surface) 0%, transparent 100%)',
	},
	'&::after': {
		bottom: 0,
		background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)',
	},
})

const columnListClass = css({
	willChange: 'transform',
})

const highlightBarClass = css({
	position: 'absolute',
	top: `${CENTER_OFFSET}px`,
	left: '10%',
	right: '10%',
	height: `${ITEM_HEIGHT}px`,
	borderRadius: '8px',
	background: 'rgba(255,255,255,0.06)',
	pointerEvents: 'none',
	zIndex: 1,
})

const itemBaseClass = css({
	height: `${ITEM_HEIGHT}px`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '20px',
	color: 'var(--muted)',
	userSelect: 'none',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	padding: '0 4px',
	boxSizing: 'border-box',
})

const selectedItemClass = css({
	color: 'var(--ink)',
	fontWeight: 600,
	fontSize: '22px',
})

const clearRowClass = css({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '44px',
	gap: '6px',
	color: 'var(--accent)',
	fontSize: '15px',
	fontFamily: 'inherit',
	background: 'none',
	border: 'none',
	borderTop: '1px solid var(--border)',
	cursor: 'pointer',
	width: '100%',
	flexShrink: 0,
	padding: 0,
	'&:active': { background: 'rgba(255,255,255,0.04)' },
})

// ── CalendarIcon ───────────────────────────────────────────────────────────
function CalendarIconComp() {
	return <Icon svg={calendarSvg} size={18} strokeWidth={1.5} />
}

// ── mountWheel ref helper ──────────────────────────────────────────────────
//
// Stores the wheel controller on the DOM element so that a subsequent mount
// can destroy the previous instance first — prevents animation leaks.
function mountWheel(el, wheel) {
	if (el._wheel && el._wheel !== wheel) {
		el._wheel.destroy()
	}
	el._wheel = wheel
	wheel.mount(el)
}

// ── Columns ────────────────────────────────────────────────────────────────
//
// Renders the three wheel columns (year / month / day). Receives all data as
// plain props so it can be used as a normal Plastic component.
function Columns({ y, m, days, selDay, tempYear, tempMonth, tempDay }) {
	const yearWheel = makeWheel(YEARS, YEARS.indexOf(y), false)

	const [monthItems, monthStartIdx] = expandCircular(MONTHS, m)
	const monthWheel = makeWheel(monthItems, monthStartIdx, true)

	const [dayItems, dayStartIdx] = expandCircular(days, selDay - 1)
	const dayWheel = makeWheel(dayItems, dayStartIdx, true)

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			<div className={columnWrapperClass} style={{ flex: 5 }}>
				<span className={columnLabelClass}>Year</span>
				<div className={columnViewportClass}>
					<div className={highlightBarClass} />
					<div
						ref={(el) => { if (el) mountWheel(el, yearWheel) }}
						className={columnListClass}
						onPointerDown={(e) => yearWheel.handlePointerDown(e)}
						onPointerMove={(e) => yearWheel.handlePointerMove(e, e.currentTarget)}
						onPointerUp={(e) => yearWheel.handlePointerUp(e, e.currentTarget, (idx) => {
							const newYear = YEARS[idx]
							tempYear(newYear)
							const maxDay = daysInMonth(newYear, tempYear())
							if (tempDay() > maxDay) tempDay(maxDay)
						})}
						onPointerCancel={(e) => yearWheel.handlePointerCancel(e, e.currentTarget)}
					>
						{YEARS.map((item, i) => (
							<div className={`${itemBaseClass} ${i === YEARS.indexOf(y) ? selectedItemClass : ''}`} key={i}>{String(item)}</div>
						))}
					</div>
				</div>
			</div>
			<div className={columnWrapperClass} style={{ flex: 6 }}>
				<span className={columnLabelClass}>Month</span>
				<div className={columnViewportClass}>
					<div className={highlightBarClass} />
					<div
						ref={(el) => { if (el) mountWheel(el, monthWheel) }}
						className={columnListClass}
						onPointerDown={(e) => monthWheel.handlePointerDown(e)}
						onPointerMove={(e) => monthWheel.handlePointerMove(e, e.currentTarget)}
						onPointerUp={(e) => monthWheel.handlePointerUp(e, e.currentTarget, (idx) => {
							tempMonth(idx)
							const maxDay = daysInMonth(tempYear(), idx)
							if (tempDay() > maxDay) tempDay(maxDay)
						})}
						onPointerCancel={(e) => monthWheel.handlePointerCancel(e, e.currentTarget)}
					>
						{monthItems.map((item, i) => (
							<div className={`${itemBaseClass} ${i === monthStartIdx ? selectedItemClass : ''}`} key={i}>{MONTH_NAMES_SHORT[item]}</div>
						))}
					</div>
				</div>
			</div>
			<div className={columnWrapperClass} style={{ flex: 6 }}>
				<span className={columnLabelClass}>Day</span>
				<div className={columnViewportClass}>
					<div className={highlightBarClass} />
					<div
						ref={(el) => { if (el) mountWheel(el, dayWheel) }}
						className={columnListClass}
						onPointerDown={(e) => dayWheel.handlePointerDown(e)}
						onPointerMove={(e) => dayWheel.handlePointerMove(e, e.currentTarget)}
						onPointerUp={(e) => dayWheel.handlePointerUp(e, e.currentTarget, (idx) => tempDay(idx + 1))}
						onPointerCancel={(e) => dayWheel.handlePointerCancel(e, e.currentTarget)}
					>
						{dayItems.map((item, i) => (
							<div className={`${itemBaseClass} ${i === dayStartIdx ? selectedItemClass : ''}`} key={i}>{String(item)}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

// ── DatePickerMobile ───────────────────────────────────────────────────────
//
// A mobile bottom-sheet date picker with iOS-style wheel columns for
// year, month, and day. The trigger visually mimics <input type="date">.
//
// Props:
//   value             Date | (() => Date | null)   — current selected date
//   onValueChange     (Date | null) => void         — called when user confirms
//   placeholder       string                        — trigger placeholder text (default "Select date")
//   clearable         boolean                       — show a "Clear" row in the sheet
//   clearLabel        string                        — label for the clear row (default "Clear")
//   disabled          boolean                       — disable interaction (default false)
//   disabledClassName string                        — additional class when disabled
//   backdropClassName className for the backdrop
//   backdropStyle     inline style for the backdrop
const DatePickerMobile = (props) => {
	const [local] = splitProps(props, [
		'value', 'onValueChange', 'placeholder',
		'clearable', 'clearLabel',
		'disabled', 'disabledClassName',
		'backdropClassName', 'backdropStyle',
	])

	const open = createSignal(false)

	const resolveValue = () => {
		const v = typeof local.value === 'function' ? local.value() : local.value
		return v ?? null
	}

	const isDisabled = () => {
		const d = typeof local.disabled === 'function' ? local.disabled() : local.disabled
		return !!d
	}

	const tempYear = createSignal(2000)
	const tempMonth = createSignal(0)
	const tempDay = createSignal(1)

	createEffect(() => {
		if (!open()) return
		const onKey = (e) => { if (e.key === 'Escape') cancel() }
		document.addEventListener('keydown', onKey)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', onKey)
			document.body.style.overflow = prevOverflow
		}
	})

	const openSheet = () => {
		if (isDisabled()) return
		const d = resolveValue() || new Date()
		tempYear(d.getFullYear())
		tempMonth(d.getMonth())
		tempDay(Math.min(d.getDate(), daysInMonth(d.getFullYear(), d.getMonth())))
		open(true)
	}

	const confirm = () => {
		const date = toDate(tempYear(), tempMonth(), tempDay())
		local.onValueChange?.(date)
		open(false)
	}

	const cancel = () => {
		open(false)
	}

	const clear = () => {
		local.onValueChange?.(null)
		open(false)
	}

	const dayItems = () => getDays(tempYear(), tempMonth())

	return (
		<>
			<button
				type='button'
				className={`${triggerWrapperClass} ${isDisabled() ? `${triggerDisabledClass} ${local.disabledClassName || ''}` : ''}`}
				onClick={openSheet}
				aria-disabled={isDisabled()}
			>
				{() => {
					const d = resolveValue()
					return (
						<span className={`${triggerClass} ${d ? triggerValueClass : triggerPlaceholderClass}`}>
							{d ? formatDateLabel(d) : (local.placeholder || 'Select date')}
						</span>
					)
				}}
				<span className={calendarIconClass}>
					<CalendarIconComp />
				</span>
			</button>

			{() => {
				if (!open()) return null
				const y = tempYear()
				const m = tempMonth()
				const days = dayItems()
				const selDay = tempDay()

				return (
					<div className={`${overlayClass} ${openClass}`}>
						<div
							className={`${backdropClass} ${local.backdropClassName || ''}`}
							style={local.backdropStyle}
							role='presentation'
							aria-hidden='true'
							onClick={cancel}
						/>
						<div className={sheetClass} role='dialog' aria-label='Date picker'>
							<div className={toolbarClass}>
								<button className={toolbarBtnClass} type='button' onClick={cancel}>Cancel</button>
								<span className={toolbarTitleClass}>Select Date</span>
								<button className={toolbarBtnClass} type='button' onClick={confirm}>Done</button>
							</div>
							<div className={wheelAreaClass}>
								<Columns
									y={y}
									m={m}
									days={days}
									selDay={selDay}
									tempYear={tempYear}
									tempMonth={tempMonth}
									tempDay={tempDay}
								/>
							</div>
							{local.clearable && (
								<button className={clearRowClass} type='button' onClick={clear}>
									{local.clearLabel || 'Clear'}
								</button>
							)}
						</div>
					</div>
				)
			}}
		</>
	)
}

export default DatePickerMobile
