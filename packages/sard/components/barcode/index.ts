import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Barcode from './barcode.vue'

export const Barcode: EnhancedComponent<typeof _Barcode> = enhanceComponent(_Barcode)
export default Barcode

export type { BarcodeProps, BarcodeEmits } from './common'
