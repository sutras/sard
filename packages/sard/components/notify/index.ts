import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Notify from './notify.vue'

export const Notify: EnhancedComponent<typeof _Notify> = enhanceComponent(_Notify)
export default Notify

export type { NotifyProps, NotifySlots, NotifyEmits, NotifyExpose } from './common'
export * from './imperative'
