import Card from '../../src/components/Card.jsx'

function CardPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Content</p>
        <h1>Card</h1>
        <p className='hero-copy'>
          A simple container with background and border-radius
          for grouping content. Style it with the <span className='tag'>style</span> prop.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <Card style={{ padding: '16px', fontSize: '14px' }}>
          This is a card with some content.
        </Card>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>With Shadow</p>
        <Card style={{ padding: '16px', boxShadow: 'var(--tsu-shadow-lg)', fontSize: '14px' }}>
          Card with a shadow applied via style prop.
        </Card>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Border</p>
        <Card style={{ padding: '16px', border: '1px solid var(--tsu-neutral-7)', fontSize: '14px' }}>
          Card with an outline border.
        </Card>
      </div>
    </div>
  )
}

export default CardPage
