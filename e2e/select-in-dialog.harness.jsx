import { createSignal, renderApp } from '@plastic-js/plastic'
import '../src/styles/tokens.css'
import Dialog from '../src/components/Dialog.jsx'
import { Select, SelectTrigger } from '../src/components/Select.jsx'

const cities = Array.from({ length: 30 }, (_, i)=> ({ value: `c${i}`, label: `City ${i} — an option long enough to overflow the sheet` }))

const Harness = ()=> {
	const dialogOpen = createSignal(false)
	const value = createSignal(null)
	const selectOpen = createSignal(false)

	return (
		<div>
			<button data-testid='open-dialog' type='button' onClick={()=> dialogOpen(true)}>Open dialog</button>

			<Dialog mode='sheet' open={dialogOpen} onClose={()=> dialogOpen(false)} title='Pick a city'>
				<Select value={value} onValueChange={v=> value(v)} open={selectOpen} onOpenChange={v=> selectOpen(v)} items={cities} filter>
					<SelectTrigger data-testid='select-trigger' placeholder='Choose a city' />
				</Select>
				<div data-testid='selected'>Selected: {()=> value() ?? 'none'}</div>
			</Dialog>
		</div>
	)
}

renderApp(document.querySelector('#app'), <Harness />)
