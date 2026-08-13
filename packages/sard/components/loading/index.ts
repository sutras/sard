import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Loading from './loading.vue'

export const Loading: EnhancedComponent<typeof _Loading> = enhanceComponent(_Loading)
export default Loading

export type { LoadingProps, LoadingSlots } from './common'
