import { css, keyframes } from '@emotion/css'

const shimmer = keyframes({
	'0%': { backgroundPosition: '-200% 0' },
	'100%': { backgroundPosition: '200% 0' },
})

const baseClass = css({
	display: 'block',
	background: 'linear-gradient(90deg, var(--border) 0%, var(--surface) 50%, var(--border) 100%)',
	backgroundSize: '200% 100%',
	animation: `${shimmer} 1.4s ease-in-out infinite`,
	borderRadius: '6px',
})

const Skeleton = ({
	width = '100%', height = '14px', radius, className, style,
})=> (
	<span
		className={className ? `${baseClass} ${className}` : baseClass}
		style={{
			width, height, borderRadius: radius, ...style,
		}}
	/>
)

export default Skeleton
