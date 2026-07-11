import { Loop, createSignal } from '@plastic-js/plastic'
import FilterableSelect from '../../src/components/FilterableSelect.jsx'

// ── sample data ──────────────────────────────────────────────────────────
const cities = [
	{ value: 'tpe', label: '台北市 Taipei' },
	{ value: 'ntpc', label: '新北市 New Taipei' },
	{ value: 'txg', label: '台中市 Taichung' },
	{ value: 'tnn', label: '台南市 Tainan' },
	{ value: 'kxg', label: '高雄市 Kaohsiung' },
	{ value: 'tao', label: '桃園市 Taoyuan' },
	{ value: 'hsq', label: '新竹市 Hsinchu' },
	{ value: 'hld', label: '花蓮縣 Hualien' },
	{ value: 'ttt', label: '台東縣 Taitung' },
	{ value: 'ilo', label: '宜蘭縣 Yilan' },
	{ value: 'cyi', label: '嘉義市 Chiayi' },
	{ value: 'kln', label: '基隆市 Keelung' },
	{ value: 'mia', label: '苗栗縣 Miaoli' },
	{ value: 'nnt', label: '南投縣 Nantou' },
	{ value: 'phd', label: '澎湖縣 Penghu' },
	{ value: 'kmm', label: '金門縣 Kinmen' },
	{ value: 'lien', label: '連江縣 Lienchiang' },
]

const frameworks = [
	'Plastic JS', 'React', 'Vue', 'Svelte', 'Solid', 'Angular',
	'Preact', 'Lit', 'Alpine', 'HTMX',
]

// ── Basic example ────────────────────────────────────────────────────────
function BasicExample(){
	const value = createSignal(null)
	const selected = ()=> {
		const v = value()
		if (!v) return <em style="color:#999">none</em>
		const item = cities.find(c => c.value === v)
		return item ? `${item.label} (${item.value})` : v
	}
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Basic</h3>
			<FilterableSelect
				items={cities}
				itemToValue={item=> item.value}
				itemToString={item=> item.label}
				label='City'
				value={value}
				onValueChange={v => value(v)}
				classNames={classNames}
			/>
			<div className='demo-value'>Selected: {selected}</div>
		</div>
	)
}

// ── Disabled ─────────────────────────────────────────────────────────────
function DisabledExample(){
	const value = createSignal('kxg')
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Disabled</h3>
			<FilterableSelect
				items={cities}
				itemToValue={item=> item.value}
				itemToString={item=> item.label}
				label='City (read-only)'
				disabled
				value={value}
				onValueChange={v => value(v)}
				classNames={classNames}
			/>
			<div className='demo-value'>Value: Kaohsiung</div>
		</div>
	)
}

// ── String items ─────────────────────────────────────────────────────────
function StringItemsExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>String Items</h3>
			<FilterableSelect
				items={frameworks}
				label='Framework'
				value={value}
				onValueChange={v => value(v)}
				classNames={classNames}
			/>
			<div className='demo-value'>Selected: {value() ?? <em style="color:#999">none</em>}</div>
		</div>
	)
}

// ── Controlled value ─────────────────────────────────────────────────────
function ControlledExample(){
	const value = createSignal('tpe')
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Default Value (Taipei)</h3>
			<FilterableSelect
				items={cities}
				itemToValue={item=> item.value}
				itemToString={item=> item.label}
				label='City'
				value={value}
				onValueChange={v => value(v)}
				classNames={classNames}
			/>
			<div className='demo-value'>Selected: {() => {
				const v = value()
				const item = cities.find(c => c.value === v)
				return item ? `${item.label}` : v
			}}</div>
		</div>
	)
}

// ── Playground ───────────────────────────────────────────────────────────
const allItems = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Lemon', 'Mango', 'Orange', 'Peach', 'Pear', 'Strawberry', 'Watermelon']

function Playground(){
	const value = createSignal(null)
	const filterMode = createSignal('substring')
	const dataSize = createSignal('all')

	const currentItems = ()=>{
		return dataSize() === 'few' ? allItems.slice(0, 4) : allItems
	}

	const filter = (item, query, itemToString)=> {
		const str = itemToString(item).toLowerCase()
		return filterMode() === 'prefix'
			? str.startsWith(query)
			: str.includes(query)
	}

	return (
		<div className='demo-section'>
			<h2 className='demo-h2'>Playground</h2>
			<div className='demo-playground-row'>
				<span className='demo-label'>Filter mode:</span>
				<button
					className={`demo-tag-btn ${() => filterMode() === 'substring' ? 'active' : ''}`}
					onclick={()=> filterMode('substring')}
				>Substring</button>
				<button
					className={`demo-tag-btn ${() => filterMode() === 'prefix' ? 'active' : ''}`}
					onclick={()=> filterMode('prefix')}
				>Prefix</button>
				<span className='demo-label' style="margin-left:1rem">Items:</span>
				<button
					className={`demo-tag-btn ${() => dataSize() === 'all' ? 'active' : ''}`}
					onclick={()=> dataSize('all')}
				>12 fruits</button>
				<button
					className={`demo-tag-btn ${() => dataSize() === 'few' ? 'active' : ''}`}
					onclick={()=> dataSize('few')}
				>4 fruits</button>
			</div>
			<FilterableSelect
				items={currentItems}
				itemToString={item=> item}
				filter={filter}
				label='Fruit'
				placeholder='Type to filter…'
				value={value}
				onValueChange={v => value(v)}
				classNames={classNames}
			/>
			<div className='demo-value-tag'>{() => value() ? `Selected: ${value()}` : 'No selection'}</div>
		</div>
	)
}

// ── Empty state demo ─────────────────────────────────────────────────────
function EmptyStateExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Empty State</h3>
			<FilterableSelect
				items={[]}
				itemToValue={item=> item.value}
				itemToString={item=> item.label}
				label='No items'
				placeholder='Nothing to select…'
				value={value}
				onValueChange={v => value(v)}
				classNames={classNames}
				emptyText='There is nothing here'
			/>
		</div>
	)
}

// ── Events log ───────────────────────────────────────────────────────────
function EventsLog(){
	const value = createSignal(null)
	const logs = createSignal([])
	const addLog = (msg)=> logs(prev => [...prev.slice(-4), msg])
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Events</h3>
			<FilterableSelect
				items={cities}
				itemToValue={item=> item.value}
				itemToString={item=> item.label}
				label='City'
				value={value}
				onValueChange={v => { value(v); addLog(`select: ${v}`) }}
				onInputValueChange={v => addLog(`input: "${v}"`)}
				classNames={classNames}
			/>
			<div className='demo-chips'>
				{() => logs().map((msg, i) => <span className='demo-chip'>{msg}</span>)}
			</div>
		</div>
	)
}

// ── classNames for FilterableSelect ────────────────────────────────────────
const classNames = {
	label: 'fs-label',
	control: 'fs-control',
	input: 'fs-input',
	trigger: 'fs-trigger',
	content: 'fs-content',
	item: 'fs-item',
	itemText: 'fs-item-text',
	check: 'fs-check',
	empty: 'fs-empty',
}

export default function FilterableSelectPage(){
	return (
		<div className='container'>
			<div className='hero'>
				<p className='eyebrow'>Select</p>
				<h1>FilterableSelect</h1>
				<p className='hero-copy'>
					A filterable single-select. Type to narrow down options —
					powered by substring matching with custom filter support.
				</p>
			</div>

			<div className='feature-card'>
				<div className='demo-row'>
					<BasicExample />
					<ControlledExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<StringItemsExample />
					<DisabledExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<EventsLog />
					<EmptyStateExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<Playground />
			</div>
		</div>
	)
}