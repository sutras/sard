import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import PickerInput from '../picker-input.vue'
import PickerPopout from '../../picker-popout/picker-popout.vue'

const columns = [
  {
    value: 'male',
    label: '男性',
  },
  {
    value: 'female',
    label: '女性',
  },
  {
    value: 'others',
    label: '其他',
  },
]

describe('PickerInput', () => {
  test('basic', async () => {
    const wrapper = mount(<PickerInput modelValue="female" columns={columns} />)

    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('女性')
    expect((wrapper.findComponent(PickerPopout) as any).props('visible')).toBe(false)

    await wrapper.setProps({
      visible: true,
    })
    expect((wrapper.findComponent(PickerPopout) as any).props('visible')).toBe(true)

    await wrapper.setProps({
      modelValue: 'male',
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('男性')

    await wrapper.setProps({
      modelValue: 'unknown',
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('男性')

    await wrapper.setProps({
      modelValue: undefined,
    })
    expect((wrapper.find('.s-input input').element as HTMLInputElement).value).toBe('')
  })

  test('only opens from click when columns are available', async () => {
    const wrapper = mount(<PickerInput columns={[]} />)

    await wrapper.find('.s-popout-input__seal').trigger('click')

    expect((wrapper.findComponent(PickerPopout) as any).props('visible')).toBe(false)

    await wrapper.setProps({
      columns,
    })
    await wrapper.find('.s-popout-input__seal').trigger('click')

    expect((wrapper.findComponent(PickerPopout) as any).props('visible')).toBe(true)
  })
})
