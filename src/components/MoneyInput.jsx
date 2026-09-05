import { css } from '@emotion/css'
import { splitProps } from '@plastic-js/plastic'
import Input from './Input.jsx'

const affixSuffixClass = css({
  fontWeight: 'var(--tsu-font-weight-semibold)',
  paddingLeft: '10px',
  marginLeft: 'var(--tsu-spacing-xs)',
  borderLeft: '1px solid var(--tsu-border)',
})

const read = (value)=> {
  return typeof value === 'function' ? value() : value
}

const groupThousands = (digits)=> {
  if (!digits){ return '' }
  return Number(digits).toLocaleString('en-US')
}

const MoneyInput = (props)=> {
  const [local, rest] = splitProps(props, ['value', 'onValueChange', 'invalid', 'currency', 'affix', 'placeholder', 'disabled'])

  return (
    <Input
      invalid={local.invalid}
      disabled={local.disabled}
      placeholder={local.placeholder}
      prefix={()=> <span>{local.currency ?? '₱'}</span>}
      suffix={()=> {
        const affix = read(local.affix)
        if (!affix) return null
        return <span className={affixSuffixClass}>{affix}</span>
      }}
      value={()=> groupThousands(read(local.value))}
      onInput={e=> local.onValueChange?.(e.target.value.replace(/\D/g, ''))}
      inputMode="numeric"
      {...rest}
    />
  )
}

export default MoneyInput
export { MoneyInput }
