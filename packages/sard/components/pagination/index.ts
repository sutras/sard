import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Pagination from './pagination.vue'

export const Pagination: EnhancedComponent<typeof _Pagination> = enhanceComponent(_Pagination)
export default Pagination

export type { PaginationProps, PaginationSlots, PaginationEmits } from './common'
