import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Ellipsis from '../ellipsis.vue'
import { sleep } from '../../../utils'

class ResizeObserverMock {
  constructor(private callback: ResizeObserverCallback) {}

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentBoxSize: [{ inlineSize: 200, blockSize: 20 }],
        } as unknown as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    )
  }

  unobserve() {}
  disconnect() {}
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Ellipsis', () => {
  test('shows original content when there is no overflow', async () => {
    const originalResizeObserver = globalThis.ResizeObserver
    ;(globalThis as any).ResizeObserver = ResizeObserverMock

    let callCount = 0
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        callCount += 1
        const className = this.className

        if (String(className).includes('s-ellipsis__measure--line')) {
          return {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: 200,
            bottom: 20,
            width: 200,
            height: 20,
            toJSON() {},
          } as DOMRect
        }

        return {
          x: 0,
          y: 0,
          left: 0,
          top: 0,
          right: 200,
          bottom: 20,
          width: 200,
          height: 20,
          toJSON() {},
        } as DOMRect
      })

    const wrapper = mount(<Ellipsis content="这是一段不会被截断的文本。" />)

    await nextTick()
    await nextTick()
    await sleep(0)

    expect(wrapper.find('.s-ellipsis__content').text()).toBe('这是一段不会被截断的文本。')
    expect(wrapper.find('.s-ellipsis__action').exists()).toBe(false)

    rectSpy.mockRestore()
    ;(globalThis as any).ResizeObserver = originalResizeObserver
  })

  test('toggles expanded state and emits change', async () => {
    const originalResizeObserver = globalThis.ResizeObserver
    ;(globalThis as any).ResizeObserver = ResizeObserverMock

    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        const className = String(this.className)

        if (className.includes('s-ellipsis__measure--line')) {
          return {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: 200,
            bottom: 20,
            width: 200,
            height: 20,
            toJSON() {},
          } as DOMRect
        }

        if (className.includes('s-ellipsis__measure')) {
          return {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: 200,
            bottom: 40,
            width: 200,
            height: 40,
            toJSON() {},
          } as DOMRect
        }

        return {
          x: 0,
          y: 0,
          left: 0,
          top: 0,
          right: 200,
          bottom: 60,
          width: 200,
          height: 60,
          toJSON() {},
        } as DOMRect
      })

    const wrapper = mount(
      <Ellipsis
        content="这是一段比较长的文本内容，这是一段比较长的文本内容。"
        expandText="展开"
        collapseText="收起"
      />,
    )

    await nextTick()
    await nextTick()
    await sleep(0)

    const action = wrapper.find('.s-ellipsis__content > .s-ellipsis__action')

    expect(action.exists()).toBe(true)
    expect(action.text()).toBe('展开')

    await action.trigger('click')

    expect(wrapper.emitted('change')?.[0]).toEqual([true])
    expect(wrapper.find('.s-ellipsis__action').text()).toBe('收起')

    rectSpy.mockRestore()
    ;(globalThis as any).ResizeObserver = originalResizeObserver
  })
})
