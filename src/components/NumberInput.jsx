import { css } from '@emotion/css'
import { NumberInput as ArkNumberInput } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootBaseClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 'var(--tsu-radius-l1-md)',
  overflow: 'hidden',
})

const variantClasses = {
  solid: css({
    backgroundColor: 'var(--tsu-bg-control)',
    border: '1px solid transparent',
    '&:focus-within': { backgroundColor: 'var(--tsu-focus-bg)', borderColor: 'var(--tsu-focus-border)' },
  }),
  outline: css({
    border: '1px solid var(--tsu-accent-outline-border)',
    '&:focus-within': { backgroundColor: 'var(--tsu-focus-bg)', borderColor: 'var(--tsu-focus-border)' },
  }),
}

const disabledClass = css({
  opacity: 'var(--tsu-disabled-opacity)',
  cursor: 'not-allowed',
})

const sizeClasses = {
  xs: css({ height: 'var(--tsu-comp-height-xs)', fontSize: 'var(--tsu-comp-font-size-xs)' }),
  sm: css({ height: 'var(--tsu-comp-height-sm)', fontSize: 'var(--tsu-comp-font-size-sm)' }),
  md: css({ height: 'var(--tsu-comp-height-md)', fontSize: 'var(--tsu-comp-font-size-md)' }),
  lg: css({ height: 'var(--tsu-comp-height-lg)', fontSize: 'var(--tsu-comp-font-size-lg)' }),
  xl: css({ height: 'var(--tsu-comp-height-xl)', fontSize: 'var(--tsu-comp-font-size-xl)' }),
}

const inputClass = css({
  width: '60px',
  height: '100%',
  border: 'none',
  background: 'transparent',
  color: 'var(--tsu-fg)',
  fontFamily: 'inherit',
  textAlign: 'center',
  padding: 0,
})

const btnClass = css({
  width: '28px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '14px',
  touchAction: 'manipulation',
  '&:active:not(:disabled)': { backgroundColor: 'var(--tsu-pressed-accent)' },
  '&:disabled': { color: 'var(--tsu-text-subtle)', cursor: 'not-allowed' },
})

const read = (v)=> typeof v === 'function' ? v() : v

const NumberInput = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', variant: 'outline', disabled: false }, props),
    ['size', 'variant', 'disabled', 'className', 'children'],
  )

  return ()=> {
    const size = read(local.size)
    const variant = read(local.variant) === 'solid' ? 'solid' : 'outline'
    const disabled = read(local.disabled)

    return (
      <ArkNumberInput.Root {...rest} disabled={disabled} className={[rootBaseClass, variantClasses[variant], sizeClasses[size], disabled && disabledClass, local.className].filter(Boolean).join(' ')}>
        <ArkNumberInput.DecrementTrigger className={btnClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="12" height="12"><path d="M5 12h14" /></svg>
        </ArkNumberInput.DecrementTrigger>
        <ArkNumberInput.Input className={inputClass} />
        <ArkNumberInput.IncrementTrigger className={btnClass}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="12" height="12"><path d="M12 5v14M5 12h14" /></svg>
        </ArkNumberInput.IncrementTrigger>
        {local.children}
      </ArkNumberInput.Root>
    )
  }
}

NumberInput.origin = {
  Root: ArkNumberInput.Root,
  DecrementTrigger: ArkNumberInput.DecrementTrigger,
  Input: ArkNumberInput.Input,
  IncrementTrigger: ArkNumberInput.IncrementTrigger,
}

export default NumberInput
export { NumberInput }
