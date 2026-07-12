import { createSignal } from '@plastic-js/plastic'
import Tabs from '../../src/components/Tabs.jsx'

const textStyle = { fontSize: 'var(--tsu-font-size-sm)', color: 'var(--tsu-neutral-11)' }

function TabsPage(){
  const basicSignal = createSignal('account')
  const disabledSignal = createSignal('active')
  const controlledSignal = createSignal('billing')

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Navigation</p>
        <h1>Tabs</h1>
        <p className='hero-copy'>
          Tabbed content switching with an animated underline indicator.
          Pass <span className='tag'>triggers</span> as
          <span className='tag'>{'{ key, value, disabled? }'}</span> objects.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <Tabs
          triggers={[
            { key: 'account', value: 'Account' },
            { key: 'password', value: 'Password' },
            { key: 'billing', value: 'Billing' },
          ]}
          value={basicSignal}
          onValueChange={basicSignal}
        >
          <p style={textStyle}>Account settings and profile management.</p>
          <p style={textStyle}>Change your password and security preferences.</p>
          <p style={textStyle}>Manage your billing information and subscription.</p>
        </Tabs>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Disabled</p>
        <Tabs
          triggers={[
            { key: 'active', value: 'Active' },
            { key: 'locked', value: 'Locked', disabled: true },
            { key: 'archived', value: 'Archived' },
          ]}
          value={disabledSignal}
          onValueChange={disabledSignal}
        >
          <p style={textStyle}>Currently active items.</p>
          <p style={textStyle}>Locked items (requires upgrade).</p>
          <p style={textStyle}>Archived items from previous sessions.</p>
        </Tabs>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Controlled — value & onValueChange</p>
        <Tabs
          triggers={[
            { key: 'account', value: 'Account' },
            { key: 'billing', value: 'Billing' },
          ]}
          value={controlledSignal}
          onValueChange={controlledSignal}
        >
          <p style={textStyle}>Account settings.</p>
          <p style={textStyle}>Billing info.</p>
        </Tabs>
      </div>
    </div>
  )
}

export default TabsPage
