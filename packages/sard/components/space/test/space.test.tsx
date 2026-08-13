import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Space from '../space.vue'
import Button from '../../button/button.vue'
import type { SpaceProps } from '../common'

function renderSpace(props?: SpaceProps) {
  return (
    <Space {...props}>
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </Space>
  )
}

describe('Space', () => {
  test('basic', async () => {
    const wrapper = mount(renderSpace())

    expect(wrapper.find('.s-space').classes()).includes('s-space--horizontal')
    expect(wrapper.find('.s-space').classes()).includes('s-space--medium')
  })

  test('direction', async () => {
    const wrapper = mount(renderSpace({ direction: 'vertical' }))

    expect(wrapper.find('.s-space').classes()).includes('s-space--vertical')
  })

  test('size', async () => {
    const wrapper = mount(renderSpace({ size: 'small' }))

    expect(wrapper.find('.s-space').classes()).includes('s-space--small')
    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.s-space').classes()).includes('s-space--medium')
    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.s-space').classes()).includes('s-space--large')
  })

  test('custom-size', async () => {
    const wrapper = mount(renderSpace({ size: '100px' }))

    expect(wrapper.find('.s-space').attributes().style).includes('gap: 100px;')
  })

  test('wrap', async () => {
    const wrapper = mount(renderSpace({ wrap: true }))

    expect(wrapper.find('.s-space').classes()).includes('s-space--wrap')
  })

  test('align', async () => {
    const wrapper = mount(renderSpace({ align: 'start' }))

    expect(wrapper.find('.s-space').attributes().style).includes('align-items: flex-start;')

    await wrapper.setProps({ align: 'center' })
    expect(wrapper.find('.s-space').attributes().style).includes('align-items: center;')

    await wrapper.setProps({ align: 'end' })
    expect(wrapper.find('.s-space').attributes().style).includes('align-items: flex-end;')

    await wrapper.setProps({ align: 'baseline' })
    expect(wrapper.find('.s-space').attributes().style).includes('align-items: baseline;')
  })
})
