import { css } from '@emotion/css'
import { Fieldset as ArkFieldset } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-xs)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  padding: 'var(--tsu-spacing-lg)',
})

const legendClass = css({
  fontSize: 'var(--tsu-font-size-md)',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-fg)',
  padding: 0,
  margin: 0,
})

const helperClass = css({
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-text-secondary)',
  margin: 0,
})

const read = (v) => typeof v === 'function' ? v() : v

const Fieldset = (props = {}) => {
  const [local, rest] = splitProps(
    mergeProps({ legend: '', helper: '' }, props),
    ['legend', 'helper', 'className', 'children'],
  )

  return (
    <ArkFieldset.Root
      {...rest}
      className={() => [rootClass, local.className].filter(Boolean).join(' ')}
    >
      {read(local.legend)
        ? <ArkFieldset.Legend className={legendClass}>{read(local.legend)}</ArkFieldset.Legend>
        : null}
      {local.children}
      {read(local.helper)
        ? <ArkFieldset.HelperText className={helperClass}>{read(local.helper)}</ArkFieldset.HelperText>
        : null}
    </ArkFieldset.Root>
  )
}

Fieldset.origin = {
  Root: ArkFieldset.Root,
  Legend: ArkFieldset.Legend,
  HelperText: ArkFieldset.HelperText,
  ErrorText: ArkFieldset.ErrorText,
}

export default Fieldset
export { Fieldset }
