import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Empty from '../empty.vue'

describe('Empty', () => {
  test('create', () => {
    const wrapper = mount(<Empty description="自定义描述内容" iconSize={32} />)

    expect(wrapper.find('.s-empty').classes()).toContain('s-empty--medium')
    expect(wrapper.find('.s-empty__icon').exists()).toBe(true)
    expect(wrapper.find('.s-empty__icon').attributes('style')).toContain('font-size: 32px;')
    expect(wrapper.find('.s-empty__description').text()).toBe('自定义描述内容')
  })

  test('slots', () => {
    const wrapper = mount(
      <Empty
        v-slots={{
          icon: () => <view class="custom-icon">图标</view>,
          description: () => <view class="custom-description">自定义描述</view>,
        }}
      >
        <view class="content">内容</view>
      </Empty>,
    )

    expect(wrapper.find('.custom-icon').text()).toBe('图标')
    expect(wrapper.find('.custom-description').text()).toBe('自定义描述')
    expect(wrapper.find('.s-empty__extra').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('内容')
  })
})
