import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Input from '../input.vue'

describe('Input', () => {
  test('create', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" />)

    expect(wrapper.find('input').element.value).toBe('输入框内容')
  })

  test('style', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" borderless />)

    expect(wrapper.classes()).toContain('s-input--borderless')
  })

  test('type', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" type="idcard" />)

    expect(wrapper.find('input').attributes('type')).toBe('idcard')
  })

  test('clearable', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" clearable />)

    expect(wrapper.find('input').element.value).toBe('输入框内容')

    await wrapper.find('.s-input__clear').trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }],
    })
    await wrapper.find('.s-input__clear').trigger('touchend', {
      changedTouches: [{ clientX: 0, clientY: 0 }],
    })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('change')?.[0]).toEqual([''])
    expect(wrapper.emitted('input')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  test('showClearOnlyFocus', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" clearable showClearOnlyFocus />)

    expect(wrapper.find('.s-input__clear').attributes('style')).toContain('display: none;')

    await wrapper.find('input').trigger('focus')

    expect(wrapper.classes()).toContain('is-focused')
    expect(wrapper.find('.s-input__clear').attributes('style') || '').not.toContain(
      'display: none;',
    )

    await wrapper.find('input').trigger('blur')

    expect(wrapper.classes()).not.toContain('is-focused')
    expect(wrapper.find('.s-input__clear').attributes('style')).toContain('display: none;')
  })

  test('disabled', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" disabled />)

    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  test('readonly', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" readonly />)

    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
  })

  test('slot', async () => {
    const wrapper = mount(
      <Input
        modelValue="输入框内容"
        v-slots={{
          prepend: () => '前置插槽',
          append: () => '后置插槽',
        }}
      />,
    )

    expect(wrapper.find('.s-input__prepend').text()).toBe('前置插槽')
    expect(wrapper.find('.s-input__append').text()).toBe('后置插槽')
  })

  test('inlaid', async () => {
    const wrapper = mount(<Input modelValue="输入框内容" inlaid />)

    expect(wrapper.classes()).toContain('s-input--inlaid')
  })

  test('textarea autoHeight', async () => {
    const scrollToMock = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)

    const wrapper = mount(
      <Input modelValue="输入框内容" type="textarea" autoHeight={{ minHeight: 200 }} />,
    )

    const textarea = wrapper.find('textarea')

    Object.defineProperty(textarea.element, 'scrollHeight', {
      configurable: true,
      value: 120,
    })

    await wrapper.setProps({
      modelValue: '更新后的输入框内容',
    })
    await nextTick()

    expect(textarea.attributes('style')).toContain('height: 200px;')

    scrollToMock.mockRestore()
  })

  test('count', async () => {
    const wrapper = mount(<Input modelValue="hello" type="textarea" showCount maxlength={100} />)

    expect(wrapper.find('.s-input__count').text()).toBe('5 / 100')
  })
})
