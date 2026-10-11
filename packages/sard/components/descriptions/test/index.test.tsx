import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Descriptions from '../descriptions.vue'
import DescriptionsItem from '../descriptions-item.vue'

function contentSpan(cell: { attributes: (name: string) => string | undefined }) {
  const style = cell.attributes('style') ?? ''
  const match = style.match(/--s-descriptions-content-span:\s*(\d+)/)
  return match ? match[1] : undefined
}

describe('Descriptions', () => {
  test('create', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
        <DescriptionsItem label="地址">北京市</DescriptionsItem>
      </Descriptions>,
    )

    const labels = wrapper.findAll('.s-descriptions__item-label')
    const contents = wrapper.findAll('.s-descriptions__item-content')
    expect(labels).toHaveLength(3)
    expect(contents).toHaveLength(3)

    expect(labels[0].text()).toBe('姓名')
    expect(contents[0].text()).toBe('张三')

    expect(labels[1].text()).toBe('年龄')
    expect(contents[1].text()).toBe('18')

    expect(labels[2].text()).toBe('地址')
    expect(contents[2].text()).toBe('北京市')

    // 网格布局：每项渲染 2 格（标签 + 内容）
    expect(wrapper.find('.s-descriptions').exists()).toBe(true)
    expect(wrapper.findAll('.s-descriptions > *')).toHaveLength(6)
  })

  test('colon', async () => {
    const wrapper = mount(
      <Descriptions colon>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    expect(wrapper.find('.s-descriptions__item-label').classes()).toContain('has-colon')
  })

  test('no colon by default', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    expect(wrapper.find('.s-descriptions__item-label').classes()).not.toContain('has-colon')
  })

  test('bordered', async () => {
    const wrapper = mount(
      <Descriptions bordered>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    expect(wrapper.classes()).toContain('is-bordered')
    expect(wrapper.find('.s-descriptions__item-label').classes()).toContain('is-bordered')
    expect(wrapper.find('.s-descriptions__item-content').classes()).toContain('is-bordered')
  })

  test('columns', async () => {
    const wrapper = mount(
      <Descriptions columns={2}>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
        <DescriptionsItem label="地址">北京市</DescriptionsItem>
      </Descriptions>,
    )

    // 2 列 → 4 条网格轨道，每项占 2 列，自动每行 2 项
    expect(wrapper.find('.s-descriptions').attributes('style')).toContain(
      'grid-template-columns: repeat(4, minmax(0, 1fr))',
    )
  })

  test('default columns is 1', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
      </Descriptions>,
    )

    // columns=1 → 2 条网格轨道
    expect(wrapper.find('.s-descriptions').attributes('style')).toContain(
      'grid-template-columns: repeat(2, minmax(0, 1fr))',
    )
  })

  test('colspan', async () => {
    const wrapper = mount(
      <Descriptions columns={2}>
        <DescriptionsItem label="姓名" colspan={2}>
          张三
        </DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
      </Descriptions>,
    )

    const contents = wrapper.findAll('.s-descriptions__item-content')
    // 内容格跨度 = colspan * 2 - 1；最后一项填满当前行剩余列
    expect(contentSpan(contents[0])).toBe('3')
    expect(contentSpan(contents[1])).toBe('3')
  })

  test('last row content fills remaining columns', async () => {
    const wrapper = mount(
      <Descriptions columns={3}>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
        <DescriptionsItem label="地址">北京市</DescriptionsItem>
        <DescriptionsItem label="备注">无</DescriptionsItem>
      </Descriptions>,
    )

    // columns=3 → 6 条网格轨道
    expect(wrapper.find('.s-descriptions').attributes('style')).toContain(
      'grid-template-columns: repeat(6, minmax(0, 1fr))',
    )

    const contents = wrapper.findAll('.s-descriptions__item-content')
    // 最后一项填满当前行剩余列：columns * 2 - 1 = 5
    expect(contentSpan(contents[3])).toBe('5')
  })

  test('label slot', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem
          v-slots={{
            label: () => <span class="custom-label">自定义标签</span>,
          }}
        >
          内容
        </DescriptionsItem>
      </Descriptions>,
    )

    expect(wrapper.find('.custom-label').text()).toBe('自定义标签')
    expect(wrapper.find('.s-descriptions__item-content').text()).toBe('内容')
  })

  test('label cell always renders', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem>内容</DescriptionsItem>
      </Descriptions>,
    )

    // Label cell still exists even without label prop
    expect(wrapper.find('.s-descriptions__item-label').exists()).toBe(true)
    expect(wrapper.find('.s-descriptions__item-content').text()).toBe('内容')
  })

  test('renders as grid with correct tracks', async () => {
    const wrapper = mount(
      <Descriptions columns={3}>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    expect(wrapper.find('.s-descriptions').attributes('style')).toContain(
      'grid-template-columns: repeat(6, minmax(0, 1fr))',
    )
  })

  test('labelWidth on descriptions', async () => {
    const wrapper = mount(
      <Descriptions labelWidth="100px">
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    const labelCell = wrapper.find('.s-descriptions__item-label')
    expect(labelCell.attributes('style')).toContain('width: 100px')
  })

  test('labelWidth not set by default', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    const labelCell = wrapper.find('.s-descriptions__item-label')
    expect(labelCell.attributes('style')).toBeUndefined()
  })

  test('throws error when used outside Descriptions', () => {
    expect(() => {
      mount(<DescriptionsItem label="姓名">张三</DescriptionsItem>)
    }).toThrow('DescriptionsItem must be included in Descriptions.')
  })

  test('labelAlign on descriptions', async () => {
    const wrapper = mount(
      <Descriptions labelAlign="end">
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    expect(wrapper.find('.s-descriptions__item-label').attributes('style')).toContain(
      'text-align: end',
    )
  })

  test('labelAlign on item overrides descriptions', async () => {
    const wrapper = mount(
      <Descriptions labelAlign="end">
        <DescriptionsItem label="姓名" labelAlign="center">
          张三
        </DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
      </Descriptions>,
    )

    const labels = wrapper.findAll('.s-descriptions__item-label')
    expect(labels[0].attributes('style')).toContain('text-align: center')
    expect(labels[1].attributes('style')).toContain('text-align: end')
  })

  test('rowspan', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名" rowspan={2}>
          张三
        </DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
      </Descriptions>,
    )

    const labels = wrapper.findAll('.s-descriptions__item-label')
    const contents = wrapper.findAll('.s-descriptions__item-content')

    expect(labels[0].attributes('style')).toContain('grid-row: span 2')
    expect(contents[0].attributes('style')).toContain('grid-row: span 2')
    expect(labels[1].attributes('style') ?? '').not.toContain('grid-row')
    expect(contents[1].attributes('style') ?? '').not.toContain('grid-row')
  })

  test('rowspan with columns=2', async () => {
    const wrapper = mount(
      <Descriptions columns={2}>
        <DescriptionsItem label="头像" rowspan={2}>
          头像内容
        </DescriptionsItem>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="手机号">138****8888</DescriptionsItem>
        <DescriptionsItem label="地址">北京市朝阳区</DescriptionsItem>
      </Descriptions>,
    )

    const contents = wrapper.findAll('.s-descriptions__item-content')

    expect(contents[0].attributes('style')).toContain('grid-row: span 2')
    // 最后一项填满当前行剩余列：(2 - 0) * 2 - 1 = 3
    expect(contentSpan(contents[3])).toBe('3')
  })

  test('default rowspan is 1', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    const labels = wrapper.findAll('.s-descriptions__item-label')
    const contents = wrapper.findAll('.s-descriptions__item-content')

    expect(labels[0].attributes('style') ?? '').not.toContain('grid-row')
    expect(contents[0].attributes('style') ?? '').not.toContain('grid-row')
  })

  test('rowspan larger than items leaves trailing rows for the span', async () => {
    // columns=2：A(rowspan=4) 占前两行的两列，B/C/D 依次排布
    const wrapper = mount(
      <Descriptions columns={2}>
        <DescriptionsItem label="头像" rowspan={4}>
          头像内容
        </DescriptionsItem>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="手机号">138****8888</DescriptionsItem>
        <DescriptionsItem label="地址">北京市朝阳区</DescriptionsItem>
      </Descriptions>,
    )

    const contents = wrapper.findAll('.s-descriptions__item-content')

    expect(contents[0].attributes('style')).toContain('grid-row: span 4')
    expect(contentSpan(contents[1])).toBe('1')
    expect(contentSpan(contents[2])).toBe('1')
    expect(contentSpan(contents[3])).toBe('1')
  })
})
