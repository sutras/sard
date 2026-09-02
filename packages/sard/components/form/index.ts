import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Form from './form.vue'
import _FormItem from './form-item.vue'

export const Form: EnhancedComponent<typeof _Form> = enhanceComponent(_Form)
export const FormItem: EnhancedComponent<typeof _FormItem> = enhanceComponent(_FormItem)
export default Form

export {
  type FormRules,
  type FieldName,
  type ValidateState,
  type TriggerType,
  type FieldValidateError,
  type FormProps,
  type FormSlots,
  type FormExpose,
  type FormItemProps,
  type FormItemSlots,
  type FormItemExpose,
  type FormContext,
  type FormItemContext,
  useFormContext,
  useFormItemContext,
} from './common'

export { useFormItem } from './useFormItem'

export {
  CancelError,
  isCancelError,
  type ValidateContext,
  type ValidateMessages,
  type ValidateOptions,
  type Rule,
} from './Validator'
