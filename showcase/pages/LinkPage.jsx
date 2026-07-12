import Link from '../../src/components/Link.jsx'

function LinkPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Content</p>
        <h1>Link</h1>
        <p className='hero-copy'>
          A styled anchor element. All native <span className='tag'>&lt;a&gt;</span> props pass through.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Basic</p>
        <p style={{ fontSize: '14px' }}>
          This is a <Link href='#'>text link</Link> inside a paragraph.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>External</p>
        <p style={{ fontSize: '14px' }}>
          <Link href='https://example.com' target='_blank' rel='noopener noreferrer'>
            External link
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LinkPage
