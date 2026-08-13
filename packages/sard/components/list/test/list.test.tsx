import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import List from '../list.vue'
import ListItem from '../list-item.vue'

describe('List', () => {
  test('basic', async () => {
    const wrapper = mount(
      <List>
        <ListItem title="标题" value="值" description="描述" />
      </List>,
    )

    expect(wrapper.find('.s-list-item__title').text()).toBe('标题描述')
    expect(wrapper.find('.s-list-item__description').text()).toBe('描述')
    expect(wrapper.find('.s-list-item__value').text()).toBe('值')
  })

  test('hoverArrow', async () => {
    const wrapper = mount(
      <List>
        <ListItem hover arrow title="标题" />
      </List>,
    )

    const item = wrapper.find('.s-list-item')
    expect(item.classes()).toContain('s-list-item--hover')
    expect(wrapper.find('.s-list-item__arrow').exists()).toBe(true)
    expect(wrapper.find('.s-list-item__arrow svg').exists()).toBe(true)
  })

  test('arrowDirection', async () => {
    const wrapper = mount(
      <List>
        <ListItem arrow arrowDirection="up" />
      </List>,
    )

    expect(wrapper.find('.s-list-item__arrow').exists()).toBe(true)
    expect(wrapper.find('.s-list-item__arrow svg').exists()).toBe(true)
  })

  test('iconSlot', async () => {
    const wrapper = mount(
      <List>
        <ListItem
          v-slots={{
            icon: () => '图标',
          }}
        />
      </List>,
    )

    expect(wrapper.find('.s-list-item__icon').exists()).toBe(true)
    expect(wrapper.find('.s-list-item__icon').text()).toBe('图标')
  })

  test('slot', async () => {
    const wrapper = mount(
      <List>
        <ListItem
          v-slots={{
            title: () => '标题',
            value: () => '值',
          }}
        />
      </List>,
    )

    expect(wrapper.find('.s-list-item__title').text()).toBe('标题')
    expect(wrapper.find('.s-list-item__value').text()).toBe('值')
  })

  test('defaultSlot', async () => {
    const wrapper = mount(
      <List>
        <ListItem
          v-slots={{
            title: () => '标题',
            default: () => '默认插槽',
          }}
        />
      </List>,
    )

    expect(wrapper.find('.s-list-item__title').exists()).toBe(false)
    expect(wrapper.find('.s-list-item').classes()).toContain('s-list-item--custom')
    expect(wrapper.find('.s-list-item').text()).toBe('默认插槽')
  })

  test('group', async () => {
    const wrapper = mount(
      <List title="分组标题" description="分组描述" card>
        <ListItem title="标题" value="值" />
        <ListItem title="标题" value="值" />
      </List>,
    )

    expect(wrapper.classes()).toContain('s-list--card')
    expect(wrapper.find('.s-list__title').text()).toBe('分组标题')
    expect(wrapper.find('.s-list__description').text()).toBe('分组描述')
  })

  test('hide-border', async () => {
    const wrapper = mount(
      <List hideBorder card>
        <ListItem title="标题" value="值" />
        <ListItem title="标题" value="值" />
        <ListItem title="标题" value="值" />
      </List>,
    )

    expect(wrapper.classes()).toContain('s-list--borderless')
    expect(
      wrapper
        .findAll('.s-list-item')
        .every((item) => item.classes().includes('s-list-item--borderless')),
    ).toBe(true)
  })
})
