import type { ClassValue, CSSProperties, InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

// ============================ table ============================
export interface TableProps<T = any> {
  columns?: TableColumnProps<T>[]
  data?: T[]
  height?: string | number
  maxHeight?: string | number
  striped?: boolean
  bordered?: boolean
  underlined?: boolean
  size?: 'small' | 'medium' | 'large'
  showHeader?: boolean
  rowClassName?: ClassValue | ((data: { row: T; rowIndex: number }) => ClassValue)
  rowStyle?: CSSProperties | ((data: { row: T; rowIndex: number }) => CSSProperties)
  cellClassName?:
    | ClassValue
    | ((data: {
        row: T
        column: TableColumnProps<T>
        rowIndex: number
        columnIndex: number
      }) => ClassValue)
  cellStyle?:
    | CSSProperties
    | ((data: {
        row: T
        column: TableColumnProps<T>
        rowIndex: number
        columnIndex: number
      }) => CSSProperties)
  headerRowClassName?:
    | ClassValue
    | ((data: { row: TableHeaderColumn[]; rowIndex: number }) => ClassValue)
  headerRowStyle?:
    | CSSProperties
    | ((data: { row: TableHeaderColumn[]; rowIndex: number }) => CSSProperties)
  headerCellClassName?:
    | ClassValue
    | ((data: {
        row: TableHeaderColumn[]
        rowIndex: number
        column: TableColumnProps<T>
        columnIndex: number
      }) => ClassValue)
  headerCellStyle?:
    | CSSProperties
    | ((data: {
        row: TableHeaderColumn[]
        rowIndex: number
        column: TableColumnProps<T>
        columnIndex: number
      }) => CSSProperties)
  spanMethod?: (data: {
    row: T
    rowIndex: number
    column: TableColumnProps<T>
    columnIndex: number
  }) => [number, number] | { rowspan: number; colspan: number } | void
}

export const defaultTableProps: DefaultProps<TableProps> = {
  columns: () => [],
  data: () => [],
  showHeader: true,
}

export interface TableSlots {
  default?(props: Record<string, never>): any
  /** Dynamic named slots keyed by column.slot for custom cell rendering. */
  [columnSlot: string]: ((props: any) => any) | undefined
}

export interface TableContext {}

export const tableContextKey = Symbol('tableContext') as InjectionKey<TableContext>

// ============================ table-column ============================
export interface TableColumnProps<T = any> {
  label?: string
  prop?: keyof T | (string & {})
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | 'start' | 'end'
  renderHeader?: (data: { column: TableColumnProps<T>; index: number }) => any
  formatter?: (data: {
    row: T
    column: TableColumnProps<T>
    rowIndex: number
    columnIndex: number
  }) => any
  /** Named slot for custom cell rendering in the parent template. */
  slot?: string
  align?: 'start' | 'center' | 'end'
  headerAlign?: 'start' | 'center' | 'end'
  className?: string
  columns?: TableColumnProps[]
  /**
   * @private
   */
  fixedFirst?: boolean
  /**
   * @private
   */
  fixedLast?: boolean
}

// ============================ table-col ============================

export interface TableColProps {
  index: number
  column: TableColumnProps
}

export interface TableHeaderColumn {
  column: TableColumnProps<any>
  rowspan: number
  colspan: number
  left: number
  right: number
}
