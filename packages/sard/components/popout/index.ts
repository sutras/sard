import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Popout from './popout.vue'

export const Popout: EnhancedComponent<typeof _Popout> = enhanceComponent(_Popout)
export default Popout

export type { PopoutProps, PopoutSlots, PopoutEmits, PopoutBeforeClose } from './common'

export * from './useFormPopout'
