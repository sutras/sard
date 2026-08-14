import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import PickerView from '../picker-view.tsx'
import PickerViewColumn from '../picker-view-column.tsx'

describe('PickerView', () => {
  test('renders wrapper and columns', () => {
    const wrapper = mount(
      <PickerView value={[0, 1]}>
        <PickerViewColumn>
          <div class="item">a</div>
          <div class="item">b</div>
        </PickerViewColumn>
        <PickerViewColumn>
          <div class="item">1</div>
          <div class="item">2</div>
          <div class="item">3</div>
        </PickerViewColumn>
      </PickerView>,
    )

    expect(wrapper.find('.s-picker-view').exists()).toBe(true)
    expect(wrapper.find('.s-picker-view__wrapper').exists()).toBe(true)

    const columns = wrapper.findAll('.s-picker-view-column')
    expect(columns).toHaveLength(2)
    expect(columns[0].findAll('.item')).toHaveLength(2)
    expect(columns[1].findAll('.item')).toHaveLength(3)
  })

  test('renders mask, indicator and content inside column', () => {
    const wrapper = mount(
      <PickerView value={[0]}>
        <PickerViewColumn>
          <div class="item">a</div>
          <div class="item">b</div>
        </PickerViewColumn>
      </PickerView>,
    )

    const column = wrapper.find('.s-picker-view-column')
    expect(column.find('.s-picker-view-column__group').exists()).toBe(true)
    expect(column.find('.s-picker-view-column__mask').exists()).toBe(true)
    expect(column.find('.s-picker-view-column__indicator').exists()).toBe(true)
    expect(column.find('.s-picker-view-column__content').exists()).toBe(true)
  })

  test('applies indicator and mask classes', () => {
    const wrapper = mount(
      <PickerView value={[0]} indicatorClass="custom-indicator" maskClass="custom-mask">
        <PickerViewColumn>
          <div class="item">a</div>
        </PickerViewColumn>
      </PickerView>,
    )

    expect(wrapper.find('.s-picker-view-column__indicator').classes()).toContain('custom-indicator')
    expect(wrapper.find('.s-picker-view-column__mask').classes()).toContain('custom-mask')
  })
})
