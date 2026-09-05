import { css } from '@emotion/css'
import { mergeProps, splitProps } from '@plastic-js/plastic'
import Input from './Input.jsx'

const countryCodeClass = css({
  color: 'var(--tsu-fg)',
  fontWeight: 'var(--tsu-font-weight-medium)',
  fontVariantNumeric: 'tabular-nums',
})

const read = (value) => typeof value === 'function' ? value() : value

const PHONE_PRESETS = {
  '+63': { digits: 10, format: '###-###-####', placeholder: '9XX-XXX-XXXX' },
  '+86': { digits: 11, format: '###-####-####', placeholder: '1XX-XXXX-XXXX' },
}

const presetFor = (countryCode) => PHONE_PRESETS[countryCode] || PHONE_PRESETS['+63']

const parseFormat = (format) => {
  const groups = []
  const seps = []
  let n = 0
  for (const ch of format) {
    if (ch === '#') { n += 1; continue }
    groups.push(n)
    seps.push(ch)
    n = 0
  }
  groups.push(n)
  return { groups, seps }
}

const applyFormat = (digits, format) => {
  const { groups, seps } = parseFormat(format)
  const total = groups.reduce((a, b) => a + b, 0)
  const d = (digits || '').replace(/\D/g, '').slice(0, total)
  if (!d) return ''
  const parts = []
  let pos = 0
  for (const g of groups) {
    parts.push(d.slice(pos, pos + g))
    pos += g
  }
  const out = [parts[0]]
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i]) break
    out.push(seps[i - 1], parts[i])
  }
  return out.join('')
}

const PhoneInput = (props) => {
  const [local, rest] = splitProps(
    mergeProps({ countryCode: '+63' }, props),
    ['value', 'onValueChange', 'invalid', 'disabled', 'placeholder', 'countryCode'],
  )

  const preset = () => presetFor(read(local.countryCode))

  const placeholder = () => read(local.placeholder) ?? preset().placeholder

  const handleInput = (e) => {
    const { digits } = presetFor(read(local.countryCode))
    local.onValueChange?.(e.target.value.replace(/\D/g, '').slice(0, digits))
  }

  return (
    <Input
      type="tel"
      inputMode="numeric"
      maxLength={() => preset().format.length}
      invalid={local.invalid}
      disabled={local.disabled}
      placeholder={placeholder}
      prefix={() => {
        const cc = read(local.countryCode)
        return cc ? <span className={countryCodeClass}>{cc}</span> : null
      }}
      value={() => applyFormat(read(local.value), preset().format)}
      onInput={handleInput}
      {...rest}
    />
  )
}

export default PhoneInput
export { PhoneInput }
