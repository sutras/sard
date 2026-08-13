import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _ReadMore from './read-more.vue'

export const ReadMore: EnhancedComponent<typeof _ReadMore> = enhanceComponent(_ReadMore)
export default ReadMore

export type { ReadMoreProps, ReadMoreSlots, ReadMoreEmits, ReadMoreExpose } from './common'
