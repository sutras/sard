import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Table from './table.vue'

export const Table: EnhancedComponent<typeof _Table> = enhanceComponent(_Table)
export default Table

export type { TableProps, TableSlots, TableColumnProps, TableHeaderColumn } from './common'
