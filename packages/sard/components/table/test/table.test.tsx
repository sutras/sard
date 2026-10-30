import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Table from '../table.vue'
import {
  partialColumns,
  partialData,
  columns,
  data,
} from '../../../../../src/views/components/table/demo/data'
import { type TableProps } from '../common'

const basicProps = (overrides?: Partial<TableProps>) => ({
  columns: partialColumns,
  data: partialData,
  ...overrides,
})

const massProps = (overrides?: Partial<TableProps>) => ({
  columns,
  data,
  ...overrides,
})

describe('Table', () => {
  test('basic', async () => {
    const wrapper = mount(Table, { props: basicProps() })

    // 验证表头和内容正确渲染
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)

    const headerText = wrapper.find('thead').text()
    partialColumns.forEach((column) => {
      expect(headerText).toContain(column.label)
    })

    const firstRowText = wrapper.find('tbody tr').text()
    expect(firstRowText).toContain(partialData[0].code)
    expect(firstRowText).toContain(partialData[0].interlock)
    expect(firstRowText).toContain(partialData[0].oee)

    // 验证表头 th 存在
    const headerCells = wrapper.findAll('thead th')
    expect(headerCells).toHaveLength(partialColumns.length)

    // 验证数据行数
    const bodyRows = wrapper.findAll('tbody tr')
    expect(bodyRows).toHaveLength(partialData.length)
  })

  test('border', async () => {
    const wrapper = mount(Table, { props: basicProps({ bordered: true }) })

    expect(wrapper.find('.s-table').classes()).toContain('s-table--bordered')
  })

  test('underlined', async () => {
    const wrapper = mount(Table, { props: basicProps({ underlined: true }) })

    expect(wrapper.find('.s-table').classes()).toContain('s-table--underlined')
  })

  test('striped', async () => {
    const wrapper = mount(Table, { props: basicProps({ striped: true }) })

    expect(wrapper.find('.s-table').classes()).toContain('s-table--striped')
  })

  test('showHeader', async () => {
    const wrapper = mount(Table, { props: basicProps({ showHeader: false }) })

    expect(wrapper.find('thead').exists()).toBe(false)
  })

  test('width', async () => {
    const wrapper = mount(Table, { props: massProps() })

    // col 元素设置宽度
    const cols = wrapper.findAll('col')
    expect(cols).toHaveLength(columns.length)
    columns.forEach((column, index) => {
      expect(cols[index].attributes('style')).toContain(`width: ${column.width}px`)
    })
  })

  test('fixed column', async () => {
    const wrapper = mount(Table, { props: massProps() })

    // 第一个列 fixed="start"，为最后一个 fixed-start 列，应包含 is-last（显示右侧阴影）
    const firstHeaderCell = wrapper.find('thead th:first-child')
    expect(firstHeaderCell.classes()).toContain('is-fixed')
    expect(firstHeaderCell.classes()).toContain('is-last')

    // 第一个 body 单元格同样是 fixed
    const firstBodyCell = wrapper.find('tbody td:first-child')
    expect(firstBodyCell.classes()).toContain('is-fixed')
    expect(firstBodyCell.classes()).toContain('is-last')
  })

  test('size', async () => {
    const wrapper = mount(Table, { props: basicProps({ size: 'small' }) })

    expect(wrapper.find('.s-table').classes()).toContain('s-table--small')
  })
})
