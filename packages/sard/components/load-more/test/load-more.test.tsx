import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import LoadMore from '../load-more.vue'

describe('LoadMore', () => {
  test('basic', async () => {
    const wrapper = mount(
      <LoadMore
        incompleteText="incompleteText"
        loadingText="loadingText"
        completeText="completeText"
        errorText="errorText"
      />,
    )

    expect(wrapper.text()).toBe('incompleteText')
    expect(wrapper.classes()).toContain('s-load-more--incomplete')

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('load')

    await wrapper.setProps({
      status: 'loading',
    })
    expect(wrapper.text()).toContain('loadingText')
    expect(wrapper.classes()).toContain('s-load-more--loading')

    await wrapper.setProps({
      status: 'complete',
    })
    expect(wrapper.text()).toBe('completeText')
    expect(wrapper.classes()).toContain('s-load-more--complete')

    await wrapper.setProps({
      status: 'error',
    })
    expect(wrapper.text()).toBe('errorText')
    expect(wrapper.classes()).toContain('s-load-more--error')

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('load')
  })

  test('invisible', async () => {
    const wrapper = mount(<LoadMore invisible />)
    expect(wrapper.classes()).toContain('s-load-more--hidden')
  })
})
