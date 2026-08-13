import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CascaderInput from './cascader-input.vue'

export const CascaderInput: EnhancedComponent<typeof _CascaderInput> =
  enhanceComponent(_CascaderInput)
export default CascaderInput

export type { CascaderInputProps, CascaderInputSlots, CascaderInputEmits } from './common'
