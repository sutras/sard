import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import SwipeAction from '../swipe-action.vue'

describe('SwipeAction', () => {
  test('basic', async () => {
    const wrapper = mount(
      <SwipeAction
        v-slots={{
          default: () => <div class="content">内容</div>,
          left: ({ hide }: any) => [<button onClick={() => hide()}>分享</button>],
          right: ({ hide }: any) => [<button onClick={() => hide()}>删除</button>],
        }}
      />,
    )

    expect(wrapper.find('.s-swipe-action .s-swipe-action__content .content').text()).toBe('内容')

    await wrapper.setProps({ visible: 'right' })
    await wrapper.find('.s-swipe-action .s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[0][0]).toBe(false)

    await wrapper.setProps({ visible: 'left' })
    await wrapper
      .find('.s-swipe-action .s-swipe-action__content .s-swipe-action__left button')
      .trigger('click')
    expect(wrapper.emitted('update:visible')?.[1][0]).toBe(false)

    await wrapper.setProps({
      visible: 'right',
      disabled: true,
    })
    await wrapper.find('.s-swipe-action .s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[2]).toBeUndefined()

    await wrapper.setProps({ disabled: false })
    await wrapper.find('.s-swipe-action .s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[2][0]).toBe(false)
  })
})
