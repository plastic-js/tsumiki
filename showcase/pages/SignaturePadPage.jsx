import SignaturePad, { ClearTrigger } from '../../src/components/SignaturePad.jsx'

function SignaturePadPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Data</p>
        <h1>SignaturePad</h1>
        <p className='hero-copy'>
          A drawing pad for capturing signatures via touch or mouse.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Draw your signature</p>
        <SignaturePad>
          <ClearTrigger />
        </SignaturePad>
      </div>
    </div>
  )
}

export default SignaturePadPage
