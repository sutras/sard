import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RotateVerify from '../rotate-verify.vue'
import { sleep } from '../../../utils'

describe('RotateVerify', () => {
  test('Basic', async () => {
    const rectSpy = vi
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(function (this: HTMLElement) {
        const className = String(this.className)
        if (className.includes('s-slide-verify__track')) {
          return {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: 300,
            bottom: 40,
            width: 300,
            height: 40,
            toJSON() {},
          } as DOMRect
        }
        return {
          x: 0,
          y: 0,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: 0,
          height: 0,
          toJSON() {},
        } as DOMRect
      })

    const wrapper = mount(
      <RotateVerify
        text="拖动滑块至虚线框内"
        success-text="验证通过"
        show-target
        targetPos={60}
        resetWhenError={false}
      ></RotateVerify>,
    )

    const imageEl = wrapper.find('.s-rotate-verify__image').element as HTMLElement
    expect(imageEl.style.transform).includes(`rotate(${(60 / 100) * 360}deg)`)

    await wrapper.find('.s-slide-verify__thumb').trigger('touchstart', {
      touches: [{ clientX: 10, clientY: 100 }],
    })
    for (let i = 0; i < 60; i++) {
      await wrapper.find('.s-slide-verify__thumb').trigger('touchmove', {
        touches: [{ clientX: 10 + i * 1, clientY: 100 }],
      })
    }
    await wrapper.find('.s-slide-verify__thumb').trigger('touchend', {
      changedTouches: [{ clientX: 70, clientY: 100 }],
    })

    const emittedChange = (wrapper.emitted()! as Record<string, any[]>).change
    const rotate = emittedChange[emittedChange.length - 1][0]

    expect(imageEl.style.transform).includes(`rotate(-${(rotate / 100) * 360}deg)`)

    ;(wrapper.vm as any).reset()

    await sleep(0)

    expect(imageEl.style.transform).includes(`rotate(0deg)`)

    rectSpy.mockRestore()
  })
})
