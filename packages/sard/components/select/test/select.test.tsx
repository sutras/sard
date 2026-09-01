import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import { getRegionData } from 'region-data'

const regionData = getRegionData()

import Select from '../select.vue'
import SelectOption from '../select-option.vue'
import SelectOptionGroup from '../select-option-group.vue'

describe('Select', () => {
  test('Basic', async () => {
    const wrapper = mount(
      <Select modelValue={130000}>
        {regionData.map((item) => {
          return <SelectOption key={item.code} label={item.name} value={item.code}></SelectOption>
        })}
      </Select>,
    )

    expect(wrapper.find('.is-selected .s-select-option__label').text()).toBe('河北省')

    await wrapper.setProps({
      modelValue: 440000,
    })

    expect(wrapper.find('.is-selected .s-select-option__label').text()).toBe('广东省')
  })

  test('Group', async () => {
    const wrapper = mount(
      <Select modelValue={440100}>
        {regionData.map((group) => {
          return (
            <SelectOptionGroup key={group.code} label={group.name}>
              {group.children.map((item) => {
                return (
                  <SelectOption key={item.code} label={item.name} value={item.code}></SelectOption>
                )
              })}
            </SelectOptionGroup>
          )
        })}
      </Select>,
    )

    expect(wrapper.find('.is-selected .s-select-option__label').text()).equal('广州市')

    expect(
      wrapper.find('.s-select-option-group .s-select-option-group__content .is-selected').text(),
    ).equal('广州市')
  })

  test('Multiple', async () => {
    const wrapper = mount(
      <Select modelValue={[440000, 450000]} multiple>
        {regionData.map((item) => {
          return <SelectOption key={item.code} label={item.name} value={item.code}></SelectOption>
        })}
      </Select>,
    )

    expect(
      wrapper
        .findAll('.is-selected .s-select-option__label')
        .map((item) => item.text())
        .join(','),
    ).equal('广东省,广西壮族自治区')

    await wrapper.setProps({
      modelValue: [540000, 640000],
    })

    expect(
      wrapper
        .findAll('.is-selected .s-select-option__label')
        .map((item) => item.text())
        .join(','),
    ).equal('西藏自治区,宁夏回族自治区')
  })

  test('Toolbar', async () => {
    const wrapper = mount(
      <Select modelValue={[440000, 450000]} multiple showToolbar>
        {regionData.map((item) => {
          return <SelectOption key={item.code} label={item.name} value={item.code}></SelectOption>
        })}
      </Select>,
    )

    expect(wrapper.find('.s-select__num').html()).include('2')

    await wrapper.find('.s-select__toolbar .s-button:nth-child(3)').trigger('click')

    expect(wrapper.find('.s-select__num').html()).include('31')

    await wrapper.find('.s-select__toolbar .s-button:nth-child(2)').trigger('click')

    expect(wrapper.find('.s-select__num').html()).include('0')
  })

  test('Disabled', async () => {
    const wrapper = mount(
      <Select>
        {regionData.map((item, i) => {
          return (
            <SelectOption
              key={item.code}
              label={item.name}
              value={item.code}
              disabled={i % 4 === 0}
            ></SelectOption>
          )
        })}
      </Select>,
    )

    expect(
      wrapper
        .findAll('.s-select-option:nth-child(4n+1)')
        .every((item) => item.classes().includes('is-disabled')),
    ).toBeTruthy()
  })

  test('CustomLabel', async () => {
    const wrapper = mount(
      <Select>
        {regionData.map((item) => {
          return (
            <SelectOption key={item.code} label={item.name} value={item.code}>
              {{
                label() {
                  return 'custom'
                },
              }}
            </SelectOption>
          )
        })}
      </Select>,
    )

    expect(
      wrapper.findAll('.s-select-option__label').every((item) => item.text() === 'custom'),
    ).toBeTruthy()
  })

  test('CustomOption', async () => {
    const wrapper = mount(
      <Select>
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
      </Select>,
    )

    expect(
      wrapper.findAll('.s-select-option').every((item) => item.text() === 'custom'),
    ).toBeTruthy()
  })

  test('Filterable', async () => {
    const wrapper = mount(
      <Select filterable filterPlaceholder="请输入过滤关键词">
        {regionData.map((item) => {
          return <SelectOption key={item.code} label={item.name} value={item.code} />
        })}
      </Select>,
    )

    expect(wrapper.find('.s-select__search').exists()).toBeTruthy()
    expect(wrapper.find('.s-input input').attributes('placeholder')).toBe('请输入过滤关键词')
  })

  test('Remote', async () => {
    const wrapper = mount(
      <Select filterable filterPlaceholder="请输入过滤关键词">
        {regionData.slice(0, 5).map((item) => {
          return <SelectOption key={item.code} label={item.name} value={item.code} />
        })}
      </Select>,
    )

    expect(wrapper.find('.s-select').exists()).toBe(true)
    expect(wrapper.find('.s-select__search').exists()).toBe(true)
    expect(wrapper.findAll('.s-select-option')).toHaveLength(5)
  })
})
