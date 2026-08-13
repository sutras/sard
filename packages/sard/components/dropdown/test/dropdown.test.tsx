import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'

import Dropdown from '../dropdown.vue'
import DropdownItem from '../dropdown-item.vue'

const options1 = [
  { label: '距离优先', value: '1' },
  { label: '速度优先', value: '2' },
  { label: '评分优先', value: '3' },
]

const options2 = [
  { label: '30分钟内', value: '1' },
  { label: '40分钟内', value: '2' },
  { label: '50分钟内', value: '3' },
]

describe('Dropdown', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Dropdown>
        <DropdownItem options={options1} modelValue="1" />
        <DropdownItem options={options2} modelValue="1" />
      </Dropdown>,
    )

    await nextTick()

    expect(wrapper.findAll('.s-dropdown-item__value').map((item) => item.text())).toEqual([
      '距离优先',
      '30分钟内',
    ])

    await wrapper.find('.s-dropdown-item').trigger('click')
    await nextTick()

    expect(wrapper.find('.s-dropdown-item__option.is-active').text()).toBe('距离优先')

    await wrapper.find('.s-list-item:nth-child(2)').trigger('click')
    await nextTick()

    expect(wrapper.findAll('.s-dropdown-item__value').map((item) => item.text())).toEqual([
      '速度优先',
      '30分钟内',
    ])
    expect(wrapper.find('.s-dropdown-item__option.is-active').text()).toBe('速度优先')
  })

  test('label', async () => {
    const wrapper = mount(
      <Dropdown>
        <DropdownItem label="排序" options={options1} modelValue="1" />
        <DropdownItem label="速度" options={options2} modelValue="1" />
      </Dropdown>,
    )

    expect(wrapper.findAll('.s-dropdown-item__label').map((item) => item.text())).toEqual([
      '排序',
      '速度',
    ])
  })

  test('placeholder', async () => {
    const modelValue = ref<string | undefined>()

    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown>
            <DropdownItem modelValue={modelValue.value} placeholder="排序" options={options1} />
            <DropdownItem placeholder="配送时间" options={options2} />
          </Dropdown>
        )
      },
    })

    expect(wrapper.findAll('.s-dropdown-item__placeholder').map((item) => item.text())).toEqual([
      '排序',
      '配送时间',
    ])

    modelValue.value = '1'
    await nextTick()

    expect(wrapper.findAll('.s-dropdown-item__placeholder').map((item) => item.text())).toEqual([
      '配送时间',
    ])
    expect(wrapper.findAll('.s-dropdown-item__value').map((item) => item.text())).toEqual([
      '距离优先',
    ])
  })

  test('disabled', async () => {
    const wrapper = mount(
      <Dropdown disabled>
        <DropdownItem options={options1} modelValue="1" />
        <DropdownItem options={options2} modelValue="1" />
      </Dropdown>,
    )

    expect(
      wrapper.findAll('.s-dropdown-item').map((item) => item.classes().includes('is-disabled')),
    ).toEqual([true, true])
  })

  test('content', async () => {
    const wrapper = mount(
      <Dropdown>
        <DropdownItem options={options1} modelValue="1" />
        <DropdownItem title="筛选">
          <div class="content">内容</div>
        </DropdownItem>
      </Dropdown>,
    )

    await wrapper.findAll('.s-dropdown-item')[1].trigger('click')
    await nextTick()

    expect(wrapper.find('.content').exists()).toBe(true)
  })
})
