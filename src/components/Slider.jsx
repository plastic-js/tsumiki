import { css } from '@emotion/css'
import { Slider as ArkSlider } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-sm)',
  width: '100%',
  fontFamily: 'inherit',
})

const labelClass = css({
  fontSize: 'var(--tsu-comp-font-size-md)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  color: 'var(--tsu-fg)',
})

const controlClass = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '24px',
  touchAction: 'none',
})

const trackClass = css({
  position: 'relative',
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  backgroundColor: 'var(--tsu-border)',
})

const rangeClass = css({
  position: 'absolute',
  height: '100%',
  borderRadius: '2px',
  backgroundColor: 'var(--tsu-accent-solid-bg)',
})

const thumbClass = css({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: 'var(--tsu-accent-solid-bg)',
  border: '2px solid var(--tsu-accent-solid-bg)',
  boxShadow: 'var(--tsu-shadow-sm)',
  cursor: 'pointer',
  zIndex: 2,
  transition: 'box-shadow var(--tsu-transition-fast)',
  '&:focus-visible': { boxShadow: '0 0 0 3px var(--tsu-accent-subtle-bg)' },
})

const indicatorClass = css({
  position: 'absolute',
  top: '-30px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '4px 8px',
  borderRadius: '6px',
  backgroundColor: 'var(--tsu-fg)',
  color: 'var(--tsu-bg-page)',
  fontSize: '13px',
  lineHeight: 1,
  fontFamily: 'inherit',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
})

const Slider = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ min: 0, max: 100, step: 1, thumbAlignment: 'center' }, props),
    ['label', 'className', 'children'],
  )

  return ()=> (
    <ArkSlider.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
      {local.label && <ArkSlider.Label className={labelClass}>{local.label}</ArkSlider.Label>}
      <ArkSlider.Control className={controlClass}>
        <ArkSlider.Track className={trackClass}>
          <ArkSlider.Range className={rangeClass} />
        </ArkSlider.Track>
        <ArkSlider.Thumb className={thumbClass}>
          <ArkSlider.DraggingIndicator className={indicatorClass}>
            <ArkSlider.ValueText />
          </ArkSlider.DraggingIndicator>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
        {local.children}
      </ArkSlider.Control>
    </ArkSlider.Root>
  )
}

Slider.origin = {
  Root: ArkSlider.Root,
  Label: ArkSlider.Label,
  Control: ArkSlider.Control,
  Track: ArkSlider.Track,
  Range: ArkSlider.Range,
  Thumb: ArkSlider.Thumb,
  DraggingIndicator: ArkSlider.DraggingIndicator,
  ValueText: ArkSlider.ValueText,
  HiddenInput: ArkSlider.HiddenInput,
}

export default Slider
export { Slider }
