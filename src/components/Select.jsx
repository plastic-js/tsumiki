import { css } from '@emotion/css'
import { useDialogContext } from '@plastic-js/ark'
import {
	Loop, createContext, createEffect, createSignal, mergeProps, onCleanup, onMount, splitProps, useContext,
} from '@plastic-js/plastic'
import { trapFocus } from '@zag-js/focus-trap'
import BottomSheet from './BottomSheet.jsx'
import Icon from './Icon.jsx'

const SCOPE = 'select'

const part = name=> ({ 'data-scope': SCOPE, 'data-part': name })

const chevronDownSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
const checkSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
const searchSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>'
const xSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'

const triggerBaseClass = css({
	flexShrink: 0,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '4px',
	color: 'var(--tsu-fg)',
	fontFamily: 'inherit',
	textAlign: 'left',
	cursor: 'pointer',
	'&:focus-visible': { borderColor: 'var(--tsu-accent-outline-border-hover)' },
	// Disabled is a state layer (opacity + grayscale). It works well on the
	// accent outline border but is nearly invisible on the neutral outline
	// border, which is already gray — see "Disabled Contrast" in the showcase.
	'&[data-disabled]': {
		opacity: 'var(--tsu-disabled-opacity)',
		cursor: 'not-allowed',
	},
})

const triggerVariants = {
	solid: css({
		backgroundColor: 'var(--tsu-bg-control)',
		border: '1px solid transparent',
	}),
	outline: css({
		border: '1px solid var(--_sel-border)',
	}),
}

const intentClasses = {
  default: css({
    '--_sel-border': 'var(--tsu-accent-outline-border)',
    '--_sel-border-focus': 'var(--tsu-accent-outline-border-hover)',
  }),
  neutral: css({
    '--_sel-border': 'var(--tsu-neutral-outline-border)',
    '--_sel-border-focus': 'var(--tsu-neutral-outline-border-hover)',
  }),
}

const errorClass = css({
  borderColor: 'var(--tsu-danger-outline-border) !important',
  '&:focus-visible': { borderColor: 'var(--tsu-danger-outline-border) !important' },
})

const sizeClasses = {
	xs: css({ height: 'var(--tsu-comp-height-xs)', padding: '0 var(--tsu-comp-padding-x-xs)', fontSize: 'var(--tsu-comp-font-size-xs)', borderRadius: 'var(--tsu-radius-l1-xs)' }),
	sm: css({ height: 'var(--tsu-comp-height-sm)', padding: '0 var(--tsu-comp-padding-x-sm)', fontSize: 'var(--tsu-comp-font-size-sm)', borderRadius: 'var(--tsu-radius-l1-sm)' }),
	md: css({ height: 'var(--tsu-comp-height-md)', padding: '0 var(--tsu-comp-padding-x-md)', fontSize: 'var(--tsu-comp-font-size-md)', borderRadius: 'var(--tsu-radius-l1-md)' }),
	lg: css({ height: 'var(--tsu-comp-height-lg)', padding: '0 var(--tsu-comp-padding-x-lg)', fontSize: 'var(--tsu-comp-font-size-lg)', borderRadius: 'var(--tsu-radius-l1-lg)' }),
	xl: css({ height: 'var(--tsu-comp-height-xl)', padding: '0 var(--tsu-comp-padding-x-xl)', fontSize: 'var(--tsu-comp-font-size-xl)', borderRadius: 'var(--tsu-radius-l1-xl)' }),
}

const triggerValueClass = css({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
})

const triggerPlaceholderClass = css({
	color: 'var(--tsu-text-secondary)',
})

const triggerIndicatorClass = css({
	flexShrink: 0,
	color: 'var(--tsu-text-secondary)',
	display: 'flex',
	'& svg': { width: '16px', height: '16px' },
})

const listBodyClass = css({
	padding: 0,
})

const pauseTrapWrapClass = css({
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	minHeight: 0,
})

const listClass = css({
	flex: 1,
	minHeight: 0,
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
	padding: '0 8px calc(8px + env(safe-area-inset-bottom, 0px))',
})

const itemClass = css({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '10px',
	height: '52px',
	padding: '0 14px',
	background: 'transparent',
	border: 'none',
	borderRadius: '12px',
	color: 'var(--tsu-fg)',
	fontSize: '16px',
	fontFamily: 'inherit',
	textAlign: 'left',
	cursor: 'pointer',
	'&:active': { background: 'var(--tsu-pressed)' },
	'&[data-selected]': { background: 'var(--tsu-pressed-accent)' },
	'&:disabled': {
		opacity: 'var(--tsu-disabled-opacity)',
		cursor: 'not-allowed',
	},
})

const itemIndicatorClass = css({
	flexShrink: 0,
	color: 'var(--tsu-accent-solid-bg)',
	display: 'flex',
	'& svg': { width: '18px', height: '18px' },
})

const filterWrapperClass = css({
	position: 'relative',
	marginBottom: '6px',
})

const filterInputClass = css({
	width: '100%',
	height: '42px',
	padding: '0 36px 0 40px',
	background: 'var(--tsu-bg-panel)',
	border: '1px solid var(--_sel-border)',
	borderRadius: '10px',
	color: 'var(--tsu-fg)',
	fontSize: '16px',
	fontFamily: 'inherit',
	boxSizing: 'border-box',
	'&:focus': { borderColor: 'var(--_sel-border-focus)' },
	'&::placeholder': { color: 'var(--tsu-text-secondary)' },
	'&::-webkit-search-cancel-button': { appearance: 'none' },
})

const filterIconClass = css({
	position: 'absolute',
	left: '12px',
	top: '50%',
	transform: 'translateY(-50%)',
	color: 'var(--tsu-text-secondary)',
	pointerEvents: 'none',
	display: 'flex',
	'& svg': { width: '18px', height: '18px' },
})

const filterClearClass = css({
	position: 'absolute',
	right: '4px',
	top: '50%',
	transform: 'translateY(-50%)',
	width: '28px',
	height: '28px',
	padding: '4px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'none',
	border: 'none',
	borderRadius: '6px',
	color: 'var(--tsu-text-secondary)',
	cursor: 'pointer',
	'& svg': { width: '16px', height: '16px' },
})

const noResultsClass = css({
	padding: '20px 14px',
	textAlign: 'center',
	color: 'var(--tsu-text-secondary)',
	fontSize: '14px',
})

const SelectContext = createContext(null)

const useSelect = ()=> {
	const ctx = useContext(SelectContext)
	if (!ctx){ throw new Error('SelectTrigger must be used inside <Select>') }
	return ctx
}

const read = (source)=> {
	return typeof source === 'function' ? source() : source
}

// <Select> — compound root. Holds value/open state, internally renders Content.
// Props:
//   value             current value (string | getter)
//   onValueChange     (value) => void
//   items             data array (or getter)
//   itemToValue       (item) => string         default item.value
//   itemToLabel       (item) => node           default item.label
	// open              controlled open state (getter) — REQUIRED
	// onOpenChange      (isOpen) => void
//   disabled          disable the Select
//   backdropClassName className for the backdrop
//   backdropStyle     inline style for the backdrop
//   filter            enable filter: true (substring match) or (item, query, itemToLabel) => boolean
const Select = (props)=> {
	const [local, rest] = splitProps(mergeProps({ size: 'md', variant: 'outline', intent: 'default', invalid: false }, props), [
		'value', 'onValueChange', 'items', 'itemToValue', 'itemToLabel',
		'open', 'onOpenChange', 'disabled', 'children', 'size',
		'backdropClassName', 'backdropStyle',
		'filter', 'variant', 'intent', 'invalid',
	])

	const open = (v)=> {
		if (v === undefined){
			return read(local.open)
		}
		document.body.style.overflow = v ? 'hidden' : ''
		if (!v) query('')
		local.onOpenChange?.(v)
	}

	const itemToValue = (item)=> {
		if (item == null){ return undefined }
		return local.itemToValue ? local.itemToValue(item) : item.value
	}
	const itemToLabel = (item)=> {
		if (item == null){ return undefined }
		return local.itemToLabel ? local.itemToLabel(item) : item.label
	}
	const items = ()=> read(local.items) || []
	const value = ()=> read(local.value) ?? ''
	const isSelected = v=> String(value()) === String(v)
	const selectedItem = ()=> items().find(item=> isSelected(itemToValue(item)))

	const setValue = (v)=> {
		local.onValueChange?.(v)
		open(false)
	}

	const query = createSignal('')
	const filterFn = typeof local.filter === 'function' ? local.filter : (item, q, toLabel) => String(toLabel(item)).toLowerCase().includes(q)
	const filteredItems = ()=> {
		const q = query().trim().toLowerCase()
		const list = items()
		if (!q) return list
		return list.filter(item => filterFn(item, q, itemToLabel))
	}

	createEffect(()=> {
		if (!open()){ return undefined }
		const onKey = (e)=> { if (e.key === 'Escape'){ open(false) } }
		document.addEventListener('keydown', onKey)
		return ()=> {
			document.removeEventListener('keydown', onKey)
		}
	})

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const ctx = {
		open, value, items, itemToValue, itemToLabel, isSelected, selectedItem, setValue,
		disabled: ()=> read(local.disabled) ?? false,
		invalid: ()=> read(local.invalid) ?? false,
		size: ()=> read(local.size),
		variant: ()=> read(local.variant),
		intent: ()=> {
			const intent = read(local.intent)
			return intent === 'neutral' && read(local.variant) === 'solid' ? 'default' : intent
		},
		backdropClassName: local.backdropClassName,
		backdropStyle: local.backdropStyle,
		filter: local.filter,
		query,
		filteredItems,
	}

	return (
		<SelectContext.Provider value={ctx}>
			<div {...part('root')} {...rest}>
				{local.children}
				<Content />
			</div>
		</SelectContext.Provider>
	)
}

// <SelectTrigger> — required child. Shows selected label + chevron.
// Pass children to fully customize trigger content.
const SelectTrigger = (props)=> {
	const ctx = useSelect()
	const [local, rest] = splitProps(props, ['placeholder', 'className', 'children'])

	return (
		<div
			{...part('trigger')}
			className={`${triggerBaseClass} ${triggerVariants[ctx.variant() === 'solid' ? 'solid' : 'outline']} ${intentClasses[ctx.intent()] ?? intentClasses.default} ${ctx.invalid() ? errorClass : ''} ${sizeClasses[ctx.size()] || ''} ${local.className || ''}`}
			data-disabled={()=> ctx.disabled() ? '' : undefined}
			onClick={()=> { if (!ctx.disabled()) ctx.open(true) }}
			role='button'
			tabIndex={ctx.disabled() ? -1 : 0}
			{...rest}
		>
			{local.children ?? (
				<>
					<span
						{...part('triggerValue')}
						className={`${triggerValueClass} ${ctx.selectedItem() ? '' : triggerPlaceholderClass}`}
					>
						{()=> {
							const item = ctx.selectedItem()
							return item !== undefined ? ctx.itemToLabel(item) : local.placeholder ?? 'Select'
						}}
					</span>
					<span {...part('triggerIndicator')} className={triggerIndicatorClass}>
						<Icon svg={chevronDownSvg} />
					</span>
				</>
			)}
		</div>
	)
}

// <Item> — internal. A selectable row.
//
// NOTE: This is a hand-rolled <button>, NOT ArkSelect.Item. The underlying
// zag-js select machine supports item.disabled (see isItemDisabled in
// @zag-js/collection), but this custom button does not go through
// api().getItemProps(), so disabled support is implemented manually here
// (disabled attribute + style) instead of being inherited from the machine.
const Item = (props)=> {
	const ctx = useSelect()
	const [local, rest] = splitProps(props, ['item', 'value', 'className', 'children'])
	const value = ()=> local.item !== undefined ? ctx.itemToValue(local.item) : local.value
	const disabled = ()=> (local.item !== undefined ? local.item.disabled : local.disabled) ?? false

	return (
		<button
			{...part('item')}
			className={`${itemClass} ${local.className || ''}`}
			data-selected={()=> ctx.isSelected(value()) ? '' : undefined}
			disabled={()=> disabled()}
			onClick={()=> { if (!disabled()) ctx.setValue(value()) }}
			type='button'
			{...rest}
		>
			<span {...part('itemText')}>
				{local.children ?? (local.item !== undefined && ctx.itemToLabel(local.item))}
			</span>
			{()=> ctx.isSelected(value()) && !disabled() && (
				<span {...part('itemIndicator')} className={itemIndicatorClass}>
					<Icon svg={checkSvg} />
				</span>
			)}
		</button>
	)
}

// <List> — internal. Filter input + scrollable item list.
// Rendered as its own component so it is rebuilt from scratch every time the
// BottomSheet opens: the sheet unmounts its content (unmountOnExit) when
// closed, which disposes the list's reactive bindings. A component descriptor
// is re-materialized on re-open, giving the list fresh DOM + fresh bindings —
// a bare <div> child would be reused with dead bindings and render empty.
const List = ()=> {
	const ctx = useSelect()

	// Hold the list area at the height it opened with (the full, unfiltered
	// list) so the sheet doesn't shrink/jump while typing in the filter. The
	// height is measured once on open — under a large list it is the
	// max-height-limited flexed box, under a small list the natural content
	// height — and re-applied as `min-height` while filtering, so the sheet
	// keeps a stable height and the scroll region just shows fewer items.
	const heldHeight = createSignal(0)
	const holdRef = (el)=> {
		if (!el || !ctx.filter || heldHeight()) return
		requestAnimationFrame(()=> {
			if (el && !heldHeight()) heldHeight(el.clientHeight)
		})
	}

	// NOTE: The filter input is intentionally NOT auto-focused on open. The
	// sheet slides in over a ~350ms CSS animation, and programmatically calling
	// .focus() mid-animation leaves the field in a half-focused state on iOS:
	// subsequent taps appear to do nothing and the keyboard never appears.
	// Letting the user tap to focus keeps the input reliably interactive on all
	// devices.
	const handleFilterClear = ()=> {
		ctx.query('')
	}

	return (
		<div {...part('list')} ref={holdRef} className={listClass} style={()=> heldHeight() ? { minHeight: `${heldHeight()}px` } : undefined}>
			{()=> ctx.filter && (
				<div className={filterWrapperClass}>
					<span aria-hidden='true' className={filterIconClass}>
						<Icon svg={searchSvg} />
					</span>
					<input
						type='text'
						className={`${filterInputClass} ${intentClasses[ctx.intent()] ?? intentClasses.default} ${ctx.invalid() ? errorClass : ''}`}
						placeholder='Search…'
						value={ctx.query}
						onInput={e=> ctx.query(e.target.value)}
						onClick={e=> e.stopPropagation()}
					/>
					{()=> ctx.query() && (
						<button
							type='button'
							className={filterClearClass}
							onClick={e=> { e.stopPropagation(); handleFilterClear() }}
							aria-label='Clear search'
						>
							<Icon svg={xSvg} />
						</button>
					)}
				</div>
			)}
			{()=> {
				const list = ctx.filter ? ctx.filteredItems() : ctx.items()
				if (list.length === 0 && ctx.filter && ctx.open()){
					return <div className={noResultsClass}>No results</div>
				}
				return (
					<>
						<Loop each={() => list}>
							{item=> <Item item={item} key={ctx.itemToValue(item)} />}
						</Loop>
					</>
				)
			}}
		</div>
	)
}

// <PauseDialogTrap> — internal. Renders the sheet content inside a plain <div>
// and, while that div is mounted, activates a passive focus trap on it.
// @zag-js/focus-trap keeps a shared trap stack, so activating this trap pauses
// the previously-active trap (the parent Dialog's) and deactivating it resumes
// the Dialog's. That lets the sheet render as an independent portaled overlay —
// its own full-screen backdrop above the Dialog — without the Dialog's trap
// stealing focus from the filter input on iOS Safari (WebKit focus-lock).
// `initialFocus: false` keeps it from grabbing focus on open (the input is
// intentionally never auto-focused), and outside clicks (backdrop dismiss,
// grabber drag) stay allowed.
const PauseDialogTrap = ({ children })=> {
	let node = null
	let destroy = null

	onMount(()=> {
		if (!node) return
		destroy = trapFocus(()=> node, {
			initialFocus: false,
			allowOutsideClick: true,
			escapeDeactivates: false,
		})
	})
	onCleanup(()=> destroy?.())

	return <div className={pauseTrapWrapClass} ref={el=> { node = el }}>{children}</div>
}

// <Content> — internal. Bottom sheet overlay with backdrop + item list.
const Content = ()=> {
	const ctx = useSelect()

	// Always portal the sheet to <body> so it renders as an independent overlay
	// (its own full-screen backdrop). Inside a Dialog it must NOT render inline:
	// the dialog body is a touch-scroll container (`overflow-y: auto` +
	// `-webkit-overflow-scrolling: touch`), and iOS WebKit pins any `position:
	// fixed` descendant to that container, so an inline sheet looked like plain
	// dialog content with no backdrop of its own. A portaled sheet escapes the
	// Dialog's focus-trap boundary, so when a Dialog is present we wrap the list
	// in <PauseDialogTrap>, which pauses the Dialog's trap for the sheet's
	// lifetime and resumes it on close.
	const dialog = useDialogContext()

	return (
		<BottomSheet
			open={ctx.open}
			onOpenChange={({ open }) => ctx.open(open)}
			backdropBlur={false}
			backdropClassName={ctx.backdropClassName}
			backdropStyle={ctx.backdropStyle ?? { background: 'var(--tsu-bg-overlay)' }}
			contentClassName={listBodyClass}
			portal
		>
			{dialog ? <PauseDialogTrap><List /></PauseDialogTrap> : <List />}
		</BottomSheet>
	)
}

export default Select
export { Select, SelectTrigger }
