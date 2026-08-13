import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PreviewImage from './preview-image.vue'

export const PreviewImage: EnhancedComponent<typeof _PreviewImage> = enhanceComponent(_PreviewImage)
export default PreviewImage

export type {
  PreviewImageProps,
  PreviewImageSlots,
  PreviewImageEmits,
  PreviewImageExpose,
} from './common'

export * from './imperative'
