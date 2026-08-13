import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Empty from './empty.vue'

export const Empty: EnhancedComponent<typeof _Empty> = enhanceComponent(_Empty)
export default Empty

export type { EmptyProps, EmptySlots } from './common'
