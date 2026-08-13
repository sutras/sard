import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Cascader from './cascader.vue'

export const Cascader: EnhancedComponent<typeof _Cascader> = enhanceComponent(_Cascader)
export default Cascader

export type {
  CascaderOption,
  CascaderProps,
  CascaderSlots,
  CascaderEmits,
  CascaderValue,
  CascaderStateNode,
} from './common'
