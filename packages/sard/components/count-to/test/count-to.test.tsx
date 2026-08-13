import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import CountTo from '../count-to.vue'
import { sleep } from '../../../utils'

async function waitForValue(wrapper: ReturnType<typeof mount>, expected: string, timeout = 200) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    if (wrapper.text() === expected) {
      return
    }
    await sleep(10)
  }
  throw new Error(`Timed out waiting for "${expected}", got "${wrapper.text()}"`)
}

describe('CountTo', () => {
  test('basic', async () => {
    const wrapper = mount(<CountTo value={500} duration={10} />)

    await waitForValue(wrapper, '500')
    expect(wrapper.text()).toBe('500')
  })

  test('precision', async () => {
    const wrapper = mount(<CountTo value={500} duration={10} precision={2} />)

    await waitForValue(wrapper, '500.00')
    expect(wrapper.text()).toBe('500.00')
  })

  test('separator', async () => {
    const wrapper = mount(<CountTo value={5000} duration={10} precision={2} separator="," />)

    await waitForValue(wrapper, '5,000.00')
    expect(wrapper.text()).toBe('5,000.00')
  })

  test('separatorDigit', async () => {
    const wrapper = mount(
      <CountTo value={50000} duration={10} precision={2} separator="," separatorDigit={4} />,
    )

    await waitForValue(wrapper, '5,0000.00')
    expect(wrapper.text()).toBe('5,0000.00')
  })

  test('duration', async () => {
    const wrapper = mount(<CountTo value={500} duration={10} />)

    await sleep(2)
    expect(+wrapper.text()).toBeLessThan(500)

    await waitForValue(wrapper, '500')
    expect(wrapper.text()).toBe('500')
  })
})
