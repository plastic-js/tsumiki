import { css } from '@emotion/css'
import { useFieldContext } from '@plastic-js/ark'
import { ark } from '@plastic-js/ark/factory'
import { createSignal, mergeProps, splitProps } from '@plastic-js/plastic'

const wrapperClass = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 'var(--tsu-spacing-xs)',
  fontFamily: 'inherit',
  transition: 'background-color var(--tsu-transition-fast), border-color var(--tsu-transition-fast)',
})

const sizeClasses = {
  xs: css({ height: 'var(--tsu-comp-height-xs)', padding: 'var(--tsu-comp-padding-y-xs) var(--tsu-comp-padding-x-xs)', '--_pad-x': 'var(--tsu-comp-padding-x-xs)', fontSize: 'var(--tsu-comp-font-size-xs)', borderRadius: 'var(--tsu-radius-l1-xs)' }),
  sm: css({ height: 'var(--tsu-comp-height-sm)', padding: 'var(--tsu-comp-padding-y-sm) var(--tsu-comp-padding-x-sm)', '--_pad-x': 'var(--tsu-comp-padding-x-sm)', fontSize: 'var(--tsu-comp-font-size-sm)', borderRadius: 'var(--tsu-radius-l1-sm)' }),
  md: css({ height: 'var(--tsu-comp-height-md)', padding: 'var(--tsu-comp-padding-y-md) var(--tsu-comp-padding-x-md)', '--_pad-x': 'var(--tsu-comp-padding-x-md)', fontSize: 'var(--tsu-comp-font-size-md)', borderRadius: 'var(--tsu-radius-l1-md)' }),
  lg: css({ height: 'var(--tsu-comp-height-lg)', padding: 'var(--tsu-comp-padding-y-lg) var(--tsu-comp-padding-x-lg)', '--_pad-x': 'var(--tsu-comp-padding-x-lg)', fontSize: 'var(--tsu-comp-font-size-lg)', borderRadius: 'var(--tsu-radius-l1-lg)' }),
  xl: css({ height: 'var(--tsu-comp-height-xl)', padding: 'var(--tsu-comp-padding-y-xl) var(--tsu-comp-padding-x-xl)', '--_pad-x': 'var(--tsu-comp-padding-x-xl)', fontSize: 'var(--tsu-comp-font-size-xl)', borderRadius: 'var(--tsu-radius-l1-xl)' }),
}

const variantClasses = {
  solid: css({
    backgroundColor: 'var(--tsu-surface-raised)',
    border: '1px solid transparent',
    color: 'var(--tsu-fg)',
    '&:focus-within': { backgroundColor: 'var(--tsu-focus-bg)', borderColor: 'var(--tsu-focus-border)' },
  }),
  outline: css({
    border: '1px solid var(--_input-border)',
    color: 'var(--tsu-fg)',
    '&:focus-within': { backgroundColor: 'var(--tsu-focus-bg)', borderColor: 'var(--tsu-focus-border)' },
  }),
}

const intentClasses = {
  default: css({
    '--_input-border': 'var(--tsu-accent-outline-border)',
  }),
  neutral: css({
    '--_input-border': 'var(--tsu-neutral-outline-border)',
  }),
}

const errorClass = css({
  borderColor: 'var(--tsu-danger-outline-border) !important',
  '&:focus-within': { borderColor: 'var(--tsu-danger-outline-border) !important' },
})

const disabledClass = css({
  opacity: 'var(--tsu-disabled-opacity)',
  cursor: 'not-allowed',
})

const inputClass = css({
  flex: 1,
  minWidth: 0,
  border: 'none',
  background: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: 'inherit',
  padding: 0,
  '&::placeholder': { color: 'var(--tsu-text-secondary)' },
})

const affixClass = css({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  color: 'var(--tsu-text-secondary)',
  userSelect: 'none',
  '& > svg': { width: '1.3em', height: '1.3em', display: 'block' },
})

const hasPrefixClass = css({
  paddingLeft: 'calc(var(--_pad-x) / 2)',
})

const hasSuffixClass = css({
  paddingRight: 'calc(var(--_pad-x) / 2)',
})

const eyeButtonClass = css({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.7em',
  height: '1.7em',
  padding: 0,
  background: 'none',
  border: 'none',
  borderRadius: 'var(--tsu-radius-l1-sm)',
  color: 'var(--tsu-text-secondary)',
  cursor: 'pointer',
  '& svg': { width: '100%', height: '100%', display: 'block' },
  '&:active': { color: 'var(--tsu-fg)', backgroundColor: 'var(--tsu-pressed)' },
  '&:focus-visible': { outline: '2px solid var(--tsu-accent-outline-border-hover)', outlineOffset: '1px' },
})

// props may be plain values or signal accessors
const read = (v)=> typeof v === 'function' ? v() : v

const Input = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ intent: 'default', variant: 'outline', size: 'md', disabled: false, invalid: false }, props),
    ['intent', 'variant', 'size', 'disabled', 'invalid', 'className', 'inputClassName', 'type', 'prefix', 'suffix', 'ref'],
  )

  const showPassword = createSignal(false)
  const isPassword = read(local.type) === 'password'

  const hasPrefix = () => read(local.prefix) != null
  const hasSuffix = () => read(local.suffix) != null || isPassword

  const field = useFieldContext()
  const fieldInvalid = () => field?.invalid?.() ?? false
  const fieldDisabled = () => field?.disabled?.() ?? false
  const effectiveInvalid = () => read(local.invalid) || fieldInvalid()
  const effectiveDisabled = () => read(local.disabled) || fieldDisabled()

  const wrapperClassName = ()=> {
    const variant = read(local.variant) === 'solid' ? 'solid' : 'outline'
    let intent = read(local.intent)
    if (intent === 'neutral' && variant === 'solid') intent = 'default'
    return [
      wrapperClass,
      sizeClasses[read(local.size)],
      variant === 'solid' ? variantClasses.solid : variantClasses.outline,
      intentClasses[intent] ?? intentClasses.default,
      effectiveInvalid() && errorClass,
      effectiveDisabled() && disabledClass,
      hasPrefix() && hasPrefixClass,
      hasSuffix() && hasSuffixClass,
      read(local.className),
    ].filter(Boolean).join(' ')
  }

  const inputType = ()=> {
    if (!isPassword) return read(local.type)
    return showPassword() ? 'text' : 'password'
  }

  const renderAffix = (content)=> {
    if (content == null) return null
    return <span className={affixClass}>{content}</span>
  }

  return (
    <div className={wrapperClassName}>
      {() => {
        const p = read(local.prefix)
        if (p == null) return null
        return renderAffix(p)
      }}
      <ark.input
        ref={local.ref}
        {...(field ? field.getInputProps() : {})}
        {...rest}
        type={inputType}
        aria-invalid={() => effectiveInvalid() ? 'true' : 'false'}
        data-invalid={() => effectiveInvalid() ? '' : undefined}
        disabled={() => effectiveDisabled()}
        className={()=> [inputClass, read(local.inputClassName)].filter(Boolean).join(' ')}
      />
      {() => {
        if (isPassword && read(local.suffix) == null){
          const visible = showPassword()
          return (
            <button
              type="button"
              className={eyeButtonClass}
              onClick={()=> showPassword(!visible)}
              tabIndex={-1}
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              {visible ? (
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )
        }
        const s = read(local.suffix)
        if (s == null) return null
        return renderAffix(s)
      }}
    </div>
  )
}

Input.origin = { Root: ark.input }

export default Input
export { Input }
