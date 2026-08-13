import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Card from '../card.vue'
import Collapse from '../../collapse/collapse.vue'

describe('Card', () => {
  test('create', async () => {
    const wrapper = mount(
      <Card title="标题" extra="额外内容" footer="底部">
        <div>内容</div>
      </Card>,
    )

    expect(wrapper.find('.s-card__title').text()).toBe('标题')
    expect(wrapper.find('.s-card__extra').text()).toBe('额外内容')
    expect(wrapper.find('.s-card__body').text()).toBe('内容')
    expect(wrapper.find('.s-card__footer').text()).toBe('底部')
  })

  test('borderless', async () => {
    const wrapper = mount(
      <Card title="标题" extra="额外内容" footer="底部" hideFooterBorder hideHeaderBorder>
        <div>内容</div>
      </Card>,
    )

    expect(wrapper.classes()).toContain('s-card--head-borderless')
    expect(wrapper.classes()).toContain('s-card--foot-borderless')
  })

  test('collapsed', async () => {
    const wrapper = mount(
      <Card title="标题" extra="额外内容" footer="底部" collapsible collapsed={false}>
        <div>内容</div>
      </Card>,
    )

    expect(wrapper.findComponent(Collapse).props('visible')).toBe(true)
    expect(wrapper.classes()).not.toContain('s-card--collapsed')

    await wrapper.setProps({
      collapsed: true,
    })

    expect(wrapper.findComponent(Collapse).props('visible')).toBe(false)
    expect(wrapper.classes()).toContain('s-card--collapsed')
  })

  test('slots override title extra and footer', async () => {
    const wrapper = mount(
      <Card
        title="标题"
        extra="额外内容"
        footer="底部"
        v-slots={{
          title: () => <div class="title-slot">自定义标题</div>,
          extra: () => <div class="extra-slot">自定义额外内容</div>,
          footer: () => <div class="footer-slot">自定义底部</div>,
        }}
      >
        <div>内容</div>
      </Card>,
    )

    expect(wrapper.find('.title-slot').text()).toBe('自定义标题')
    expect(wrapper.find('.extra-slot').text()).toBe('自定义额外内容')
    expect(wrapper.find('.footer-slot').text()).toBe('自定义底部')
  })

  test('headless and footless reflect missing content', async () => {
    const wrapper = mount(
      <Card>
        <div>内容</div>
      </Card>,
    )

    expect(wrapper.classes()).toContain('s-card--headless')
    expect(wrapper.classes()).toContain('s-card--footless')
    expect(wrapper.find('.s-card__header').exists()).toBe(false)
    expect(wrapper.find('.s-card__footer').exists()).toBe(false)
  })
})
