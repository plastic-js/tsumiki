import { renderApp } from '@plastic-js/plastic'
import Combobox from '../src/components/Combobox.jsx'

renderApp(document.querySelector('#app'), (
	<Combobox.Root openOnClick>
		<Combobox.Control>
			<Combobox.Input data-testid='input' placeholder='Type' />
			<Combobox.Trigger data-testid='trigger' type='button'>▾</Combobox.Trigger>
		</Combobox.Control>
	</Combobox.Root>
))
