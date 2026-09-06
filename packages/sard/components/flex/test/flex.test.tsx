import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Flex from '../flex.vue'
import Button from '../../button/button.vue'
import type { FlexProps } from '../common.ts'

function renderFlex(props?: FlexProps) {
  return (
    <Flex {...props}>
      <Button>按钮</Button>
      <Button>按钮</Button>
      <Button>按钮</Button>
    </Flex>
  )
}

describe('Flex', () => {
  test('basic', async () => {
    const wrapper = mount(renderFlex({ direction: 'row' }))

    expect(wrapper.find('.s-flex').classes()).includes('s-flex--row')
  })

  test('direction', async () => {
    const wrapper = mount(renderFlex({ direction: 'column' }))

    expect(wrapper.find('.s-flex').classes()).includes('s-flex--column')

    await wrapper.setProps({ direction: 'row' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--row')
    await wrapper.setProps({ direction: 'row-reverse' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--row-reverse')
    await wrapper.setProps({ direction: 'column-reverse' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--column-reverse')
  })

  test('gap', async () => {
    const wrapper = mount(renderFlex({ gap: 'small' }))

    expect(wrapper.find('.s-flex').classes()).includes('s-flex--small')
    await wrapper.setProps({ gap: 'medium' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--medium')
    await wrapper.setProps({ gap: 'large' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--large')
  })

  test('custom-gap', async () => {
    const wrapper = mount(renderFlex({ gap: '100px' }))

    expect(wrapper.find('.s-flex').attributes().style).includes('gap: 100px;')
  })

  test('wrap', async () => {
    const wrapper = mount(renderFlex({ wrap: true }))

    expect(wrapper.find('.s-flex').classes()).includes('s-flex--wrap')
  })

  test('align', async () => {
    const wrapper = mount(renderFlex({ align: 'start' }))

    expect(wrapper.find('.s-flex').classes()).includes('s-flex--align-start')

    await wrapper.setProps({ align: 'center' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--align-center')

    await wrapper.setProps({ align: 'end' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--align-end')

    await wrapper.setProps({ align: 'baseline' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--align-baseline')
  })

  test('justify', async () => {
    const wrapper = mount(renderFlex({ justify: 'start' }))

    expect(wrapper.find('.s-flex').classes()).includes('s-flex--justify-start')

    await wrapper.setProps({ justify: 'center' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--justify-center')

    await wrapper.setProps({ justify: 'end' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--justify-end')

    await wrapper.setProps({ justify: 'between' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--justify-between')

    await wrapper.setProps({ justify: 'around' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--justify-around')

    await wrapper.setProps({ justify: 'evenly' })
    expect(wrapper.find('.s-flex').classes()).includes('s-flex--justify-evenly')
  })
})
