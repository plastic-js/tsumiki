import { css } from '@emotion/css'
import { Listbox as ArkListbox } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const contentClass = css({
  backgroundColor: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  boxShadow: 'var(--tsu-shadow-lg)',
  zIndex: 'var(--tsu-z-dropdown)',
  overflow: 'hidden',
  padding: 'var(--tsu-spacing-xs)',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  padding: '8px var(--tsu-container-padding-sm)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  color: 'var(--tsu-fg)',
  cursor: 'pointer',
  '&[data-highlighted]': { backgroundColor: 'var(--tsu-pressed-accent)', color: 'var(--tsu-accent-subtle-fg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
})

const Listbox = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkListbox.Root {...rest} className={[local.className].filter(Boolean).join(' ')}>{local.children}</ArkListbox.Root>
}

Listbox.origin = {
  Root: ArkListbox.Root,
  Content: ArkListbox.Content,
  Item: ArkListbox.Item,
  ItemText: ArkListbox.ItemText,
  Label: ArkListbox.Label,
}

export default Listbox
export { Listbox }
