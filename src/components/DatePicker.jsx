import { css } from '@emotion/css'
import { createEffect, createSignal, mergeProps, splitProps } from '@plastic-js/plastic'
import Icon from './Icon.jsx'
import Portal from './Portal.jsx'
import { CENTER_OFFSET, ITEM_HEIGHT, expandCircular, makeWheel } from './DateWheel.js'

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

const parseDate = (v) => {
  if (!v) return null
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v
  if (typeof v === 'string') {
    const d = new Date(v + 'T00:00:00')
    return isNaN(d.getTime()) ? null : d
  }
  return null
}

const calendarSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'

const triggerWrapperClass = css({
  position: 'relative',
  width: '100%',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  cursor: 'pointer',
  color: 'inherit',
  borderRadius: '10px',
  '&:focus-visible': { boxShadow: '0 0 0 2px var(--_di-border-focus)' },
  '&:disabled, &[aria-disabled="true"]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
})

const triggerDisabledClass = css({
  opacity: 'var(--tsu-disabled-opacity)',
  cursor: 'not-allowed',
})

const intentClasses = {
  default: css({
    '--_di-border': 'var(--tsu-accent-outline-border)',
    '--_di-border-focus': 'var(--tsu-accent-outline-border-hover)',
  }),
  neutral: css({
    '--_di-border': 'var(--tsu-neutral-outline-border)',
    '--_di-border-focus': 'var(--tsu-neutral-outline-border-hover)',
  }),
}

const errorClass = css({
  borderColor: 'var(--tsu-danger-outline-border) !important',
  '&:focus-visible': { borderColor: 'var(--tsu-danger-outline-border) !important' },
})

const invalidWrapperClass = css({
  '--_di-border-focus': 'var(--tsu-danger-outline-border-hover)',
})

const triggerBaseClass = css({
  width: '100%',
  background: 'transparent',
  border: '1px solid var(--_di-border)',
  color: 'var(--tsu-fg)',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'border-color var(--tsu-transition-fast), background-color var(--tsu-transition-fast)',
})

const triggerSizeClasses = {
  xs: css({ height: 'var(--tsu-comp-height-xs)', padding: '0 36px 0 var(--tsu-comp-padding-x-xs)', fontSize: 'var(--tsu-comp-font-size-xs)', borderRadius: 'var(--tsu-radius-l1-xs)' }),
  sm: css({ height: 'var(--tsu-comp-height-sm)', padding: '0 36px 0 var(--tsu-comp-padding-x-sm)', fontSize: 'var(--tsu-comp-font-size-sm)', borderRadius: 'var(--tsu-radius-l1-sm)' }),
  md: css({ height: 'var(--tsu-comp-height-md)', padding: '0 36px 0 var(--tsu-comp-padding-x-md)', fontSize: 'var(--tsu-comp-font-size-md)', borderRadius: 'var(--tsu-radius-l1-md)' }),
  lg: css({ height: 'var(--tsu-comp-height-lg)', padding: '0 36px 0 var(--tsu-comp-padding-x-lg)', fontSize: 'var(--tsu-comp-font-size-lg)', borderRadius: 'var(--tsu-radius-l1-lg)' }),
  xl: css({ height: 'var(--tsu-comp-height-xl)', padding: '0 36px 0 var(--tsu-comp-padding-x-xl)', fontSize: 'var(--tsu-comp-font-size-xl)', borderRadius: 'var(--tsu-radius-l1-xl)' }),
}

const triggerPlaceholderClass = css({
  color: 'var(--tsu-text-secondary)',
})

const triggerValueClass = css({
  color: 'var(--tsu-fg)',
})

const calendarIconClass = css({
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '18px',
  height: '18px',
  color: 'var(--tsu-text-secondary)',
  pointerEvents: 'none',
})

const overlayClass = css({
  position: 'fixed',
  inset: 0,
  zIndex: 1400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  pointerEvents: 'none',
})

const backdropClass = css({
  position: 'absolute',
  inset: 0,
  background: 'var(--tsu-bg-overlay)',
  opacity: 0,
  transition: 'opacity 240ms ease',
})

const sheetClass = css({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--tsu-bg-panel)',
  borderTop: '1px solid var(--tsu-border)',
  borderRadius: '18px 18px 0 0',
  boxShadow: 'var(--tsu-shadow-up)',
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
  borderBottom: '1px solid var(--tsu-border)',
  flexShrink: 0,
})

const toolbarBtnClass = css({
  background: 'none',
  border: 'none',
  padding: '6px 0',
  color: 'var(--tsu-accent-subtle-fg)',
  fontSize: '16px',
  fontFamily: 'inherit',
  cursor: 'pointer',
})

const toolbarTitleClass = css({
  fontSize: '15px',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-fg)',
})

const wheelAreaClass = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  padding: '12px 0 20px',
  position: 'relative',
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
  color: 'var(--tsu-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: '6px',
  fontWeight: 'var(--tsu-font-weight-medium)',
})

const columnViewportClass = css({
  width: '100%',
  height: `${CENTER_OFFSET * 2 + ITEM_HEIGHT}px`,
  overflow: 'hidden',
  position: 'relative',
  touchAction: 'none',
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
    background: 'linear-gradient(to bottom, var(--tsu-surface) 0%, transparent 100%)',
  },
  '&::after': {
    bottom: 0,
    background: 'linear-gradient(to top, var(--tsu-surface) 0%, transparent 100%)',
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
  background: 'var(--tsu-pressed-accent)',
  pointerEvents: 'none',
  zIndex: 1,
})

const itemBaseClass = css({
  height: `${ITEM_HEIGHT}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: 'var(--tsu-text-secondary)',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0 4px',
  boxSizing: 'border-box',
})

const selectedItemClass = css({
  color: 'var(--tsu-fg)',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  fontSize: '22px',
})

const mountWheel = (el, wheel) => {
  if (el._wheel && el._wheel !== wheel) el._wheel.destroy()
  el._wheel = wheel
  wheel.mount(el)
}

const read = (v)=> typeof v === 'function' ? v() : v

const DatePicker = (props = {}) => {
  const [local] = splitProps(
    mergeProps({ size: 'md', disabled: false, intent: 'default', invalid: false, closeOnBackdrop: false }, props),
    ['value', 'onValueChange', 'placeholder', 'disabled', 'size', 'intent', 'invalid', 'className', 'closeOnBackdrop'],
  )

  const open = createSignal(false)

  const resolveValue = () => {
    const v = typeof local.value === 'function' ? local.value() : local.value
    return parseDate(v)
  }

  const isDisabled = () => {
    const d = typeof local.disabled === 'function' ? local.disabled() : local.disabled
    return !!d
  }

  const tempYear = createSignal(2000)
  const tempMonth = createSignal(0)
  const tempDay = createSignal(1)

  const selectedValue = createSignal(null)

  createEffect(() => {
    if (!open()) return
    const onKey = (e) => { if (e.key === 'Escape') cancel() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
    }
  })

  const closeSheet = () => {
    document.body.style.overflow = ''
    open(false)
  }

  const openSheet = () => {
    if (isDisabled()) return
    const d = resolveValue() || selectedValue() || new Date()
    tempYear(d.getFullYear())
    tempMonth(d.getMonth())
    tempDay(Math.min(d.getDate(), daysInMonth(d.getFullYear(), d.getMonth())))
    document.body.style.overflow = 'hidden'
    open(true)
  }

  const confirm = () => {
    const date = toDate(tempYear(), tempMonth(), tempDay())
    selectedValue(date)
    local.onValueChange?.(date)
    closeSheet()
  }

  const cancel = () => { closeSheet() }

  const dayItems = () => getDays(tempYear(), tempMonth())

  return (
    <>
      <button
        type='button'
        className={`${triggerWrapperClass} ${read(local.invalid) ? invalidWrapperClass : ''} ${isDisabled() ? triggerDisabledClass : ''} ${local.className || ''}`}
        onClick={openSheet}
        aria-disabled={isDisabled()}
      >
        {() => {
          const d = resolveValue()
          const displayDate = d || selectedValue()
          return (
            <span className={`${triggerBaseClass} ${intentClasses[read(local.intent)] ?? intentClasses.default} ${read(local.invalid) ? errorClass : ''} ${triggerSizeClasses[read(local.size)]} ${displayDate ? triggerValueClass : triggerPlaceholderClass}`}>
              {displayDate ? formatDateLabel(displayDate) : (local.placeholder || 'Select date')}
            </span>
          )
        }}
        <span className={calendarIconClass}>
          <Icon svg={calendarSvg} size={18} strokeWidth={1.5} />
        </span>
      </button>

      {() => {
        if (!open()) return null
        const y = tempYear()
        const m = tempMonth()
        const days = dayItems()
        const selDay = tempDay()

        const yearWheel = makeWheel(YEARS, YEARS.indexOf(y), false)
        const [monthItems, monthStartIdx] = expandCircular(MONTHS, m)
        const monthWheel = makeWheel(monthItems, monthStartIdx, true)
        const [dayItemsArr, dayStartIdx] = expandCircular(days, selDay - 1)
        const dayWheel = makeWheel(dayItemsArr, dayStartIdx, true)

        return (
          <Portal>
            <div className={`${overlayClass} ${openClass}`}>
              <div className={backdropClass} role='presentation' aria-hidden='true' onClick={read(local.closeOnBackdrop) ? cancel : undefined} />
            <div className={sheetClass} role='dialog' aria-label='Date picker'>
              <div className={toolbarClass}>
                <button className={toolbarBtnClass} type='button' onClick={cancel}>Cancel</button>
                <span className={toolbarTitleClass}>Select Date</span>
                <button className={toolbarBtnClass} type='button' onClick={confirm}>Done</button>
              </div>
              <div className={wheelAreaClass}>
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
                          const maxDay = daysInMonth(newYear, tempMonth())
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
                        {dayItemsArr.map((item, i) => (
                          <div className={`${itemBaseClass} ${i === dayStartIdx ? selectedItemClass : ''}`} key={i}>{String(item)}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </Portal>
        )
      }}
    </>
  )
}

export default DatePicker
export { DatePicker }
