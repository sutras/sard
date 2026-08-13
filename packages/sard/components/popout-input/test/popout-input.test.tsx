import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import PopoutInput from '../popout-input.vue'

describe('PopoutInput', () => {
  test('basic', async () => {
    const wrapper = mount(
      <PopoutInput modelValue="123456" clearable>
        <div class="content">内容</div>
      </PopoutInput>,
    )

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('123456')
    expect(wrapper.find('.s-input').classes()).toContain('s-input--inlaid')
    expect(wrapper.find('.s-popout-input__arrow').exists()).toBe(true)
    expect(wrapper.find('.s-popout-input__seal').exists()).toBe(true)
    expect(wrapper.find('.content').text()).toBe('内容')

    await wrapper.find('.s-input__clear').trigger('touchstart', {
      touches: [{ clientX: 0, clientY: 0 }],
    })
    await wrapper.find('.s-input__clear').trigger('touchend', {
      changedTouches: [{ clientX: 0, clientY: 0 }],
    })

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('change')?.at(-1)).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  test('click event and readonly state', async () => {
    const onClick = vi.fn<() => void>()
    const wrapper = mount(<PopoutInput modelValue="123456" onClick={onClick} />)

    await wrapper.find('.s-popout-input__seal').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ readonly: true })

    expect(wrapper.find('.s-popout-input').classes()).toContain('s-popout-input--readonly')
    expect(wrapper.find('.s-popout-input__arrow').exists()).toBe(false)

    await wrapper.find('.s-popout-input__seal').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('loading state', async () => {
    const wrapper = mount(<PopoutInput modelValue="123456" loading />)

    expect(wrapper.find('.s-popout-input').classes()).toContain('s-popout-input--loading')
    expect(wrapper.find('.s-popout-input__loading').exists()).toBe(true)
  })
})
