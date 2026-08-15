import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import SwipeAction from '../swipe-action.vue'

describe('SwipeAction', () => {
  test('basic', async () => {
    const wrapper = mount(
      <SwipeAction
        v-slots={{
          default: () => <div class="content">内容</div>,
          left: ({ hide }: any) => [<button onClick={() => hide()}>分享</button>],
          right: ({ hide }: any) => [<button onClick={() => hide()}>删除</button>],
        }}
      />,
    )

    expect(wrapper.find('.s-swipe-action .s-swipe-action__content .content').text()).toBe('内容')

    await wrapper.setProps({ visible: 'right' })
    await wrapper.find('.s-swipe-action .s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[0][0]).toBe(false)

    await wrapper.setProps({ visible: 'left' })
    await wrapper
      .find('.s-swipe-action .s-swipe-action__content .s-swipe-action__left button')
      .trigger('click')
    expect(wrapper.emitted('update:visible')?.[1][0]).toBe(false)

    await wrapper.setProps({
      visible: 'right',
      disabled: true,
    })
    await wrapper.find('.s-swipe-action .s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[2]).toBeUndefined()

    await wrapper.setProps({ disabled: false })
    await wrapper.find('.s-swipe-action .s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[2][0]).toBe(false)
  })

  test('asyncHide resolves to hide', async () => {
    let resolve: (() => void) | undefined

    const wrapper = mount(
      <SwipeAction
        v-slots={{
          default: () => <div class="content">内容</div>,
          left: ({ asyncHide }: any) => [
            <button
              onClick={() =>
                asyncHide((res: () => void) => {
                  resolve = res
                })
              }
            >
              分享
            </button>,
          ],
        }}
      />,
    )

    await wrapper.setProps({ visible: 'left' })
    await wrapper.find('.s-swipe-action__left button').trigger('click')

    // resolve 前不会隐藏
    expect(wrapper.emitted('update:visible')).toBeUndefined()

    resolve?.()
    expect(wrapper.emitted('update:visible')?.[0][0]).toBe(false)
  })

  test('asyncHide blocks hiding until resolved', async () => {
    let resolve: (() => void) | undefined

    const wrapper = mount(
      <SwipeAction
        v-slots={{
          default: () => <div class="content">内容</div>,
          left: ({ asyncHide }: any) => [
            <button
              onClick={() =>
                asyncHide((res: () => void) => {
                  resolve = res
                })
              }
            >
              分享
            </button>,
          ],
        }}
      />,
    )

    await wrapper.setProps({ visible: 'left' })
    await wrapper.find('.s-swipe-action__left button').trigger('click')

    // 异步期间点击内容不应关闭
    await wrapper.find('.s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')).toBeUndefined()

    resolve?.()
    expect(wrapper.emitted('update:visible')?.[0][0]).toBe(false)
  })

  test('asyncHide rejects to keep open', async () => {
    let reject: (() => void) | undefined

    const wrapper = mount(
      <SwipeAction
        v-slots={{
          default: () => <div class="content">内容</div>,
          left: ({ asyncHide }: any) => [
            <button
              onClick={() =>
                asyncHide((_resolve: () => void, rej: () => void) => {
                  reject = rej
                })
              }
            >
              分享
            </button>,
          ],
        }}
      />,
    )

    await wrapper.setProps({ visible: 'left' })
    await wrapper.find('.s-swipe-action__left button').trigger('click')

    // 异步期间点击内容不应关闭
    await wrapper.find('.s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')).toBeUndefined()

    // reject 后仍保持展开
    reject?.()
    expect(wrapper.emitted('update:visible')).toBeUndefined()

    // reject 后点击内容可正常关闭
    await wrapper.find('.s-swipe-action__content').trigger('click')
    expect(wrapper.emitted('update:visible')?.[0][0]).toBe(false)
  })
})
