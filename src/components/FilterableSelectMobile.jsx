import { css } from '@emotion/css'
import { createSignal, splitProps } from '@plastic-js/plastic'
import { SelectMobile } from './SelectMobile/index.jsx'

// ── Styles ───────────────────────────────────────────────────────────────
const inputClass = css({
	width: '100%',
	height: '42px',
	padding: '0 14px',
	marginBottom: '6px',
	background: 'rgba(255,255,255,0.06)',
	border: '1px solid var(--border)',
	borderRadius: '10px',
	color: 'var(--ink)',
	fontSize: '16px',
	fontFamily: 'inherit',
	outline: 'none',
	boxSizing: 'border-box',
	'&:focus': { borderColor: 'var(--accent)' },
	'&::placeholder': { color: 'var(--muted)' },
})

const noResultsClass = css({
	padding: '20px 14px',
	textAlign: 'center',
	color: 'var(--muted)',
	fontSize: '14px',
})

// ── Default accessors ────────────────────────────────────────────────────
const defaultItemToValue = item=> item?.value ?? item
const defaultItemToLabel = item=> item?.label ?? String(item)
const defaultFilter = (item, query, itemToLabel)=> itemToLabel(item).toLowerCase().includes(query)

// ── FilterableSelectMobile ───────────────────────────────────────────────
//
// A mobile bottom-sheet select with a filter input at the top of the list.
// Wraps SelectMobile internally — exposes a flat single-component API.
//
// Props:
//   items             data array (or getter)
//   value             current value (string | getter)
//   onValueChange     (value) => void
//   itemToValue       (item) => string          — default item.value ?? item
//   itemToLabel       (item) => string          — default item.label ?? String(item)
//   placeholder       trigger placeholder text  — default "Select"
//   filter            (item, query, itemToLabel) => boolean  — default substring match
//   clearable         show a "clear" row
//   clearLabel        label for the clear row
//   backdropClassName className for the backdrop
//   backdropStyle     inline style for the backdrop
const FilterableSelectMobile = (props)=> {
	const [local] = splitProps(props, [
		'items', 'value', 'onValueChange',
		'itemToValue', 'itemToLabel',
		'placeholder', 'filter',
		'clearable', 'clearLabel',
		'backdropClassName', 'backdropStyle',
	])

	const itemToValue = local.itemToValue ?? defaultItemToValue
	const itemToLabel = local.itemToLabel ?? defaultItemToLabel
	const filter = local.filter ?? defaultFilter

	const query = createSignal('')
	let inputEl = null

	// Reactive filter — recomputes on typing and items changes.
	const filteredItems = ()=> {
		const q = query().trim().toLowerCase()
		const list = typeof local.items === 'function' ? local.items() : (local.items ?? [])
		return q ? list.filter(item=> filter(item, q, itemToLabel)) : list
	}

	// Auto-focus the input when the sheet opens; clear query on close.
	const handleOpenChange = (isOpen)=> {
		if (isOpen){
			queueMicrotask(()=> inputEl?.focus())
		} else {
			query('')
		}
	}

	return (
		<SelectMobile.Root
			value={local.value}
			onValueChange={local.onValueChange}
			items={local.items}
			itemToValue={itemToValue}
			itemToLabel={itemToLabel}
			onOpenChange={handleOpenChange}
		>
			<SelectMobile.Trigger placeholder={local.placeholder} />
			<SelectMobile.Content
				clearable={local.clearable}
				clearLabel={local.clearLabel}
				backdropClassName={local.backdropClassName}
				backdropStyle={local.backdropStyle}
			>
				<input
					ref={el=> { inputEl = el }}
					type='text'
					className={inputClass}
					placeholder='Filter…'
					value={query}
					onInput={e=> query(e.target.value)}
					onClick={e=> e.stopPropagation()}
				/>
				{()=> {
					const list = filteredItems()
					if (list.length === 0){
						return <div className={noResultsClass}>No results</div>
					}
					return list.map(item => (
						<SelectMobile.Item item={item} key={itemToValue(item)} />
					))
				}}
			</SelectMobile.Content>
		</SelectMobile.Root>
	)
}

export default FilterableSelectMobile