import { createSignal } from '@plastic-js/plastic'
import Accordion, {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../src/components/Accordion.jsx'

function AccordionPage(){
  const multiSignal = createSignal(false)
  const singleValue = createSignal(['faq-1'])
  const multiValue = createSignal(['item-1', 'item-2'])
  const disabledValue = createSignal(['d-1'])

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>Accordion</h1>
        <p className='hero-copy'>
          A vertically stacked set of collapsible sections. Supports
          <span className='tag'>Accordion</span>
          <span className='tag'>AccordionItem</span>
          <span className='tag'>AccordionTrigger</span> and
          <span className='tag'>AccordionContent</span> sub-components.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default (Single Open)</p>
        <Accordion value={singleValue} onValueChange={v => singleValue(v.value)}>
          <AccordionItem value='faq-1'>
            <AccordionTrigger>What is Tsumiki?</AccordionTrigger>
            <AccordionContent>
              Tsumiki is a mobile-first UI component library for Plastic JS, providing accessible and customizable interface components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='faq-2'>
            <AccordionTrigger>How do I install it?</AccordionTrigger>
            <AccordionContent>
              You can install Tsumiki via npm or yarn. Run <code>npm install @plastic-js/tsumiki</code> to get started.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='faq-3'>
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes, Tsumiki is built with accessibility in mind. All components follow WAI-ARIA patterns and are keyboard navigable.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Multiple Items Open</p>
        <p style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)', marginBottom: '12px' }}>
          Allow multiple sections to be expanded simultaneously with <span className='tag'>multiple</span>.
        </p>
        <Accordion multiple value={multiValue} onValueChange={v => multiValue(v.value)}>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Section One</AccordionTrigger>
            <AccordionContent>
              Content for section one. This section starts expanded.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Section Two</AccordionTrigger>
            <AccordionContent>
              Content for section two. This section also starts expanded.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>Section Three</AccordionTrigger>
            <AccordionContent>
              Content for section three. Click to expand this one.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Disabled Item</p>
        <Accordion value={disabledValue} onValueChange={v => disabledValue(v.value)}>
          <AccordionItem value='d-1'>
            <AccordionTrigger>Available</AccordionTrigger>
            <AccordionContent>This item is interactive.</AccordionContent>
          </AccordionItem>
          <AccordionItem value='d-2'>
            <AccordionTrigger disabled>Coming Soon</AccordionTrigger>
            <AccordionContent>This content cannot be accessed.</AccordionContent>
          </AccordionItem>
          <AccordionItem value='d-3'>
            <AccordionTrigger>Also Available</AccordionTrigger>
            <AccordionContent>This item is also interactive.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default AccordionPage
