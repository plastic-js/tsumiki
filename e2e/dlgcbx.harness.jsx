import { Loop, createComputed, createSignal, h, renderApp } from '@plastic-js/plastic'
import { collection as createCollection } from '@zag-js/combobox'
import Dialog from '../src/components/Dialog.jsx'
import Combobox from '../src/components/Combobox.jsx'

const fruits = [
	{ id: 1, name: 'Apple' },
	{ id: 2, name: 'Banana' },
	{ id: 3, name: 'Cherry' },
	{ id: 4, name: 'Grape' },
	{ id: 5, name: 'Mango' },
]

const fruitCollection = createCollection({
	items: fruits,
	itemToValue: f=> String(f.id),
	itemToString: f=> f.name,
})

const renderItem = f=> h(Combobox.Item, {
	className: 'cb-item',
	'data-value': f.id,
	item: f,
	key: f.id,
	children: h(Combobox.ItemText, { children: f.name }),
})

const Harness = ()=> {
	const selected = createSignal('')
	const value = createComputed(()=> selected() ? [String(selected())] : [])
	return (
		<Dialog.Root open title='Pick'>
			<Combobox.Root
				collection={fruitCollection}
				onValueChange={v=> selected(v[0] ?? '')}
				openOnClick
				value={value}
			>
				<Combobox.Control>
					<Combobox.Input data-testid='input' id='loan-client' placeholder='Type' />
					<Combobox.Trigger data-testid='trigger' type='button'>▾</Combobox.Trigger>
				</Combobox.Control>
				<Combobox.Content data-testid='content'>
					<Combobox.Empty>No fruits</Combobox.Empty>
					<Loop each={fruits}>
						{renderItem}
					</Loop>
				</Combobox.Content>
			</Combobox.Root>
		</Dialog.Root>
	)
}

renderApp(document.querySelector('#app'), <Harness />)
