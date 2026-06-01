import { css } from '@emotion/css'

const iconClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'currentColor',
	'& svg': {
		width: '100%', height: '100%', display: 'block', strokeWidth: 'var(--icon-sw)',
	},
})

const Icon = ({
	svg, size = 22, strokeWidth = 1.25, className,
})=> {
	const style = {
		width: `${size}px`, height: `${size}px`, '--icon-sw': strokeWidth,
	}
	const setEl = (el)=> { if (el && el.innerHTML !== svg){ el.innerHTML = svg } }
	return <span className={className ? `${iconClass} ${className}` : iconClass} ref={setEl} style={style} />
}

export default Icon
