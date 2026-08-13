import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import PasswordInput from '../password-input.vue'

describe('PasswordInput', () => {
  test('basic', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" />)

    expect(wrapper.findAll('.s-password-input__ciphertext')).toHaveLength(6)
  })

  test('underlined', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" type="underlined" />)

    expect(wrapper.classes()).toContain('s-password-input--underlined')
  })

  test('gap', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" gap="0" />)

    expect(wrapper.classes()).toContain('s-password-input--tight-bordered')
    expect(wrapper.attributes('style')).toContain('gap: 0px;')
  })

  test('plainText', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" plainText />)

    expect(
      wrapper
        .findAll('.s-password-input__plaintext')
        .map((item) => item.text())
        .join(''),
    ).toBe('123456')
  })

  test('readonly', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" readonly />)

    expect(wrapper.classes()).toContain('s-password-input--readonly')
    expect(wrapper.find('.s-password-input__input').attributes('disabled')).toBeDefined()
  })

  test('disabled', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" disabled />)

    expect(wrapper.classes()).toContain('s-password-input--disabled')
    expect(wrapper.find('.s-password-input__input').attributes('disabled')).toBeDefined()
  })

  test('customKeyboard', async () => {
    const wrapper = mount(<PasswordInput modelValue="123456" customKeyboard />)

    expect(wrapper.find('.s-password-input__input').exists()).toBe(false)
  })
})
