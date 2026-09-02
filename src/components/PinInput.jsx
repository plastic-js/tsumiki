import { css } from '@emotion/css'
import { Loop, mergeProps, splitProps } from '@plastic-js/plastic'

const read = (v)=> typeof v === 'function' ? v() : v

const rootClass = css({
	display: 'inline-flex',
	alignItems: 'center',
	gap: 'var(--tsu-spacing-sm)',
	fontFamily: 'inherit',
})

const sizeClasses = {
	xs: css({ '--_pin-box': 'var(--tsu-comp-height-xs)', '--_pin-font': 'var(--tsu-comp-font-size-xs)', '--_pin-radius': 'var(--tsu-radius-l1-xs)' }),
	sm: css({ '--_pin-box': 'var(--tsu-comp-height-sm)', '--_pin-font': 'var(--tsu-comp-font-size-sm)', '--_pin-radius': 'var(--tsu-radius-l1-sm)' }),
	md: css({ '--_pin-box': 'var(--tsu-comp-height-md)', '--_pin-font': 'var(--tsu-comp-font-size-md)', '--_pin-radius': 'var(--tsu-radius-l1-md)' }),
	lg: css({ '--_pin-box': 'var(--tsu-comp-height-lg)', '--_pin-font': 'var(--tsu-comp-font-size-lg)', '--_pin-radius': 'var(--tsu-radius-l1-lg)' }),
	xl: css({ '--_pin-box': 'var(--tsu-comp-height-xl)', '--_pin-font': 'var(--tsu-comp-font-size-xl)', '--_pin-radius': 'var(--tsu-radius-l1-xl)' }),
}

const variantClasses = {
	solid: css({
		backgroundColor: 'var(--tsu-bg-control)',
		border: '1px solid transparent',
	}),
	outline: css({
		border: '1px solid var(--_pin-border)',
	}),
}

const intentClasses = {
	default: css({
		'--_pin-border': 'var(--tsu-accent-outline-border)',
		'--_pin-border-focus': 'var(--tsu-accent-outline-border-hover)',
	}),
	neutral: css({
		'--_pin-border': 'var(--tsu-neutral-outline-border)',
		'--_pin-border-focus': 'var(--tsu-neutral-outline-border-hover)',
	}),
}

const boxBaseClass = css({
	width: 'var(--_pin-box, var(--tsu-comp-height-md))',
	height: 'var(--_pin-box, var(--tsu-comp-height-md))',
	padding: 0,
	borderRadius: 'var(--_pin-radius, var(--tsu-radius-l1-md))',
	color: 'var(--tsu-fg)',
	fontFamily: 'inherit',
	fontSize: 'var(--_pin-font, var(--tsu-comp-font-size-md))',
	fontWeight: 600,
	textAlign: 'center',
	WebkitAppearance: 'none',
	appearance: 'none',
	outline: 'none',
	touchAction: 'manipulation',
	transition: 'border-color var(--tsu-transition-fast), background-color var(--tsu-transition-fast), box-shadow var(--tsu-transition-fast)',
	'&:focus': {
		borderColor: 'var(--_pin-border-focus, var(--tsu-accent-outline-border-hover))',
		backgroundColor: 'var(--tsu-focus-bg)',
		boxShadow: '0 0 0 1px var(--_pin-border-focus, var(--tsu-accent-outline-border-hover))',
	},
})

const errorClass = css({
	borderColor: 'var(--tsu-danger-outline-border) !important',
	'&:focus': {
		borderColor: 'var(--tsu-danger-outline-border) !important',
		boxShadow: '0 0 0 1px var(--tsu-danger-outline-border) !important',
	},
})

const disabledClass = css({
	opacity: 'var(--tsu-disabled-opacity)',
	cursor: 'not-allowed',
})

const PinInput = (props = {})=> {
	const [local, rest] = splitProps(
		mergeProps({ length: 4, size: 'md', type: 'numeric', variant: 'outline', intent: 'default', mask: false, disabled: false, invalid: false }, props),
		['value', 'onValueChange', 'onComplete', 'length', 'size', 'type', 'variant', 'intent', 'mask', 'disabled', 'invalid', 'className', 'inputClassName'],
	)

	const refs = {}

	const boxSize = ()=> read(local.length) || 4
	const isNumeric = ()=> read(local.type) === 'numeric'
	const value = ()=> (read(local.value) || '').slice(0, boxSize())

	const clean = (str)=> {
		if (!str) return ''
		return isNumeric() ? str.replace(/\D/g, '') : str.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
	}

	const focusBox = (index)=> {
		const el = refs[index]
		if (el && typeof el.focus === 'function') el.focus()
	}

	const commit = (next)=> {
		local.onValueChange?.(next)
		if (next.length === boxSize()) local.onComplete?.(next)
	}

	const handleInput = (index)=> (e)=> {
		const char = clean(e.target.value).slice(0, 1)
		const base = value()
		const next = base.slice(0, index) + char + base.slice(index + 1)
		if (char && index < boxSize() - 1) focusBox(index + 1)
		commit(next)
	}

	const handleKeyDown = (index)=> (e)=> {
		if (e.key === 'Backspace' && !e.target.value && index > 0) {
			e.preventDefault()
			const prev = index - 1
			const base = value()
			commit(base.slice(0, prev) + base.slice(prev + 1))
			focusBox(prev)
			return
		}
		if (e.key === 'ArrowLeft' && index > 0) {
			e.preventDefault()
			focusBox(index - 1)
			return
		}
		if (e.key === 'ArrowRight' && index < boxSize() - 1) {
			e.preventDefault()
			focusBox(index + 1)
			return
		}
		if (e.key === 'Home') {
			e.preventDefault()
			focusBox(0)
			return
		}
		if (e.key === 'End') {
			e.preventDefault()
			focusBox(boxSize() - 1)
		}
	}

	const handlePaste = (index)=> (e)=> {
		e.preventDefault()
		const text = clean(e.clipboardData?.getData('text')?.trim())
		if (!text) return
		const base = value()
		const next = (base.slice(0, index) + text + base.slice(index + text.length)).slice(0, boxSize())
		commit(next)
		focusBox(Math.min(index + text.length, boxSize() - 1))
	}

	const handleFocus = (e)=> e.target.select()

	const boxClassName = (index)=> {
		const variant = read(local.variant) === 'solid' ? 'solid' : 'outline'
		let intent = read(local.intent)
		if (intent === 'neutral' && variant === 'solid') intent = 'default'
		return [
			boxBaseClass,
			variantClasses[variant],
			intentClasses[intent] ?? intentClasses.default,
			read(local.invalid) && errorClass,
			read(local.disabled) && disabledClass,
			read(local.inputClassName),
		].filter(Boolean).join(' ')
	}

	return (
		<div className={() => [
			rootClass,
			sizeClasses[read(local.size)] ?? sizeClasses.md,
			read(local.className),
		].filter(Boolean).join(' ')} {...rest}>
			<Loop each={() => Array.from({ length: boxSize() })}>
				{(_, indexSignal)=> {
					const index = indexSignal()
					return (
						<input
							key={index}
							ref={(el)=> { refs[index] = el }}
							type={()=> read(local.mask) ? 'password' : 'text'}
							inputMode={()=> isNumeric() ? 'numeric' : undefined}
							autoComplete={index === 0 ? 'one-time-code' : undefined}
							aria-label={`Character ${index + 1} of ${boxSize()}`}
							aria-invalid={()=> read(local.invalid) ? 'true' : 'false'}
							data-invalid={()=> read(local.invalid) ? '' : undefined}
							value={()=> { read(local.mask); return value()[index] || '' }}
							onInput={handleInput(index)}
							onKeyDown={handleKeyDown(index)}
							onPaste={handlePaste(index)}
							onFocus={handleFocus}
							disabled={()=> read(local.disabled)}
							className={()=> boxClassName(index)}
							maxLength={1}
						/>
					)
				}}
			</Loop>
		</div>
	)
}

export default PinInput
export { PinInput }
