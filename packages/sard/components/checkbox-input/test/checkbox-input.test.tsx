import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import CheckboxInput from '../checkbox-input.vue'
import CheckboxPopout from '../../checkbox-popout/checkbox-popout.vue'

const options = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      value: `option${i + 1}`,
      label: `选项${i + 1}`,
    }
  })

describe('CheckboxInput', () => {
  test('basic', async () => {
    const wrapper = mount(<CheckboxInput options={options} modelValue={['option2', 'option3']} />)

    expect((wrapper.find('.s-input textarea').element as HTMLTextAreaElement).value).toBe(
      '选项2, 选项3',
    )
    expect(wrapper.findComponent(CheckboxPopout).props('visible')).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.findComponent(CheckboxPopout).props('visible')).toBe(true)

    await wrapper.setProps({
      modelValue: ['option3', 'option6', 'option1'],
    })
    expect((wrapper.find('.s-input textarea').element as HTMLTextAreaElement).value).toBe(
      '选项1, 选项3, 选项6',
    )

    await wrapper.setProps({
      modelValue: ['missing', 'option2'],
    })
    expect((wrapper.find('.s-input textarea').element as HTMLTextAreaElement).value).toBe('选项2')

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect((wrapper.find('.s-input textarea').element as HTMLTextAreaElement).value).toBe('')
  })
})
