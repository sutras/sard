import { inject, provide, type InjectionKey } from 'vue'

export interface SwiperNestedParentContext {}

const SWIPER_NESTED_KEY: InjectionKey<SwiperNestedParentContext> = Symbol('swiperNested')

export function useSwiperNested() {
  const nestedParentContext = inject(SWIPER_NESTED_KEY, null)

  provide(SWIPER_NESTED_KEY, {})

  return {
    nestedParentContext,
  }
}
