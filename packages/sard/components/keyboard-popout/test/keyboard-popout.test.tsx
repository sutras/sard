import { describe, expect, test } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'

import KeyboardPopout from '../keyboard-popout.vue'
import Keyboard from '../../keyboard/keyboard.vue'
import Popout from '../../popout/popout.vue'

const emitComponent = (
  wrapper: ReturnType<typeof mount>,
  component: object,
  event: string,
  ...args: any[]
) => {
  ;(wrapper.getComponent(component as never) as VueWrapper).vm.$emit(event, ...args)
}

describe('KeyboardPopout', () => {
  test('renders title and keyboard when visible', () => {
    const wrapper = mount(<KeyboardPopout title="数字键盘" visible />)

    expect(wrapper.getComponent(Popout).props('title')).toBe('数字键盘')
    expect(wrapper.findComponent(Keyboard).exists()).toBe(true)
  })

  test('forwards keyboard and popout events', async () => {
    const wrapper = mount(<KeyboardPopout visible type="plate" />)

    emitComponent(wrapper, Keyboard, 'input', 'A')
    emitComponent(wrapper, Keyboard, 'delete')
    emitComponent(wrapper, Keyboard, 'update:mode', 'english')
    emitComponent(wrapper, Popout, 'confirm')
    emitComponent(wrapper, Popout, 'cancel')
    emitComponent(wrapper, Popout, 'close')
    emitComponent(wrapper, Popout, 'update:visible', false)
    emitComponent(wrapper, Popout, 'visible-hook', 'after-leave')
    await nextTick()

    expect(wrapper.emitted().input?.[0]).toEqual(['A'])
    expect(wrapper.emitted().delete?.[0]).toEqual([])
    expect(wrapper.emitted()['update:mode']?.[0]).toEqual(['english'])
    expect(wrapper.emitted().confirm?.[0]).toEqual([])
    expect(wrapper.emitted().cancel?.[0]).toEqual([])
    expect(wrapper.emitted().close?.[0]).toEqual([])
    expect(wrapper.emitted()['update:visible']?.[0]).toEqual([false])
    expect(wrapper.emitted()['visible-hook']).toContainEqual(['after-leave', undefined])
    expect(wrapper.emitted()['after-leave']?.[0]).toEqual([undefined])
  })

  test('exposes shuffle method', async () => {
    const wrapper = mount(<KeyboardPopout visible type="random" />)

    expect(typeof (wrapper.vm as typeof wrapper.vm & { shuffle: () => void }).shuffle).toBe(
      'function',
    )

    ;(wrapper.vm as typeof wrapper.vm & { shuffle: () => void }).shuffle()
    await nextTick()

    const keys = wrapper
      .getComponent(Keyboard)
      .findAll('.s-keyboard__key')
      .map((item) => item.text())
      .filter((item) => item !== '')
      .sort()

    expect(keys).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
  })
})
