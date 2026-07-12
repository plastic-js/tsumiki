import { css } from '@emotion/css'
import { Collapsible as ArkCollapsible } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
})

const triggerClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--tsu-spacing-sm)',
  width: '100%',
  padding: 'var(--tsu-comp-padding-y-sm) var(--tsu-comp-padding-x-sm)',
  border: 'none',
  background: 'var(--tsu-bg-panel)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  color: 'var(--tsu-fg)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast)',
  '& svg': {
    flexShrink: 0,
    width: '16px',
    height: '16px',
    color: 'var(--tsu-text-secondary)',
    transition: 'transform var(--tsu-transition-normal)',
  },
  '&[aria-expanded="true"] svg': { transform: 'rotate(180deg)' },
  '&:disabled': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const contentClass = css({
  padding: 'var(--tsu-spacing-sm) var(--tsu-spacing-md)',
})

const Collapsible = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkCollapsible.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkCollapsible.Root>
}

const CollapsibleTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return (
    <ArkCollapsible.Trigger {...rest} className={[triggerClass, local.className].filter(Boolean).join(' ')}>
      {local.children}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </ArkCollapsible.Trigger>
  )
}

const CollapsibleContent = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkCollapsible.Content {...rest} className={[contentClass, local.className].filter(Boolean).join(' ')} />
}

Collapsible.origin = {
  Root: ArkCollapsible.Root,
  Trigger: ArkCollapsible.Trigger,
  Content: ArkCollapsible.Content,
}

export default Collapsible
export { Collapsible, CollapsibleTrigger, CollapsibleContent }
