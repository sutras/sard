import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Accordion from '../accordion.vue'
import AccordionItem from '../accordion-item.vue'
import Collapse from '../../collapse/collapse.vue'

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function createSlots() {
  return [
    <AccordionItem key="1" title="标题1" name="1">
      内容1
    </AccordionItem>,
    <AccordionItem key="2" title="标题2" name="2">
      内容2
    </AccordionItem>,
    <AccordionItem key="3" title="标题3" name="3">
      内容3
    </AccordionItem>,
  ]
}

function renderAccordion(props?: Record<string, unknown>) {
  return <Accordion {...props}>{createSlots()}</Accordion>
}

function getVisibleList(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAllComponents(Collapse).map((item) => item.props('visible'))
}

describe('Accordion', () => {
  test('create', async () => {
    const wrapper = mount(renderAccordion({ modelValue: '1' }))

    expect(wrapper.find('.s-accordion').exists()).toBe(true)
    expect(wrapper.find('.s-accordion-item__body').exists()).toBe(true)
    expect(wrapper.text()).toContain('内容1')
    expect(
      wrapper
        .findAll('.s-collapse')
        .map((item) => item.attributes())
        .map((item) => item.style)
        .every((item, index) => {
          return item.includes(index === 0 ? 'auto' : '0px')
        }),
    ).toBe(true)
  })

  test('toggle and emit modelValue in single mode', async () => {
    const wrapper = mount(renderAccordion({ modelValue: '1' }))

    await wrapper.findAll('.s-accordion-item__header')[1].trigger('click')
    await sleep(0)

    expect(getVisibleList(wrapper)).toEqual([false, true, false])
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2'])

    await wrapper.setProps({ modelValue: '2' })
    await wrapper.findAll('.s-accordion-item__header')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([undefined])
  })

  test('supports multiple mode', async () => {
    const wrapper = mount(renderAccordion({ modelValue: ['1'], multiple: true }))

    await wrapper.findAll('.s-accordion-item__header')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1', '2']])
    expect(getVisibleList(wrapper)).toEqual([true, true, false])

    await wrapper.setProps({ modelValue: ['1', '2'] })
    await wrapper.findAll('.s-accordion-item__header')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['2']])
  })

  test('disabled item does not toggle', async () => {
    const wrapper = mount(
      <Accordion modelValue="1">
        <AccordionItem title="标题1" name="1">
          内容1
        </AccordionItem>
        <AccordionItem title="标题2" name="2" disabled>
          内容2
        </AccordionItem>
      </Accordion>,
    )

    const disabledItem = wrapper.findAllComponents(AccordionItem)[1]
    await wrapper.findAll('.s-accordion-item__header')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    expect(disabledItem.emitted('click')).toHaveLength(1)
    expect(wrapper.findAll('.s-collapse')[1].attributes().style).toContain('0px')
    expect(wrapper.find('.s-accordion-item').classes()).not.toContain('is-disabled')
    expect(wrapper.findAll('.s-accordion-item')[1].classes()).toContain('is-disabled')
  })

  test('renders title, extra and arrow slots', async () => {
    const wrapper = mount(
      <Accordion modelValue="slot">
        <AccordionItem
          name="slot"
          v-slots={{
            title: () => <div class="custom-title">自定义标题</div>,
            extra: () => <div class="custom-extra">附加信息</div>,
            arrow: ({ visible }: { visible: boolean }) => (
              <div class="custom-arrow">{visible ? '展开' : '收起'}</div>
            ),
          }}
        >
          插槽内容
        </AccordionItem>
      </Accordion>,
    )

    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
    expect(wrapper.find('.custom-extra').text()).toBe('附加信息')
    expect(wrapper.find('.custom-arrow').text()).toBe('展开')
  })

  test('hide-border', async () => {
    const wrapper = mount(renderAccordion({ modelValue: '1', hideBorder: true }))

    expect(wrapper.find('.s-accordion').classes().includes('s-accordion--borderless')).toBeTruthy()
    expect(
      wrapper.find('.s-accordion-item').classes().includes('s-accordion-item--borderless'),
    ).toBeTruthy()
  })
})
