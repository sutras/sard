import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import PullDownRefresh from '../pull-down-refresh.vue'
import { sleep } from '../../../utils'

describe('PullDownRefresh', () => {
  test('renders root and header with initial status', () => {
    const wrapper = mount(<PullDownRefresh>内容</PullDownRefresh>)

    expect(wrapper.find('.s-pull-down-refresh').exists()).toBe(true)
    expect(wrapper.find('.s-pull-down-refresh__header').exists()).toBe(true)
    expect(wrapper.find('.s-pull-down-refresh__loading').exists()).toBe(false)
    expect(wrapper.text()).toContain('内容')
  })

  test('loading prop switches to loading status', async () => {
    const wrapper = mount(<PullDownRefresh loading />)

    await nextTick()

    expect(wrapper.find('.s-pull-down-refresh__loading').exists()).toBe(true)
    expect(wrapper.find('.s-pull-down-refresh__gesture').attributes('style') || '').toContain(
      'translate3d(0,50px,0)',
    )

    await wrapper.setProps({ loading: false })

    await sleep(350)
    await nextTick()

    expect(wrapper.find('.s-pull-down-refresh__loading').exists()).toBe(false)
  })

  test('disabled prop prevents rendering in loading state', async () => {
    const wrapper = mount(<PullDownRefresh disabled />)

    await nextTick()

    expect(wrapper.find('.s-pull-down-refresh__loading').exists()).toBe(false)
  })
})
