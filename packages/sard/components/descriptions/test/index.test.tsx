import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Descriptions from '../descriptions.vue'
import DescriptionsItem from '../descriptions-item.vue'

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

    // Should render as table structure, each item = 2 cells (label + content)
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.findAll('tr')).toHaveLength(3)
    expect(wrapper.findAll('td')).toHaveLength(6)
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

    // 3 items with columns=2: first row has 2 items (4 cells), second row has 1 item (2 cells)
    const rows = wrapper.findAll('tr')
    expect(rows).toHaveLength(2)
    expect(rows[0].findAll('td')).toHaveLength(4)
    expect(rows[1].findAll('td')).toHaveLength(2)
  })

  test('default columns is 1', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
      </Descriptions>,
    )

    // With columns=1, each item in its own row, each row has 2 cells
    const rows = wrapper.findAll('tr')
    expect(rows).toHaveLength(2)
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

    const tds = wrapper.findAll('td')
    // Row 1: colspan=2 fills the row → label colspan=1, content colspan=3
    expect(tds[0].attributes('colspan')).toBe('1')
    expect(tds[1].attributes('colspan')).toBe('3')
    // Row 2: colspan=1 alone in row → fills remaining → content colspan=3
    expect(tds[2].attributes('colspan')).toBe('1')
    expect(tds[3].attributes('colspan')).toBe('3')

    const rows = wrapper.findAll('tr')
    expect(rows).toHaveLength(2)
    expect(rows[0].findAll('td')).toHaveLength(2)
    expect(rows[1].findAll('td')).toHaveLength(2)
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

    // columns=3, 4 items colspan=1: row1 has 3, row2 has 1 (incomplete)
    const rows = wrapper.findAll('tr')
    expect(rows).toHaveLength(2)

    // Row 2 should have 2 cells (label + content), content fills row
    const row2Tds = rows[1].findAll('td')
    expect(row2Tds).toHaveLength(2)
    expect(row2Tds[0].attributes('colspan')).toBe('1')
    // Fills remaining: columns*2-1 = 5
    expect(row2Tds[1].attributes('colspan')).toBe('5')
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

  test('colgroup renders correct columns count', async () => {
    const wrapper = mount(
      <Descriptions columns={3}>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    // table renders with correct structure
    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
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

  test('labelWidth on item overrides descriptions', async () => {
    const wrapper = mount(
      <Descriptions labelWidth="100px">
        <DescriptionsItem label="姓名" labelWidth="120px">
          张三
        </DescriptionsItem>
        <DescriptionsItem label="年龄">18</DescriptionsItem>
      </Descriptions>,
    )

    const labels = wrapper.findAll('.s-descriptions__item-label')
    expect(labels[0].attributes('style')).toContain('width: 120px')
    expect(labels[1].attributes('style')).toContain('width: 100px')
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

    const tds = wrapper.findAll('td')
    expect(tds[0].attributes('rowspan')).toBe('2')
    expect(tds[1].attributes('rowspan')).toBe('2')
    expect(tds[2].attributes('rowspan')).toBe('1')
    expect(tds[3].attributes('rowspan')).toBe('1')

    // 3 rows: row0=[A(rowspan=2)], row1=(空，A 的 rowspan 占满), row2=[B]
    expect(wrapper.findAll('tr')).toHaveLength(3)
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

    const rows = wrapper.findAll('tr')
    const tds = wrapper.findAll('td')

    // rowspan=2 on first item → A in row1, A's cells rowspan to row2
    // B also in row1, C in row2 (only 1 position available due to A's rowspan)
    // D in row3 (no reservations)
    expect(rows).toHaveLength(3)
    expect(tds[0].attributes('rowspan')).toBe('2')
    expect(tds[1].attributes('rowspan')).toBe('2')

    // D fills row3: content colspan = (2-0)*2-1 = 3
    const row3Tds = rows[2].findAll('td')
    expect(row3Tds).toHaveLength(2)
    expect(row3Tds[1].attributes('colspan')).toBe('3')
  })

  test('default rowspan is 1', async () => {
    const wrapper = mount(
      <Descriptions>
        <DescriptionsItem label="姓名">张三</DescriptionsItem>
      </Descriptions>,
    )

    const tds = wrapper.findAll('td')
    expect(tds[0].attributes('rowspan')).toBe('1')
    expect(tds[1].attributes('rowspan')).toBe('1')
  })

  test('rowspan larger than items creates empty trailing rows', async () => {
    // columns=2, A(rowspan=4), B, C, D
    // Row0: A(rowspan=4) + B → 4 cells
    // Row1: C (count=1 after rowspan) → 2 cells, contentColspan=1
    // Row2: D (count=1 after rowspan) → 2 cells, contentColspan=1
    // Row3: (empty, filtered) A's rowspan occupies 1 position
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

    const rows = wrapper.findAll('tr')
    const tds = wrapper.findAll('td')

    expect(rows).toHaveLength(3)
    expect(tds[0].attributes('rowspan')).toBe('4')
    expect(tds[1].attributes('rowspan')).toBe('4')

    // Row1: C, contentColspan should be 1 (row is full, no fill)
    const row1Tds = rows[1].findAll('td')
    expect(row1Tds).toHaveLength(2)
    expect(row1Tds[1].attributes('colspan')).toBe('1')

    // Row2: D, contentColspan should be 1 (row is full, no fill)
    const row2Tds = rows[2].findAll('td')
    expect(row2Tds).toHaveLength(2)
    expect(row2Tds[1].attributes('colspan')).toBe('1')
  })
})
