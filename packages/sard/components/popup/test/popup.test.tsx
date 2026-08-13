import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Popup from '../popup.vue'

describe('Popup', () => {
  test('applies effect modifiers and emits overlay events', async () => {
    const wrapper = mount(Popup, {
      attachTo: document.body,
      props: {
        visible: true,
        effect: 'fade',
      },
      slots: {
        default: () => <div>内容</div>,
      },
    })

    const getPopup = () => document.body.querySelector('.s-popup') as HTMLElement | null

    expect(getPopup()).not.toBeNull()
    expect(getPopup()?.classList.contains('s-popup--fade')).toBe(true)
    expect(getPopup()?.textContent).toContain('内容')

    await wrapper.setProps({ effect: 'full-fade' })
    expect(getPopup()?.classList.contains('s-popup--full-fade')).toBe(true)

    await wrapper.setProps({ effect: 'slide-top' })
    expect(getPopup()?.classList.contains('s-popup--slide-top')).toBe(true)

    await wrapper.setProps({ effect: 'slide-right' })
    expect(getPopup()?.classList.contains('s-popup--slide-right')).toBe(true)

    await wrapper.setProps({ effect: 'slide-bottom' })
    expect(getPopup()?.classList.contains('s-popup--slide-bottom')).toBe(true)

    await wrapper.setProps({ effect: 'slide-left' })
    expect(getPopup()?.classList.contains('s-popup--slide-left')).toBe(true)

    await wrapper.setProps({ effect: 'zoom' })
    expect(getPopup()?.classList.contains('s-popup--zoom')).toBe(true)

    const overlay = document.body.querySelector('.s-overlay') as HTMLElement | null
    overlay?.click()

    expect(wrapper.emitted('update:visible')).toEqual([[false]])
    expect(wrapper.emitted('overlay-click')).toHaveLength(1)
    expect(wrapper.emitted('overlay-click')?.[0]?.[0]).toBeInstanceOf(MouseEvent)

    wrapper.unmount()
  })
})
