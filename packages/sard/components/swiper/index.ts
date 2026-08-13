import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Swiper from './swiper'
import _SwiperItem from './swiper-item'

export const Swiper: EnhancedComponent<typeof _Swiper> = enhanceComponent(_Swiper)
export const SwiperItem: EnhancedComponent<typeof _SwiperItem> = enhanceComponent(_SwiperItem)
export default Swiper

export { ADD_SWIPER_CONTEXT_KEY, REMOVE_SWIPER_CONTEXT_KEY, SWIPER_AUTO_HEIGHT_KEY } from './common'

export type {
  SwiperProps,
  SwiperSlots,
  SwiperEmits,
  SwiperExpose,
  SwiperItemProps,
  SwiperItemSlots,
  SwiperItemEmits,
  SwiperItemExpose,
} from './common'
