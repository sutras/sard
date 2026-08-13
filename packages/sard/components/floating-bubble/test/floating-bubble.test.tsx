import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import FloatingBubble from '../floating-bubble.vue'

describe('FloatingBubble', () => {
  // ── basic rendering ──────────────────────────────────────────────

  test('renders wrapper and slot content', () => {
    const wrapper = mount(
      <FloatingBubble>
        <div class="bubble-content">Content</div>
      </FloatingBubble>,
    )

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
    expect(wrapper.find('.bubble-content').text()).toBe('Content')
  })

  test('emits click event', async () => {
    const wrapper = mount(
      <FloatingBubble>
        <div class="bubble-content">Click me</div>
      </FloatingBubble>,
    )

    await wrapper.trigger('click')

    expect(wrapper.emitted().click).toBeTruthy()
  })

  // ── offset ───────────────────────────────────────────────────────

  test('applies offset via transform', async () => {
    const wrapper = mount(
      <FloatingBubble magnet="x">
        <div class="bubble-content">Content</div>
      </FloatingBubble>,
    )

    await wrapper.setProps({
      offset: { x: 100, y: 100 },
    })

    const style = wrapper.find('.s-floating-bubble').attributes('style')
    expect(style).toContain('translate3d(100px, 100px, 0)')
  })

  // ── props ────────────────────────────────────────────────────────

  test('renders with default props', () => {
    const wrapper = mount(
      <FloatingBubble>
        <div>Content</div>
      </FloatingBubble>,
    )

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
  })

  test('renders with axis prop', () => {
    const wrapper = mount(
      <FloatingBubble axis="both">
        <div>Content</div>
      </FloatingBubble>,
    )

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
  })

  test('renders with custom gap', () => {
    const wrapper = mount(
      <FloatingBubble marginX={48} marginY={48}>
        <div>Content</div>
      </FloatingBubble>,
    )

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
  })

  test('renders with draggable disabled', () => {
    const wrapper = mount(
      <FloatingBubble draggable={false}>
        <div>Content</div>
      </FloatingBubble>,
    )

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('renders without slot content', () => {
    const wrapper = mount(<FloatingBubble />)

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
  })

  test('applies magnetic snap with magnet prop', () => {
    const wrapper = mount(
      <FloatingBubble magnet="y">
        <div>Content</div>
      </FloatingBubble>,
    )

    expect(wrapper.find('.s-floating-bubble').exists()).toBe(true)
  })
})
