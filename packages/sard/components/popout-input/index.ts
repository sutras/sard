import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PopoutInput from './popout-input.vue'

export const PopoutInput: EnhancedComponent<typeof _PopoutInput> = enhanceComponent(_PopoutInput)
export default PopoutInput

export type { PopoutInputProps, PopoutInputEmits } from './common'

export * from './usePopoutInput'
