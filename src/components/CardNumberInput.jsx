import { css } from '@emotion/css'
import { splitProps } from '@plastic-js/plastic'

const wrapperClass = css({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	boxSizing: 'border-box',
	height: '44px',
	background: 'var(--bg, rgba(0,0,0,0.2))',
	border: '1px solid var(--border)',
	borderRadius: '10px',
	padding: '0 14px',
	'&:focus-within': { borderColor: 'var(--accent)' },
})

const errorClass = css({
	borderColor: 'var(--danger) !important',
})

const inputClass = css({
	flex: 1,
	minWidth: 0,
	height: '100%',
	background: 'transparent',
	border: 'none',
	color: 'var(--ink)',
	fontSize: '15px',
	fontFamily: 'inherit',
	outline: 'none',
	letterSpacing: '1.5px',
	'&::placeholder': { color: 'var(--muted)', letterSpacing: 'normal' },
})

const read = (value)=> {
	return typeof value === 'function' ? value() : value
}

const groupDigits = (digits)=> {
	if (!digits){ return '' }
	return digits.replace(/(\d{4})(?=\d)/g, '$1-')
}

const CardNumberInput = (props)=> {
	const [local, rest] = splitProps(props, ['value', 'onValueChange', 'invalid', 'placeholder'])
	return (
		<div className={()=> `${wrapperClass} ${read(local.invalid) ? errorClass : ''}`}>
			<input
				className={inputClass}
				inputMode='numeric'
				onInput={e=> local.onValueChange?.(e.target.value.replace(/\D/g, ''))}
				placeholder={local.placeholder ?? '0000-0000-0000-0000'}
				value={()=> groupDigits(read(local.value))}
				{...rest}
			/>
		</div>
	)
}

export default CardNumberInput
