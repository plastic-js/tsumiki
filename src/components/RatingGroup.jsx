import { css } from '@emotion/css'
import { RatingGroup as ArkRatingGroup } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-xs)',
})

const labelClass = css({
  fontSize: 'var(--tsu-comp-font-size-sm)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  color: 'var(--tsu-text-secondary)',
})

const controlClass = css({
  display: 'flex',
  gap: 'var(--tsu-spacing-xxs)',
})

const itemClass = css({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  lineHeight: 0,
  color: 'var(--tsu-border)',
  transition: 'color var(--tsu-transition-fast)',
  '&[data-highlighted]': { color: 'var(--tsu-warning-solid-bg)' },
  '&[data-checked]': { color: 'var(--tsu-warning-solid-bg)' },
  '&[data-disabled]': {
    opacity: 'var(--tsu-disabled-opacity)',
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
})

const itemTextClass = css({
  display: 'block',
  color: 'inherit',
  fontSize: '24px',
  '& svg': { display: 'block' },
})

const RatingGroup = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ count: 5 }, props),
    ['label', 'className'],
  )

  return (
    <ArkRatingGroup.Root
      {...rest}
      className={() => [rootClass, local.className].filter(Boolean).join(' ')}
    >
      {local.label && (
        <ArkRatingGroup.Label className={labelClass}>
          {local.label}
        </ArkRatingGroup.Label>
      )}
      <ArkRatingGroup.Control className={controlClass}>
        {Array.from({ length: rest.count }, (_, i)=> (
          <ArkRatingGroup.Item key={i} index={i + 1} className={itemClass}>
            <div className={itemTextClass}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
              </svg>
            </div>
          </ArkRatingGroup.Item>
        ))}
      </ArkRatingGroup.Control>
      <ArkRatingGroup.HiddenInput />
    </ArkRatingGroup.Root>
  )
}

RatingGroup.origin = {
  Root: ArkRatingGroup.Root,
  Label: ArkRatingGroup.Label,
  Control: ArkRatingGroup.Control,
  Item: ArkRatingGroup.Item,
  ItemText: ArkRatingGroup.ItemText,
  HiddenInput: ArkRatingGroup.HiddenInput,
}

export default RatingGroup
export { RatingGroup }
