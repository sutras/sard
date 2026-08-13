import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Picker from './picker.vue'

export const Picker: EnhancedComponent<typeof _Picker> = enhanceComponent(_Picker)
export default Picker

export type { PickerProps, PickerEmits } from './common'
