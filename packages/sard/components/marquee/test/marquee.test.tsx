import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Marquee from '../marquee.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

const genData = () => {
  return '赵钱孙李周吴郑王'.split('').map((item) => `恭喜${item}**获得丰厚奖品`)
}

describe('Marquee', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Marquee>
        {[...genData(), ...genData()].map((item) => (
          <div>{item}</div>
        ))}
      </Marquee>,
    )

    await nextTick()

    expect(wrapper.find('.s-marquee').exists()).toBe(true)
    expect(wrapper.find('.s-marquee__wrapper').exists()).toBe(true)
  })

  test('horizontal', async () => {
    const wrapper = mount(
      <Marquee direction="horizontal">
        {[...genData(), ...genData()].map((item) => (
          <div>{item}</div>
        ))}
      </Marquee>,
    )

    await nextTick()

    expect(wrapper.classes()).toContain('s-marquee--horizontal')
  })
})
