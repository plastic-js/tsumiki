import { css } from '@emotion/css'
import { Combobox as ArkCombobox, useComboboxContext } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const inputClass = css({
  width: '100%',
  height: 'var(--tsu-comp-height-md)',
  padding: '0 var(--tsu-comp-padding-x-md)',
  background: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-accent-outline-border)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  color: 'var(--tsu-fg)',
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontFamily: 'inherit',
  '&::placeholder': { color: 'var(--tsu-text-secondary)' },
  '&:focus': {
    backgroundColor: 'var(--tsu-focus-bg)',
    borderColor: 'var(--tsu-focus-border)',
  },
})

const contentClass = css({
  backgroundColor: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  boxShadow: 'var(--tsu-shadow-lg)',
  zIndex: 'var(--tsu-z-dropdown)',
  overflow: 'hidden',
  maxHeight: '240px',
  overflowY: 'auto',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  padding: '8px var(--tsu-container-padding-md)',
  fontSize: 'var(--tsu-comp-font-size-md)',
  cursor: 'pointer',
  color: 'var(--tsu-fg)',
  '&[data-highlighted]': { backgroundColor: 'var(--tsu-pressed-accent)', color: 'var(--tsu-accent-subtle-fg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
})

const ArkRoot = ArkCombobox.Root

const Root = (props = {})=> <ArkRoot {...props} />

const Input = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  const combobox = useComboboxContext()
  return (
    <ArkCombobox.Input
      {...rest}
      className={[inputClass, local.className].filter(Boolean).join(' ')}
      onInput={event=> combobox().getInputProps().onChange?.(event)}
    />
  )
}

Root.origin = {
  Root: ArkCombobox.Root,
  Label: ArkCombobox.Label,
  Control: ArkCombobox.Control,
  Input: ArkCombobox.Input,
  Trigger: ArkCombobox.Trigger,
  Content: ArkCombobox.Content,
  Item: ArkCombobox.Item,
  ItemText: ArkCombobox.ItemText,
  ItemIndicator: ArkCombobox.ItemIndicator,
  ItemGroup: ArkCombobox.ItemGroup,
  ItemGroupLabel: ArkCombobox.ItemGroupLabel,
  ClearTrigger: ArkCombobox.ClearTrigger,
  Empty: ArkCombobox.Empty,
}

const ComboboxItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkCombobox.Item {...rest} className={[itemClass, local.className].filter(Boolean).join(' ')} />
}

const ComboboxContent = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkCombobox.Content {...rest} className={[contentClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkCombobox.Content>
}

export default Root
export { Root as Combobox, Input as ComboboxInput, ComboboxItem, ComboboxContent }
