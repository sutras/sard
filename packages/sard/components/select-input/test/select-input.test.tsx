import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { getRegionData } from 'region-data'

const regionData = getRegionData()

import SelectOption from '../../select/select-option.vue'
import SelectInput from '../../select-input/select-input.vue'
import { ref } from 'vue'
import { sleep } from '../../../utils'

describe('SelectInput', () => {
  test('Basic', async () => {
    const value = ref<number>()

    const wrapper = mount(() => (
      <SelectInput
        modelValue={value}
        options={regionData}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        visible={true}
      />
    ))

    value.value = 440000
    await sleep(0)

    expect((wrapper.find('.s-popout-input').find('input').element as HTMLInputElement).value).toBe(
      '广东省',
    )

    value.value = 120000
    await sleep(0)

    expect((wrapper.find('.s-popout-input').find('input').element as HTMLInputElement).value).toBe(
      '天津市',
    )
  })

  test('Slot', async () => {
    const value = ref<number>()

    const wrapper = mount(() => (
      <SelectInput
        modelValue={value}
        options={regionData}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        visible={true}
      >
        {regionData.map((item) => {
          return (
            <SelectOption key={item.code} label={item.name} value={item.code}>
              {{
                default() {
                  return 'custom'
                },
              }}
            </SelectOption>
          )
        })}
      </SelectInput>
    ))

    expect(
      wrapper.findAll('.s-select-option').every((item) => item.text() === 'custom'),
    ).toBeTruthy()
  })

  test('Multiple', async () => {
    const value = ref<number[]>()

    const wrapper = mount(
      <SelectInput
        options={regionData}
        optionKeys={{ label: 'name', value: 'code', children: '' }}
        multiple
        showToolbar
        modelValue={value}
        maxLabels={3}
        visible={true}
      />,
    )

    value.value = [440000, 450000]
    await sleep(0)

    expect(
      (wrapper.find('.s-popout-input').find('textarea').element as HTMLTextAreaElement).value,
    ).toBe('广东省, 广西壮族自治区')
  })

  test('Remote', async () => {
    const wrapper = mount(
      <SelectInput
        filterable
        filterPlaceholder="请输入过滤关键词"
        placeholder="请选择"
        visible={true}
      />,
    )

    expect(wrapper.find('.s-popout-input').exists()).toBe(true)
    expect(document.querySelector('.s-select__search')).toBeTruthy()
  })
})
