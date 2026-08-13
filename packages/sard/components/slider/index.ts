import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Slider from './slider.vue'

export const Slider: EnhancedComponent<typeof _Slider> = enhanceComponent(_Slider)
export default Slider

export type { SliderProps, SliderSlots, SliderEmits } from './common'
