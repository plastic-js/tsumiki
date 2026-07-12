import { css, keyframes } from '@emotion/css'

const rotate = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const Spinner = ({
  size = 24,
  strokeWidth = 2,
  color = 'var(--tsu-accent-solid-bg)',
  duration = '0.8s',
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  className,
} = {})=> {
  const style = {
    '--spinner-size': typeof size === 'number' ? `${size}px` : size,
    '--spinner-stroke': strokeWidth,
    '--spinner-color': color,
    '--spinner-duration': duration,
    '--spinner-easing': easing,
  }

  const spinnerClass = css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--spinner-size)',
    height: 'var(--spinner-size)',
    color: 'var(--spinner-color)',
    animation: `${rotate} var(--spinner-duration) var(--spinner-easing) infinite`,
    '& svg': {
      width: '100%',
      height: '100%',
      display: 'block',
    },
  })

  return (
    <span className={className ? `${spinnerClass} ${className}` : spinnerClass} style={style} aria-label="Loading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </span>
  )
}

export default Spinner
export { Spinner }
