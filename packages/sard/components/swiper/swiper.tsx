import { createBem, defineSetupFnComponent, flatVNode } from '../../utils'
import {
  swiperProps,
  type SwiperEmits,
  type SwiperSlots,
  type SwiperContext,
  type AddSwiperContext,
  type RemoveSwiperContext,
} from './common'
import { useSwiper } from './useSwiper'

export type { SwiperContext, AddSwiperContext, RemoveSwiperContext }

export default defineSetupFnComponent(
  (props, { slots, emit }) => {
    const bem = createBem('swiper')

    const {
      rootRef,
      wrapperRef,
      activeIndex,
      pageCount,
      setSwiperItems,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onPointerDown,
    } = useSwiper(props, emit)

    return () => {
      const defaultSlots = slots.default && slots.default()
      setSwiperItems(flatVNode(defaultSlots))

      return (
        <div
          ref={rootRef}
          class={[
            bem.b(),
            bem.m('vertical', props.vertical),
            bem.is('auto-height', props.autoHeight),
          ]}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
          onPointerdown={onPointerDown}
        >
          <div ref={wrapperRef} class={[bem.e('wrapper'), bem.is('vertical', props.vertical)]}>
            {defaultSlots}
          </div>
          {props.showIndicator && (
            <div class={[bem.e('dots'), bem.is('vertical', props.vertical)]}>
              {Array(pageCount.value)
                .fill(0)
                .map((_, index) => (
                  <div class={[bem.e('dot'), bem.is('active', activeIndex.value === index)]}></div>
                ))}
            </div>
          )}
        </div>
      )
    }
  },
  {
    name: 'Swiper',
    props: swiperProps,
    emits: [
      'change',
      'transition',
      'animationfinish',
      'update:modelValue',
    ] as unknown as SwiperEmits,
    slots: null as unknown as SwiperSlots,
  },
)
