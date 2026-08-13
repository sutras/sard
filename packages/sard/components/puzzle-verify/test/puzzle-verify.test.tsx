import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PuzzleVerify from '../puzzle-verify.vue'
import type { PuzzleVerifyProps } from '../common'

describe('PuzzleVerify', () => {
  test('Basic', async () => {
    const mockVerify = vi.fn<NonNullable<PuzzleVerifyProps['verify']>>()

    const wrapper = mount(
      <PuzzleVerify
        text="请按住滑块拖动"
        success-text="验证通过"
        targetPos={60}
        src="/assets/logo.png"
        verify={mockVerify}
      ></PuzzleVerify>,
    )

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

    expect(mockVerify).toHaveBeenCalled()
  })
})
