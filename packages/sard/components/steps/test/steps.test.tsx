import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Steps from '../steps.vue'
import Step from '../step.vue'

const itemList = [{ name: '步骤1' }, { name: '步骤2' }, { name: '步骤3' }]

describe('Steps', () => {
  test('basic', async () => {
    const wrapper = mount(<Steps current={0} itemList={itemList} />)

    expect(wrapper.findAll('.s-step')[0].classes()).toContain('s-step--process')
    expect(wrapper.findAll('.s-step')[1].classes()).toContain('s-step--wait')
    expect(wrapper.findAll('.s-step')[2].classes()).toContain('s-step--wait')

    await wrapper.setProps({ current: 1 })

    expect(wrapper.findAll('.s-step')[0].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[1].classes()).toContain('s-step--process')
    expect(wrapper.findAll('.s-step')[2].classes()).toContain('s-step--wait')

    await wrapper.setProps({ current: 2 })

    expect(wrapper.findAll('.s-step')[0].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[1].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[2].classes()).toContain('s-step--process')

    await wrapper.setProps({ current: 3 })

    expect(wrapper.findAll('.s-step')[0].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[1].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[2].classes()).toContain('s-step--finish')
  })

  test('center', async () => {
    const wrapper = mount(<Steps current={1} center itemList={itemList} />)

    expect(
      wrapper.findAll('.s-step').every((item) => item.classes().includes('s-step--center')),
    ).toBe(true)
  })

  test('vertical', async () => {
    const wrapper = mount(<Steps current={1} direction="vertical" itemList={itemList} />)

    expect(wrapper.classes()).toContain('s-steps--vertical')
    expect(
      wrapper.findAll('.s-step').every((item) => item.classes().includes('s-step--vertical')),
    ).toBe(true)
  })

  test('verticalCenter', async () => {
    const wrapper = mount(<Steps current={1} direction="vertical" center itemList={itemList} />)

    expect(
      wrapper
        .findAll('.s-step')
        .every(
          (item) =>
            item.classes().includes('s-step--center') &&
            item.classes().includes('s-step--vertical'),
        ),
    ).toBe(true)
  })

  test('status', async () => {
    const wrapper = mount(<Steps current={1} itemList={itemList} status="finish" />)

    expect(wrapper.findAll('.s-step')[1].classes()).toContain('s-step--finish')
  })

  test('errorStatus', async () => {
    const wrapper = mount(
      <Steps
        current={1}
        itemList={[
          { name: '第1节', description: '已学习', status: 'finish' },
          { name: '第2节', description: '学习中', status: 'process' },
          { name: '第3节', description: '未学习', status: 'wait' },
          { name: '第4节', description: '已学习', status: 'finish' },
          { name: '第5节', description: '出错了', status: 'error' },
        ]}
      />,
    )

    expect(wrapper.findAll('.s-step')[0].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[1].classes()).toContain('s-step--process')
    expect(wrapper.findAll('.s-step')[2].classes()).toContain('s-step--wait')
    expect(wrapper.findAll('.s-step')[3].classes()).toContain('s-step--finish')
    expect(wrapper.findAll('.s-step')[4].classes()).toContain('s-step--error')
  })

  test('step slots', async () => {
    const wrapper = mount(
      <Steps current={1}>
        {itemList.map((item, index) => (
          <Step
            index={index}
            v-slots={{
              default: () => <div class="custom-title">{item.name}</div>,
              icon: () => <div class="custom-icon">{item.name}</div>,
            }}
          />
        ))}
      </Steps>,
    )

    expect(wrapper.find('.s-step--process .s-step__body .custom-title').text()).toBe('步骤2')
    expect(wrapper.find('.s-step--process .s-step__header .custom-icon').text()).toBe('步骤2')
  })
})
