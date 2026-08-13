import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Collapse from '../collapse.vue'
import { sleep } from '../../../utils'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Collapse', () => {
  test('create', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      function (this: HTMLElement) {
        return {
          x: 0,
          y: 0,
          left: 0,
          top: 0,
          right: 200,
          bottom: 200,
          width: 200,
          height: 200,
          toJSON() {},
        } as DOMRect
      },
    )

    const wrapper = mount(
      <Collapse visible={false}>
        <div style="width: 200px; height: 200px"></div>
      </Collapse>,
    )

    expect(wrapper.attributes('style')).toContain('height: 0px;')
    expect(wrapper.attributes('style')).toContain('overflow: hidden;')

    await wrapper.setProps({
      visible: true,
    })
    await sleep(50)
    await sleep(0)
    await nextTick()

    expect(wrapper.attributes('style')).toContain('height: 200px;')

    await wrapper.setProps({
      visible: false,
    })
    await sleep(50)
    await nextTick()

    expect(wrapper.attributes('style')).toContain('height: 0px;')
    expect(wrapper.attributes('style')).toContain('overflow: hidden;')
  })
})
