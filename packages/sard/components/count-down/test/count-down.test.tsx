import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import CountDown from '../count-down.vue'

describe('CountDown', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  test('time', async () => {
    vi.useFakeTimers()

    const wrapper = mount(<CountDown time={1000 * 60 * 60 * 2} />)

    expect(wrapper.text()).toBe('02:00:00')

    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.text()).toBe('01:59:59')
  })

  test('autoStart', async () => {
    vi.useFakeTimers()

    const wrapper = mount(<CountDown time={1000 * 60 * 60 * 2} autoStart={false} />)

    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.text()).toBe('02:00:00')
  })

  test('format', async () => {
    const wrapper = mount(<CountDown time={1000 * 60 * 60 * 2} format="HH 时 mm 分 ss 秒" />)

    expect(wrapper.text()).toBe('02 时 00 分 00 秒')
  })

  test('millisecond', async () => {
    const wrapper = mount(
      <CountDown time={1000 * 60 * 60 * 2} format="HH 时 mm 分 ss 秒 SSS 毫秒" millisecond />,
    )

    expect(wrapper.text()).toBe('02 时 00 分 00 秒 000 毫秒')
  })
})
