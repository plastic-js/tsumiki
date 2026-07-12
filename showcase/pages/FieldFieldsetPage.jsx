import Field from '../../src/components/Field.jsx'
import Fieldset from '../../src/components/Fieldset.jsx'
import Input from '../../src/components/Input.jsx'

function FieldFieldsetPage(){

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Form</p>
        <h1>Field &amp; Fieldset</h1>
        <p className='hero-copy'>
          Form layout primitives. Field associates a label, input, and
          feedback text. Fieldset groups related controls under a legend.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Field with Label + Input</p>
        <Field label="Email">
          <Input placeholder='you@example.com' type='email' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Field with Error</p>
        <Field label="Password" error="Must be at least 8 characters">
          <Input placeholder='••••••••' type='password' invalid />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Field with Helper</p>
        <Field label="Username" helper="This will be your public display name.">
          <Input placeholder='Choose a username' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Field with Required Indicator</p>
        <Field label="Full Name" required>
          <Input placeholder='John Doe' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Field with Compact Layout</p>
        <Field label="Email" compact>
          <Input placeholder='you@example.com' type='email' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Compact with Helper</p>
        <Field label="Username" helper="Your unique identifier." compact>
          <Input placeholder='Choose a username' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Compact with Error</p>
        <Field label="Password" error="Too short" compact>
          <Input placeholder='••••••••' type='password' invalid />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom Label Content</p>
        <Field label={<span>Email <em style={{ color: 'var(--tsu-neutral-11)', fontStyle: 'normal' }}>(optional)</em></span>}>
          <Input placeholder='you@example.com' type='email' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom Error Content</p>
        <Field label="Password" error={<span>Too short — must be at least 8 characters</span>}>
          <Input placeholder='••••••••' type='password' invalid />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom Helper Content</p>
        <Field label="Username" helper={<span>Will be shown as <b>@username</b> publicly.</span>}>
          <Input placeholder='Choose a username' />
        </Field>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Fieldset with Legend + Helper</p>
        <Fieldset legend="Shipping Method" helper="Choose how you would like to receive your order.">
          <Field label="Standard">
            <Input placeholder='Standard shipping' disabled />
          </Field>
          <Field label="Express">
            <Input placeholder='Express shipping' />
          </Field>
        </Fieldset>
      </div>
    </div>
  )
}

export default FieldFieldsetPage
