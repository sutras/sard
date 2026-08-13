import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Rate from './rate.vue'

export const Rate: EnhancedComponent<typeof _Rate> = enhanceComponent(_Rate)
export default Rate

export type { RateProps, RateEmits } from './common'
