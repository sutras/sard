import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Compact from '../compact.vue'
import Button from '../../button/button.vue'
import Input from '../../input/input.vue'
import DatetimePickerInput from '../../datetime-picker-input/datetime-picker-input.vue'

describe('Compact', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Compact>
        <Button>按钮</Button>
        <Input placeholder="请输入" />
        <DatetimePickerInput placeholder="请输入" />
      </Compact>,
    )

    expect(wrapper.find('.s-button--compact-horizontal').exists()).toBeTruthy()
    expect(wrapper.find('.s-input--compact-horizontal').exists()).toBeTruthy()
  })

  test('direction', async () => {
    const wrapper = mount(
      <Compact direction="vertical">
        <Button>按钮</Button>
        <Input placeholder="请输入" />
        <DatetimePickerInput placeholder="请输入" />
      </Compact>,
    )

    expect(wrapper.find('.s-button--compact-vertical').exists()).toBeTruthy()
    expect(wrapper.find('.s-input--compact-vertical').exists()).toBeTruthy()
  })

  test('block', async () => {
    const wrapper = mount(
      <Compact block>
        <Button>按钮</Button>
        <Input placeholder="请输入" />
        <DatetimePickerInput placeholder="请输入" />
      </Compact>,
    )

    expect(wrapper.find('.s-compact--block').exists()).toBeTruthy()
  })
})
