import { type SwiperItemSlots, swiperItemProps } from './common'
import { createBem, defineSetupFnComponent } from '../../utils'
import { useSwiperItem } from './useSwiper'
import { watchPostEffect } from 'vue'

export default defineSetupFnComponent(
  (_props, { slots }) => {
    const bem = createBem('swiper')

    const {
      elRef,
      member,
      context: { vertical, spaceBetween, autoHeight },
    } = useSwiperItem()

    watchPostEffect(() => {
      const el = elRef.value
      if (el) {
        el.style.setProperty('--swiper-item-offset-raw', member.offset + 'px')
        el.style.setProperty('--swiper-item-size', member.size + 'px')
        el.style.setProperty('--swiper-item-margin', spaceBetween.value + 'px')
      }
    })

    return () => {
      return (
        <div
          ref={elRef}
          class={[
            bem.e('item'),
            bem.is('vertical', vertical.value),
            bem.is('auto-height', autoHeight.value),
          ]}
        >
          {slots.default && slots.default()}
        </div>
      )
    }
  },
  {
    name: 'SwiperItem',
    props: swiperItemProps,
    slots: null as unknown as SwiperItemSlots,
  },
)
