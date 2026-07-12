import { css } from '@emotion/css'
import { splitProps } from '@plastic-js/plastic'
import Input from './Input.jsx'

function CardIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

const inputClass = css({
  letterSpacing: '1.5px',
  '&::placeholder': { letterSpacing: 'normal' },
})

const read = (value)=> {
  return typeof value === 'function' ? value() : value
}

const groupDigits = (digits)=> {
  if (!digits){ return '' }
  return digits.replace(/(\d{4})(?=\d)/g, '$1-')
}

const CardNumberInput = (props)=> {
  const [local, rest] = splitProps(props, ['value', 'onValueChange', 'invalid', 'disabled', 'placeholder'])

  return (
    <Input
      invalid={local.invalid}
      disabled={local.disabled}
      placeholder={local.placeholder ?? '0000-0000-0000-0000'}
      prefix={<CardIcon />}
      inputClassName={inputClass}
      value={()=> groupDigits(read(local.value))}
      onInput={e=> local.onValueChange?.(e.target.value.replace(/\D/g, ''))}
      inputMode="numeric"
      {...rest}
    />
  )
}

export default CardNumberInput
export { CardNumberInput }
