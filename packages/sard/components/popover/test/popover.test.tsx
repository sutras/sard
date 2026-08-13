import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Popover from '../index'

describe('Popover', () => {
  test('basic', async () => {
    const wrapper = mount(Popover, {
      slots: {
        reference: () => <button>按钮</button>,
        default: () => <div class="test-content">内容</div>,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.s-popover')).toBeTruthy()
    expect(document.querySelector('.test-content')!.textContent).toBe('内容')
  })

  test('dark', async () => {
    const wrapper = mount(Popover, {
      slots: {
        reference: () => <button>按钮</button>,
        default: () => <div>内容</div>,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.s-popover')).toBeTruthy()
  })

  test('content', async () => {
    mount(Popover, {
      props: {
        visible: true,
      },
      slots: {
        reference: () => <button>按钮</button>,
        default: () => <div class="content">内容</div>,
      },
    })

    expect(document.querySelector('.content')).toBeTruthy()
  })
})
