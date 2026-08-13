import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Tabbar from '../tabbar.vue'
import TabbarItem from '../tabbar-item.vue'

const createChildren = () => {
  return [
    <TabbarItem
      name={0}
      text="首页"
      v-slots={{
        icon: () => <span class="home-icon">H</span>,
      }}
    />,
    <TabbarItem
      name={1}
      text="购物车"
      v-slots={{
        icon: () => <span class="cart-icon">C</span>,
      }}
    />,
    <TabbarItem
      name={2}
      text="消息"
      v-slots={{
        icon: () => <span class="message-icon">M</span>,
      }}
    />,
    <TabbarItem
      name={3}
      text="我的"
      v-slots={{
        icon: () => <span class="profile-icon">P</span>,
      }}
    />,
  ]
}

const createChildren2 = () => {
  return [
    <TabbarItem name={0} text="首页" />,
    <TabbarItem name={1} text="购物车" />,
    <TabbarItem name={2}>
      <div class="message-with-badge">
        <span class="label">消息</span>
        <span class="badge">5</span>
      </div>
    </TabbarItem>,
    <TabbarItem name={3}>
      <div class="profile-with-dot">
        <span class="label">我的</span>
        <span class="dot"></span>
      </div>
    </TabbarItem>,
  ]
}

const createChildren3 = () => {
  return [
    <TabbarItem name={0} text="首页" />,
    <TabbarItem name={1} text="购物车" />,
    <TabbarItem>
      <div class="content">内容</div>
    </TabbarItem>,
    <TabbarItem name={2} text="消息" />,
    <TabbarItem name={3} text="我的" />,
  ]
}

describe('Tabbar', () => {
  test('basic', async () => {
    const wrapper = mount(<Tabbar current={1}>{createChildren()}</Tabbar>)

    expect(wrapper.findAll('.s-tabbar__item')[1].classes()).toContain('s-tabbar__item--current')
    expect(wrapper.find('.s-tabbar__item:nth-child(3) .s-tabbar__text').text()).toBe('消息')
    expect(wrapper.find('.s-tabbar__item:nth-child(3) .message-icon').exists()).toBe(true)
  })

  test('color', async () => {
    const wrapper = mount(
      <Tabbar current={1} activeColor="red">
        {createChildren()}
      </Tabbar>,
    )

    expect(wrapper.find('.s-tabbar__item--current').attributes('style')).toContain('color: red;')
  })

  test('badge', async () => {
    const wrapper = mount(
      <Tabbar current={1} activeColor="red">
        {createChildren2()}
      </Tabbar>,
    )

    expect(wrapper.find('.s-tabbar__item:nth-child(3) .badge').text()).toBe('5')
    expect(wrapper.find('.s-tabbar__item:nth-child(4) .dot').exists()).toBe(true)
  })

  test('bulge', async () => {
    const wrapper = mount(<Tabbar current={1}>{createChildren3()}</Tabbar>)

    expect(wrapper.find('.s-tabbar__item:nth-child(3) .content').text()).toBe('内容')
  })

  test('fixed', async () => {
    const wrapper = mount(
      <Tabbar current={1} fixed>
        {createChildren3()}
      </Tabbar>,
    )

    expect(wrapper.classes()).toContain('s-tabbar--fixed')
  })

  test('safeAreaInsetBottom', async () => {
    const wrapper = mount(
      <Tabbar current={1} safeAreaInsetBottom>
        {createChildren3()}
      </Tabbar>,
    )

    expect(wrapper.classes()).toContain('s-tabbar--safe')
  })
})
