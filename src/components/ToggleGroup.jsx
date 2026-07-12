import { css } from '@emotion/css'
import { ToggleGroup as ArkToggleGroup, useFieldContext } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'inline-flex',
  height: 'var(--_tg-height, var(--tsu-comp-height-md))',
  border: '1px solid var(--_tg-border)',
  borderRadius: 'var(--_tg-radius, var(--tsu-radius-l1-md))',
  overflow: 'hidden',
  fontFamily: 'inherit',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--_tg-padding-y, var(--tsu-comp-padding-y-md)) var(--_tg-padding-x, var(--tsu-comp-padding-x-md))',
  border: 'none',
  borderRight: '1px solid var(--_tg-border)',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  fontSize: 'var(--_tg-font-size, var(--tsu-comp-font-size-md))',
  fontWeight: 'var(--tsu-font-weight-medium)',
  fontFamily: 'inherit',
  cursor: 'pointer',
  touchAction: 'manipulation',
  transition: 'background-color var(--tsu-transition-fast), color var(--tsu-transition-fast)',
  '&:last-child': { borderRight: 'none' },
  '&[data-state="on"]': { backgroundColor: 'var(--_tg-checked-bg, var(--tsu-accent-solid-bg))', color: 'var(--_tg-checked-fg, var(--tsu-accent-solid-fg))' },
  '&:disabled': {
    backgroundColor: 'var(--tsu-bg-control)',
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const intentClasses = {
  default: css({
    '--_tg-border': 'var(--tsu-accent-solid-bg)',
  }),
  neutral: css({
    '--_tg-border': 'var(--tsu-neutral-outline-border)',
  }),
}

const errorClass = css({
  '--_tg-border': 'var(--tsu-danger-outline-border) !important',
})

const sizeVars = {
  xs: { '--_tg-height': 'var(--tsu-comp-height-xs)', '--_tg-padding-y': 'var(--tsu-comp-padding-y-xs)', '--_tg-padding-x': 'var(--tsu-comp-padding-x-xs)', '--_tg-font-size': 'var(--tsu-comp-font-size-xs)', '--_tg-radius': 'var(--tsu-radius-l1-xs)' },
  sm: { '--_tg-height': 'var(--tsu-comp-height-sm)', '--_tg-padding-y': 'var(--tsu-comp-padding-y-sm)', '--_tg-padding-x': 'var(--tsu-comp-padding-x-sm)', '--_tg-font-size': 'var(--tsu-comp-font-size-sm)', '--_tg-radius': 'var(--tsu-radius-l1-sm)' },
  md: { '--_tg-height': 'var(--tsu-comp-height-md)', '--_tg-padding-y': 'var(--tsu-comp-padding-y-md)', '--_tg-padding-x': 'var(--tsu-comp-padding-x-md)', '--_tg-font-size': 'var(--tsu-comp-font-size-md)', '--_tg-radius': 'var(--tsu-radius-l1-md)' },
  lg: { '--_tg-height': 'var(--tsu-comp-height-lg)', '--_tg-padding-y': 'var(--tsu-comp-padding-y-lg)', '--_tg-padding-x': 'var(--tsu-comp-padding-x-lg)', '--_tg-font-size': 'var(--tsu-comp-font-size-lg)', '--_tg-radius': 'var(--tsu-radius-l1-lg)' },
  xl: { '--_tg-height': 'var(--tsu-comp-height-xl)', '--_tg-padding-y': 'var(--tsu-comp-padding-y-xl)', '--_tg-padding-x': 'var(--tsu-comp-padding-x-xl)', '--_tg-font-size': 'var(--tsu-comp-font-size-xl)', '--_tg-radius': 'var(--tsu-radius-l1-xl)' },
}

const read = (v)=> typeof v === 'function' ? v() : v

const ToggleGroupItem = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkToggleGroup.Item {...rest} className={[itemClass, local.className].filter(Boolean).join(' ')}>{local.children}</ArkToggleGroup.Item>
}

const ToggleGroup = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', intent: 'default', invalid: false }, props),
    ['className', 'children', 'size', 'intent', 'invalid', 'style'],
  )

  const field = useFieldContext()
  const fieldInvalid = () => field?.invalid?.() ?? false
  const effectiveInvalid = () => read(local.invalid) || fieldInvalid()

  return (
    <ArkToggleGroup.Root
      {...rest}
      className={()=> [rootClass, intentClasses[local.intent], effectiveInvalid() && errorClass, local.className].filter(Boolean).join(' ')}
      style={{ ...sizeVars[local.size], ...local.style }}
      aria-invalid={() => effectiveInvalid() ? 'true' : 'false'}
      data-invalid={() => effectiveInvalid() ? '' : undefined}
    >
      {local.children}
    </ArkToggleGroup.Root>
  )
}

ToggleGroup.origin = {
  Root: ArkToggleGroup.Root,
  Item: ArkToggleGroup.Item,
}

export default ToggleGroup
export { ToggleGroup, ToggleGroupItem }
