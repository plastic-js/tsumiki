import { css } from '@emotion/css'
import { Field as ArkField } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-xs)',
})

const compactRootClass = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 'var(--tsu-spacing-xs)',
})

const labelClass = css({
  fontSize: 'var(--tsu-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  color: 'var(--tsu-fg)',
})

const compactLabelClass = css({
  flexShrink: 0,
  marginRight: 'var(--tsu-spacing-sm)',
})

const inputWrapClass = css({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  gap: 'var(--tsu-spacing-xs)',
})

const requiredClass = css({
  color: 'var(--tsu-danger-solid-bg)',
  marginLeft: 'var(--tsu-spacing-xxs)',
})

const errorTextClass = css({
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-danger-solid-bg)',
  margin: 0,
  flexBasis: '100%',
})

const helperTextClass = css({
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-text-secondary)',
  margin: 0,
  flexBasis: '100%',
})

const read = (v) => typeof v === 'function' ? v() : v

const Field = (props = {}) => {
  const [local, rest] = splitProps(
    mergeProps({ label: '', error: '', helper: '', required: false, compact: false }, props),
    ['label', 'error', 'helper', 'required', 'compact', 'invalid', 'disabled', 'readOnly', 'className', 'children'],
  )

  const error = () => read(local.error)
  const helper = () => read(local.helper)
  const hasError = () => !!error()
  const hasHelper = () => !!helper()
  const isCompact = () => read(local.compact)
  const required = () => read(local.required)
  const invalid = () => {
    if (hasError()) return true
    return local.invalid === undefined ? undefined : read(local.invalid)
  }
  const disabled = () => local.disabled === undefined ? undefined : read(local.disabled)
  const readOnly = () => local.readOnly === undefined ? undefined : read(local.readOnly)

  return (
    <ArkField.Root
      {...rest}
      invalid={invalid()}
      disabled={disabled()}
      readOnly={readOnly()}
      required={required()}
      className={() => [isCompact() ? compactRootClass : rootClass, local.className].filter(Boolean).join(' ')}
    >
      {read(local.label)
        ? (
          <ArkField.Label className={() => [labelClass, isCompact() && compactLabelClass].filter(Boolean).join(' ')}>
            {read(local.label)}
            {required() && <ArkField.RequiredIndicator className={requiredClass}>*</ArkField.RequiredIndicator>}
          </ArkField.Label>
        )
        : null}
      {isCompact()
        ? <div className={inputWrapClass}>{local.children}</div>
        : local.children
      }
      {hasError()
        ? <ArkField.ErrorText className={errorTextClass}>{error()}</ArkField.ErrorText>
        : hasHelper()
          ? <ArkField.HelperText className={helperTextClass}>{helper()}</ArkField.HelperText>
          : null
      }
    </ArkField.Root>
  )
}

Field.origin = {
  Root: ArkField.Root,
  Label: ArkField.Label,
  Input: ArkField.Input,
  Textarea: ArkField.Textarea,
  Select: ArkField.Select,
  HelperText: ArkField.HelperText,
  ErrorText: ArkField.ErrorText,
  RequiredIndicator: ArkField.RequiredIndicator,
  Item: ArkField.Item,
}

export default Field
export { Field }
