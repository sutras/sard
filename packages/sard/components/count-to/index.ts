import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CountTo from './count-to.vue'

export const CountTo: EnhancedComponent<typeof _CountTo> = enhanceComponent(_CountTo)
export default CountTo

export type { CountToProps } from './common'
