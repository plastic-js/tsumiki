import { css } from '@emotion/css'
import { RadioGroup as ArkRadioGroup } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-sm)',
  '&[data-orientation="horizontal"]': {
    flexDirection: 'row',
    gap: 'var(--tsu-spacing-xl)',
  },
})

const labelClass = css({
  fontSize: 'var(--tsu-comp-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-fg)',
  marginBottom: 'var(--tsu-spacing-sm)',
})

const itemClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--tsu-spacing-sm)',
  cursor: 'pointer',
  fontSize: 'var(--tsu-comp-font-size-md)',
  color: 'var(--tsu-fg)',
  touchAction: 'manipulation',
  '&:active': { backgroundColor: 'transparent' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
  },
})

const itemControlClass = css({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '2px solid var(--tsu-accent-outline-border)',
  background: 'var(--tsu-bg-panel)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  touchAction: 'manipulation',
  transition: 'border-color var(--tsu-transition-fast), background-color var(--tsu-transition-fast)',
  '&:active': { backgroundColor: 'transparent' },
  '&[data-state="checked"]': {
    borderColor: 'var(--tsu-accent-solid-bg)',
  },
})

const indicatorClass = css({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: 'var(--tsu-accent-solid-bg)',
})

const RadioGroup = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({}, props),
    ['label', 'className', 'items'],
  )

  const classNames = [rootClass, local.className].filter(Boolean).join(' ')

  return (
    <ArkRadioGroup.Root {...rest} className={classNames}>
      {local.label && (
        <ArkRadioGroup.Label className={labelClass}>
          {local.label}
        </ArkRadioGroup.Label>
      )}
      {local.items?.map((item) => (
        <ArkRadioGroup.Item key={item.value} value={item.value} disabled={item.disabled} className={itemClass}>
          <ArkRadioGroup.ItemControl className={itemControlClass}>
            <ArkRadioGroup.Indicator className={indicatorClass} />
          </ArkRadioGroup.ItemControl>
          <ArkRadioGroup.ItemText>{item.label}</ArkRadioGroup.ItemText>
          <ArkRadioGroup.ItemHiddenInput />
        </ArkRadioGroup.Item>
      ))}
    </ArkRadioGroup.Root>
  )
}

RadioGroup.origin = {
  Root: ArkRadioGroup.Root,
  Label: ArkRadioGroup.Label,
  Item: ArkRadioGroup.Item,
  ItemControl: ArkRadioGroup.ItemControl,
  ItemText: ArkRadioGroup.ItemText,
  ItemHiddenInput: ArkRadioGroup.ItemHiddenInput,
  Indicator: ArkRadioGroup.Indicator,
}

export default RadioGroup
export { RadioGroup }
