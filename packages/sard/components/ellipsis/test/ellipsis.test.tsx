import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Ellipsis from '../ellipsis.vue'
import { sleep } from '../../../utils'

const WIDTH = 200
const LINE_HEIGHT = 20

const createRect = (width: number, height: number) =>
  ({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height,
    toJSON: () => ({}),
  }) as DOMRect

class ResizeObserverMock {
  constructor(private callback: ResizeObserverCallback) {}

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: { width: WIDTH, height: LINE_HEIGHT },
        } as unknown as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    )
  }

  unobserve() {}

  disconnect() {}
}

let cleanup: (() => void) | undefined

/** 所有元素都量成同一高度：永远不会溢出 */
function mockFlatLayout(height = LINE_HEIGHT) {
  const spy = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => createRect(WIDTH, height))

  cleanup = () => spy.mockRestore()
}

/**
 * 假排版：测量层里每 CHARS_PER_LINE 个字一行、行高 LINE_HEIGHT。
 * 单行探测（临时 nowrap）恒为一行高，与真实实现一致。
 */
function mockTextLayout(charsPerLine = 10) {
  const lengthOf = (el: HTMLElement) =>
    [...el.children].reduce(
      (total, child) =>
        (child as HTMLElement).style.display === 'none'
          ? total
          : total + Array.from(child.textContent ?? '').length,
      0,
    )

  const spy = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      if (!this.classList.contains('s-ellipsis__measure')) {
        return createRect(WIDTH, LINE_HEIGHT)
      }

      if (this.style.whiteSpace === 'nowrap') {
        return createRect(WIDTH, LINE_HEIGHT)
      }

      const lines = Math.max(1, Math.ceil(lengthOf(this) / charsPerLine))
      return createRect(WIDTH, lines * LINE_HEIGHT)
    })

  cleanup = () => spy.mockRestore()
}

const setupEnv = () => {
  const originalResizeObserver = globalThis.ResizeObserver
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
  return () => {
    ;(globalThis as any).ResizeObserver = originalResizeObserver
  }
}

afterEach(() => {
  cleanup?.()
  cleanup = undefined
  vi.restoreAllMocks()
})

const settle = async () => {
  await nextTick()
  await sleep(0)
}

describe('Ellipsis', () => {
  test('shows original content when there is no overflow', async () => {
    const restoreEnv = setupEnv()
    mockFlatLayout()

    const wrapper = mount(<Ellipsis content="这是一段不会被截断的文本。" />)
    await settle()

    expect(wrapper.find('.s-ellipsis__content').text()).toBe('这是一段不会被截断的文本。')
    expect(wrapper.find('.s-ellipsis__action').exists()).toBe(false)

    restoreEnv()
  })

  test('toggles expanded state and emits change', async () => {
    const restoreEnv = setupEnv()
    // 一行高 20、整段（含按钮）40：必然溢出
    mockTextLayout(10)
    const longText = '这是一段比较长的文本内容，这是一段比较长的文本内容。'

    const wrapper = mount(<Ellipsis content={longText} expandText="展开" collapseText="收起" />)
    await settle()

    const action = wrapper.find('.s-ellipsis__content > .s-ellipsis__action')

    expect(action.exists()).toBe(true)
    expect(action.text()).toBe('展开')
    // 40 个字符放不进 1 行，保留字数 ≤ 0，只剩省略号
    expect(wrapper.find('.s-ellipsis__content').text()).toContain('...')

    await action.trigger('click')

    expect(wrapper.emitted('change')?.[0]).toEqual([true])
    expect(wrapper.find('.s-ellipsis__action').text()).toBe('收起')
    // 展开后显示完整内容（按钮文本跟在后面）
    expect(wrapper.find('.s-ellipsis__content').text()).toContain(longText)

    restoreEnv()
  })

  test('二分出能塞进 rows 行的最多字符数', async () => {
    const restoreEnv = setupEnv()
    // 每行 10 个字、行高 20，rows=2 ⇒ 最多 20 个字；省略号占 3 个 ⇒ 正文保留 17 个
    mockTextLayout(10)

    const wrapper = mount(<Ellipsis content={'a'.repeat(30)} rows={2} />)
    await settle()

    expect(wrapper.find('.s-ellipsis__content').text()).toBe(`${'a'.repeat(17)}...`)

    restoreEnv()
  })

  test('rows 行都放得下时不截断', async () => {
    const restoreEnv = setupEnv()
    mockTextLayout(10)

    const wrapper = mount(<Ellipsis content={'a'.repeat(18)} rows={2} />)
    await settle()

    expect(wrapper.find('.s-ellipsis__content').text()).toBe('a'.repeat(18))

    restoreEnv()
  })

  test('start / middle 两种省略位置按保留字数切分', async () => {
    const restoreEnv = setupEnv()
    mockTextLayout(10)

    const start = mount(<Ellipsis content={'b'.repeat(30)} rows={2} position="start" />)
    await settle()
    expect(start.find('.s-ellipsis__content').text()).toBe(`...${'b'.repeat(17)}`)
    start.unmount()

    cleanup?.()
    mockTextLayout(10)

    const middle = mount(<Ellipsis content={'c'.repeat(30)} rows={2} position="middle" />)
    await settle()
    // 17 个：左边 9 个 + 省略号 + 右边 8 个
    expect(middle.find('.s-ellipsis__content').text()).toBe(`${'c'.repeat(9)}...${'c'.repeat(8)}`)

    restoreEnv()
  })
})
