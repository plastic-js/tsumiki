import { createSignal } from '@plastic-js/plastic'
import FilterableSelectMobile from '../../src/components/FilterableSelectMobile.jsx'

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

const colors = [
	{ value: 'crimson', label: 'Crimson' },
	{ value: 'forest', label: 'Forest Green' },
	{ value: 'royal', label: 'Royal Blue' },
	{ value: 'goldenrod', label: 'Goldenrod' },
	{ value: 'slate', label: 'Slate Gray' },
	{ value: 'plum', label: 'Plum' },
	{ value: 'coral', label: 'Coral' },
	{ value: 'navy', label: 'Navy' },
]

// ── Basic ────────────────────────────────────────────────────────────────
function BasicExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Basic</h3>
			<FilterableSelectMobile
				items={cities}
				itemToValue={item=> item.value}
				itemToLabel={item=> item.label}
				value={value}
				onValueChange={v => value(v)}
				placeholder='Search city…'
			/>
			<div className='demo-value'>
				Selected: {() => {
					const v = value()
					if (!v) return <em style="color:#999">none</em>
					const item = cities.find(c => c.value === v)
					return item ? `${item.label} (${item.value})` : v
				}}
			</div>
		</div>
	)
}

// ── Default value ────────────────────────────────────────────────────────
function DefaultValueExample(){
	const value = createSignal('kxg')
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Default Value</h3>
			<FilterableSelectMobile
				items={cities}
				itemToValue={item=> item.value}
				itemToLabel={item=> item.label}
				value={value}
				onValueChange={v => value(v)}
				placeholder='Search city…'
			/>
			<div className='demo-value'>
				Selected: {() => {
					const v = value()
					const item = cities.find(c => c.value === v)
					return item ? `${item.label}` : v
				}}
			</div>
		</div>
	)
}

// ── Clearable ────────────────────────────────────────────────────────────
function ClearableExample(){
	const value = createSignal('royal')
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Clearable</h3>
			<FilterableSelectMobile
				items={colors}
				itemToValue={item=> item.value}
				itemToLabel={item=> item.label}
				value={value}
				onValueChange={v => value(v)}
				placeholder='Pick a color…'
				clearable
				clearLabel='None'
			/>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

// ── String items ─────────────────────────────────────────────────────────
function StringItemsExample(){
	const value = createSignal(null)
	const frameworks = [
		'Plastic JS', 'React', 'Vue', 'Svelte', 'Solid', 'Angular',
		'Preact', 'Lit', 'Alpine', 'HTMX', 'Ember', 'Backbone',
	]
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>String Items</h3>
			<FilterableSelectMobile
				items={frameworks}
				value={value}
				onValueChange={v => value(v)}
				placeholder='Search framework…'
			/>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

// ── Custom filter ────────────────────────────────────────────────────────
function CustomFilterExample(){
	const value = createSignal(null)
	const fruits = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blackberry', 'Blueberry', 'Cherry', 'Coconut', 'Cranberry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Grapefruit', 'Kiwi', 'Lemon', 'Lime', 'Mango', 'Orange', 'Papaya', 'Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Raspberry', 'Strawberry', 'Watermelon']
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Prefix Filter</h3>
			<FilterableSelectMobile
				items={fruits}
				value={value}
				onValueChange={v => value(v)}
				placeholder='Type fruit name…'
				filter={(item, query, itemToLabel) => itemToLabel(item).toLowerCase().startsWith(query)}
			/>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

export default function FilterableSelectMobilePage(){
	return (
		<div className='container'>
			<div className='hero'>
				<p className='eyebrow'>Select</p>
				<h1>FilterableSelectMobile</h1>
				<p className='hero-copy'>
					A mobile-optimized bottom-sheet select with a filter input.
					Type to narrow down options — supports custom filter
					functions and all SelectMobile customization props.
				</p>
			</div>

			<div className='feature-card'>
				<div className='demo-row'>
					<BasicExample />
					<DefaultValueExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<ClearableExample />
					<StringItemsExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<CustomFilterExample />
				</div>
			</div>
		</div>
	)
}