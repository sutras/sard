import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Watermark from './watermark.vue'

export const Watermark: EnhancedComponent<typeof _Watermark> = enhanceComponent(_Watermark)
export default Watermark

export type { WatermarkProps, WatermarkSlots, WatermarkEmits, WatermarkExpose } from './common'
