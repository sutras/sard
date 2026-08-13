import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Checkbox from '../checkbox.vue'
import CheckboxGroup from '../checkbox-group.vue'

const getCheckedStates = (wrapper: any) => {
  return wrapper.findAll('.s-checkbox').map((item: any) => {
    return item.classes().includes('s-checkbox--checked')
  })
}

describe('Checkbox', () => {
  test('create', async () => {
    const wrapper = mount(<Checkbox label="复选框" />)

    expect(wrapper.find('.s-checkbox__icon').exists()).toBe(true)
    expect(wrapper.find('.s-checkbox__label').text()).toBe('复选框')
  })

  test('disabled', async () => {
    const wrapper = mount(<Checkbox label="复选框" disabled />)

    expect(wrapper.classes()).toContain('s-checkbox--disabled')
  })

  test('readonly', async () => {
    const wrapper = mount(<Checkbox label="复选框" readonly />)

    expect(wrapper.classes()).toContain('s-checkbox--readonly')
  })

  test('size', async () => {
    const wrapper = mount(<Checkbox label="复选框" size="48px" />)

    expect(wrapper.find('.s-checkbox__icon').attributes('style')).toContain('font-size: 48px;')
  })

  test('color', async () => {
    const wrapper = mount(<Checkbox label="复选框" checked checkedColor="red" />)

    expect(wrapper.find('.s-checkbox__icon--checked').attributes('style')).toContain('color: red;')
  })

  test('type', async () => {
    const wrapper = mount(<Checkbox label="复选框" checked type="circle" />)

    expect(wrapper.find('.s-check-icon').classes()).toEqual(
      expect.arrayContaining(['s-check-icon--circle', 's-check-icon--check']),
    )
  })

  test('customIcon', async () => {
    const wrapper = mount(
      <Checkbox
        label="复选框"
        checked
        v-slots={{
          icon: ({ checked }: { checked: boolean }) => (
            <span class="icon-slot">{checked ? 'checked' : 'unchecked'}</span>
          ),
        }}
      />,
    )

    expect(wrapper.find('.icon-slot').text()).toBe('checked')

    await wrapper.trigger('click')

    expect(wrapper.emitted('update:checked')?.[0]).toEqual([false])
    expect(wrapper.find('.icon-slot').text()).toBe('unchecked')
  })

  test('checkoutGroup', async () => {
    const wrapper = mount(
      <CheckboxGroup modelValue={['option1']}>
        <Checkbox value="option1" label="选项1" />
        <Checkbox value="option2" label="选项2" />
        <Checkbox value="option3" label="选项3" />
      </CheckboxGroup>,
    )

    expect(getCheckedStates(wrapper)).toEqual([true, false, false])

    await wrapper.findAll('.s-checkbox')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['option1', 'option2']])
    expect(wrapper.emitted('change')?.[0]).toEqual([['option1', 'option2']])
    expect(getCheckedStates(wrapper)).toEqual([true, true, false])

    await wrapper.findAll('.s-checkbox')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['option1']])
    expect(wrapper.emitted('change')?.[1]).toEqual([['option1']])
    expect(getCheckedStates(wrapper)).toEqual([true, false, false])

    await wrapper.findAll('.s-checkbox')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[2]).toEqual([[]])
    expect(wrapper.emitted('change')?.[2]).toEqual([[]])
    expect(getCheckedStates(wrapper)).toEqual([false, false, false])
  })

  test('direction', async () => {
    const wrapper = mount(
      <CheckboxGroup direction="horizontal">
        <Checkbox value="option1" label="选项1" />
        <Checkbox value="option2" label="选项2" />
        <Checkbox value="option3" label="选项3" />
      </CheckboxGroup>,
    )

    expect(wrapper.classes()).toContain('s-checkbox-group--horizontal')
  })

  test('customSlot', async () => {
    const options = [
      {
        value: 'option1',
        label: '选项1',
      },
      {
        value: 'option2',
        label: '选项2',
      },
      {
        value: 'option3',
        label: '选项3',
      },
    ]

    const wrapper = mount(
      <CheckboxGroup
        v-slots={{
          default: ({ toggle }: { toggle: (value: string) => void }) =>
            options.map((option) => {
              return (
                <div key={option.value} class="box" onClick={() => toggle(option.value)}>
                  <Checkbox readonly value={option.value} />
                  {option.label}
                </div>
              )
            }),
        }}
      />,
    )

    await wrapper.findAll('.box')[0].trigger('click')

    expect(getCheckedStates(wrapper)).toEqual([true, false, false])

    await wrapper.findAll('.box')[1].trigger('click')

    expect(getCheckedStates(wrapper)).toEqual([true, true, false])

    await wrapper.findAll('.box')[1].trigger('click')

    expect(getCheckedStates(wrapper)).toEqual([true, false, false])

    await wrapper.findAll('.box')[0].trigger('click')

    expect(getCheckedStates(wrapper)).toEqual([false, false, false])
  })
})
