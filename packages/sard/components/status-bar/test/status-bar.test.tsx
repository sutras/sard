import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import StatusBar from '../status-bar.vue'

describe('StatusBar', () => {
  test('basic', () => {
    const wrapper = mount(<StatusBar />)

    const statusBar = wrapper.find('.s-status-bar')

    expect(statusBar.exists()).toBe(true)
    expect(statusBar.attributes('style')).toContain('height: 0px;')
  })

  test('reverse', () => {
    const wrapper = mount(<StatusBar reverse />)

    const statusBar = wrapper.find('.s-status-bar')

    expect(statusBar.attributes('style')).toContain('width: 0px;')
    expect(statusBar.attributes('style')).not.toContain('height: 0px;')
  })
})
