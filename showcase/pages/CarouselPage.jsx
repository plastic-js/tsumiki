import Carousel, {
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
} from '../../src/components/Carousel.jsx'

function CarouselPage(){
  return (
    <div className='container'>
      <div className='hero'>
        <p className='eyebrow'>Layout</p>
        <h1>Carousel</h1>
        <p className='hero-copy'>
          A horizontal carousel for browsing slides. Built on
          <span className='tag'>Carousel</span>
          <span className='tag'>CarouselItemGroup</span>
          <span className='tag'>CarouselItem</span> and
          <span className='tag'>CarouselControl</span> sub-components.
        </p>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Default</p>
        <Carousel
 slideCount={5} slidesPerView={1} loop>
          <CarouselItemGroup>
            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'].map((color, i) => (
              <CarouselItem key={i} index={i}>
                <div style={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: color,
                  borderRadius: 'var(--tsu-radius-l2-md)',
                  fontSize: 'var(--tsu-comp-font-size-md)',
                  color: '#fff',
                  fontWeight: 600,
                }}>
                  Slide {i + 1}
                </div>
              </CarouselItem>
            ))}
          </CarouselItemGroup>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            <CarouselPrevTrigger>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </CarouselPrevTrigger>
            <CarouselNextTrigger>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                <path d="M9 18l6-6-6-6" />
              </svg>
            </CarouselNextTrigger>
          </div>
          <CarouselIndicatorGroup style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselIndicator key={i} index={i}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '9999px',
                  background: 'var(--tsu-neutral-7)',
                }} />
              </CarouselIndicator>
            ))}
          </CarouselIndicatorGroup>
        </Carousel>
      </div>

      <div className='feature-card'>
        <p className='demo-label'>Auto-play with Controls</p>
        <Carousel
 slideCount={3} loop autoplay autoplayInterval={3000}>
          <CarouselItemGroup>
            {[
              { label: 'Summer Sale', bg: '#E17055' },
              { label: 'Free Shipping', bg: '#00B894' },
              { label: 'New Arrivals', bg: '#0984E3' },
            ].map((item, i) => (
              <CarouselItem key={i} index={i}>
                <div style={{
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: item.bg,
                  borderRadius: 'var(--tsu-radius-l2-md)',
                  fontSize: '18px',
                  color: '#fff',
                  fontWeight: 600,
                }}>
                  {item.label}
                </div>
              </CarouselItem>
            ))}
          </CarouselItemGroup>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            <CarouselPrevTrigger>
              <span style={{ fontSize: '20px', lineHeight: 1 }}>‹</span>
            </CarouselPrevTrigger>
            <CarouselNextTrigger>
              <span style={{ fontSize: '20px', lineHeight: 1 }}>›</span>
            </CarouselNextTrigger>
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselPage
