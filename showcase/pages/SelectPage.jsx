import { createSignal } from '@plastic-js/plastic'
import { Select, SelectTrigger } from '../../src/components/Select.jsx'

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
]

const frameworks = [
	{ value: 'plastic', label: 'Plastic JS' },
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'solid', label: 'Solid' },
	{ value: 'angular', label: 'Angular', disabled: true },
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

function BasicExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Basic</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={cities}>
				<SelectTrigger placeholder='Choose a city' />
			</Select>
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

function VariantExample(){
	const outlineValue = createSignal(null)
	const outlineOpen = createSignal(false)
	const solidValue = createSignal(null)
	const solidOpen = createSignal(false)
	const neutralValue = createSignal(null)
	const neutralOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Variants</p>
			<p className='demo-label' style={{ marginTop: '12px', color: '#999' }}>Outline (default)</p>
			<Select value={outlineValue} onValueChange={v => outlineValue(v)} open={outlineOpen} onOpenChange={v => outlineOpen(v)} items={cities}>
				<SelectTrigger placeholder='Choose a city' />
			</Select>
			<p className='demo-label' style={{ marginTop: '12px', color: '#999' }}>Solid</p>
			<Select value={solidValue} onValueChange={v => solidValue(v)} open={solidOpen} onOpenChange={v => solidOpen(v)} items={cities} variant="solid">
				<SelectTrigger placeholder='Choose a city' />
			</Select>
			<p className='demo-label' style={{ marginTop: '12px', color: '#999' }}>Neutral</p>
			<Select value={neutralValue} onValueChange={v => neutralValue(v)} open={neutralOpen} onOpenChange={v => neutralOpen(v)} items={frameworks} intent='neutral' filter>
				<SelectTrigger placeholder='Choose a framework' />
			</Select>
			<div className='demo-value'>
				Outline: {() => outlineValue() ?? <em style="color:#999">none</em>} | Solid: {() => solidValue() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

function FilterExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Filter</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={cities} filter>
				<SelectTrigger placeholder='Search a city' />
			</Select>
			<div className='demo-value'>
				Selected: {() => {
					const v = value()
					if (!v) return <em style="color:#999">none</em>
					const item = cities.find(c => c.value === v)
					return item ? item.label : v
				}}
			</div>
		</div>
	)
}

function DefaultValueExample(){
	const value = createSignal('kxg')
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Default Value</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={cities}>
				<SelectTrigger placeholder='Choose a city' />
			</Select>
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

function DisabledExample(){
	const value = createSignal('kxg')
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Disabled</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={cities} disabled>
				<SelectTrigger placeholder='Disabled' />
			</Select>
			<div className='demo-value'>Value: Kaohsiung (disabled)</div>
		</div>
	)
}

function DisabledIntentContrastExample(){
	const neutralValue = createSignal(null)
	const neutralOpen = createSignal(false)
	const defaultValue = createSignal(null)
	const defaultOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Disabled Contrast: Neutral vs Default</p>
			<p className='demo-label' style={{ marginTop: '12px', color: '#999' }}>Neutral (disabled)</p>
			<Select value={neutralValue} onValueChange={v => neutralValue(v)} open={neutralOpen} onOpenChange={v => neutralOpen(v)} items={frameworks} intent='neutral' disabled>
				<SelectTrigger placeholder='Neutral disabled' />
			</Select>
			<p className='demo-label' style={{ marginTop: '12px', color: '#999' }}>Default (disabled)</p>
			<Select value={defaultValue} onValueChange={v => defaultValue(v)} open={defaultOpen} onOpenChange={v => defaultOpen(v)} items={frameworks} disabled>
				<SelectTrigger placeholder='Default disabled' />
			</Select>
		</div>
	)
}

function DisabledItemsExample(){
	const value = createSignal('react')
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Disabled Items</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={frameworks}>
				<SelectTrigger placeholder='Pick a framework' />
			</Select>
			<div className='demo-value'>Selected: {() => value() ?? <em style="color:#999">none</em>} (React is selected; try picking Angular)</div>
		</div>
	)
}

function InvalidExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Invalid / Error</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={cities} invalid filter>
				<SelectTrigger placeholder='Required field' />
			</Select>
			<div className='demo-value'>Red border on the trigger and the search input.</div>
		</div>
	)
}

function CustomTriggerExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Custom Trigger</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={colors}>
				<SelectTrigger>
					{() => {
						const item = (() => {
							const v = value()
							if (!v) return null
							return colors.find(c => c.value === v)
						})()
						return (
							<span style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
								{item && <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.value, display: 'inline-block' }} />}
								<span style={{ flex: 1 }}>{item ? item.label : 'Pick a color'}</span>
							</span>
						)
					}}
				</SelectTrigger>
			</Select>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

function CustomItemsExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Custom Items</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={colors} itemToLabel={item => (
				<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					<span style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.value, display: 'inline-block' }} />
					{item.label}
				</span>
			)}>
				<SelectTrigger placeholder='Pick a color' />
			</Select>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

function OpenStateExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Open State Control</p>
			<div style="display:flex;gap:8px;margin-bottom:8px">
				<button className='demo-tag-btn' type='button' onClick={()=> isOpen(true)}>Open Sheet</button>
				<button className='demo-tag-btn' type='button' onClick={()=> isOpen(false)}>Close Sheet</button>
			</div>
			<Select value={value} onValueChange={v => value(v)} items={frameworks} open={isOpen} onOpenChange={v => isOpen(v)}>
				<SelectTrigger placeholder='Pick a framework' />
			</Select>
			<div className='demo-value'>
				Open: {() => String(isOpen())} | Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

function BackdropExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='feature-card'>
			<p className='demo-label'>Backdrop Customization</p>
			<Select value={value} onValueChange={v => value(v)} open={isOpen} onOpenChange={v => isOpen(v)} items={colors}
				backdropClassName='demo-backdrop-custom'
				backdropStyle={{ background: 'rgba(128, 0, 128, 0.4)', backdropFilter: 'blur(6px)' }}
			>
				<SelectTrigger placeholder='Pick a color' />
			</Select>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

export default function SelectPage(){
	return (
		<div className='container'>
			<div className='hero'>
				<p className='eyebrow'>Select</p>
				<h1>Select</h1>
				<p className='hero-copy'>
					A mobile-optimized bottom-sheet select. Renders a trigger button
					and a full-screen overlay with a draggable sheet — perfect for
					touch interfaces.
				</p>
			</div>

			<BasicExample />
			<VariantExample />
			<FilterExample />
			<DefaultValueExample />
			<DisabledExample />
			<DisabledIntentContrastExample />
			<DisabledItemsExample />
			<InvalidExample />
			<CustomTriggerExample />
			<CustomItemsExample />
			<OpenStateExample />
			<BackdropExample />
		</div>
	)
}
