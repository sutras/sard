import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Radio from '../radio.vue'
import RadioGroup from '../radio-group.vue'

describe('Radio', () => {
  test('checked radio reflects group value and emits updates on click', async () => {
    const wrapper = mount(
      <RadioGroup modelValue="option2">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    expect(wrapper.findAll('.s-radio')[1].classes()).toContain('s-radio--checked')
    expect(wrapper.findAll('.s-radio__label')[1].text()).toBe('选项2')

    await wrapper.findAll('.s-radio')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['option1'])
    expect(wrapper.findAll('.s-radio')[0].classes()).toContain('s-radio--checked')
  })

  test('horizontal direction adds group modifier', async () => {
    const wrapper = mount(
      <RadioGroup direction="horizontal">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['s-radio-group', 's-radio-group--horizontal']),
    )
  })

  test('readonly group applies modifier and blocks value updates', async () => {
    const wrapper = mount(
      <RadioGroup readonly modelValue="option2">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    expect(wrapper.find('.s-radio').classes()).toContain('s-radio--readonly')

    await wrapper.find('.s-radio').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findAll('.s-radio')[1].classes()).toContain('s-radio--checked')
  })

  test('disabled group applies modifier and blocks value updates', async () => {
    const wrapper = mount(
      <RadioGroup disabled modelValue="option2">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    expect(wrapper.find('.s-radio').classes()).toContain('s-radio--disabled')

    await wrapper.find('.s-radio').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findAll('.s-radio')[1].classes()).toContain('s-radio--checked')
  })

  test('size is forwarded to the radio icon style', async () => {
    const wrapper = mount(
      <RadioGroup size="48px">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    expect(wrapper.find('.s-radio__icon').attributes('style')).toContain('font-size: 48px;')
  })

  test('checked color is applied to the checked icon', async () => {
    const wrapper = mount(
      <RadioGroup modelValue="option2" checkedColor="red">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    expect(wrapper.find('.s-radio__icon--checked').attributes('style')).toContain('color: red;')
  })

  test('record type renders a dot check icon for the checked radio', async () => {
    const wrapper = mount(
      <RadioGroup modelValue="option2" type="record">
        <Radio value="option1">选项1</Radio>
        <Radio value="option2">选项2</Radio>
      </RadioGroup>,
    )

    const checkIcon = wrapper.find('.s-radio__icon--checked .s-check-icon')

    expect(checkIcon.exists()).toBe(true)
    expect(checkIcon.classes()).toEqual(
      expect.arrayContaining(['s-check-icon', 's-check-icon--circle', 's-check-icon--dot']),
    )
  })

  test('icon slot receives checked state', async () => {
    const wrapper = mount(
      <RadioGroup modelValue="option2" type="record">
        <Radio value="option1">选项1</Radio>
        <Radio
          value="option2"
          v-slots={{
            icon: ({ checked }: { checked: boolean }) => (
              <span class="icon-slot">{checked ? 'checked' : 'unchecked'}</span>
            ),
          }}
        >
          选项2
        </Radio>
      </RadioGroup>,
    )

    expect(wrapper.find('.icon-slot').text()).toBe('checked')
  })
})
