import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Overlay from '../overlay.vue'

describe('Overlay', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Overlay visible transparent zIndex={10} background="rgb(1, 2, 3)">
        内容
      </Overlay>,
    )

    const overlay = wrapper.find('.s-overlay')

    expect(overlay.exists()).toBe(true)
    expect(overlay.classes()).toContain('s-overlay--transparent')
    expect(overlay.attributes('style')).toContain('z-index: 10;')
    expect(overlay.attributes('style')).toContain('background-color: rgb(1, 2, 3);')
    expect(overlay.text()).toBe('内容')

    await overlay.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
  })
})
