<template>
  <div :class="tableClass">
    <div :class="bem.e('wrapper')">
      <div ref="scroll" :class="bem.e('scroll')">
        <table>
          <colgroup>
            <TableCol
              v-for="(column, index) in leafColumns"
              :key="index"
              :index="index"
              :column="column"
            />
          </colgroup>
          <thead v-if="showHeader" :class="bem.e('header')">
            <tr
              v-for="(row, rowIndex) in headerRows"
              :class="getHeaderRowClassName(row, rowIndex)"
              :style="getHeaderRowStyle(row, rowIndex)"
            >
              <th
                v-for="({ column, rowspan, colspan, left, right }, columnIndex) in row"
                :key="columnIndex"
                :rowspan="rowspan"
                :colspan="colspan"
                :style="getHeaderCellStyle(row, rowIndex, column, columnIndex, left, right)"
                :class="getHeaderCellClassName(row, rowIndex, column, columnIndex, left, right)"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody :class="bem.e('body')">
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              :class="getBodyRowClassName(row, rowIndex)"
              :style="getBodyRowStyle(row, rowIndex)"
            >
              <td
                v-for="(cell, columnIndex) in bodyCells[rowIndex]"
                :key="columnIndex"
                v-show="cell.render"
                :rowspan="cell.rowspan || undefined"
                :colspan="cell.colspan || undefined"
                :style="getCellStyle(cell.row, cell.rowIndex, cell.column, cell.columnIndex)"
                :class="getCellClassName(cell.row, cell.rowIndex, cell.column, cell.columnIndex)"
              >
                <slot
                  v-if="cell.column.slot && $slots[cell.column.slot]"
                  :name="cell.column.slot"
                  :row="cell.row"
                  :column="cell.column"
                  :row-index="cell.rowIndex"
                  :column-index="cell.columnIndex"
                />
                <component
                  v-else-if="cell.column.formatter"
                  :is="
                    () =>
                      cell.column.formatter!({
                        row: cell.row,
                        rowIndex: cell.rowIndex,
                        column: cell.column,
                        columnIndex: cell.columnIndex,
                      })
                  "
                />
                <template v-else>
                  {{ cell.column.prop && cell.row[cell.column.prop as keyof T] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, provide, reactive, useTemplateRef, type CSSProperties } from 'vue'
import { createBem, getLeafNodes, isFunction, mapTreeToGrid } from '../../utils'
import {
  type TableProps,
  type TableSlots,
  tableContextKey,
  defaultTableProps,
  type TableColumnProps,
  type TableHeaderColumn,
} from './common'
import { useColumnProvide } from './useColumn'
import TableCol from './table-col.vue'
import { useScrollSide } from '../../use'

const props = withDefaults(defineProps<TableProps<T>>(), defaultTableProps)

defineSlots<TableSlots>()

const bem = createBem('table')

provide(tableContextKey, reactive({}))

// ============================ column ============================

const isFixedStart = (col: TableColumnProps) => {
  return col.fixed === true || col.fixed === 'start'
}

const isFixedEnd = (col: TableColumnProps) => {
  return col.fixed === 'end'
}

const getAlignStyle = (column: TableColumnProps, isHeader?: boolean) => {
  const style: CSSProperties = {}
  if (column.align) {
    if (isHeader && column.headerAlign) {
      style.textAlign = column.headerAlign
    } else {
      style.textAlign = column.align
    }
  }
  return style
}

const processedColumns = computed(() => {
  const propagateFixed = (
    cols: TableColumnProps[],
    parentFixed?: TableColumnProps['fixed'],
  ): TableColumnProps[] => {
    return cols.map((col) => {
      const fixed = col.fixed || parentFixed || false
      const processed: TableColumnProps = { ...col, fixed }
      if (col.columns) {
        processed.columns = propagateFixed(col.columns, fixed)
      }
      return processed
    })
  }
  return propagateFixed(props.columns)
})

const headerRows = computed(() => {
  return mapTreeToGrid(
    processedColumns.value,
    (column, rowspan, colspan, left, right): TableHeaderColumn => {
      return {
        column,
        rowspan,
        colspan,
        left,
        right,
      }
    },
    'columns',
  )
})

const leafColumns = computed(() => {
  const leafs = getLeafNodes(processedColumns.value, 'columns')

  let firstFixedStart = -1
  let lastFixedStart = -1
  let firstFixedEnd = -1
  let lastFixedEnd = -1

  leafs.forEach((col, i) => {
    if (isFixedStart(col)) {
      if (firstFixedStart === -1) firstFixedStart = i
      lastFixedStart = i
    } else if (isFixedEnd(col)) {
      if (firstFixedEnd === -1) firstFixedEnd = i
      lastFixedEnd = i
    }
  })

  return leafs.map((col, i) => ({
    ...col,
    fixedFirst: isFixedEnd(col) && i === firstFixedEnd,
    fixedLast: isFixedStart(col) && i === lastFixedStart,
  }))
})

const { cols } = useColumnProvide<T>()

// ========================== span ==========================

interface BodyCell<T> {
  row: T
  column: TableColumnProps
  rowIndex: number
  columnIndex: number
  rowspan: number
  colspan: number
  render: boolean
}

const bodyCells = computed<BodyCell<T>[][]>(() => {
  const data = props.data || []
  const columns = leafColumns.value as TableColumnProps[]
  const rowCount = data.length
  const colCount = columns.length

  if (!rowCount || !colCount) return []

  if (!props.spanMethod) {
    return data.map((row, ri) =>
      columns.map((col, ci) => ({
        row,
        column: col,
        rowIndex: ri,
        columnIndex: ci,
        rowspan: 1,
        colspan: 1,
        render: true,
      })),
    )
  }

  const covered = new Set<string>()
  const result: BodyCell<T>[][] = []

  for (let ri = 0; ri < rowCount; ri++) {
    const rowCells: BodyCell<T>[] = []
    for (let ci = 0; ci < colCount; ci++) {
      if (covered.has(`${ri},${ci}`)) {
        rowCells.push({
          row: data[ri],
          column: columns[ci],
          rowIndex: ri,
          columnIndex: ci,
          rowspan: 0,
          colspan: 0,
          render: false,
        })
        continue
      }

      let rowspan = 1
      let colspan = 1
      const span = props.spanMethod({
        row: data[ri],
        rowIndex: ri,
        column: columns[ci],
        columnIndex: ci,
      })

      if (Array.isArray(span)) {
        ;[rowspan, colspan] = span
      } else if (span) {
        rowspan = span.rowspan
        colspan = span.colspan
      }

      // Mark spanned cells as covered
      for (let r = ri; r < ri + rowspan && r < rowCount; r++) {
        for (let c = ci; c < ci + colspan && c < colCount; c++) {
          if (r !== ri || c !== ci) {
            covered.add(`${r},${c}`)
          }
        }
      }

      rowCells.push({
        row: data[ri],
        column: columns[ci],
        rowIndex: ri,
        columnIndex: ci,
        rowspan,
        colspan,
        render: true,
      })
    }
    result.push(rowCells)
  }

  return result
})

const getHeaderRowClassName = (row: TableHeaderColumn[], rowIndex: number) => {
  return isFunction(props.headerRowClassName)
    ? props.headerRowClassName({
        row,
        rowIndex,
      })
    : props.headerRowClassName
}

const getHeaderRowStyle = (row: TableHeaderColumn[], rowIndex: number) => {
  return isFunction(props.headerRowStyle)
    ? props.headerRowStyle({
        row,
        rowIndex,
      })
    : props.headerRowStyle
}

const getHeaderCellStyle = (
  row: TableHeaderColumn[],
  rowIndex: number,
  column: TableColumnProps,
  columnIndex: number,
  left: number,
  right: number,
) => {
  const style: CSSProperties = {}

  if (column.fixed) {
    const isStart = isFixedStart(column)
    const spanCols = isStart ? cols.slice(0, left) : cols.slice(right)
    const offset = spanCols.reduce((total, member) => total + member.width, 0)

    style[isStart ? 'insetInlineStart' : 'insetInlineEnd'] = offset + 'px'
  }

  return [
    style,
    getAlignStyle(column, true),
    isFunction(props.headerCellStyle)
      ? props.headerCellStyle({
          row,
          rowIndex,
          column,
          columnIndex,
        })
      : props.headerCellStyle,
  ]
}

const getHeaderCellClassName = (
  row: TableHeaderColumn[],
  rowIndex: number,
  column: TableColumnProps,
  columnIndex: number,
  left: number,
  right: number,
) => {
  const spannedCols = leafColumns.value.slice(left, right)
  const isFirst = spannedCols.some((col) => col.fixedFirst)
  const isLast = spannedCols.some((col) => col.fixedLast)
  const isFixed = spannedCols.some((col) => col.fixed)

  return [
    bem.e('cell'),
    bem.is('first', isFirst),
    bem.is('last', isLast),
    bem.is('fixed', isFixed),
    isFunction(props.headerCellClassName)
      ? props.headerCellClassName({
          row,
          rowIndex,
          column,
          columnIndex,
        })
      : props.headerCellClassName,
  ]
}

const getBodyRowClassName = (row: T, rowIndex: number) => {
  return isFunction(props.rowClassName)
    ? props.rowClassName({
        row,
        rowIndex,
      })
    : props.rowClassName
}

const getBodyRowStyle = (row: T, rowIndex: number) => {
  return isFunction(props.rowStyle)
    ? props.rowStyle({
        row,
        rowIndex,
      })
    : props.rowStyle
}

const getCellStyle = (row: T, rowIndex: number, column: TableColumnProps, columnIndex: number) => {
  const style: CSSProperties = {}

  if (column.fixed) {
    const isStart = isFixedStart(column)
    const spanCols = isStart ? cols.slice(0, columnIndex) : cols.slice(columnIndex + 1)
    const offset = spanCols.reduce((total, member) => total + member.width, 0)
    style[isStart ? 'insetInlineStart' : 'insetInlineEnd'] = offset + 'px'
  }

  return [
    style,
    getAlignStyle(column),
    isFunction(props.cellStyle)
      ? props.cellStyle({
          row,
          rowIndex,
          column,
          columnIndex,
        })
      : props.cellStyle,
  ]
}

const getCellClassName = (
  row: T,
  rowIndex: number,
  column: TableColumnProps,
  columnIndex: number,
) => {
  return [
    bem.e('cell'),
    bem.is('first', column.fixedFirst),
    bem.is('last', column.fixedLast),
    bem.is('fixed', column.fixed),
    isFunction(props.cellClassName)
      ? props.cellClassName({
          row,
          rowIndex,
          column,
          columnIndex,
        })
      : props.cellClassName,
  ]
}

// ========================== side shadow ==========================
const scrollRef = useTemplateRef('scroll')
const scrollSide = useScrollSide(scrollRef, {
  direction: 'horizontal',
})

// others
const tableClass = computed(() => {
  return [
    bem.b(),
    bem.m('bordered', props.bordered),
    bem.m('underlined', props.underlined && !props.bordered),
    bem.m('striped', props.striped),
    bem.m(props.size, props.size),
    bem.m('scroll-' + scrollSide.horizontal),
  ]
})
</script>
