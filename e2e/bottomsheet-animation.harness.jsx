import { createSignal, renderApp } from '@plastic-js/plastic'
import '../src/styles/tokens.css'
import BottomSheet from '../src/components/BottomSheet.jsx'

// A — default lazyMount presence mode (mounted on first open).
// B — legacy always-mounted mode (lazyMount=false, unmountOnExit=false).
// Both must play the slide-up entrance animation when they open.
const Harness = ()=> {
	const a = createSignal(false)
	const b = createSignal(false)

	return (
		<div>
			<button data-testid='open-a' type='button' onClick={()=> a(true)}>Open A</button>
			<button data-testid='close-a' type='button' onClick={()=> a(false)}>Close A</button>
			<button data-testid='open-b' type='button' onClick={()=> b(true)}>Open B</button>

			<BottomSheet open={a} onOpenChange={({ open })=> a(open)}>
				<div data-testid='sheet-a'>A</div>
			</BottomSheet>

			<BottomSheet open={b} onOpenChange={({ open })=> b(open)} lazyMount={false} unmountOnExit={false}>
				<div data-testid='sheet-b'>B</div>
			</BottomSheet>
		</div>
	)
}

renderApp(document.querySelector('#app'), <Harness />)
