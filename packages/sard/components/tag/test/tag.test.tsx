import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Tag from '../tag.vue'

const colors = ['default', 'primary', 'success', 'warning', 'danger'] as const

describe('Tag', () => {
  test('uses current default variant, color and size modifiers', async () => {
    const wrapper = mount(<Tag>标签</Tag>)

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['s-tag', 's-tag--filled-default', 's-tag--medium']),
    )

    for (const color of colors) {
      await wrapper.setProps({
        color,
      })

      expect(wrapper.classes()).toContain(`s-tag--filled-${color}`)
    }
  })

  test('outlined variant applies outlined modifier for each color', async () => {
    const wrapper = mount(<Tag variant="outlined">标签</Tag>)

    for (const color of colors) {
      await wrapper.setProps({
        color,
      })

      expect(wrapper.classes()).toContain(`s-tag--outlined-${color}`)
    }
  })

  test('solid variant applies solid modifier for each color', async () => {
    const wrapper = mount(<Tag variant="solid">标签</Tag>)

    for (const color of colors) {
      await wrapper.setProps({
        color,
      })

      expect(wrapper.classes()).toContain(`s-tag--solid-${color}`)
    }
  })

  test('round and mark side modifiers are applied', async () => {
    const wrapper = mount(
      <Tag round mark="left">
        标签
      </Tag>,
    )

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['s-tag--round', 's-tag--mark-left']))

    await wrapper.setProps({
      mark: 'right',
    })

    expect(wrapper.classes()).toContain('s-tag--mark-right')
  })

  test('size modifier is applied', async () => {
    const wrapper = mount(<Tag size="small">标签</Tag>)

    expect(wrapper.classes()).toContain('s-tag--small')

    await wrapper.setProps({ size: 'large' })

    expect(wrapper.classes()).toContain('s-tag--large')
  })

  test('closable tag renders close control and close click does not bubble', async () => {
    const wrapper = mount(<Tag closable>标签</Tag>)

    expect(wrapper.find('.s-tag__close').exists()).toBe(true)

    await wrapper.find('.s-tag__close').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
