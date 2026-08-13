import type { PopperPosition } from '../../use'
import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Popover from './popover.vue'

export const Popover: EnhancedComponent<typeof _Popover> = enhanceComponent(_Popover)
export default Popover

export type { PopoverProps, PopoverSlots, PopoverEmits, ReferenceExpose } from './common'

export type PopoverPosition = PopperPosition
