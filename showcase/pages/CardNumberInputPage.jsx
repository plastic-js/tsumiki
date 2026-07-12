import { createSignal } from '@plastic-js/plastic'
import CardNumberInput from '../../src/components/CardNumberInput.jsx'

function CardNumberInputPage(){
  const valueSignal = createSignal('4111111111111111')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>CardNumberInput</h1>
        <p className='hero-copy'>
          A credit card number input with 4-digit grouping and numeric
          filtering. Renders as XXXX-XXXX-XXXX-XXXX format.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Filled</p>
        <CardNumberInput value={valueSignal} onValueChange={v => valueSignal(v)} />
        <div className='demo-value'>Raw digits: {() => valueSignal()}</div>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Empty</p>
        <CardNumberInput onValueChange={()=>{}} placeholder='0000-0000-0000-0000' value='' />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Invalid</p>
        <CardNumberInput invalid value='1234567890123456' onValueChange={()=>{}} />
      </div>
    </div>
  )
}

export default CardNumberInputPage
