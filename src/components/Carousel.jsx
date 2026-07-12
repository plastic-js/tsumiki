import {
  CarouselRoot,
  CarouselControl,
  CarouselItemGroup,
  CarouselItem,
  CarouselIndicatorGroup,
  CarouselIndicator,
  CarouselAutoplayTrigger,
  CarouselProgressText,
  CarouselPrevTrigger as ArkCarouselPrevTrigger,
  CarouselNextTrigger as ArkCarouselNextTrigger,
  useCarouselContext,
  ark,
  mergeProps,
} from '@plastic-js/ark'

const slideBy = (btnEl, direction) => {
  const root = btnEl.closest('[data-part="root"]')
  const group = root?.querySelector('[data-part="item-group"]')
  if (!group) return
  const pageWidth = group.offsetWidth
  const currentPage = Math.round(group.scrollLeft / pageWidth)
  const totalSlides = root.querySelectorAll('[data-part="item"]').length
  const nextPage = direction === 'next'
    ? (currentPage + 1) % totalSlides
    : currentPage > 0 ? currentPage - 1 : totalSlides - 1
  group.scrollTo({ left: nextPage * pageWidth, behavior: 'smooth' })
  return nextPage
}

const syncAfterScroll = (group, api, expectedPage) => {
  const pageWidth = group.offsetWidth
  api.scrollTo(expectedPage, true)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      group.scrollTo({ left: expectedPage * pageWidth, behavior: 'instant' })
    })
  })
}

const CarouselPrevTrigger = (props = {}) => {
  const carouselApi = useCarouselContext()
  const handleClick = (e) => {
    e.stopPropagation()
    const nextPage = slideBy(e.currentTarget, 'prev')
    if (nextPage == null) return
    const root = e.currentTarget.closest('[data-part="root"]')
    const group = root.querySelector('[data-part="item-group"]')
    const api = carouselApi()
    setTimeout(() => syncAfterScroll(group, api, nextPage), 400)
  }
  return ark.button(mergeProps(() => carouselApi().getPrevTriggerProps(), { ...props, onClick: handleClick }))
}

const CarouselNextTrigger = (props = {}) => {
  const carouselApi = useCarouselContext()
  const handleClick = (e) => {
    e.stopPropagation()
    const nextPage = slideBy(e.currentTarget, 'next')
    if (nextPage == null) return
    const root = e.currentTarget.closest('[data-part="root"]')
    const group = root.querySelector('[data-part="item-group"]')
    const api = carouselApi()
    setTimeout(() => syncAfterScroll(group, api, nextPage), 400)
  }
  return ark.button(mergeProps(() => carouselApi().getNextTriggerProps(), { ...props, onClick: handleClick }))
}

CarouselRoot.origin = {
  Root: CarouselRoot,
  Control: CarouselControl,
  ItemGroup: CarouselItemGroup,
  Item: CarouselItem,
  PrevTrigger: ArkCarouselPrevTrigger,
  NextTrigger: ArkCarouselNextTrigger,
  IndicatorGroup: CarouselIndicatorGroup,
  Indicator: CarouselIndicator,
  AutoplayTrigger: CarouselAutoplayTrigger,
  ProgressText: CarouselProgressText,
}

export default CarouselRoot
export {
  CarouselRoot as Carousel,
  CarouselControl,
  CarouselItemGroup,
  CarouselItem,
  CarouselPrevTrigger,
  CarouselNextTrigger,
  CarouselIndicatorGroup,
  CarouselIndicator,
  CarouselAutoplayTrigger,
  CarouselProgressText,
}
