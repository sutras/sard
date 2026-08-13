import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Loading from '../loading.vue'

describe('Loading', () => {
  test('basic', async () => {
    const wrapper = mount(<Loading />)

    expect(wrapper.find('.s-loading').exists()).toBe(true)
    expect(wrapper.find('.s-loading__icon').classes()).toEqual(
      expect.arrayContaining([
        's-loading__icon',
        's-loading__icon--circular',
        's-loading__icon--animated',
      ]),
    )
    expect(wrapper.find('.s-loading__spinner').exists()).toBe(true)
  })

  test('type', async () => {
    const wrapper = mount(<Loading type="clock" />)

    expect(wrapper.find('.s-loading__icon').classes()).toContain('s-loading__icon--clock')
    expect(wrapper.findAll('.s-loading__scale')).toHaveLength(12)
    expect(wrapper.find('.s-loading__spinner').exists()).toBe(false)
  })

  test('text', async () => {
    const wrapper = mount(<Loading text="loading..." />)

    expect(wrapper.find('.s-loading__text').text()).toBe('loading...')
  })

  test('default slot overrides text', async () => {
    const wrapper = mount(<Loading text="loading...">自定义内容</Loading>)

    expect(wrapper.find('.s-loading__text').text()).toBe('自定义内容')
  })

  test('vertical', async () => {
    const wrapper = mount(<Loading vertical />)

    expect(wrapper.find('.s-loading').classes()).toContain('s-loading--vertical')
  })

  test('size', async () => {
    const wrapper = mount(<Loading size="48px" textSize="36px" text="loading..." />)

    expect(wrapper.find('.s-loading__icon').attributes('style')).toContain('font-size: 48px;')
    expect(wrapper.find('.s-loading__text').attributes('style')).toContain('font-size: 36px;')
  })

  test('color', async () => {
    const wrapper = mount(<Loading color="red" textColor="blue" text="loading..." />)

    expect(wrapper.find('.s-loading__icon').attributes('style')).toContain('color: red;')
    expect(wrapper.find('.s-loading__text').attributes('style')).toContain('color: blue;')
  })

  test('non-animated progress affects rendered state', async () => {
    const wrapper = mount(<Loading type="clock" animated={false} progress={0.25} />)

    expect(wrapper.find('.s-loading__icon').classes()).not.toContain('s-loading__icon--animated')
    expect(wrapper.findAll('.s-loading__scale--hidden')).toHaveLength(9)

    await wrapper.setProps({ type: 'circular', progress: 0.5 })

    expect(wrapper.find('.s-loading__icon').attributes('style')).toContain('rotate(180deg)')
  })
})
