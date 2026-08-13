import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

import Avatar from '../avatar.vue'
import AvatarGroup from '../avatar-group.vue'

describe('Avatar', () => {
  test('create', async () => {
    const wrapper = mount(<Avatar />)

    expect(wrapper.classes()).toEqual(expect.arrayContaining(['s-avatar', 's-avatar--circle']))
    expect(wrapper.find('.s-avatar__icon').exists()).toBe(true)
  })

  test('shape', async () => {
    const wrapper = mount(<Avatar shape="square" />)

    expect(wrapper.classes()).toContain('s-avatar--square')
  })

  test('size', async () => {
    const wrapper = mount(<Avatar size="96px" iconSize="48px" />)

    const style = wrapper.attributes('style')
    expect(style).toContain('--s-avatar-size: 96px;')
    expect(style).toContain('font-size: 48px;')
  })

  test('custom style', async () => {
    const wrapper = mount(<Avatar background="red" color="white" />)

    const style = wrapper.attributes('style')
    expect(style).toContain('background: red;')
    expect(style).toContain('color: white;')
  })

  test('image', async () => {
    const wrapper = mount(
      <Avatar src="https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg" shape="square" />,
    )

    const image = wrapper.find('img.s-avatar__image')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg')
    expect(image.classes()).toContain('s-avatar--square')
  })

  test('extra slot', async () => {
    const wrapper = mount(
      <Avatar
        v-slots={{
          extra: () => h('span', { class: 'extra' }, 'extra'),
        }}
      />,
    )

    expect(wrapper.find('.extra').text()).toBe('extra')
  })

  test('default slot overrides fallback content', async () => {
    const wrapper = mount(<Avatar>AB</Avatar>)

    expect(wrapper.text()).toContain('AB')
    expect(wrapper.find('.s-avatar__icon').exists()).toBe(false)
  })

  test('avatar group remain content updates with max', async () => {
    const wrapper = mount(
      <AvatarGroup total={10} max={5}>
        {Array.from({ length: 5 }, (_, index) => (
          <Avatar index={index} key={index}>
            {index + 1}
          </Avatar>
        ))}
      </AvatarGroup>,
    )

    expect(wrapper.find('.s-avatar:last-child .s-avatar__remain').text()).toBe('+5')
    expect(
      wrapper
        .findAllComponents(Avatar)
        .every((item) => item.classes().includes('s-avatar--in-group')),
    ).toBe(true)

    await wrapper.setProps({ max: 4 })

    expect(wrapper.find('.s-avatar:nth-child(4) .s-avatar__remain').text()).toBe('+6')
  })

  test('avatar group uses custom remain text and emits remain-click', async () => {
    const wrapper = mount(
      <AvatarGroup total={6} max={2} remainText="更多">
        <Avatar index={0}>1</Avatar>
        <Avatar index={1}>2</Avatar>
      </AvatarGroup>,
    )

    expect(wrapper.find('.s-avatar__remain').text()).toBe('更多')

    await wrapper.find('.s-avatar__remain').trigger('click')

    expect(wrapper.emitted('remain-click')).toHaveLength(1)
  })
})
