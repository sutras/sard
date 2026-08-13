import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Result from '../result.vue'

describe('Result', () => {
  test('basic', async () => {
    const wrapper = mount(<Result title="成功" description="请根据提示进行操作" />)

    expect(wrapper.find('.s-result__title').text()).toBe('成功')
    expect(wrapper.find('.s-result__description').text()).toBe('请根据提示进行操作')

    const statusList = ['success', 'info', 'warning', 'error', 'question'] as const
    for (const status of statusList) {
      await wrapper.setProps({ status })

      const icon = wrapper.find('.s-result__icon')
      expect(icon.exists()).toBe(true)
      expect(icon.classes()).toContain(`s-result__icon--${status}`)
    }
  })

  test('extra', async () => {
    const wrapper = mount(
      <Result title="成功" description="请根据提示进行操作">
        <div class="content">内容</div>
      </Result>,
    )

    expect(wrapper.find('.s-result__extra .content').text()).toBe('内容')
  })

  test('custom icon slot replaces the default icon content', async () => {
    const wrapper = mount(
      <Result
        title="成功"
        description="请根据提示进行操作"
        v-slots={{
          icon: () => <div class="custom-icon">内容</div>,
        }}
      />,
    )

    expect(wrapper.find('.custom-icon').text()).toBe('内容')
    expect(wrapper.find('.s-result__icon').classes()).toContain('s-result__icon--info')
    expect(wrapper.find('.s-result__icon svg').exists()).toBe(false)
  })

  test('title and description sections are omitted when empty', async () => {
    const wrapper = mount(<Result />)

    expect(wrapper.find('.s-result__title').exists()).toBe(false)
    expect(wrapper.find('.s-result__description').exists()).toBe(false)
  })
})
