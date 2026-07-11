import { css } from '@emotion/css'
import {
	Loop, Portal, createContext, createEffect, createSignal, splitProps, useContext,
} from '@plastic-js/plastic'
import Icon from '../Icon.jsx'
import { part } from './anatomy.js'

const chevronDownSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
const checkSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'

const triggerClass = css({
	flexShrink: 0,
	width: '100%',
	height: '44px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: '4px',
	background: 'var(--bg, rgba(0,0,0,0.2))',
	border: '1px solid var(--border)',
	borderRadius: '10px',
	padding: '0 10px',
	color: 'var(--ink)',
	fontSize: '15px',
	fontFamily: 'inherit',
	textAlign: 'left',
	outline: 'none',
	cursor: 'pointer',
	'&:focus-visible': { borderColor: 'var(--accent)' },
})

const triggerValueClass = css({
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
})

const triggerPlaceholderClass = css({
	color: 'var(--muted)',
})

const triggerIndicatorClass = css({
	flexShrink: 0,
	color: 'var(--muted)',
	display: 'flex',
	'& svg': { width: '16px', height: '16px' },
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
	maxHeight: '70vh',
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

const grabberClass = css({
	flexShrink: 0,
	display: 'flex',
	justifyContent: 'center',
	padding: '10px 0 4px',
})

const grabberBarClass = css({
	width: '36px',
	height: '4px',
	borderRadius: '999px',
	background: 'var(--border)',
})

const listClass = css({
	overflowY: 'auto',
	WebkitOverflowScrolling: 'touch',
	padding: '0 8px 8px',
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
	color: 'var(--ink)',
	fontSize: '16px',
	fontFamily: 'inherit',
	textAlign: 'left',
	cursor: 'pointer',
	'&:active': { background: 'rgba(255,255,255,0.06)' },
})

const itemIndicatorClass = css({
	flexShrink: 0,
	color: 'var(--accent)',
	display: 'flex',
	'& svg': { width: '18px', height: '18px' },
})

const SelectMobileContext = createContext(null)

const useSelectMobile = ()=> {
	const ctx = useContext(SelectMobileContext)
	if (!ctx){ throw new Error('SelectMobile parts must be used inside <SelectMobile.Root>') }
	return ctx
}

const read = (source)=> {
	return typeof source === 'function' ? source() : source
}

// <SelectMobile.Root> — holds selection + open state, resolves item -> value/label.
// Props:
//   value         current value (string | getter)
//   onValueChange (value) => void  — called when an item is chosen
//   items         data array (or getter) supplied by the consumer
//   itemToValue   (item) => string  — default item.value
//   itemToLabel   (item) => node    — default item.label
//   open          controlled open state (getter) — when provided, the component
//                 is controlled and you must update it via onOpenChange
//   defaultOpen   initial open state for uncontrolled mode  (default false)
//   onOpenChange  (isOpen) => void — called when open state changes
const Root = (props)=> {
	const [local, rest] = splitProps(props, [
		'value', 'onValueChange', 'items', 'itemToValue', 'itemToLabel',
		'open', 'defaultOpen', 'onOpenChange', 'children',
	])
	const internalOpen = createSignal(local.defaultOpen ?? false)

	const open = (v)=> {
		if (v === undefined){
			// getter — controlled if `open` prop is provided, else internal
			return local.open !== undefined ? read(local.open) : internalOpen()
		}
		// setter
		if (local.open !== undefined){
			local.onOpenChange?.(v)
		} else {
			internalOpen(v)
			local.onOpenChange?.(v)
		}
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

	createEffect(()=> {
		if (!open()){ return undefined }
		const onKey = (e)=> { if (e.key === 'Escape'){ open(false) } }
		document.addEventListener('keydown', onKey)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return ()=> {
			document.removeEventListener('keydown', onKey)
			document.body.style.overflow = prevOverflow
		}
	})

	// Plastic components run once (fine-grained reactivity), so this object is
	// created a single time per mount — the React "stable value" rule misfires.
	// eslint-disable-next-line react/jsx-no-constructed-context-values
	const ctx = {
		open, value, items, itemToValue, itemToLabel, isSelected, selectedItem, setValue,
	}

	return (
		<SelectMobileContext.Provider value={ctx}>
			<div {...part('root')} {...rest}>
				{local.children}
			</div>
		</SelectMobileContext.Provider>
	)
}

// <SelectMobile.Trigger> — the button that opens the sheet. Shows the selected
// item's label (or `placeholder`). Pass children to fully customize.
//
// NOTE: Uses <div role="button"> instead of a native <button> as a
// defense-in-depth measure against a Chrome iOS (WebKit) focus-lock bug.
//
// The primary fix is in <SelectMobile.Content>: the sheet is rendered inline
// (no <Portal>) so it stays inside the parent Dialog's focus-trap boundary.
// However, the <div role="button"> is kept as an additional safeguard — in
// WebKit, tapping a <button> inside a scrollable container with
// -webkit-overflow-scrolling:touch can pin activeElement to the button,
// causing subsequent focus() calls on the filter <input> to be silently
// ignored. A <div role="button"> is semantically equivalent for accessibility
// but does not trigger this WebKit focus-lock behaviour.
const Trigger = (props)=> {
	const ctx = useSelectMobile()
	const [local, rest] = splitProps(props, ['placeholder', 'className', 'children'])

	return (
		<div
			{...part('trigger')}
			className={`${triggerClass} ${local.className || ''}`}
			onClick={()=> ctx.open(true)}
			role='button'
			tabIndex={0}
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

// <SelectMobile.Item> — a selectable row. Provide `item` (resolved via Root's
// accessors) or an explicit `value` + children for custom content.
const Item = (props)=> {
	const ctx = useSelectMobile()
	const [local, rest] = splitProps(props, ['item', 'value', 'className', 'children'])
	const value = ()=> local.item !== undefined ? ctx.itemToValue(local.item) : local.value

	return (
		<button
			{...part('item')}
			className={`${itemClass} ${local.className || ''}`}
			data-selected={()=> ctx.isSelected(value()) ? '' : undefined}
			onClick={()=> ctx.setValue(value())}
			type='button'
			{...rest}
		>
			<span {...part('itemText')}>
				{local.children ?? (local.item !== undefined && ctx.itemToLabel(local.item))}
			</span>
			{()=> ctx.isSelected(value()) && (
				<span {...part('itemIndicator')} className={itemIndicatorClass}>
					<Icon svg={checkSvg} />
				</span>
			)}
		</button>
	)
}

// <SelectMobile.Content> — the bottom sheet. With no children it auto-renders one
// SelectMobile.Item per Root item; pass `clearable` to prepend a "clear" row.
// Props:
//   clearable         show a "clear" row at the top
//   clearLabel        label for the clear row  (default "None")
//   backdropClassName className passed to the backdrop (higher priority)
//   backdropStyle     inline style passed to the backdrop (higher priority)
//
// NOTE: No <Portal> wrapper. The overlay uses `position: fixed; inset: 0;
// z-index: 1000` so it still covers the viewport without being portaled to
// document.body. Rendering inline keeps the sheet inside the nearest focus-trap
// boundary (e.g. a parent Dialog), which prevents zag-js / ark focus traps from
// fighting the filter input's auto-focus. This is the primary fix for the
// Chrome iOS focus-lock bug when SelectMobile is nested inside a Dialog.
const Content = (props)=> {
	const ctx = useSelectMobile()
	const [local, rest] = splitProps(props, [
		'clearable', 'clearLabel', 'className',
		'backdropClassName', 'backdropStyle', 'children',
	])
	return (
		<div
			{...part('positioner')}
			aria-hidden={()=> !ctx.open()}
			className={`${overlayClass} ${ctx.open() ? openClass : ''}`}
		>
			<div {...part('backdrop')} className={`${backdropClass} ${local.backdropClassName || ''}`} style={local.backdropStyle} onClick={()=> ctx.open(false)} />
			<div {...part('content')} className={`${sheetClass} ${local.className || ''}`} role='dialog' {...rest}>
				<div {...part('grabber')} className={grabberClass} onClick={()=> ctx.open(false)}>
					<span className={grabberBarClass} />
				</div>
				<div {...part('list')} className={listClass}>
					{local.children ?? (
						<>
							{()=> local.clearable && (
								<Item value=''>
									{local.clearLabel ?? 'None'}
								</Item>
							)}
							<Loop each={ctx.items}>
								{item=> <Item item={item} key={ctx.itemToValue(item)} />}
							</Loop>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

const SelectMobile = Object.assign(Root, {
	Root, Trigger, Content, Item,
})

export default SelectMobile
export {
	SelectMobile, Root, Trigger, Content, Item,
}