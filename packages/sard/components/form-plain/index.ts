import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _FormPlain from './form-plain.vue'
import _FormItemPlain from './form-item-plain.vue'

export const FormPlain: EnhancedComponent<typeof _FormPlain> = enhanceComponent(_FormPlain)
export const FormItemPlain: EnhancedComponent<typeof _FormItemPlain> =
  enhanceComponent(_FormItemPlain)
export default FormPlain

export {
  type FormPlainProps,
  type FormPlainSlots,
  type FormPlainExpose,
  type FormItemPlainProps,
  type FormItemPlainSlots,
  type FormItemPlainExpose,
} from './common'
