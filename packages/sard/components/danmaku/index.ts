import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Danmaku from './danmaku.vue'

export const Danmaku: EnhancedComponent<typeof _Danmaku> = enhanceComponent(_Danmaku)
export default Danmaku

export type { DanmakuProps, DanmakuSlots, DanmakuEmits, DanmakuExpose } from './common'
