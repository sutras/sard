import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _BackTop from './back-top.vue'

export const BackTop: EnhancedComponent<typeof _BackTop> = enhanceComponent(_BackTop)
export default BackTop

export type { BackTopProps, BackTopSlots, BackTopEmits } from './common'

export { usePageBackTop } from './usePageBackTop'
export { useElementBackTop } from './useElementBackTop'
