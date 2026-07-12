import { createSignal, renderApp } from '@plastic-js/plastic'
import '../src/styles/tokens.css'
import Dialog from '../src/components/Dialog.jsx'

const Harness = ()=> {
	const sheets = Array.from({ length: 4 }, (_, i)=> createSignal(false))
	const modals = Array.from({ length: 4 }, (_, i)=> createSignal(false))

	return (
		<div>
			<button data-testid='open-sheet-2' type='button' onClick={()=> sheets[2](true)}>Open sheet 2</button>
			<button data-testid='open-modal-1' type='button' onClick={()=> modals[1](true)}>Open modal 1</button>

			{sheets.map((open, i)=> (
				<Dialog key={`s${i}`} mode='sheet' open={open} onClose={()=> open(false)} title={`Sheet ${i}`}>
					<div data-testid={`sheet-dlg-${i}`}>Sheet dialog {i}</div>
				</Dialog>
			))}
			{modals.map((open, i)=> (
				<Dialog key={`m${i}`} mode='modal' open={open} onClose={()=> open(false)} title={`Modal ${i}`}>
					<div data-testid={`modal-dlg-${i}`}>Modal dialog {i}</div>
				</Dialog>
			))}
		</div>
	)
}

renderApp(document.querySelector('#app'), <Harness />)
