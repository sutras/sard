import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Timeline from '../timeline.vue'
import TimelineItem from '../timeline-item.vue'

describe('Timeline', () => {
  test('renders dotted and slotted timeline items with current slot-driven icon behavior', async () => {
    const wrapper = mount(
      <Timeline>
        <TimelineItem time="2024-06-17 10:00:00">收货地址：广东广州xxx1号店</TimelineItem>
        <TimelineItem title="已签收" time="2024-06-17 09:01:47">
          {{
            icon: () => <span class="custom-icon">签</span>,
            default: () =>
              '您的订单已由【xxx（广州xxx1号店）代收。如有疑问您可以联系配送员【xxx，13800138000】确认。感谢您在xxx购物，欢迎再次光临。】',
          }}
        </TimelineItem>
        <TimelineItem title="派送中" time="2024-06-17 08:01:25">
          {{
            icon: () => <span class="custom-icon">派</span>,
            default: () => '您的订单正在配送途中（快递员：xxx，电话13800138000），请你耐心等待。',
          }}
        </TimelineItem>
      </Timeline>,
    )

    const items = wrapper.findAll('.s-timeline-item')

    expect(wrapper.find('.s-timeline').exists()).toBe(true)
    expect(items).toHaveLength(3)
    expect(items[0].classes()).toContain('s-timeline-item--dotted')
    expect(items[0].find('.s-timeline-item__dot').exists()).toBe(true)
    expect(items[0].find('.s-timeline-item__description').text()).toBe('收货地址：广东广州xxx1号店')

    expect(items[1].classes()).not.toContain('s-timeline-item--dotted')
    expect(items[1].find('.s-timeline-item__icon').text()).toBe('签')
    expect(items[1].find('.s-timeline-item__title').text()).toBe('已签收')

    expect(items[2].find('.s-timeline-item__time').text()).toBe('2024-06-17 08:01:25')
  })
})
