import { Combobox, useComboboxContext } from '@plastic-js/ark'
import {
	Loop, createComputed, createContext, createEffect, createSignal, splitProps, useContext,
} from '@plastic-js/plastic'
import { collection as createCollection } from '@zag-js/combobox'

// FilteredSelect — a filterable single-select built on the pure `Combobox`
// primitive's underlying headless machine.
//
// This file owns two things:
//   1. The filter plumbing. The headless component is "controlled collection"
//      only: it expects you to build a @zag-js collection yourself and narrow it
//      down as the user types. The internal <Root> keeps a query in sync with the
//      input, filters the list and feeds a reactive collection back to the
//      headless Root.
//   2. The public API / contract. The default-exported <FilteredSelect> assembles
//      the full structure (label, control, input, trigger, content, items) and
//      exposes a flat prop API. It is intentionally style-agnostic: every visual
//      slot is themed through the `classNames` map, so the styling layer
//      only has to supply CSS.

const access = (value)=> {
	return typeof value === 'function' ? value() : value
}

// Exposes the filtered items to <Items> without forcing the caller to thread
// them through props.
const FilterContext = createContext(null)

const defaultItemToValue = item=> String(item?.value ?? item?.id ?? item)
const defaultItemToString = item=> String(item?.label ?? item?.name ?? item)

// Substring match on the item's display string. Override via the `filter` prop
// for fuzzy/score-based matching.
const defaultFilter = (item, query, itemToString)=> itemToString(item).toLowerCase().includes(query)

const Root = (props = {})=> {
	const [local, rest] = splitProps(props, [
		'items', 'itemToValue', 'itemToString', 'filter', 'inputValue', 'onInputValueChange', 'children',
	])

	const itemToValue = local.itemToValue ?? defaultItemToValue
	const itemToString = local.itemToString ?? defaultItemToString
	const filter = local.filter ?? defaultFilter

	// Internal query mirrors the input. We seed it from any `inputValue` the
	// caller passed so an initial/controlled value still filters correctly.
	const query = createSignal(access(local.inputValue) ?? '')

	// Recomputes on typing and whenever the source `items` change. An empty
	// query shows everything; otherwise only the matches survive.
	const filteredItems = createComputed(()=> {
		const q = query().trim().toLowerCase()
		const list = access(local.items) ?? []
		return q ? list.filter(item=> filter(item, q, itemToString)) : list
	})

	const collection = createComputed(()=> createCollection({
		items: filteredItems(),
		itemToValue,
		itemToString,
	}))

	return (
		<FilterContext.Provider value={filteredItems}>
			<Combobox.Root
				{...rest}
				collection={collection}
				inputValue={query}
				onInputValueChange={(value)=> {
					query(value)
					local.onInputValueChange?.(value)
				}}
			>
				<HighlightSingleMatch itemToValue={itemToValue} items={filteredItems} />
				{local.children}
			</Combobox.Root>
		</FilterContext.Provider>
	)
}

// When the open list narrows to a single match, pre-highlight it so the user
// can confirm with Enter/Tab without arrowing down. We nudge the machine's own
// (uncontrolled) highlight imperatively rather than controlling `highlightedValue`
// — controlling it would pin the highlight in place and fight the machine, e.g.
// blocking the highlight-clear on the next keystroke and the select-and-close on
// Enter. We only set it; the machine still clears/moves it on input and navigation.
const HighlightSingleMatch = (props = {})=> {
	const combobox = useComboboxContext()
	createEffect(()=> {
		const api = combobox()
		const list = props.items()
		if (!api.open || list.length !== 1){ return }
		const value = props.itemToValue(list[0])
		if (api.highlightedValue !== value){ api.setHighlightValue(value) }
	})
	return null
}

// The headless input only fires zag's INPUT.CHANGE on the native `change`
// event — which, unlike React's onChange, fires on blur, not per keystroke. So
// typing never reached the machine and the list never filtered. We bridge the
// per-keystroke `input` event to zag's own onChange handler so every character
// drives the same INPUT.CHANGE (open + filter) behaviour.
const Input = (props = {})=> {
	const combobox = useComboboxContext()
	return (
		<Combobox.Input
			{...props}
			onInput={event=> combobox().getInputProps().onChange?.(event)}
		/>
	)
}

// Render-prop over the filtered items. Place inside <Combobox.Content> and
// return a <Combobox.Item> for each match. Backed by <Loop> so the list stays
// reactive — a bare thunk returned from a component is unwrapped once and would
// never re-filter.
const Items = (props = {})=> {
	const items = useContext(FilterContext)
	return (
		<Loop each={items ?? []}>
			{item=> props.children?.(item)}
		</Loop>
	)
}

function ChevronIcon(){
	return (
		<svg
			fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'
			strokeWidth='2' viewBox='0 0 24 24'
		>
			<polyline points='6 9 12 15 18 9' />
		</svg>
	)
}

function CheckIcon(){
	return (
		<svg
			fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'
			strokeWidth='2.5' viewBox='0 0 24 24'
		>
			<polyline points='20 6 9 17 4 12' />
		</svg>
	)
}

// Public component. `classNames` themes each slot (control/input/trigger/content/
// empty/item/itemText/check/label); anything not split here (e.g. `filter`,
// `name`) flows through to the filter Root.
const FilteredSelect = (props = {})=> {
	const [local, rest] = splitProps(props, [
		'items',
		'itemToString',
		'itemToValue',
		'placeholder',
		'label',
		'openOnClick',
		'disabled',
		'classNames',
		'emptyText',
	])

	const cn = local.classNames ?? {}

	// `value`, `onValueChange`, `filter`, `name`, … are not transformed here, so
	// they ride `rest` straight through to the underlying machine.
	return (
		<Root
			itemToString={local.itemToString}
			itemToValue={local.itemToValue}
			items={local.items}
			openOnClick={local.openOnClick ?? true}
			{...rest}
		>
			{local.label && (
				<Combobox.Label className={cn.label}>
					{local.label}
				</Combobox.Label>
			)}
			<Combobox.Control className={cn.control}>
				<Input
					className={cn.input}
					disabled={local.disabled}
					placeholder={local.placeholder ?? 'Type to search...'}
				/>
				<Combobox.Trigger className={cn.trigger} type='button'>
					<ChevronIcon />
				</Combobox.Trigger>
			</Combobox.Control>
			<Combobox.Content className={cn.content}>
				<Combobox.Empty className={cn.empty}>
					{local.emptyText ?? 'No results found'}
				</Combobox.Empty>
				<Items>
					{item=> (
						<Combobox.Item className={cn.item} item={item} key={local.itemToValue?.(item) ?? item}>
							<Combobox.ItemText className={cn.itemText}>
								{local.itemToString?.(item) ?? String(item)}
							</Combobox.ItemText>
							<span className={cn.check}>
								<CheckIcon />
							</span>
						</Combobox.Item>
					)}
				</Items>
			</Combobox.Content>
		</Root>
	)
}

export default FilteredSelect
