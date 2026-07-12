import { css } from '@emotion/css'
import { SignaturePad as ArkSignaturePad } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-sm)',
})

const labelClass = css({
  fontSize: 'var(--tsu-comp-font-size-sm)',
  color: 'var(--tsu-fg)',
  fontWeight: 'var(--tsu-font-weight-medium)',
})

const canvasClass = css({
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  backgroundColor: 'var(--tsu-bg-page)',
  color: 'var(--tsu-fg)',
  touchAction: 'none',
  width: '100%',
  '& [data-part="segment-path"]': {
    stroke: 'currentColor',
    strokeWidth: '2px',
  },
})

const clearClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: 'var(--tsu-comp-padding-y-sm) var(--tsu-comp-padding-x-md)',
  border: '1px solid var(--tsu-neutral-outline-border)',
  borderRadius: 'var(--tsu-radius-l2-md)',
  background: 'var(--tsu-bg-page)',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--tsu-comp-font-size-sm)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  touchAction: 'manipulation',
  '&:active': { background: 'var(--tsu-pressed)' },
})

const ClearTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return (
    <ArkSignaturePad.ClearTrigger {...rest} className={`${clearClass} ${local.className || ''}`}>
      {local.children || 'Clear'}
    </ArkSignaturePad.ClearTrigger>
  )
}

const SignaturePad = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ label: 'Signature', height: 160 }, props),
    ['className', 'label', 'height', 'children'],
  )

  return (
    <ArkSignaturePad.Root {...rest} className={`${rootClass} ${local.className || ''}`}>
      <ArkSignaturePad.Label className={labelClass}>{local.label}</ArkSignaturePad.Label>
      <ArkSignaturePad.Canvas className={canvasClass} height={local.height} />
      {local.children}
      <ArkSignaturePad.HiddenInput />
    </ArkSignaturePad.Root>
  )
}

export default SignaturePad
export { SignaturePad, ClearTrigger }
