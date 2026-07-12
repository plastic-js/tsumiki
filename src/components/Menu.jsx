import { css } from '@emotion/css'
import { Menu as ArkMenu } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'
import Portal from './Portal.jsx'

const positionerClass = css({
  zIndex: 'var(--tsu-z-dropdown)',
})

const contentClass = css({
  backgroundColor: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  boxShadow: 'var(--tsu-shadow-lg)',
  padding: '6px',
  minWidth: '160px',
  display: 'flex',
  flexDirection: 'column',
  '&[hidden]': { display: 'none' },
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  borderRadius: 'var(--tsu-radius-l1-sm)',
  fontSize: 'var(--tsu-comp-font-size-md)',
  color: 'var(--tsu-fg)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  border: 'none',
  background: 'none',
  width: '100%',
  textAlign: 'left',
  lineHeight: 1.4,
  '&[data-highlighted]': { backgroundColor: 'var(--tsu-pressed-accent)', color: 'var(--tsu-accent-subtle-fg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
})

const separatorClass = css({
  height: '1px',
  backgroundColor: 'var(--tsu-border)',
  margin: '4px 0',
})

const Menu = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkMenu.Root {...rest} className={local.className}>{local.children}</ArkMenu.Root>
}

export const MenuTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkMenu.Trigger {...rest} className={local.className}>{local.children}</ArkMenu.Trigger>
}

export const MenuContent = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return (
    <Portal>
      <ArkMenu.Positioner className={positionerClass}>
        <ArkMenu.Content {...rest} className={[contentClass, local.className].filter(Boolean).join(' ')}>
          {local.children}
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </Portal>
  )
}

export const MenuItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkMenu.Item {...rest} className={[itemClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkMenu.Item>
}

export const MenuSeparator = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkMenu.Separator {...rest} className={[separatorClass, local.className].filter(Boolean).join(' ')} />
}

Menu.origin = {
  Root: ArkMenu.Root,
  Trigger: ArkMenu.Trigger,
  Positioner: ArkMenu.Positioner,
  Content: ArkMenu.Content,
  Item: ArkMenu.Item,
  Separator: ArkMenu.Separator,
}

export default Menu
export { Menu }
