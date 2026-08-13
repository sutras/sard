import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ReadMore from '../read-more.vue'

describe('ReadMore', () => {
  test('basic', async () => {
    const wrapper = mount(<ReadMore maxHeight={200}>内容</ReadMore>)

    expect(wrapper.find('.s-read-more__content').attributes('style')).toContain(
      'max-height: 200px;',
    )
    expect(wrapper.find('.s-read-more__content').text()).toContain('内容')
  })

  test('toggle', async () => {
    const wrapper = mount(
      <ReadMore maxHeight={200} closeText="展开吧" openText="收起吧">
        内容
      </ReadMore>,
    )

    expect(wrapper.classes()).toContain('s-read-more--close')
    expect(wrapper.find('.s-button').text()).toContain('展开吧')

    await wrapper.find('.s-button').trigger('click')

    expect(wrapper.classes()).not.toContain('s-read-more--close')
    expect(wrapper.find('.s-button').text()).toContain('收起吧')
    expect(wrapper.find('.s-read-more__content').attributes('style')).toContain('max-height: none;')
  })

  test('event', async () => {
    const wrapper = mount(<ReadMore maxHeight={200}>内容</ReadMore>)

    await wrapper.find('.s-button').trigger('click')

    expect(wrapper.emitted('update:visible')?.[0]).toEqual([true])
    expect(wrapper.emitted('open')).toHaveLength(1)

    await wrapper.find('.s-button').trigger('click')

    expect(wrapper.emitted('update:visible')?.[1]).toEqual([false])
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  test('hideClose', async () => {
    const wrapper = mount(
      <ReadMore maxHeight={200} hideClose>
        内容
      </ReadMore>,
    )

    expect(wrapper.find('.s-read-more__toggle').exists()).toBe(true)

    await wrapper.find('.s-button').trigger('click')

    expect(wrapper.find('.s-read-more__toggle').exists()).toBe(false)
  })
})
