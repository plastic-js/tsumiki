import { Combobox, useComboboxContext } from '@plastic-js/ark'

const OriginalRoot = Combobox.Root

const Root = (props = {})=> <OriginalRoot {...props} />

const Input = (props = {})=> {
	const combobox = useComboboxContext()
	return (
		<Combobox.Input
			{...props}
			onInput={event=> combobox().getInputProps().onChange?.(event)}
		/>
	)
}

export default Object.assign(Root, {
	...Combobox, OriginalRoot, Root, Input,
})
