import { ref, watch, type Ref } from 'vue'
import type { SwiperSlideData } from './useSwiperData'
import { useResizeObserver } from '../../use'

export function useSwiperAutoHeight(
  rootRef: Ref<HTMLElement | null>,
  slides: Ref<SwiperSlideData[]>,
  activeIndex: Ref<number>,
  slidesPerGroup: Ref<number>,
  enabled: () => boolean,
) {
  const activeSlideEl = ref<HTMLElement | null>(null)

  useResizeObserver(activeSlideEl, (size) => {
    rootRef.value!.style.setProperty('--swiper-height', size.height + 'px')
  })

  watch(
    [slides, enabled, rootRef, activeIndex, slidesPerGroup],
    () => {
      if (enabled()) {
        const index = activeIndex.value * slidesPerGroup.value
        slides.value.forEach((slide, i) => {
          if (i === index) {
            activeSlideEl.value = slide.el
          }
        })
      }
    },
    {
      flush: 'post',
    },
  )
}
