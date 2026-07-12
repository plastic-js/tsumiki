import { css, keyframes } from '@emotion/css'
import { Progress as ArkProgress } from '@plastic-js/ark'
import { mergeProps, splitProps, createContext, useContext } from '@plastic-js/plastic'

const ProgressCtx = createContext(() => ({ size: 'md', striped: false }))

const stripeAnim = keyframes({
  '0%': { backgroundPosition: '0 0' },
  '100%': { backgroundPosition: '16px 0' },
})

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--tsu-spacing-sm)',
  width: '100%',
})

const trackClass = css({
  width: '100%',
  backgroundColor: 'var(--tsu-bg-control)',
  borderRadius: '999px',
  overflow: 'hidden',
})

const rangeClass = css({
  height: '100%',
  backgroundColor: 'var(--tsu-accent-solid-bg)',
  borderRadius: '999px',
  transition: 'width var(--tsu-transition-normal)',
})

const stripedClass = css({
  backgroundImage: [
    'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%)',
    'linear-gradient(-45deg, transparent 50%, rgba(255,255,255,0.15) 50%)',
    'linear-gradient(-45deg, rgba(255,255,255,0.15) 75%, transparent 75%)',
    'linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.15) 75%)',
  ].join(','),
  backgroundSize: '16px 16px',
  animation: `${stripeAnim} 1s linear infinite`,
})

const labelClass = css({
  fontSize: 'var(--tsu-font-size-sm)',
  color: 'var(--tsu-text-secondary)',
  fontWeight: 'var(--tsu-font-weight-medium)',
})

const sizeHeights = {
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
}

const read = (v) => typeof v === 'function' ? v() : v

const ProgressLabel = (props = {}) => {
  const [local, rest] = splitProps(props, ['className'])
  return <ArkProgress.Label {...rest} className={[labelClass, local.className].filter(Boolean).join(' ')} />
}

const ProgressRange = (props = {}) => {
  const getCtx = useContext(ProgressCtx)
  const [local, rest] = splitProps(props, ['className'])

  return () => {
    const ctx = getCtx()
    return (
      <ArkProgress.Range
        {...rest}
        className={[rangeClass, ctx.striped && stripedClass, local.className].filter(Boolean).join(' ')}
      />
    )
  }
}

const Progress = (props = {}) => {
  const [local, rest] = splitProps(
    mergeProps({ size: 'md', striped: false }, props),
    ['size', 'striped', 'className', 'children', 'label'],
  )

  const size = read(local.size)
  const height = sizeHeights[size]

  return (
    <ProgressCtx.Provider value={() => ({ size, striped: read(local.striped) })}>
      <ArkProgress.Root {...rest} className={[rootClass, local.className].filter(Boolean).join(' ')}>
        {read(local.label) && <ProgressLabel>{read(local.label)}</ProgressLabel>}
        {local.children}
        <ArkProgress.Track className={trackClass} style={{ height }}>
          <ProgressRange />
        </ArkProgress.Track>
      </ArkProgress.Root>
    </ProgressCtx.Provider>
  )
}

export { Progress, ProgressLabel }
export default Progress
