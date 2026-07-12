import { css } from '@emotion/css'
import { Steps as ArkSteps } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const read = (v) => typeof v === 'function' ? v() : v

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-md)',
})

const verticalClass = css({
  '& .steps-list': { flexDirection: 'column', gap: 0 },
  '& .steps-item': { flex: 'none', minHeight: '40px' },
  '& .steps-item-trigger': { flexDirection: 'row', gap: 'var(--tsu-spacing-sm)', alignItems: 'center' },
  '& .steps-separator': { flex: 'none', width: '2px', height: 'auto', minHeight: '16px', margin: '0 0 0 13px' },
  '& .steps-content': { marginLeft: 'calc(28px + var(--tsu-spacing-sm))' },
})

const listClass = css({
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
})

const triggerClass = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-xs)',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  padding: 0,
  fontFamily: 'inherit',
  touchAction: 'manipulation',
  '&[data-complete] .steps-title, &[data-current] .steps-title': { color: 'var(--tsu-accent-subtle-fg)', fontWeight: 'var(--tsu-font-weight-semibold)' },
})

const titleClass = css({
  fontSize: 'var(--tsu-font-size-xs)',
  color: 'var(--tsu-text-subtle)',
  textAlign: 'center',
})

const indicatorClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '2px solid var(--tsu-border)',
  backgroundColor: 'var(--tsu-bg-panel)',
  fontSize: 'var(--tsu-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-text-subtle)',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast), color var(--tsu-transition-fast)',
  '.steps-trigger[data-current] &': { borderColor: 'var(--tsu-accent-outline-border)', backgroundColor: 'var(--tsu-accent-solid-bg)', color: 'var(--tsu-accent-solid-fg)' },
  '.steps-trigger[data-complete] &': { borderColor: 'var(--tsu-accent-outline-border)', backgroundColor: 'var(--tsu-accent-subtle-bg)', color: 'var(--tsu-accent-subtle-fg)' },
  '.steps-trigger[data-complete] & .steps-indicator-index': { display: 'none' },
  '.steps-trigger[data-complete] & .steps-indicator-check': { display: 'flex' },
  '.steps-indicator-check': { display: 'none' },
  '& svg': { width: '14px', height: '14px', display: 'block' },
})

const separatorClass = css({
  flex: 1,
  height: '2px',
  backgroundColor: 'var(--tsu-border)',
  margin: '0 var(--tsu-spacing-xs)',
  marginBottom: '20px',
  '&[data-complete]': { backgroundColor: 'var(--tsu-accent-solid-bg)' },
})

const contentClass = css({
  padding: 'var(--tsu-spacing-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-text-secondary)',
})

const completedContentClass = css({
  padding: 'var(--tsu-spacing-md)',
  textAlign: 'center',
  fontSize: 'var(--tsu-font-size-md)',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-success-solid-bg)',
})

const navClass = css({
  display: 'flex',
  gap: 'var(--tsu-spacing-sm)',
  marginTop: '12px',
})

const navBtnClass = css({
  padding: 'var(--tsu-spacing-sm) var(--tsu-spacing-md)',
  border: '1px solid var(--tsu-accent-outline-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--tsu-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  touchAction: 'manipulation',
  '&:disabled': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const navNextClass = css({
  backgroundColor: 'var(--tsu-accent-solid-bg)',
  borderColor: 'var(--tsu-accent-solid-bg)',
  color: 'var(--tsu-accent-solid-fg)',
})

const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const Steps = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ vertical: false, value: 0 }, props),
    ['items', 'vertical', 'value', 'onValueChange', 'completedContent', 'className'],
  )

  const items = () => read(local.items) ?? []
  const count = () => items().length
  const vertical = () => read(local.vertical)

  return (
    <ArkSteps.Root
      {...rest}
      count={count}
      step={read(local.value)}
      onStepChange={({ step }) => local.onValueChange?.(step)}
      className={[rootClass, vertical() && verticalClass].filter(Boolean).join(' ')}
    >
      <ArkSteps.List className={[listClass, 'steps-list'].filter(Boolean).join(' ')}>
        {items().map((item, i) => (
          <ArkSteps.Item index={i} className={[itemClass, 'steps-item'].filter(Boolean).join(' ')}>
            <ArkSteps.Trigger className={[triggerClass, 'steps-item-trigger', 'steps-trigger'].filter(Boolean).join(' ')}>
              <ArkSteps.Indicator className={indicatorClass}>
                <span className="steps-indicator-index">{i + 1}</span>
                <span className="steps-indicator-check">{checkIcon}</span>
              </ArkSteps.Indicator>
              <span className={['steps-title', titleClass].filter(Boolean).join(' ')}>{item.title}</span>
            </ArkSteps.Trigger>
            {i < items().length - 1 && (
              <ArkSteps.Separator className={[separatorClass, 'steps-separator'].filter(Boolean).join(' ')} />
            )}
          </ArkSteps.Item>
        ))}
      </ArkSteps.List>

      {items().map((item, i) => (
        <ArkSteps.Content index={i} className={[contentClass, 'steps-content'].filter(Boolean).join(' ')}>
          {item.content}
        </ArkSteps.Content>
      ))}

      {read(local.completedContent) && (
        <ArkSteps.CompletedContent className={completedContentClass}>
          {read(local.completedContent)}
        </ArkSteps.CompletedContent>
      )}

      <div className={navClass}>
        <ArkSteps.PrevTrigger className={navBtnClass}>Previous</ArkSteps.PrevTrigger>
        <ArkSteps.NextTrigger className={[navBtnClass, navNextClass].filter(Boolean).join(' ')}>Next</ArkSteps.NextTrigger>
      </div>
    </ArkSteps.Root>
  )
}

Steps.origin = {
  Root: ArkSteps.Root,
  List: ArkSteps.List,
  Item: ArkSteps.Item,
  Trigger: ArkSteps.Trigger,
  Content: ArkSteps.Content,
  CompletedContent: ArkSteps.CompletedContent,
  Separator: ArkSteps.Separator,
  PrevTrigger: ArkSteps.PrevTrigger,
  NextTrigger: ArkSteps.NextTrigger,
  Indicator: ArkSteps.Indicator,
  Progress: ArkSteps.Progress,
}

export default Steps
export { Steps }
