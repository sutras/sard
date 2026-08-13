import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CropImage from './crop-image.vue'

export const CropImage: EnhancedComponent<typeof _CropImage> = enhanceComponent(_CropImage)
export default CropImage

export type { CropImageProps, CropImageSlots, CropImageEmits, CropImageExpose } from './common'
export * from './imperative'
