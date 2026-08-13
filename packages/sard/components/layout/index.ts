import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Row from './row.vue'
import _Col from './col.vue'

export const Row: EnhancedComponent<typeof _Row> = enhanceComponent(_Row)
export const Col: EnhancedComponent<typeof _Col> = enhanceComponent(_Col)

export type { RowProps, RowSlots, ColProps, ColSlots } from './common'
