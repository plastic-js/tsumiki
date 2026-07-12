import { css } from '@emotion/css'
import { Accordion as ArkAccordion } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  borderTop: '1px solid var(--tsu-border)',
})

const itemClass = css({
  borderBottom: '1px solid var(--tsu-border)',
})

const triggerClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: 'var(--tsu-container-padding-md)',
  border: 'none',
  background: 'none',
  color: 'var(--tsu-fg)',
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  touchAction: 'manipulation',
  '&:active:not([disabled])': { backgroundColor: 'var(--tsu-pressed-accent)' },
  '&[disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const chevronClass = css({
  transition: 'transform var(--tsu-transition-fast)',
  color: 'var(--tsu-text-secondary)',
  '& svg': { width: '1em', height: '1em', display: 'block' },
  '[data-state="open"] &': { transform: 'rotate(180deg)' },
})

const contentClass = css({
  padding: '0 var(--tsu-container-padding-md) var(--tsu-container-padding-md)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  color: 'var(--tsu-text-secondary)',
  lineHeight: 1.5,
})

const AccordionRoot = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkAccordion.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkAccordion.Root>
}

const AccordionItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkAccordion.Item {...rest} className={[itemClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkAccordion.Item>
}

const AccordionTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return (
    <ArkAccordion.Trigger {...rest} className={[triggerClass, local.className].filter(Boolean).join(' ')}>
      {local.children}
      <span className={chevronClass} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </span>
    </ArkAccordion.Trigger>
  )
}

const AccordionContent = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkAccordion.Content {...rest} className={[contentClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkAccordion.Content>
}

AccordionRoot.origin = {
  Root: ArkAccordion.Root,
  Item: ArkAccordion.Item,
  Trigger: ArkAccordion.Trigger,
  Content: ArkAccordion.Content,
}

export default AccordionRoot
export { AccordionRoot as Accordion, AccordionItem, AccordionTrigger, AccordionContent }
