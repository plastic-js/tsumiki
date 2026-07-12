import { createSignal } from '@plastic-js/plastic'
import Pagination from '../../src/components/Pagination.jsx'

function PaginationPage(){
  const pageSignal = createSignal(3)

  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Navigation</p>
        <h1>Pagination</h1>
        <p className='hero-copy'>
          A page navigation control with numbered pages, prev/next triggers,
          and ellipsis for large page counts.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default (Many Pages)</p>
        <Pagination count={100} pageSize={10} siblingCount={2} defaultPage={5} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Few Pages (No Ellipsis)</p>
        <Pagination count={30} pageSize={10} defaultPage={1} />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Custom Prev/Next</p>
        <Pagination
          count={50}
          pageSize={10}
          defaultPage={2}
          prevChildren={(
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          )}
          nextChildren={(
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        />
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Controlled Page</p>
        <div className='demo-check-row' style={{ gap: '12px' }}>
          <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>Page</span>
            <input className='demo-select' max='10' min='1' onChange={e => pageSignal(Number(e.target.value))} style='width:60px' type='number' value={pageSignal()} />
            <span style={{ fontSize: '12px', color: 'var(--tsu-neutral-11)' }}>of 10</span>
          </label>
        </div>
        <div style={{ marginTop: '12px' }}>
          <Pagination count={100} pageSize={10} page={pageSignal} onPageChange={e => pageSignal(e.page)} />
        </div>
      </div>
    </div>
  )
}

export default PaginationPage
