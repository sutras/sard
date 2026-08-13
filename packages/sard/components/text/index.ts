import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Text from './text.vue'

export const Text: EnhancedComponent<typeof _Text> = enhanceComponent(_Text)
export default Text

export type { TextProps, TextSlots, TextEmits } from './common'
