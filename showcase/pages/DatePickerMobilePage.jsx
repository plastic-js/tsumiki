import { createSignal } from '@plastic-js/plastic'
import DatePickerMobile from '../../src/components/DatePickerMobile/index.jsx'

// ── Basic ────────────────────────────────────────────────────────────────
function BasicExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Basic</h3>
			<DatePickerMobile
				value={value}
				onValueChange={v => value(v)}
				placeholder='Select date'
			/>
			<div className='demo-value'>
				Selected: {() => {
					const d = value()
					return d ? d.toDateString() : <em style="color:#999">none</em>
				}}
			</div>
		</div>
	)
}

// ── Default value ────────────────────────────────────────────────────────
function DefaultValueExample(){
	const value = createSignal(new Date(2025, 5, 15))
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Default Value</h3>
			<DatePickerMobile
				value={value}
				onValueChange={v => value(v)}
				placeholder='Select date'
			/>
			<div className='demo-value'>
				Selected: {() => value()?.toDateString()}
			</div>
		</div>
	)
}

// ── Clearable ────────────────────────────────────────────────────────────
function ClearableExample(){
	const value = createSignal(new Date())
	const resetValue = (v) => { value(v) }
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Clearable</h3>
			<DatePickerMobile
				value={value}
				onValueChange={resetValue}
				placeholder='Pick a date'
				clearable
				clearLabel='Clear date'
			/>
			<div className='demo-value'>
				Selected: {() => {
					const d = value()
					return d ? d.toDateString() : <em style="color:#999">none</em>
				}}
			</div>
		</div>
	)
}

// ── Custom Placeholder ───────────────────────────────────────────────────
function CustomPlaceholderExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Custom Placeholder</h3>
			<DatePickerMobile
				value={value}
				onValueChange={v => value(v)}
				placeholder='When is your birthday?'
			/>
			<div className='demo-value'>
				Selected: {() => {
					const d = value()
					return d ? d.toDateString() : <em style="color:#999">none</em>
				}}
			</div>
		</div>
	)
}

// ── Disabled ─────────────────────────────────────────────────────────────
function DisabledExample(){
	const value = createSignal(new Date(2025, 0, 1))
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Disabled</h3>
			<DatePickerMobile
				value={value}
				onValueChange={v => value(v)}
				placeholder='Select date'
				disabled
			/>
			<div className='demo-value'>
				Value: {() => value()?.toDateString()}
			</div>
		</div>
	)
}

// ── Disabled Custom Style ────────────────────────────────────────────────
const fadedDisabledClass = 'demo-disabled-faded'
function DisabledCustomStyleExample(){
	const value = createSignal(null)
	return (
		<div className='demo-col'>
			<h3 className='demo-h3'>Disabled + Custom Style</h3>
			<DatePickerMobile
				value={value}
				onValueChange={v => value(v)}
				placeholder='Custom disabled look'
				disabled
				disabledClassName={fadedDisabledClass}
			/>
			<div className='demo-value'>
				Uses <code>disabledClassName</code> prop with custom CSS
			</div>
			<style>{`
				.${fadedDisabledClass} {
					opacity: 0.25;
					filter: grayscale(1);
				}
			`}</style>
		</div>
	)
}

export default function DatePickerMobilePage(){
	return (
		<div className='container'>
			<div className='hero'>
				<p className='eyebrow'>Date Picker</p>
				<h1>DatePickerMobile</h1>
				<p className='hero-copy'>
					A mobile-optimized bottom-sheet date picker with iOS-style
					wheel columns for year, month, and day. The trigger mimics
					a native <code>{'<input type="date">'}</code> appearance.
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
					<CustomPlaceholderExample />
				</div>
			</div>

			<div style="height:16px" />

			<div className='feature-card'>
				<div className='demo-row'>
					<DisabledExample />
					<DisabledCustomStyleExample />
				</div>
			</div>
		</div>
	)
}
