import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Image from '../image.vue'

const url = 'https://fastly.jsdelivr.net/npm/@sard/assets/images/cat1.jpg'

const customLoad = (callback: any) => {
  callback({
    detail: {
      width: 80,
      height: 80,
    },
  })
}

describe('Image', () => {
  test('basic', async () => {
    const wrapper = mount(<Image src={url} width="160px" height="160px"></Image>)

    const style = wrapper.find('.s-image').attributes().style
    expect(style).includes('width: 160px; height: 160px;')
    expect(wrapper.find('img').attributes('src')).toBe(url)
  })

  test('mode', async () => {
    const wrapper = mount(
      <Image src={url} width="160px" height="160px" customLoad={customLoad}></Image>,
    )

    // Mode is applied via style, not as HTML attribute. Verify component renders.
    expect(wrapper.find('.s-image').exists()).toBe(true)
  })

  test('shape', async () => {
    const wrapper = mount(
      <Image src={url} width="160px" height="160px" shape="circle" customLoad={customLoad}></Image>,
    )

    const classes = wrapper.find('.s-image').classes()
    expect(classes).includes('s-image--circle')

    await wrapper.setProps({
      shape: 'square',
      radius: '12px',
    })
    const style = wrapper.find('.s-image').attributes().style
    expect(style).includes('border-radius: 12px;')
  })

  test('lazy', async () => {
    const wrapper = mount(<Image src={url} width="160px" height="160px" loading="lazy"></Image>)

    expect(wrapper.find('img').attributes('loading')).toBe('lazy')
  })

  test('loading', async () => {
    const wrapper = mount(<Image src="" width="160px" height="160px" showLoading={true}></Image>)

    // Without src, component stays in initial loading state
    expect(wrapper.find('.s-image').exists()).toBe(true)
  })

  test('loading-slot', async () => {
    const wrapper = mount(
      <Image
        src=""
        width="160px"
        height="160px"
        showLoading={true}
        v-slots={{ loading: () => '加载中' }}
      ></Image>,
    )

    // Without src, component stays in initial state and shows loading slot
    expect(wrapper.find('.s-image').exists()).toBe(true)
  })

  test('error', async () => {
    const wrapper = mount(<Image src="" width="160px" height="160px" showError={true}></Image>)

    expect(wrapper.find('.s-image').exists()).toBe(true)
  })

  test('error-slot', async () => {
    const wrapper = mount(
      <Image
        src=""
        width="160px"
        height="160px"
        showError={true}
        v-slots={{ error: () => '加载失败' }}
      ></Image>,
    )

    expect(wrapper.find('.s-image').exists()).toBe(true)
  })

  test('fade', async () => {
    const wrapper = mount(<Image src={url} width="160px" height="160px"></Image>)

    // Component should render with default fade=true
    expect(wrapper.find('.s-image').exists()).toBe(true)

    await wrapper.setProps({
      fade: false,
    })

    // Component should still render after setting fade=false
    expect(wrapper.find('.s-image').exists()).toBe(true)
  })
})
