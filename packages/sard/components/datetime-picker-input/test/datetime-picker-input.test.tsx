import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import DatetimePickerInput from '../datetime-picker-input.vue'
import DatetimePickerPopout from '../../datetime-picker-popout/datetime-picker-popout.vue'

describe('DatetimePickerInput', () => {
  test('basic', async () => {
    const wrapper = mount(<DatetimePickerInput modelValue="2024/02/25" valueFormat="YYYY/MM/DD" />)

    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('2024-02-25')
    expect(wrapper.findComponent(DatetimePickerPopout).props('visible')).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect(wrapper.findComponent(DatetimePickerPopout).props('visible')).toBe(true)

    await wrapper.setProps({
      modelValue: new Date(2024, 1, 26),
      outletFormat: 'YYYY/MM/DD',
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('2024/02/26')

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('')
  })
})
