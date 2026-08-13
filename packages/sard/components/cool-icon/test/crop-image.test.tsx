import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import CoolIcon from '../cool-icon.vue'
import { Image } from '@sard/icons'

describe('CoolIcon', () => {
  test('visible', async () => {
    const wrapper = mount(
      <CoolIcon shape="oval" background="#ffa726" color="#fff">
        <Image />
      </CoolIcon>,
    )

    expect(wrapper.find('.s-cool-icon').classes()).includes('s-cool-icon--oval')
    expect(wrapper.find('.s-cool-icon').attributes().style).includes('color: rgb(255, 255, 255);')
    expect(wrapper.find('.s-cool-icon__bg').attributes().style).includes(
      'background: rgb(255, 167, 38);',
    )
    expect(wrapper.find('.s-cool-icon__icon').find('svg').exists()).toBeTruthy()

    await wrapper.setProps({
      shape: 'circle',
    })
    expect(wrapper.find('.s-cool-icon').classes()).includes('s-cool-icon--circle')

    await wrapper.setProps({
      shape: 'flower',
    })
    expect(wrapper.find('.s-cool-icon').classes()).includes('s-cool-icon--flower')

    await wrapper.setProps({
      shape: 'square',
    })
    expect(wrapper.find('.s-cool-icon').classes()).includes('s-cool-icon--square')

    await wrapper.setProps({
      shape: 'triangle',
    })
    expect(wrapper.find('.s-cool-icon').classes()).includes('s-cool-icon--triangle')

    await wrapper.setProps({
      size: '80px',
      iconSize: '48px',
    })
    expect(wrapper.find('.s-cool-icon').attributes().style).includes('font-size: 48px;')
    expect(wrapper.find('.s-cool-icon').attributes().style).includes('width: 80px; height: 80px;')
  })
})
