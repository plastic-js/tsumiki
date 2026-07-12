import { css } from '@emotion/css'
import { Toggle as ArkToggle } from '@plastic-js/ark'
import { splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--tsu-spacing-sm) var(--tsu-spacing-md)',
  border: '1px solid var(--tsu-neutral-outline-border)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  backgroundColor: 'var(--tsu-bg-panel)',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--tsu-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast), color var(--tsu-transition-fast)',
  '&[data-pressed]': {
    backgroundColor: 'var(--tsu-accent-solid-bg)',
    borderColor: 'var(--tsu-accent-solid-bg)',
    color: 'var(--tsu-accent-solid-fg)',
  },
  '&:disabled': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const Toggle = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])

  const classNames = [rootClass, local.className].filter(Boolean).join(' ')

  return (
    <ArkToggle.Root {...rest} className={classNames}>
      {local.children}
    </ArkToggle.Root>
  )
}

Toggle.origin = { Root: ArkToggle.Root }

export default Toggle
export { Toggle }
