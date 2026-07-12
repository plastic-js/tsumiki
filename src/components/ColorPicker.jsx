import { css } from '@emotion/css'
import { ColorPicker as ArkColorPicker } from '@plastic-js/ark'
import { mergeProps, splitProps } from '@plastic-js/plastic'

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-sm)',
  width: '100%',
  fontFamily: 'inherit',
})

const sizeClasses = {
  xs: css({
    '--_cp-trigger-size': 'var(--tsu-comp-secondary-height-xs)',
    '--_cp-font-size': 'var(--tsu-comp-font-size-xs)',
  }),
  sm: css({
    '--_cp-trigger-size': 'var(--tsu-comp-secondary-height-sm)',
    '--_cp-font-size': 'var(--tsu-comp-font-size-sm)',
  }),
  md: css({
    '--_cp-trigger-size': 'var(--tsu-comp-secondary-height-md)',
    '--_cp-font-size': 'var(--tsu-comp-font-size-md)',
  }),
  lg: css({
    '--_cp-trigger-size': 'var(--tsu-comp-secondary-height-lg)',
    '--_cp-font-size': 'var(--tsu-comp-font-size-lg)',
  }),
  xl: css({
    '--_cp-trigger-size': 'var(--tsu-comp-secondary-height-xl)',
    '--_cp-font-size': 'var(--tsu-comp-font-size-xl)',
  }),
}

const labelClass = css({
  fontSize: '13px',
  fontWeight: 'var(--tsu-font-weight-semibold)',
  color: 'var(--tsu-fg)',
})

const controlClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

const triggerClass = css({
  width: 'var(--_cp-trigger-size, var(--tsu-comp-secondary-height-md))',
  height: 'var(--_cp-trigger-size, var(--tsu-comp-secondary-height-md))',
  padding: '3px',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  cursor: 'pointer',
  background: 'transparent',
  overflow: 'hidden',
})

const valueSwatchClass = css({
  width: '100%',
  height: '100%',
  borderRadius: 'calc(var(--tsu-radius-l1-md) - 2px)',
})

const valueTextClass = css({
  fontSize: 'var(--_cp-font-size, var(--tsu-comp-font-size-md))',
  fontWeight: 'var(--tsu-font-weight-medium)',
  color: 'var(--tsu-fg)',
  fontVariantNumeric: 'tabular-nums',
})

const contentClass = css({
  backgroundColor: 'var(--tsu-bg-panel)',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l2-xl)',
  boxShadow: 'var(--tsu-shadow-lg)',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '240px',
})

const areaClass = css({
  position: 'relative',
  height: '140px',
  borderRadius: 'var(--tsu-radius-l1-md)',
  overflow: 'hidden',
})

const areaThumbClass = css({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  border: '2px solid #fff',
  boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
})

const sliderClass = css({
  flex: 1,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '16px',
})

const sliderTrackClass = css({
  width: '100%',
  height: '8px',
  borderRadius: '999px',
  overflow: 'hidden',
})

const sliderThumbClass = css({
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  border: '2px solid #fff',
  boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
  cursor: 'grab',
  background: 'transparent',
  '&[data-dragging]': { cursor: 'grabbing' },
})

const channelInputClass = css({
  width: '52px',
  fontSize: '12px',
  fontFamily: 'inherit',
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'center',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l1-sm)',
  padding: '4px 6px',
  background: 'transparent',
  color: 'var(--tsu-fg)',
})

const eyeDropperClass = css({
  fontSize: '12px',
  padding: '6px 10px',
  border: '1px solid var(--tsu-border)',
  borderRadius: 'var(--tsu-radius-l1-md)',
  cursor: 'pointer',
  background: 'transparent',
  color: 'var(--tsu-text-secondary)',
  fontFamily: 'inherit',
})

const _Root = (props = {})=> {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md' }, props),
    ['size', 'className', 'children'],
  )
  return <ArkColorPicker.Root {...rest} className={[rootClass, sizeClasses[local.size], local.className].filter(Boolean).join(' ')}>{local.children}</ArkColorPicker.Root>
}

const Label = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.Label {...rest} className={[labelClass, local.className].filter(Boolean).join(' ')} />
}

const Control = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.Control {...rest} className={[controlClass, local.className].filter(Boolean).join(' ')} />
}

const Trigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.Trigger {...rest} className={[triggerClass, local.className].filter(Boolean).join(' ')} />
}

const Positioner = (props = {})=> {
  const [local, rest] = splitProps(props, ['className', 'children'])
  return <ArkColorPicker.Positioner {...rest} className={local.className}>{local.children}</ArkColorPicker.Positioner>
}

const Content = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.Content {...rest} className={[contentClass, local.className].filter(Boolean).join(' ')} />
}

const ValueSwatch = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.ValueSwatch {...rest} className={[valueSwatchClass, local.className].filter(Boolean).join(' ')} />
}

const ValueText = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.ValueText {...rest} className={[valueTextClass, local.className].filter(Boolean).join(' ')} />
}

const Area = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.Area {...rest} className={[areaClass, local.className].filter(Boolean).join(' ')} />
}

const AreaThumb = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.AreaThumb {...rest} className={[areaThumbClass, local.className].filter(Boolean).join(' ')} />
}

const ChannelSlider = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.ChannelSlider {...rest} className={[sliderClass, local.className].filter(Boolean).join(' ')} />
}

const ChannelSliderTrack = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.ChannelSliderTrack {...rest} className={[sliderTrackClass, local.className].filter(Boolean).join(' ')} />
}

const ChannelSliderThumb = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.ChannelSliderThumb {...rest} className={[sliderThumbClass, local.className].filter(Boolean).join(' ')} />
}

const ChannelInput = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.ChannelInput {...rest} className={[channelInputClass, local.className].filter(Boolean).join(' ')} />
}

const EyeDropperTrigger = (props = {})=> {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkColorPicker.EyeDropperTrigger {...rest} className={[eyeDropperClass, local.className].filter(Boolean).join(' ')} />
}

const ColorPicker = (props)=> {
  const [local, rootProps] = splitProps(props, [
    'label', 'showAlpha', 'eyedropper', 'hiddenInput',
    'onChange', 'size', 'className', 'children',
  ])

  const handleChange = (details)=> {
    local.onChange?.(details.valueAsString)
    rootProps.onValueChange?.(details)
  }

  const hasHandler = local.onChange || rootProps.onValueChange

  return (
    <_Root
      {...rootProps}
      size={local.size}
      className={local.className}
      onValueChange={hasHandler ? handleChange : rootProps.onValueChange}
    >
      {local.label && <Label>{local.label}</Label>}
      <Control>
        <Trigger>
          <ValueSwatch />
        </Trigger>
        <ValueText />
      </Control>
      <Positioner>
        <Content>
          <Area>
            <ArkColorPicker.AreaBackground style={{ inset: 0, position: 'absolute' }} />
            <AreaThumb />
          </Area>
          <div style="display:flex;align-items:center;gap:8px">
            <ChannelSlider channel='hue'>
              <ChannelSliderTrack />
              <ChannelSliderThumb />
            </ChannelSlider>
            <ChannelInput channel='hex' />
          </div>
          {local.showAlpha && (
            <div style="display:flex;align-items:center;gap:8px">
              <ChannelSlider channel='alpha'>
                <ChannelSliderTrack />
                <ArkColorPicker.TransparencyGrid />
                <ChannelSliderThumb />
              </ChannelSlider>
              <ChannelInput channel='alpha' />
            </div>
          )}
          {local.eyedropper && (
            <EyeDropperTrigger>Pick from screen</EyeDropperTrigger>
          )}
          {local.hiddenInput && <ArkColorPicker.HiddenInput />}
        </Content>
      </Positioner>
    </_Root>
  )
}

ColorPicker.origin = {
  Root: ArkColorPicker.Root,
  Label: ArkColorPicker.Label,
  Control: ArkColorPicker.Control,
  Trigger: ArkColorPicker.Trigger,
  Positioner: ArkColorPicker.Positioner,
  Content: ArkColorPicker.Content,
  ValueSwatch: ArkColorPicker.ValueSwatch,
  ValueText: ArkColorPicker.ValueText,
  Area: ArkColorPicker.Area,
  AreaBackground: ArkColorPicker.AreaBackground,
  AreaThumb: ArkColorPicker.AreaThumb,
  ChannelSlider: ArkColorPicker.ChannelSlider,
  ChannelSliderTrack: ArkColorPicker.ChannelSliderTrack,
  ChannelSliderThumb: ArkColorPicker.ChannelSliderThumb,
  ChannelInput: ArkColorPicker.ChannelInput,
  TransparencyGrid: ArkColorPicker.TransparencyGrid,
  EyeDropperTrigger: ArkColorPicker.EyeDropperTrigger,
  HiddenInput: ArkColorPicker.HiddenInput,
}

export default ColorPicker
export { ColorPicker }
