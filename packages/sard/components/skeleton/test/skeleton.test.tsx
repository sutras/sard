import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Skeleton from '../skeleton.vue'
import SkeletonBlock from '../skeleton-block.vue'

describe('Skeleton', () => {
  test('basic', async () => {
    const wrapper = mount(<Skeleton />)

    expect(wrapper.findAll('.s-skeleton__paragraph .s-skeleton__row')).toHaveLength(3)
  })

  test('title', async () => {
    const wrapper = mount(<Skeleton title />)

    expect(wrapper.find('.s-skeleton__title').exists()).toBe(true)
    expect(wrapper.findAll('.s-skeleton__paragraph .s-skeleton__row')).toHaveLength(3)
  })

  test('avatar', async () => {
    const wrapper = mount(<Skeleton avatar />)

    expect(wrapper.find('.s-skeleton__avatar').exists()).toBe(true)
  })

  test('roundAvatar', async () => {
    const wrapper = mount(<Skeleton avatar avatarRound />)

    expect(wrapper.find('.s-skeleton__avatar.s-skeleton--round').exists()).toBe(true)
  })

  test('round', async () => {
    const wrapper = mount(<Skeleton avatar title round />)

    expect(wrapper.find('.s-skeleton__title.s-skeleton--round').exists()).toBe(true)
    expect(wrapper.find('.s-skeleton__row.s-skeleton--round').exists()).toBe(true)
  })

  test('animated', async () => {
    const wrapper = mount(<Skeleton avatar title animated />)

    expect(wrapper.find('.s-skeleton__avatar.s-skeleton--animated').exists()).toBe(true)
    expect(wrapper.find('.s-skeleton__title.s-skeleton--animated').exists()).toBe(true)
    expect(wrapper.find('.s-skeleton__row.s-skeleton--animated').exists()).toBe(true)
  })

  test('contain', async () => {
    const wrapper = mount(
      <Skeleton avatar title animated loading>
        <div class="content">内容</div>
      </Skeleton>,
    )

    expect(wrapper.find('.s-skeleton__avatar').exists()).toBe(true)
    expect(wrapper.find('.content').exists()).toBe(false)

    await wrapper.setProps({
      loading: false,
    })

    expect(wrapper.find('.s-skeleton__avatar').exists()).toBe(false)
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  test('custom', async () => {
    const wrapper = mount(<SkeletonBlock width="120px" height="80px" />)

    expect(wrapper.find('.s-skeleton__block').attributes('style')).toContain(
      'width: 120px; height: 80px;',
    )
  })
})
