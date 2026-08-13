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
    expect(wrapper.text()).toContain('ID')
    expect(wrapper.text()).toContain('姓名')
    expect(wrapper.text()).toContain('城市')
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.text()).toContain('广州')

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
    expect(cols[0].attributes('style')).toContain('width: 40px')
    expect(cols[1].attributes('style')).toContain('width: 100px')
    expect(cols[2].attributes('style')).toContain('width: 80px')
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
