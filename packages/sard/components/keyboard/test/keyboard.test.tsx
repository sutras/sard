import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Keyboard from '../keyboard.vue'
import { chineseKeys } from '../common'

describe('Keyboard', () => {
  test('number', async () => {
    const wrapper = mount(<Keyboard type="number" />)

    expect(wrapper.findAll('.s-keyboard__key').map((item) => item.text())).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '',
    ])
  })

  test('digit', async () => {
    const wrapper = mount(<Keyboard type="digit" />)

    expect(wrapper.findAll('.s-keyboard__key').map((item) => item.text())).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '.',
      '0',
      '',
    ])
  })

  test('idcard', async () => {
    const wrapper = mount(<Keyboard type="idcard" />)

    expect(wrapper.findAll('.s-keyboard__key').map((item) => item.text())).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'X',
      '0',
      '',
    ])
  })

  test('random', async () => {
    const wrapper = mount(<Keyboard type="random" />)

    const keys = wrapper
      .findAll('.s-keyboard__key')
      .map((item) => item.text())
      .filter((item) => item !== '')

    expect(keys).toHaveLength(10)
    expect([...keys].sort()).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
  })

  test('plate', async () => {
    const wrapper = mount(<Keyboard type="plate" />)

    expect(wrapper.classes()).toContain('s-keyboard--plate')

    const keys = wrapper
      .findAll('.s-keyboard__key')
      .map((item) => item.text())
      .filter((item) => item !== '')
      .join(',')

    expect(keys).toContain(chineseKeys.join(','))
    expect(keys).toContain('ABC')
  })

  test('plate mode toggle and input', async () => {
    const wrapper = mount(<Keyboard type="plate" mode="chinese" />)

    await wrapper.findAll('.s-keyboard__key')[0].trigger('click')

    expect(wrapper.emitted('input')?.[0]).toEqual([chineseKeys[0]])
    expect(wrapper.emitted('update:mode')?.[0]).toEqual(['english'])

    await wrapper.setProps({ mode: 'english' })

    expect(wrapper.text()).toContain('省份')
  })

  test('disabled key and delete', async () => {
    const wrapper = mount(<Keyboard type="number" disabledKey={(key) => key === '1'} />)

    expect(wrapper.find('.s-keyboard__key--1').classes()).toContain('is-disabled')

    await wrapper.find('.s-keyboard__key--backspace').trigger('click')

    expect(wrapper.emitted('delete')).toHaveLength(1)
  })
})
