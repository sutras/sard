import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Search from '../search.vue'

describe('Search', () => {
  test('basic', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" modelValue="内容" />)

    expect(wrapper.find('input').element.value).toBe('内容')
    await wrapper.setProps({
      modelValue: '新的内容',
    })
    expect(wrapper.find('input').element.value).toBe('新的内容')
  })

  test('search', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" modelValue="内容" search="搜索" />)

    expect(wrapper.classes()).toContain('s-search--show-action')
    expect(wrapper.find('.s-search__append .s-button').text()).toBe('搜索')

    await wrapper.find('.s-search__append .s-button').trigger('click')

    expect(wrapper.emitted('search')?.[0]).toEqual(['内容'])
  })

  test('cancel', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" modelValue="内容" cancel="取消" />)

    expect(wrapper.classes()).toContain('s-search--show-action')
    expect(wrapper.find('.s-search__append .s-button').text()).toBe('取消')

    await wrapper.find('.s-search__append .s-button').trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  test('round', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" shape="round" />)

    expect(wrapper.find('.s-search__input').classes()).toContain('s-search__input--round')
  })

  test('align', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" align="center" />)

    expect(wrapper.find('.s-input').attributes('style')).toContain('text-align: center;')
  })

  test('background', async () => {
    const wrapper = mount(
      <Search placeholder="请输入关键词" background="red" inputBackground="white" />,
    )

    expect(wrapper.attributes('style')).toContain('background-color: red;')
    expect(wrapper.find('.s-input').attributes('style')).toContain('background-color: white;')
  })

  test('readonly', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" readonly />)

    expect(wrapper.find('.s-input').classes()).toContain('is-readonly')
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  test('disabled', async () => {
    const wrapper = mount(<Search placeholder="请输入关键词" disabled />)

    expect(wrapper.classes()).toContain('s-search--disabled')
    expect(wrapper.find('.s-input').classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  test('slot', async () => {
    const wrapper = mount(
      <Search
        placeholder="请输入关键词"
        v-slots={{
          prepend: () => <div class="prepend">prepend</div>,
          'input-prepend': () => <div class="input-prepend">input-prepend</div>,
          'input-append': () => <div class="input-append">input-append</div>,
          append: () => <div class="append">append</div>,
        }}
      />,
    )

    expect(wrapper.find('.s-search__prepend .prepend').text()).toBe('prepend')
    expect(wrapper.find('.s-input__prepend .input-prepend').text()).toBe('input-prepend')
    expect(wrapper.find('.s-input__append .input-append').text()).toBe('input-append')
    expect(wrapper.find('.s-search__append .append').text()).toBe('append')
  })
})
