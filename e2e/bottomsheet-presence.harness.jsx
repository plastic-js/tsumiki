import { createSignal, renderApp } from '@plastic-js/plastic'
import '../src/styles/tokens.css'
import BottomSheet from '../src/components/BottomSheet.jsx'

// A — lazyMount default (true); driven by buttons.
// B — legacy always-mounted mode (lazyMount=false, unmountOnExit=false), closed at load.
// C — initially open at mount.
// D — normal; used for the drag-to-dismiss test.
const Harness = ()=> {
	const a = createSignal(false)
	const b = createSignal(false)
	const c = createSignal(true)
	const d = createSignal(false)

	return (
		<div>
			<button data-testid='open-a' type='button' onClick={()=> a(true)}>Open A</button>
			<button data-testid='close-a' type='button' onClick={()=> a(false)}>Close A</button>
			<button data-testid='open-b' type='button' onClick={()=> b(true)}>Open B</button>
			<button data-testid='close-b' type='button' onClick={()=> b(false)}>Close B</button>
			<button data-testid='open-d' type='button' onClick={()=> d(true)}>Open D</button>
			<button data-testid='close-d' type='button' onClick={()=> d(false)}>Close D</button>

			<BottomSheet open={a} onOpenChange={({ open })=> a(open)}>
				<div data-testid='sheet-a'>A</div>
			</BottomSheet>

			<BottomSheet open={b} onOpenChange={({ open })=> b(open)} lazyMount={false} unmountOnExit={false}>
				<div data-testid='sheet-b'>B</div>
			</BottomSheet>

			<BottomSheet open={c} onOpenChange={({ open })=> c(open)}>
				<div data-testid='sheet-c'>C</div>
			</BottomSheet>

			<BottomSheet open={d} onOpenChange={({ open })=> d(open)}>
				<div data-testid='sheet-d'>D</div>
			</BottomSheet>
		</div>
	)
}

renderApp(document.querySelector('#app'), <Harness />)
