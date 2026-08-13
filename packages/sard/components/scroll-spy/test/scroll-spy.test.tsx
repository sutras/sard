import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ScrollSpy from '../scroll-spy.vue'
import ScrollSpyAnchor from '../scroll-spy-anchor.vue'

describe('ScrollSpy', () => {
  // ── basic rendering ──────────────────────────────────────────────

  test('renders wrapper with children', () => {
    const wrapper = mount(
      <ScrollSpy>
        <ScrollSpyAnchor name="a">
          <div class="title">A</div>
        </ScrollSpyAnchor>
        <ScrollSpyAnchor name="b">
          <div class="title">B</div>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.find('.s-scroll-spy').exists()).toBe(true)
    expect(wrapper.findAll('.title')).toHaveLength(2)
  })

  test('renders multiple anchors', () => {
    const wrapper = mount(
      <ScrollSpy>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <>
              <ScrollSpyAnchor name={i}>
                <div class="anchor-content">{i}</div>
              </ScrollSpyAnchor>
              <div class="title">{i}</div>
            </>
          ))}
      </ScrollSpy>,
    )

    expect(wrapper.findAll('.title')).toHaveLength(10)
    expect(wrapper.findAll('.anchor-content')).toHaveLength(10)
  })

  // ── disabled state ───────────────────────────────────────────────

  test('applies disabled class when disabled', () => {
    const wrapper = mount(
      <ScrollSpy disabled={true}>
        <ScrollSpyAnchor name="a">
          <div class="title">A</div>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.find('.s-scroll-spy.is-disabled').exists()).toBe(true)
  })

  test('does not apply disabled class by default', () => {
    const wrapper = mount(
      <ScrollSpy>
        <ScrollSpyAnchor name="a">
          <div class="title">A</div>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.find('.s-scroll-spy.is-disabled').exists()).toBe(false)
  })

  // ── modelValue ───────────────────────────────────────────────────

  test('renders with modelValue', () => {
    const wrapper = mount(
      <ScrollSpy modelValue="b">
        <ScrollSpyAnchor name="a">
          <div class="title">A</div>
        </ScrollSpyAnchor>
        <ScrollSpyAnchor name="b">
          <div class="title">B</div>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.find('.s-scroll-spy').exists()).toBe(true)
  })

  // ── offset prop ──────────────────────────────────────────────────

  test('renders with offset prop', () => {
    const wrapper = mount(
      <ScrollSpy offset={50}>
        <ScrollSpyAnchor name="a">
          <div class="title">A</div>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.find('.s-scroll-spy').exists()).toBe(true)
  })

  // ── anchor registration ──────────────────────────────────────────

  test('throws when ScrollSpyAnchor is used outside ScrollSpy', () => {
    expect(() =>
      mount(
        <ScrollSpyAnchor name="a">
          <div>A</div>
        </ScrollSpyAnchor>,
      ),
    ).toThrow('ScrollSpyAnchor must be included in ScrollSpy.')
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('renders without anchors', () => {
    const wrapper = mount(<ScrollSpy />)

    expect(wrapper.find('.s-scroll-spy').exists()).toBe(true)
  })

  test('renders with numeric anchor names', () => {
    const wrapper = mount(
      <ScrollSpy modelValue={0}>
        <ScrollSpyAnchor name={0}>
          <div class="title">0</div>
        </ScrollSpyAnchor>
        <ScrollSpyAnchor name={1}>
          <div class="title">1</div>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.findAll('.title')).toHaveLength(2)
  })

  test('renders anchor content via default slot', () => {
    const wrapper = mount(
      <ScrollSpy>
        <ScrollSpyAnchor name="test">
          <span class="custom-content">Custom content</span>
        </ScrollSpyAnchor>
      </ScrollSpy>,
    )

    expect(wrapper.find('.custom-content').text()).toBe('Custom content')
  })
})
