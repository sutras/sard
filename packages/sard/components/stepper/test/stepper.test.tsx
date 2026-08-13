import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Stepper from '../stepper.vue'

describe('Stepper', () => {
  test('basic', async () => {
    const wrapper = mount(<Stepper placeholder="数量" />)

    expect(wrapper.find('input').element.value).toBe('')

    await wrapper.find('.s-stepper__button--increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('1')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    expect(wrapper.emitted('change')?.[0]).toEqual([1])

    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('0')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([0])
    expect(wrapper.emitted('change')?.[1]).toEqual([0])

    await wrapper.setProps({
      modelValue: 3,
    })
    expect(wrapper.find('input').element.value).toBe('3')
  })

  test('minMax', async () => {
    const wrapper = mount(<Stepper placeholder="数量" min={0} max={3} />)

    await wrapper.find('.s-stepper__button--increase').trigger('click')
    await wrapper.find('.s-stepper__button--increase').trigger('click')
    await wrapper.find('.s-stepper__button--increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('3')
    expect(wrapper.find('.s-stepper__button--increase').classes()).toContain('is-disabled')

    await wrapper.find('.s-stepper__button--increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('3')

    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('0')
    expect(wrapper.find('.s-stepper__button--decrease').classes()).toContain('is-disabled')

    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('0')
  })

  test('step', async () => {
    const wrapper = mount(<Stepper placeholder="数量" step={5} />)

    await wrapper.find('.s-stepper__button--increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('5')
    await wrapper.find('.s-stepper__button--increase').trigger('click')
    expect(wrapper.find('input').element.value).toBe('10')

    await wrapper.setProps({
      modelValue: 12,
    })
    expect(wrapper.find('input').element.value).toBe('12')

    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('7')
    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('2')
    await wrapper.find('.s-stepper__button--decrease').trigger('click')
    expect(wrapper.find('input').element.value).toBe('-3')
  })

  test('readonly', async () => {
    const wrapper = mount(<Stepper placeholder="数量" readonly />)

    expect(wrapper.classes()).toContain('s-stepper--readonly')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.s-stepper__button--increase').classes()).toContain('is-readonly')
  })

  test('disabled', async () => {
    const wrapper = mount(<Stepper placeholder="数量" disabled />)

    expect(wrapper.classes()).toContain('s-stepper--disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.s-stepper__button--increase').classes()).toContain('is-disabled')
  })

  test('size', async () => {
    const wrapper = mount(<Stepper placeholder="数量" size="small" />)

    expect(wrapper.classes()).toContain('s-stepper--small')
  })

  test('variant', async () => {
    const wrapper = mount(<Stepper placeholder="数量" size="small" />)

    for (const variant of ['solid', 'outlined', 'accent', 'ghost'] as const) {
      await wrapper.setProps({ variant })
      expect(wrapper.classes()).toContain(`s-stepper--${variant}`)
    }
  })
})
