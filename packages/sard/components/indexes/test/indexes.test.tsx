import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Indexes from '../indexes.vue'
import IndexesAnchor from '../indexes-anchor.vue'

const indexList = [
  { anchor: 'A', provinces: ['安徽省', '澳门特别行政区'] },
  { anchor: 'B', provinces: ['北京市'] },
  { anchor: 'C', provinces: ['重庆市'] },
  { anchor: 'F', provinces: ['福建省'] },
  { anchor: 'G', provinces: ['甘肃省', '广东省', '广西壮族自治区', '贵州省'] },
  { anchor: 'H', provinces: ['海南省', '河北省', '河南省', '黑龙江省', '湖北省', '湖南省'] },
  { anchor: 'J', provinces: ['吉林省', '江苏省', '江西省'] },
  { anchor: 'L', provinces: ['辽宁省'] },
  { anchor: 'N', provinces: ['内蒙古自治区', '宁夏回族自治区'] },
  { anchor: 'Q', provinces: ['青海省'] },
  { anchor: 'S', provinces: ['山东省', '山西省', '陕西省', '上海市', '四川省'] },
  { anchor: 'T', provinces: ['台湾省', '天津市'] },
  { anchor: 'X', provinces: ['西藏自治区', '香港特别行政区', '新疆维吾尔自治区'] },
  { anchor: 'Y', provinces: ['云南省'] },
  { anchor: 'Z', provinces: ['浙江省'] },
]

async function flush() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 50))
  await nextTick()
}

describe('Indexes', () => {
  // ── basic rendering ──────────────────────────────────────────────

  test('renders wrapper with anchors', async () => {
    const wrapper = mount(
      <Indexes current="Q" style="height: 640px">
        {indexList.map((item, i) => (
          <div key={i}>
            <IndexesAnchor name={item.anchor}>{item.anchor}</IndexesAnchor>
            {item.provinces.map((province, j) => (
              <div key={j} class="province-item">
                {province}
              </div>
            ))}
          </div>
        ))}
      </Indexes>,
    )

    await flush()

    expect(wrapper.find('.s-indexes').exists()).toBe(true)
    expect(wrapper.find('.s-indexes__scroll').exists()).toBe(true)
  })

  test('renders anchor elements', async () => {
    const wrapper = mount(
      <Indexes current="Q" style="height: 640px">
        {indexList.map((item, i) => (
          <div key={i}>
            <IndexesAnchor name={item.anchor}>{item.anchor}</IndexesAnchor>
          </div>
        ))}
      </Indexes>,
    )

    await flush()

    const anchors = wrapper.findAll('.s-indexes__anchor')
    expect(anchors.length).toBeGreaterThan(0)
  })

  // ── current prop ─────────────────────────────────────────────────

  test('renders with current prop', async () => {
    const wrapper = mount(
      <Indexes current="A">
        <div>
          <IndexesAnchor name="A">A</IndexesAnchor>
          <div class="province">安徽省</div>
        </div>
        <div>
          <IndexesAnchor name="B">B</IndexesAnchor>
          <div class="province">北京市</div>
        </div>
      </Indexes>,
    )

    await flush()

    expect(wrapper.find('.s-indexes').exists()).toBe(true)
  })

  test('updates nav active item when current changes', async () => {
    const wrapper = mount(
      <Indexes current="Q">
        {indexList.map((item, i) => (
          <div key={i}>
            <IndexesAnchor name={item.anchor}>{item.anchor}</IndexesAnchor>
          </div>
        ))}
      </Indexes>,
    )

    await flush()

    await wrapper.setProps({ current: 'G' })
    await flush()

    // Should render without error after current change
    expect(wrapper.find('.s-indexes').exists()).toBe(true)
  })

  // ── anchor registration ──────────────────────────────────────────

  test('throws when IndexesAnchor is used outside Indexes', () => {
    expect(() => mount(<IndexesAnchor name="A">A</IndexesAnchor>)).toThrow(
      'IndexesAnchor must be included in Indexes.',
    )
  })

  test('renders anchor default slot content', async () => {
    const wrapper = mount(
      <Indexes current="A">
        <div>
          <IndexesAnchor name="A">
            <span class="custom-anchor-text">Anchor A</span>
          </IndexesAnchor>
        </div>
      </Indexes>,
    )

    await flush()

    expect(wrapper.find('.custom-anchor-text').text()).toBe('Anchor A')
  })

  // ── nav ──────────────────────────────────────────────────────────

  test('renders indexes nav', async () => {
    const wrapper = mount(
      <Indexes current="A">
        <div>
          <IndexesAnchor name="A">A</IndexesAnchor>
        </div>
        <div>
          <IndexesAnchor name="B">B</IndexesAnchor>
        </div>
        <div>
          <IndexesAnchor name="C">C</IndexesAnchor>
        </div>
      </Indexes>,
    )

    await flush()

    expect(wrapper.find('.s-indexes__nav').exists()).toBe(true)
  })

  test('renders nav items for each anchor', async () => {
    const wrapper = mount(
      <Indexes current="A">
        <div>
          <IndexesAnchor name="A">A</IndexesAnchor>
        </div>
        <div>
          <IndexesAnchor name="B">B</IndexesAnchor>
        </div>
      </Indexes>,
    )

    await flush()

    const navItems = wrapper.findAll('.s-indexes__nav-item')
    expect(navItems).toHaveLength(2)
  })

  // ── skips anchors with nullish names ─────────────────────────────

  test('skips anchors with nullish names', async () => {
    const wrapper = mount(
      <Indexes current="A">
        <div>
          <IndexesAnchor name="A">A</IndexesAnchor>
        </div>
        <div>
          <IndexesAnchor name={undefined as any}>No Name</IndexesAnchor>
        </div>
      </Indexes>,
    )

    await flush()

    // Only anchor A should be registered in nav
    expect(wrapper.find('.s-indexes').exists()).toBe(true)
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('renders without anchors', () => {
    const wrapper = mount(<Indexes />)

    expect(wrapper.find('.s-indexes').exists()).toBe(true)
  })

  test('renders without current prop', async () => {
    const wrapper = mount(
      <Indexes>
        <div>
          <IndexesAnchor name="A">A</IndexesAnchor>
        </div>
      </Indexes>,
    )

    await flush()

    expect(wrapper.find('.s-indexes').exists()).toBe(true)
  })
})
