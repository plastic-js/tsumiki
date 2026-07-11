import { Loop, createSignal } from '@plastic-js/plastic'
import { SelectMobile } from '../../src/components/SelectMobile/index.jsx'

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
]

const frameworks = [
	{ value: 'plastic', label: 'Plastic JS' },
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'svelte', label: 'Svelte' },
	{ value: 'solid', label: 'Solid' },
	{ value: 'angular', label: 'Angular' },
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

// ── Basic example ────────────────────────────────────────────────────────
function BasicExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Basic</h3>
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={cities}
			>
				<SelectMobile.Trigger placeholder='Choose a city' />
				<SelectMobile.Content />
			</SelectMobile.Root>
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
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={cities}
			>
				<SelectMobile.Trigger placeholder='Choose a city' />
				<SelectMobile.Content />
			</SelectMobile.Root>
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
	const value = createSignal('plastic')
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Clearable</h3>
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={frameworks}
			>
				<SelectMobile.Trigger placeholder='Pick a framework' />
				<SelectMobile.Content clearable clearLabel='None' />
			</SelectMobile.Root>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

// ── Custom trigger ───────────────────────────────────────────────────────
function CustomTriggerExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Custom Trigger</h3>
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={colors}
			>
				<SelectMobile.Trigger>
					{() => {
						const item = (() => {
							const v = value()
							if (!v) return null
							return colors.find(c => c.value === v)
						})()
						return (
							<span style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								width: '100%',
							}}>
								{item && (
									<span style={{
										width: '12px',
										height: '12px',
										borderRadius: '50%',
										background: item.value,
										display: 'inline-block',
									}} />
								)}
								<span style={{ flex: 1 }}>
									{item ? item.label : 'Pick a color'}
								</span>
							</span>
						)
					}}
				</SelectMobile.Trigger>
				<SelectMobile.Content />
			</SelectMobile.Root>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

// ── Custom item rendering ────────────────────────────────────────────────
function CustomItemsExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Custom Items</h3>
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={colors}
				itemToLabel={item => `${item.label} (${item.value})`}
			>
				<SelectMobile.Trigger placeholder='Pick a color' />
				<SelectMobile.Content>
					<Loop each={() => colors}>
						{item => (
							<SelectMobile.Item item={item}>
								<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									<span style={{
										width: '12px',
										height: '12px',
										borderRadius: '50%',
										background: item.value,
										display: 'inline-block',
									}} />
									{item.label}
								</span>
							</SelectMobile.Item>
						)}
					</Loop>
				</SelectMobile.Content>
			</SelectMobile.Root>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

// ── Open state control ────────────────────────────────────────────────
function OpenStateExample(){
	const value = createSignal(null)
	const isOpen = createSignal(false)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Open State Control</h3>
			<div className='demo-playground-row' style='margin-bottom: 0.5rem'>
				<button className='demo-tag-btn' onClick={()=> isOpen(true)}>Open Sheet</button>
				<button className='demo-tag-btn' onClick={()=> isOpen(false)}>Close Sheet</button>
			</div>
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={frameworks}
				open={isOpen}
				onOpenChange={v => isOpen(v)}
			>
				<SelectMobile.Trigger placeholder='Pick a framework' />
				<SelectMobile.Content />
			</SelectMobile.Root>
			<div className='demo-value'>
				Open: {() => String(isOpen())} | Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

// ── Backdrop customization ──────────────────────────────────────────────
function BackdropExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Backdrop Customization</h3>
			<SelectMobile.Root
				value={value}
				onValueChange={v => value(v)}
				items={colors}
			>
				<SelectMobile.Trigger placeholder='Pick a color' />
				<SelectMobile.Content
					backdropClassName='demo-backdrop-custom'
					backdropStyle={{ background: 'rgba(128, 0, 128, 0.4)', backdropFilter: 'blur(6px)' }}
				/>
			</SelectMobile.Root>
			<div className='demo-value'>
				Selected: {() => value() ?? <em style="color:#999">none</em>}
			</div>
		</div>
	)
}

export default function SelectMobilePage(){
	return (
		<div className='container'>
			<div className='hero'>
				<p className='eyebrow'>Select</p>
				<h1>SelectMobile</h1>
				<p className='hero-copy'>
					A mobile-optimized bottom-sheet select. Renders a trigger button
					and a full-screen overlay with a draggable sheet — perfect for
					touch interfaces.
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
					<CustomTriggerExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<CustomItemsExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<OpenStateExample />
					<BackdropExample />
				</div>
			</div>
		</div>
	)
}