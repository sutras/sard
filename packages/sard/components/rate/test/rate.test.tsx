import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Rate from '../rate.vue'

describe('Rate', () => {
  test('basic', async () => {
    const wrapper = mount(<Rate modelValue={3} count={5} />)

    expect(wrapper.findAll('.s-rate__item')).toHaveLength(5)
    expect(wrapper.findAll('.s-rate__star')[2].attributes('style')).toContain('width: 100%;')
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')
  })

  test('half', async () => {
    const wrapper = mount(<Rate modelValue={2.5} count={5} />)

    expect(wrapper.findAll('.s-rate__star')[2].attributes('style')).toContain('width: 50%;')
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')
  })

  test('color', async () => {
    const wrapper = mount(<Rate modelValue={2.5} count={5} voidColor="blue" color="red" />)

    expect(wrapper.find('.s-rate__void-star').attributes('style')).toContain('color: blue;')
    expect(wrapper.find('.s-rate__star').attributes('style')).toContain('color: red;')
  })

  test('size', async () => {
    const wrapper = mount(<Rate modelValue={3} count={5} size="60px" gap="40px" />)

    expect(wrapper.find('.s-rate__content').attributes('style')).toContain('gap: 40px;')
    expect(wrapper.find('.s-rate__item').attributes('style')).toContain('font-size: 60px;')
  })

  test('count', async () => {
    const wrapper = mount(<Rate modelValue={3} count={10} />)

    expect(wrapper.findAll('.s-rate__item')).toHaveLength(10)
  })

  test('clearable', async () => {
    const wrapper = mount(<Rate modelValue={3} clearable />)

    expect(wrapper.findAll('.s-rate__star')[2].attributes('style')).toContain('width: 100%;')
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')

    await wrapper.findAll('.s-rate__item')[2].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
    expect(wrapper.emitted('change')?.[0]).toEqual([0])
    expect(
      wrapper
        .findAll('.s-rate__star')
        .map((item) => item.attributes('style'))
        .every((style) => style?.includes('width: 0%;')),
    ).toBe(true)
  })

  test('readonly', async () => {
    const wrapper = mount(<Rate modelValue={3} readonly />)

    expect(wrapper.classes()).toContain('s-rate--readonly')
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')

    await wrapper.findAll('.s-rate__item')[3].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')
  })

  test('disabled', async () => {
    const wrapper = mount(<Rate modelValue={3} disabled />)

    expect(wrapper.classes()).toContain('s-rate--disabled')
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')

    await wrapper.findAll('.s-rate__item')[3].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.findAll('.s-rate__star')[3].attributes('style')).toContain('width: 0%;')
  })
})
