import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import TabbarPit from '../tabbar-pit.vue'

describe('TabbarPit', () => {
  test('basic', () => {
    const wrapper = mount(
      <TabbarPit>
        <div class="content">内容</div>
      </TabbarPit>,
    )

    expect(wrapper.find('.s-tabbar-pit').exists()).toBe(true)
    expect(wrapper.find('.s-tabbar-pit').classes()).not.toContain('s-tabbar-pit--safe')
    expect(wrapper.find('.content').text()).toBe('内容')
  })

  test('safeAreaInsetBottom', () => {
    const wrapper = mount(<TabbarPit safeAreaInsetBottom />)

    expect(wrapper.find('.s-tabbar-pit').classes()).toContain('s-tabbar-pit--safe')
  })
})
