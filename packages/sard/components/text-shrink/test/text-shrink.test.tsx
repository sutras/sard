import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import TextShrink from '../text-shrink.vue'

const AVAILABLE_WIDTH = 100
const LINE_HEIGHT = 1.5
const TEXT_LENGTH = 20
const TEXT = 'a'.repeat(TEXT_LENGTH)

const createRect = (width: number, height: number) =>
  ({
    width,
    height,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    toJSON: () => ({}),
  }) as DOMRect

/** 用一个可预测的假布局替换 jsdom 的 0 尺寸：每个字符宽 1em，行高 1.5em */
function mockLayout(stats?: { probes: number }, subpixel = 0) {
  const measureOf = (el: Element | null | undefined) =>
    el?.closest('.s-text-shrink__measure') as HTMLElement | null

  /** 被测字号取自测量层的 inline style，与组件写入的值一致 */
  const probeFontSize = (el: Element | null | undefined) =>
    Number.parseFloat(measureOf(el)?.style.fontSize ?? '') || 16

  /** 假布局里的文本尺寸：每个字符宽 1em，行高 1.5em */
  const textOf = (node: Node) => {
    const host = node.nodeType === 1 ? (node as Element) : node.parentElement
    return { length: node.textContent?.length ?? 0, size: probeFontSize(host) }
  }

  const rectSpy = vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(function (this: HTMLElement) {
      // 可见文本层 / 根元素的宽度就是可用宽度
      return createRect(AVAILABLE_WIDTH, probeFontSize(this) * LINE_HEIGHT)
    })

  const rangeLinesSpy = patchRangeMethod('getClientRects', function (this: Range) {
    if (stats) {
      stats.probes += 1
    }
    const { length, size } = textOf(this.startContainer)
    const count = Math.max(1, Math.ceil((length * size) / AVAILABLE_WIDTH))
    return Array.from({ length: count }, () =>
      createRect(AVAILABLE_WIDTH, size * LINE_HEIGHT),
    ) as unknown as DOMRectList
  })

  const rangeRectSpy = patchRangeMethod('getBoundingClientRect', function (this: Range) {
    if (stats) {
      stats.probes += 1
    }
    const { length, size } = textOf(this.startContainer)
    return createRect(length * size + subpixel, size * LINE_HEIGHT)
  })

  const widthSpy = vi
    .spyOn(Element.prototype, 'clientWidth', 'get')
    .mockImplementation(function (this: Element) {
      return this.classList.contains('s-text-shrink') ? AVAILABLE_WIDTH : 0
    })

  return () => {
    rectSpy.mockRestore()
    rangeLinesSpy()
    rangeRectSpy()
    widthSpy.mockRestore()
  }
}

/**
 * jsdom 没实现 Range 的几何方法（原型上根本没有这两个属性），
 * 所以不能 spyOn，直接补在原型上，用完再删掉。
 */
function patchRangeMethod(
  name: 'getClientRects' | 'getBoundingClientRect',
  impl: (this: Range) => DOMRect | DOMRectList,
) {
  const proto = Range.prototype as unknown as Record<string, unknown>
  const owned = Object.prototype.hasOwnProperty.call(proto, name)
  const original = proto[name]

  proto[name] = impl

  return () => {
    if (owned) {
      proto[name] = original
    } else {
      delete proto[name]
    }
  }
}

/** 等待一帧，让 watch 里的 rAF 调度真正执行 */
const flushFrame = async () => {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 60))
  await nextTick()
}

const fontSizeOf = (wrapper: ReturnType<typeof mount>) => {
  const el = wrapper.find('.s-text-shrink__text').element as HTMLElement
  return el.style.fontSize
}

/**
 * 文本层里同时有可见文本和隐藏的测量层（两者内容相同），
 * 取可见文本时只看文本层的直接文本子节点。
 */
const visibleTextOf = (wrapper: ReturnType<typeof mount>) => {
  const el = wrapper.find('.s-text-shrink__text').element
  return Array.from(el.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent ?? '')
    .join('')
    .trim()
}

let restoreLayout: (() => void) | undefined

afterEach(() => {
  restoreLayout?.()
  restoreLayout = undefined
})

const mountShrink = (props: Record<string, unknown>, stats?: { probes: number }) => {
  restoreLayout = mockLayout(stats)
  return mount(TextShrink, { props })
}

describe('TextShrink', () => {
  test('单行放不下时缩小到刚好完整显示的字号', async () => {
    const wrapper = mountShrink({ text: TEXT })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('5px')
    expect(wrapper.find('.s-text-shrink__text').classes()).toContain('s-text-shrink__text--nowrap')
    expect(visibleTextOf(wrapper)).toBe(TEXT)
  })

  test('测量层嵌在文本层内部，字体属性靠继承而不是 JS 搬运', async () => {
    const wrapper = mountShrink({ text: TEXT, maxLines: 2 })
    await nextTick()

    const text = wrapper.find('.s-text-shrink__text').element
    const measure = wrapper.find('.s-text-shrink__measure').element as HTMLElement

    // 必须与可见文本同属一棵继承链：兄弟结构下 letter-spacing / white-space /
    // word-break 这些属性不会被继承过去，只能在 JS 里逐个同步，漏一个就量不准
    expect(measure.parentElement).toBe(text)
    expect(measure.getAttribute('aria-hidden')).toBe('true')

    // 组件只写 font-size，不再往测量层上搬任何字体属性
    expect(measure.style.fontSize).not.toBe('')
    expect(measure.style.fontFamily).toBe('')
    expect(measure.style.letterSpacing).toBe('')
    expect(measure.style.whiteSpace).toBe('')
    expect(measure.style.wordBreak).toBe('')
  })

  test('放得下时保持基准字号', async () => {
    const wrapper = mountShrink({ text: 'abcd' })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('16px')
  })

  test('测量宽度贴近可用宽度时退让 0.1px，而不是溢出后被省略号吃掉末尾', async () => {
    // 模拟浏览器的取整误差：量到的宽度比真实渲染窄 0.3px。
    // 容差一旦放宽到 0.5px，就会选中 5px（真实宽度 100.3px > 100px），
    // 可见层溢出 0.3px，text-overflow 直接把末尾一个字换成省略号。
    restoreLayout = mockLayout(undefined, 0.3)
    const wrapper = mount(TextShrink, { props: { text: TEXT } })
    await nextTick()

    const size = Number.parseFloat(fontSizeOf(wrapper))
    expect(size * TEXT_LENGTH + 0.3).toBeLessThanOrEqual(AVAILABLE_WIDTH)
    wrapper.unmount()
  })

  test('多行模式在 maxLines 行内搜索最大字号', async () => {
    const wrapper = mountShrink({ text: TEXT, maxLines: 2 })
    await nextTick()

    // 20 个字符 × 字号 ≤ 2 行 × 100px ⇒ 字号 ≤ 10px
    expect(fontSizeOf(wrapper)).toBe('10px')
    expect(wrapper.find('.s-text-shrink__text').classes()).toContain('s-text-shrink__text--clamp')
  })

  test('baseFontSize 作为字号上界', async () => {
    const wrapper = mountShrink({ text: 'abcdefgh', baseFontSize: 20 })
    await nextTick()

    // 8 个字符在 20px 下宽 160px，超出 100px，缩到 12.5px
    expect(fontSizeOf(wrapper)).toBe('12.5px')
  })

  test('首次适配后固化基准字号，不再读取 computed font-size', async () => {
    const wrapper = mountShrink({ text: TEXT })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('5px')

    // 即便根元素字号的 computed 值变了，重算仍以首次固化的 16px 为上界
    ;(wrapper.find('.s-text-shrink').element as HTMLElement).style.fontSize = '30px'
    await wrapper.setProps({ text: 'abcde' })
    await flushFrame()

    expect(fontSizeOf(wrapper)).toBe('16px')
  })

  test('缩小到下限仍放不下时停在下限并标记溢出', async () => {
    const longText = 'a'.repeat(200)
    const wrapper = mountShrink({ text: longText })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('1px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(true)
  })

  test('minFontSize 处放不下时停在该字号并截断，不再继续缩小', async () => {
    // 20 个字符单行要缩到 5px 才放得下，下限设在 8px 时应该停在 8px
    const wrapper = mountShrink({ text: TEXT, minFontSize: 8 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('8px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(true)
  })

  test('minFontSize 处放得下时正常使用搜索出的更大字号', async () => {
    // 8 个字符缩到 12.5px 就够，下限 10px 不影响结果
    const wrapper = mountShrink({ text: 'abcdefgh', minFontSize: 10 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('12.5px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(false)
  })

  test('恰好在下限处放得下时完整显示，不触发截断', async () => {
    // 10 个字符在 10px 下正好 100px，贴着可用宽度
    const wrapper = mountShrink({ text: 'a'.repeat(10), minFontSize: 10 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('10px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(false)
  })

  test('minFontSize 变化时以固化的基准字号重新适配', async () => {
    const wrapper = mountShrink({ text: TEXT })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('5px')

    await wrapper.setProps({ minFontSize: 8 })
    await flushFrame()

    expect(fontSizeOf(wrapper)).toBe('8px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(true)

    // 放宽下限后应能重新缩回 5px，说明没有沿用上一次的截断结果
    await wrapper.setProps({ minFontSize: 1 })
    await flushFrame()

    expect(fontSizeOf(wrapper)).toBe('5px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(false)
  })

  test('minFontSize 非法值回退到内建下限', async () => {
    const wrapper = mountShrink({ text: 'a'.repeat(200), minFontSize: 0 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('1px')
  })

  test('minFontSize 大于 baseFontSize 时不会把字号放大', async () => {
    // 基准 10px、下限却给了 20px：上界仍以基准为准，放不下就停在 10px 并截断
    const wrapper = mountShrink({ text: TEXT, baseFontSize: 10, minFontSize: 20 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('10px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(true)
  })

  test('baseFontSize 与 minFontSize 相等时停在该字号并截断', async () => {
    const wrapper = mountShrink({ text: TEXT, baseFontSize: 10, minFontSize: 10 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('10px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(true)
  })

  test('baseFontSize 传 0 视为未传，回退到继承字号', async () => {
    const wrapper = mountShrink({ text: 'abcd', baseFontSize: 0 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('16px')
  })

  test('空文本保持基准字号且不标记溢出', async () => {
    const wrapper = mountShrink({ text: '' })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('16px')
    expect((wrapper.vm as unknown as { overflow: boolean }).overflow).toBe(false)
  })

  test('maxLines 为 0 或负数时按单行处理', async () => {
    const zero = mountShrink({ text: TEXT, maxLines: 0 })
    await nextTick()

    expect(fontSizeOf(zero)).toBe('5px')
    expect(zero.find('.s-text-shrink__text').classes()).toContain('s-text-shrink__text--nowrap')
    zero.unmount()

    restoreLayout?.()
    const negative = mountShrink({ text: TEXT, maxLines: -3 })
    await nextTick()

    expect(negative.find('.s-text-shrink__text').classes()).toContain('s-text-shrink__text--nowrap')
  })

  test('maxLines 变化时重新适配', async () => {
    const wrapper = mountShrink({ text: TEXT, maxLines: 1 })
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('5px')

    await wrapper.setProps({ maxLines: 2 })
    await flushFrame()

    expect(fontSizeOf(wrapper)).toBe('10px')
  })

  test('单行适配的测量次数受控（外推 + 填满后提前结束）', async () => {
    const stats = { probes: 0 }
    const wrapper = mountShrink({ text: TEXT }, stats)
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('5px')
    // 基准 / 下限各 1 次，外推 1 次就填满，再 1 次复核 0.1px 档
    expect(stats.probes).toBeLessThanOrEqual(5)
  })

  test('多行适配的测量次数受控（每轮只读一次几何）', async () => {
    const stats = { probes: 0 }
    const wrapper = mountShrink({ text: TEXT, maxLines: 2 }, stats)
    await nextTick()

    expect(fontSizeOf(wrapper)).toBe('10px')
    // 二分本身需要 ~9 轮（每轮只读 1 次几何），旧实现每轮读 2 次
    expect(stats.probes).toBeLessThanOrEqual(14)
  })

  test('卸载时断开 ResizeObserver 并取消未执行的 rAF', async () => {
    const disconnect = vi.fn<() => void>()
    const OriginalResizeObserver = globalThis.ResizeObserver
    let observedCallback: ResizeObserverCallback | undefined

    class ResizeObserverMock {
      constructor(callback: ResizeObserverCallback) {
        observedCallback = callback
      }
      observe() {}
      unobserve() {}
      disconnect = disconnect
    }

    ;(globalThis as any).ResizeObserver = ResizeObserverMock

    const cancelSpy = vi.spyOn(globalThis, 'cancelAnimationFrame')

    restoreLayout = mockLayout()
    const wrapper = mount(TextShrink, { props: { text: TEXT } })
    await nextTick()

    observerCallbackCheck(observedCallback)

    await wrapper.setProps({ text: 'abcdefgh' })
    wrapper.unmount()

    expect(disconnect).toHaveBeenCalled()
    expect(cancelSpy).toHaveBeenCalled()

    cancelSpy.mockRestore()
    ;(globalThis as any).ResizeObserver = OriginalResizeObserver
  })
})

/** 保证组件确实创建并 observe 了 ResizeObserver */
function observerCallbackCheck(callback: ResizeObserverCallback | undefined) {
  expect(typeof callback).toBe('function')
}
