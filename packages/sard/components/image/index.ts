import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Image from './image.vue'

export const Image: EnhancedComponent<typeof _Image> = enhanceComponent(_Image)
export default Image

export type { ImageProps, ImageSlots, ImageEmits, ImageExpose } from './common'
