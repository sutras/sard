import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CascaderPopout from './cascader-popout.vue'

export const CascaderPopout: EnhancedComponent<typeof _CascaderPopout> =
  enhanceComponent(_CascaderPopout)
export default CascaderPopout

export type {
  CascaderPopoutProps,
  CascaderPopoutSlots,
  CascaderPopoutEmits,
  CascaderPopoutExpose,
} from './common'
