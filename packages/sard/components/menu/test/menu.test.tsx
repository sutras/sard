import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Menu from '../menu.vue'
import MenuItem from '../menu-item.vue'

describe('Menu', () => {
  test('renders items with vertical and light modifiers by default', () => {
    const wrapper = mount(
      <Menu>
        <MenuItem label="选项1" value={1} />
        <MenuItem label="选项2" value={2} />
      </Menu>,
    )

    const root = wrapper.find('.s-menu')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('s-menu--vertical')
    expect(root.classes()).toContain('s-menu--light')

    const items = wrapper.findAll('.s-menu__item')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toBe('选项1')
    expect(items[1].text()).toBe('选项2')
  })

  test('clicking item emits select and click', async () => {
    const wrapper = mount(
      <Menu>
        <MenuItem label="选项1" value={1} />
        <MenuItem label="选项2" value={2} />
      </Menu>,
    )

    await wrapper.findAll('.s-menu__item')[0].trigger('click')

    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.emitted('select')?.[0]?.[0]).toEqual(
      expect.objectContaining({ label: '选项1', value: 1 }),
    )

    expect(wrapper.findComponent(MenuItem).emitted('click')).toHaveLength(1)
  })

  test('disabled item does not emit select', async () => {
    const wrapper = mount(
      <Menu>
        <MenuItem label="选项1" value={1} />
        <MenuItem label="选项2" value={2} disabled />
      </Menu>,
    )

    const item = wrapper.findAll('.s-menu__item')[1]
    expect(item.classes()).toContain('is-disabled')

    await item.trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })

  test('direction and theme modifiers follow props', async () => {
    const wrapper = mount(
      <Menu direction="horizontal" theme="dark">
        <MenuItem label="选项1" />
      </Menu>,
    )

    const root = wrapper.find('.s-menu')
    expect(root.classes()).toContain('s-menu--horizontal')
    expect(root.classes()).toContain('s-menu--dark')

    await wrapper.setProps({ direction: 'vertical', theme: 'light' })

    expect(root.classes()).toContain('s-menu--vertical')
    expect(root.classes()).toContain('s-menu--light')
  })

  test('has-icon modifier and icon slot rendering', async () => {
    const wrapper = mount(
      <Menu>
        <MenuItem label="选项1">
          {{
            icon: () => <i class="icon"></i>,
          }}
        </MenuItem>
      </Menu>,
    )

    await nextTick()

    expect(wrapper.find('.s-menu').classes()).toContain('has-icon')
    expect(wrapper.find('.s-menu__icon').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
  })
})
