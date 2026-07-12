import { css } from '@emotion/css'
import { Tabs as ArkTabs } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const listClass = css({
  position: 'relative',
  display: 'flex',
  borderBottom: '1px solid var(--tsu-border)',
})

const triggerClass = css({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  padding: '0 var(--tsu-container-padding-md)',
  border: 'none',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  whiteSpace: 'nowrap',
  '&[data-selected]': { color: 'var(--tsu-accent-subtle-fg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const indicatorClass = css({
  position: 'absolute',
  bottom: '-1px',
  height: '2px',
  backgroundColor: 'var(--tsu-accent-solid-bg)',
  borderRadius: '1px',
  transition: 'left var(--tsu-transition-fast), width var(--tsu-transition-fast)',
  width: 'var(--width)',
  zIndex: 0,
})

const contentClass = css({
  paddingTop: 'var(--tsu-container-padding-md)',
})

const Tabs = (props = {})=> {
  const [local, rest] = splitProps(props, ['triggers', 'className', 'children'])

  const triggers = local.triggers.map((t) => {
    if (typeof t === 'string') return { key: t, value: t, disabled: false }
    return { key: t.key, value: t.value, disabled: t.disabled ?? false }
  })

  const children = [].concat(local.children).filter(Boolean)

  return (
    <ArkTabs.Root {...rest}>
      <ArkTabs.List className={listClass}>
        {triggers.map((t) => (
          <ArkTabs.Trigger value={t.key} disabled={t.disabled} className={triggerClass}>
            {t.value}
          </ArkTabs.Trigger>
        ))}
        <ArkTabs.Indicator className={indicatorClass} />
      </ArkTabs.List>
      {triggers.map((t, i) => (
        <ArkTabs.Content value={t.key} className={contentClass}>
          {children[i]}
        </ArkTabs.Content>
      ))}
    </ArkTabs.Root>
  )
}

export default Tabs
export { Tabs }
