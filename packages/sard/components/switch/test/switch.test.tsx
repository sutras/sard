import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Switch from '../switch.vue'
import { cssVarName } from '../../../utils'

describe('Switch', () => {
  test('basic', async () => {
    const wrapper = mount(<Switch />)

    expect(wrapper.classes()).not.toContain('s-switch--checked')

    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('s-switch--checked')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])
  })

  test('size', async () => {
    const wrapper = mount(<Switch size="48px" />)

    expect(wrapper.attributes('style')).toContain(`${cssVarName('switch-size')}: 48px;`)
  })

  test('color', async () => {
    const wrapper = mount(<Switch modelValue checkedColor="red" />)

    expect(wrapper.attributes('style')).toContain('background-color: red;')
  })

  test('value', async () => {
    const wrapper = mount(<Switch checkedValue="on" uncheckedValue="off" />)

    await wrapper.trigger('click')
    await wrapper.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['on'], ['off']])
  })

  test('readonly', async () => {
    const wrapper = mount(<Switch readonly />)

    expect(wrapper.classes()).toContain('s-switch--readonly')
  })

  test('disabled', async () => {
    const wrapper = mount(<Switch disabled />)

    expect(wrapper.classes()).toContain('s-switch--disabled')
  })

  test('loading', async () => {
    vi.useFakeTimers()

    const wrapper = mount(
      <Switch
        beforeUpdate={() => {
          return new Promise<void>((resolve) => {
            setTimeout(resolve, 0)
          })
        }}
      />,
    )

    const clickPromise = wrapper.trigger('click')
    await nextTick()

    expect(wrapper.classes()).toContain('s-switch--loading')
    expect(wrapper.classes()).not.toContain('s-switch--checked')

    vi.runAllTimers()
    await clickPromise
    await nextTick()

    expect(wrapper.classes()).not.toContain('s-switch--loading')
    expect(wrapper.classes()).toContain('s-switch--checked')

    vi.useRealTimers()
  })

  test('text props', async () => {
    const wrapper = mount(<Switch checkedText="开" uncheckedText="关" />)

    expect(wrapper.find('.s-switch__text-checked').text()).toBe('开')
    expect(wrapper.find('.s-switch__text-unchecked').text()).toBe('关')
  })

  test('text slots', async () => {
    const wrapper = mount(
      <Switch
        v-slots={{
          'checked-text': () => <span class="checked-slot">已开启</span>,
          'unchecked-text': () => <span class="unchecked-slot">已关闭</span>,
        }}
      />,
    )

    expect(wrapper.find('.s-switch__text-checked .checked-slot').text()).toBe('已开启')
    expect(wrapper.find('.s-switch__text-unchecked .unchecked-slot').text()).toBe('已关闭')
  })
})
