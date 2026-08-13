import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Tabs from '../tabs.vue'
import Tab from '../tab.vue'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = () => {}
}

const options = [
  {
    label: '标签0',
    value: 0,
  },
  {
    label: '标签1',
    value: 1,
  },
  {
    label: '标签2',
    value: 2,
  },
]

describe('Tabs', () => {
  test('basic', async () => {
    const wrapper = mount(<Tabs options={options} modelValue={0} />)

    const tabs = wrapper.findAll('.s-tabs__tab')

    expect(tabs[1].text()).toBe('标签1')
    expect(tabs[0].classes()).toContain('is-active')
    expect(wrapper.find('.s-tabs__line').exists()).toBe(true)

    await tabs[2].trigger('click')

    expect(wrapper.emitted('change')).toEqual([[2]])
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])

    await wrapper.setProps({ modelValue: 2 })
    expect(wrapper.findAll('.s-tabs__tab')[2].classes()).toContain('is-active')
  })

  test('scrollable', async () => {
    const wrapper = mount(
      <Tabs
        options={Array.from({ length: 10 }, (_, index) => ({
          label: `标签${index}`,
          value: index,
        }))}
        modelValue={0}
        scrollable
      />,
    )

    expect(wrapper.classes()).toContain('s-tabs--scrollable')
  })

  test('disabled', async () => {
    const wrapper = mount(
      <Tabs
        modelValue={0}
        options={[
          {
            label: '标签0',
            value: 0,
          },
          {
            label: '标签1',
            value: 1,
            disabled: true,
          },
          {
            label: '标签2',
            value: 2,
          },
        ]}
      />,
    )

    const disabledTab = wrapper.findAll('.s-tabs__tab')[1]

    expect(disabledTab.classes()).toContain('is-disabled')

    await disabledTab.trigger('click')

    expect(wrapper.emitted('change')).toBeUndefined()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('pill', async () => {
    const wrapper = mount(
      <Tabs
        type="pill"
        modelValue={0}
        options={Array.from({ length: 10 }, (_, index) => ({
          label: `标签${index}`,
          value: index,
        }))}
      />,
    )

    expect(wrapper.classes()).toContain('s-tabs--pill')
    expect(wrapper.find('.s-tabs__line').exists()).toBe(false)
  })

  test('custom', async () => {
    const wrapper = mount(
      <Tabs modelValue="0">
        <Tab value="0">
          <div class="content">内容1</div>
        </Tab>
        <Tab value="1">
          <div class="content">内容2</div>
        </Tab>
      </Tabs>,
    )

    expect(wrapper.findAll('.s-tabs__tab')[0].find('.content').text()).toBe('内容1')
    expect(wrapper.findAll('.s-tabs__tab')[1].find('.content').text()).toBe('内容2')
  })
})
