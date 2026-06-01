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

const affixTextClass = css({
	color: 'var(--muted)',
	fontSize: '14px',
	whiteSpace: 'nowrap',
	userSelect: 'none',
	marginRight: '2px',
})

// Trailing unit (e.g. K, M): brighter and separated so it reads as part of the
// value rather than faint decoration.
const affixSuffixClass = css({
	color: 'var(--ink)',
	fontSize: '14px',
	fontWeight: 600,
	whiteSpace: 'nowrap',
	userSelect: 'none',
	paddingLeft: '10px',
	marginLeft: '4px',
	borderLeft: '1px solid var(--border)',
})

// Dim the suffix to match the disabled value text (the span is a sibling of the
// input, so it doesn't inherit the input's :disabled styling).
const affixSuffixDisabledClass = css({
	opacity: 0.5,
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
	'&::placeholder': { color: 'var(--muted)' },
	// Keep disabled text legible (WebKit otherwise forces a faint grey) while
	// still reading as read-only, matching the other disabled fields.
	'&:disabled': {
		opacity: 0.5,
		cursor: 'not-allowed',
		WebkitTextFillColor: 'var(--ink)',
	},
})

// Props may be plain values or reactive accessors (signals); unwrap either.
const read = (value)=> {
	return typeof value === 'function' ? value() : value
}

// Stored value is a digits-only string; display it grouped by thousands.
const groupThousands = (digits)=> {
	if (!digits){ return '' }
	return Number(digits).toLocaleString('en-US')
}

/**
 * Currency amount input. Keeps an integer digits-only string as its value and
 * renders it grouped by thousands with a currency prefix.
 *
 * @param value         digits-only string, or an accessor returning one
 * @param onValueChange called with the next digits-only string on input
 * @param invalid       boolean or accessor; toggles the error border
 * @param currency      prefix symbol, defaults to ₱
 * @param affix         optional suffix text (e.g. K, M), defaults to empty
 */
const MoneyInput = (props)=> {
	const [local, rest] = splitProps(props, ['value', 'onValueChange', 'invalid', 'currency', 'affix', 'placeholder', 'disabled'])
	return (
		<div className={()=> `${wrapperClass} ${read(local.invalid) ? errorClass : ''}`}>
			<span className={affixTextClass}>
				{local.currency ?? '₱'}
			</span>
			<input
				className={inputClass}
				disabled={local.disabled}
				inputMode='numeric'
				onInput={e=> local.onValueChange?.(e.target.value.replace(/\D/g, ''))}
				placeholder={local.placeholder}
				value={()=> groupThousands(read(local.value))}
				{...rest}
			/>
			{()=> read(local.affix) && (
				<span className={()=> `${affixSuffixClass} ${read(local.disabled) ? affixSuffixDisabledClass : ''}`}>
					{read(local.affix)}
				</span>
			)}
		</div>
	)
}

export default MoneyInput
