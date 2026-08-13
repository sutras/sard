import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Tag from './tag.vue'

export const Tag: EnhancedComponent<typeof _Tag> = enhanceComponent(_Tag)
export default Tag

export type { TagProps, TagSlots, TagEmits } from './common'
