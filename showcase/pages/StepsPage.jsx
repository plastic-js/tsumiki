import { createSignal } from '@plastic-js/plastic'
import Steps from '../../src/components/Steps.jsx'

function StepsPage(){
  const horizontalSignal = createSignal(0)
  const verticalSignal = createSignal(0)
  const twoStepSignal = createSignal(0)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Navigation</p>
        <h1>Steps</h1>
        <p className='hero-copy'>
          A multi-step workflow indicator with progress tracking. Supports
          horizontal and vertical layouts with data-driven
          <span className='tag'>items</span> configuration.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Horizontal (Default)</p>
        <Steps
          value={horizontalSignal}
          onValueChange={horizontalSignal}
          items={[
            { title: 'Welcome', content: <p>Step 1: Welcome to the setup wizard.</p> },
            { title: 'Details', content: <p>Step 2: Enter your account details here.</p> },
            { title: 'Review', content: <p>Step 3: Review and confirm your settings.</p> },
          ]}
          completedContent={<p>All steps complete!</p>}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Vertical</p>
        <Steps
          vertical
          value={verticalSignal}
          onValueChange={verticalSignal}
          items={[
            { title: 'Getting Started', content: <p>Read the introduction and prerequisites for getting started.</p> },
            { title: 'Installation', content: <p>Follow the installation guide to set up the project.</p> },
            { title: 'Configuration', content: <p>Customize your configuration for production use.</p> },
            { title: 'Deploy', content: <p>Deploy your application to your chosen platform.</p> },
          ]}
          completedContent={<p>Setup complete. You&apos;re ready to go!</p>}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Two Steps</p>
        <Steps
          value={twoStepSignal}
          onValueChange={twoStepSignal}
          items={[
            { title: 'Shopping Cart', content: <p>Review items in your cart before proceeding.</p> },
            { title: 'Payment', content: <p>Enter payment details and place your order.</p> },
          ]}
          completedContent={<p>Order placed successfully!</p>}
        />
      </div>
    </div>
  )
}

export default StepsPage
