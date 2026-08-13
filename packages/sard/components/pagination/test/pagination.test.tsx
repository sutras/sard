import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Pagination from '../pagination.vue'

const getPageTexts = (wrapper: ReturnType<typeof mount>) =>
  wrapper
    .findAll('.s-pagination__item')
    .slice(1, -1)
    .map((item) => item.text())

describe('Pagination', () => {
  test('prev click updates internal current page and disabled state', async () => {
    const wrapper = mount(<Pagination total={100} current={2} />)

    expect(wrapper.find('.s-pagination__item.is-current').text()).toBe('2')

    await wrapper.find('.s-pagination__prev').trigger('click')

    expect(wrapper.find('.s-pagination__prev').classes()).toEqual(
      expect.arrayContaining(['s-pagination__item', 's-pagination__prev', 'is-disabled']),
    )
    expect(wrapper.find('.s-pagination__item.is-current').text()).toBe('1')
    expect(wrapper.emitted('update:current')?.[0]).toEqual([1])
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  test('ellipsis text follows the current multi-page range', async () => {
    const wrapper = mount(<Pagination total={100} current={1} ellipsis />)

    expect(getPageTexts(wrapper)).toEqual(['1', '2', '3', '4', '...'])

    await wrapper.setProps({
      current: 5,
    })

    expect(getPageTexts(wrapper)).toEqual(['...', '4', '5', '6', '...'])
  })

  test('simple type renders ratio and updates on next click', async () => {
    const wrapper = mount(<Pagination total={100} current={1} pageSize={10} type="simple" />)

    expect(wrapper.find('.s-pagination__prev').classes()).toContain('is-disabled')
    expect(wrapper.find('.s-pagination__ratio').text()).toBe('1/10')

    await wrapper.find('.s-pagination__next').trigger('click')

    expect(wrapper.find('.s-pagination__ratio').text()).toBe('2/10')
    expect(wrapper.emitted('update:current')?.[0]).toEqual([2])
    expect(wrapper.emitted('change')?.[0]).toEqual([2])
  })

  test('custom prev and next slots override labels', async () => {
    const wrapper = mount(
      <Pagination
        total={100}
        current={1}
        pageSize={10}
        type="simple"
        v-slots={{
          prev: () => 'prev page',
          next: () => 'next page',
        }}
      />,
    )

    expect(wrapper.find('.s-pagination__prev').text()).toBe('prev page')
    expect(wrapper.find('.s-pagination__next').text()).toBe('next page')
  })
})
