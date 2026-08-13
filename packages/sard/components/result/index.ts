import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Result from './result.vue'

export const Result: EnhancedComponent<typeof _Result> = enhanceComponent(_Result)
export default Result

export type { ResultProps, ResultSlots } from './common'
