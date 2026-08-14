import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import FloatingPanel from '../floating-panel.vue'

describe('FloatingPanel', () => {
  test('renders root with safe modifier by default', () => {
    const wrapper = mount(<FloatingPanel>内容</FloatingPanel>)

    const root = wrapper.find('.s-floating-panel')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('s-floating-panel--safe')
    expect(wrapper.find('.s-floating-panel__header').exists()).toBe(true)
    expect(wrapper.find('.s-floating-panel__header-bar').exists()).toBe(true)
    expect(wrapper.find('.s-floating-panel__body').exists()).toBe(true)
    expect(wrapper.text()).toContain('内容')
  })

  test('safeAreaInsetBottom false removes safe modifier', () => {
    const wrapper = mount(<FloatingPanel safeAreaInsetBottom={false} />)

    expect(wrapper.find('.s-floating-panel').classes()).not.toContain('s-floating-panel--safe')
  })

  test('anchors and height drive style', async () => {
    const wrapper = mount(<FloatingPanel anchors={[100, 300]} height={200} />)

    const style = wrapper.attributes('style') || ''

    expect(style).toContain('calc(100% - 200px)')
    expect(style).toContain('height: 300px')
  })

  test('default anchors fall back to first anchor and 60% viewport height', () => {
    const wrapper = mount(<FloatingPanel />)

    const style = wrapper.attributes('style') || ''

    expect(style).toContain('calc(100% - 100px)')
    expect(style).toContain(`height: ${~~(window.innerHeight * 0.6)}px`)
  })
})
