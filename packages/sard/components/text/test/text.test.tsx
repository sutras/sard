import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Text from '../text.vue'

describe('Text', () => {
  test('renders with default props and slot content', () => {
    const wrapper = mount(<Text>Hello World</Text>)

    const root = wrapper.find('.s-text')
    expect(root.exists()).toBe(true)
    expect(root.text()).toBe('Hello World')
    expect(root.attributes('class')).toContain('s-text--default')
    expect(root.attributes('class')).toContain('s-text--medium')
  })

  test('renders with custom color', () => {
    const wrapper = mount(<Text color="primary">Primary text</Text>)

    const root = wrapper.find('.s-text')
    expect(root.classes()).toContain('s-text--primary')
  })

  test('renders with custom size', () => {
    const wrapper = mount(<Text size="small">Small text</Text>)

    const root = wrapper.find('.s-text')
    expect(root.classes()).toContain('s-text--small')
  })

  test('renders with truncated class', () => {
    const wrapper = mount(<Text truncated>Long text</Text>)

    const root = wrapper.find('.s-text')
    expect(root.classes()).toContain('s-text--truncated')
  })

  test('renders with line-clamp style when lineClamp is set', () => {
    const wrapper = mount(<Text lineClamp={3}>Multi-line text</Text>)

    const root = wrapper.find('.s-text')
    expect(root.classes()).toContain('s-text--line-clamp')
    expect(root.attributes('style')).toContain('-webkit-line-clamp: 3')
  })

  test('renders with custom HTML tag', () => {
    const wrapper = mount(<Text tag="h1">Heading</Text>)

    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Heading')
  })

  test('renders as span by default', () => {
    const wrapper = mount(<Text>Default tag</Text>)

    expect(wrapper.find('span').exists()).toBe(true)
  })

  test('does not apply line-clamp class when lineClamp is 0', () => {
    const wrapper = mount(<Text lineClamp={0}>No clamp</Text>)

    const root = wrapper.find('.s-text')
    expect(root.classes()).not.toContain('s-text--line-clamp')
  })

  test('renders all color variants correctly', () => {
    const colors = [
      'default',
      'secondary',
      'tertiary',
      'fourth',
      'primary',
      'success',
      'warning',
      'danger',
    ] as const

    for (const color of colors) {
      const wrapper = mount(<Text color={color}>Text</Text>)
      expect(wrapper.find('.s-text').classes()).toContain(`s-text--${color}`)
    }
  })

  test('renders all size variants correctly', () => {
    const sizes = ['small', 'medium', 'large'] as const

    for (const size of sizes) {
      const wrapper = mount(<Text size={size}>Text</Text>)
      expect(wrapper.find('.s-text').classes()).toContain(`s-text--${size}`)
    }
  })
})
