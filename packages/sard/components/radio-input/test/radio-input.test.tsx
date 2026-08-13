import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import RadioInput from '../radio-input.vue'
import RadioPopout from '../../radio-popout/radio-popout.vue'

const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })

describe('RadioInput', () => {
  test('basic', async () => {
    const wrapper = mount(<RadioInput options={options} modelValue="option3" />)

    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('选项3')
    expect(wrapper.findComponent(RadioPopout).props('visible')).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.findComponent(RadioPopout).props('visible')).toBe(true)

    await wrapper.setProps({
      modelValue: 'option6',
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('选项6')

    await wrapper.setProps({
      modelValue: 'missing',
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('')

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('')
  })
})
