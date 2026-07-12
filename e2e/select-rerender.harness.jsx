import { createSignal, renderApp } from '@plastic-js/plastic'
import '../src/styles/tokens.css'
import { Select, SelectTrigger } from '../src/components/Select.jsx'

const clients = Array.from({ length: 3 }, (_, i)=> ({ value: `c${i + 1}`, label: `Client ${i + 1}` }))
const days = Array.from({ length: 31 }, (_, i)=> ({ value: `d${i + 1}`, label: `Day ${i + 1}` }))

const Harness = ()=> {
	const clientValue = createSignal('')
	const clientOpen = createSignal(false)
	const dayValue = createSignal('')
	const dayOpen = createSignal(false)
	const filterValue = createSignal('')
	const filterOpen = createSignal(false)

	return (
		<div>
			<Select value={clientValue} onValueChange={v=> clientValue(v)} open={clientOpen} onOpenChange={v=> clientOpen(v)} items={clients}>
				<SelectTrigger data-testid='client-trigger' placeholder='Pick a client' />
			</Select>
			<Select value={dayValue} onValueChange={v=> dayValue(v)} open={dayOpen} onOpenChange={v=> dayOpen(v)} items={days}>
				<SelectTrigger data-testid='day-trigger' placeholder='Pick a day' />
			</Select>
			<Select value={filterValue} onValueChange={v=> filterValue(v)} open={filterOpen} onOpenChange={v=> filterOpen(v)} items={clients} filter>
				<SelectTrigger data-testid='filter-trigger' placeholder='Pick a client' />
			</Select>
		</div>
	)
}

renderApp(document.querySelector('#app'), <Harness />)
