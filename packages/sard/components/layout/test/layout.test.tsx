import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Row from '../row.vue'
import Col from '../col.vue'
import { mapJustify, mapAlign } from '../common'

describe('Layout', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Row>
        <Col>span</Col>
        <Col>span</Col>
      </Row>,
    )

    expect(wrapper.find('.s-row').exists()).toBe(true)
    expect(wrapper.findAll('.s-col')).toHaveLength(2)
  })

  test('basic2', async () => {
    const wrapper = mount(
      <Row>
        <Col span={4}>span</Col>
        <Col span={8}>span</Col>
      </Row>,
    )

    expect(wrapper.find('.s-col--4').exists()).toBe(true)
    expect(wrapper.find('.s-col--8').exists()).toBe(true)
  })

  test('basic3', async () => {
    const wrapper = mount(
      <Row>
        <Col span={3}>span</Col>
        <Col span="auto">span</Col>
      </Row>,
    )

    expect(wrapper.find('.s-col--3').exists()).toBe(true)
    expect(wrapper.find('.s-col--auto').exists()).toBe(true)
  })

  test('offset', async () => {
    const wrapper = mount(
      <Row>
        <Col>span</Col>
        <Col offset={3}>span</Col>
      </Row>,
    )

    expect(wrapper.find('.s-col--offset-3').exists()).toBe(true)
  })

  test('justify', async () => {
    const wrapper = mount(
      <Row justify="start">
        <Col>span</Col>
        <Col>span</Col>
      </Row>,
    )

    for (const [justify, value] of Object.entries(mapJustify)) {
      await wrapper.setProps({
        justify,
      })

      expect(wrapper.attributes('style')).toContain(`justify-content: ${value};`)
    }
  })

  test('align', async () => {
    const wrapper = mount(
      <Row align="start">
        <Col>span</Col>
        <Col>span</Col>
      </Row>,
    )

    for (const [align, value] of Object.entries(mapAlign)) {
      await wrapper.setProps({
        align,
      })

      expect(wrapper.attributes('style')).toContain(`align-items: ${value};`)
    }
  })

  test('gap', async () => {
    const wrapper = mount(
      <Row gap="30px">
        <Col>span</Col>
        <Col>span</Col>
      </Row>,
    )

    expect(wrapper.attributes('style')).toContain('margin-left: -15px;')
    expect(wrapper.attributes('style')).toContain('margin-right: -15px;')

    const colStyle = wrapper.find('.s-col').attributes('style')
    expect(colStyle).toContain('padding-left: 15px;')
    expect(colStyle).toContain('padding-right: 15px;')
  })

  test('order', async () => {
    const wrapper = mount(
      <Row>
        <Col>span</Col>
        <Col order={-1}>span</Col>
      </Row>,
    )

    expect(wrapper.findAll('.s-col')[1].attributes('style')).toContain('order: -1;')
  })
})
