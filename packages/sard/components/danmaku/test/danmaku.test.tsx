import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Danmaku from '../danmaku.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

const animateDurations: number[] = []

Element.prototype.animate = function (_keyframes: unknown, options?: unknown) {
  animateDurations.push((options as { duration?: number } | undefined)?.duration ?? 0)
  return {
    pause() {},
    play() {},
    cancel() {},
    onfinish: null,
  } as unknown as Animation
}

const genList = (n: number) => Array.from({ length: n }, (_, i) => ({ text: `弹幕 ${i + 1}` }))

describe('Danmaku', () => {
  test('basic', async () => {
    const wrapper = mount(Danmaku, {
      props: { list: genList(10), autoPlay: false },
    })

    await nextTick()

    expect(wrapper.find('.s-danmaku').exists()).toBe(true)
    expect(wrapper.findAll('.s-danmaku__track').length).toBe(3)
  })

  test('rows', async () => {
    const wrapper = mount(Danmaku, {
      props: { list: genList(10), rows: 4, autoPlay: false },
    })

    await nextTick()

    expect(wrapper.findAll('.s-danmaku__track').length).toBe(4)
  })

  test('expose', () => {
    const wrapper = mount(Danmaku, {
      props: { list: genList(10), autoPlay: false },
    })

    const vm = wrapper.vm as unknown as {
      play: () => void
      pause: () => void
      resume: () => void
      stop: () => void
      send: (item: { text: string }) => void
    }

    expect(typeof vm.play).toBe('function')
    expect(typeof vm.pause).toBe('function')
    expect(typeof vm.resume).toBe('function')
    expect(typeof vm.stop).toBe('function')
    expect(typeof vm.send).toBe('function')
  })

  test('send and play', async () => {
    const wrapper = mount(Danmaku, {
      props: { list: genList(3), autoPlay: false },
    })

    const vm = wrapper.vm as unknown as {
      play: () => void
      send: (item: { text: string }) => void
    }

    vm.send({ text: '新的弹幕' })
    vm.play()

    await nextTick()

    const items = wrapper.findAll('.s-danmaku__item')
    expect(items.length).toBeGreaterThan(0)

    wrapper.unmount()
  })

  test('speedRange', async () => {
    animateDurations.length = 0

    const random = vi.spyOn(Math, 'random')
    random.mockReturnValueOnce(0).mockReturnValueOnce(1)

    const wrapper = mount(Danmaku, {
      props: { list: genList(2), rows: 2, speedRange: 50, autoPlay: false },
    })

    const vm = wrapper.vm as unknown as { play: () => void }
    vm.play()
    await nextTick()

    const durations = [...animateDurations]
    random.mockRestore()
    wrapper.unmount()

    expect(durations).toHaveLength(2)
    // 两条弹幕速度分别为 speed-50 与 speed+50，穿过时长应当不同
    expect(durations[0]).not.toBe(durations[1])
  })

  test('stop then play restarts', async () => {
    const wrapper = mount(Danmaku, {
      props: { list: genList(3), autoPlay: false },
    })

    const vm = wrapper.vm as unknown as { play: () => void; stop: () => void }

    vm.play()
    await nextTick()
    expect(wrapper.findAll('.s-danmaku__item').length).toBeGreaterThan(0)

    vm.stop()
    await nextTick()
    expect(wrapper.findAll('.s-danmaku__item').length).toBe(0)

    vm.play()
    await nextTick()
    expect(wrapper.findAll('.s-danmaku__item').length).toBeGreaterThan(0)

    wrapper.unmount()
  })

  test('resume keeps the per-track wait (no overlap after a long pause)', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)

    const wrapper = mount(Danmaku, {
      props: { list: genList(2), rows: 1, autoPlay: false },
    })

    const vm = wrapper.vm as unknown as {
      play: () => void
      pause: () => void
      resume: () => void
    }

    vm.play()
    await nextTick()
    expect(wrapper.findAll('.s-danmaku__item')).toHaveLength(1)

    vm.pause()
    // 模拟长时间隐藏后恢复
    vi.setSystemTime(60_000)
    vm.resume()
    await nextTick()

    // 恢复后不应立刻再发一条，否则会与冻结在屏上的那条重叠
    expect(wrapper.findAll('.s-danmaku__item')).toHaveLength(1)

    wrapper.unmount()
    vi.useRealTimers()
  })
})
