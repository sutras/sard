import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Sidebar from '../sidebar.vue'
import SidebarItem from '../sidebar-item.vue'
import { sleep } from '../../../utils'

describe('Sidebar', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <Sidebar modelValue={'2'}>
        <SidebarItem name="1" title="标签名称" />
        <SidebarItem name="2" disabled title="标签名称" />
        <SidebarItem name="3" title="标签名称" />
      </Sidebar>,
    )

    // default current
    expect(wrapper.find('.s-sidebar-item:nth-child(2)').classes()).includes('is-current')
    // disabled
    expect(wrapper.find('.s-sidebar-item:nth-child(2)').classes()).includes('is-disabled')

    await sleep(15)

    // event
    await wrapper.find('.s-sidebar-item:nth-child(3)').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('3')
    expect(wrapper.emitted('change')![0][0]).toBe('3')
    expect(wrapper.emitted()!).toHaveProperty('click')
    expect(wrapper.find('.s-sidebar-item:nth-child(3)').classes()).includes('is-current')

    // set props
    await wrapper.setProps({
      modelValue: '1',
    })
    expect(wrapper.find('.s-sidebar-item:nth-child(1)').classes()).includes('is-current')

    // round
    await wrapper.setProps({
      round: true,
    })
    expect(
      wrapper.find('.s-sidebar-item:nth-child(1)').find('.s-sidebar-item__round-top'),
    ).toBeDefined()
    expect(
      wrapper.find('.s-sidebar-item:nth-child(1)').find('.s-sidebar-item__round-bottom'),
    ).toBeDefined()

    // line
    await wrapper.setProps({
      line: true,
    })
    expect(wrapper.find('.s-sidebar-item:nth-child(1)').find('.s-sidebar-item__line')).toBeDefined()
  })
})
