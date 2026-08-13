import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Waterfall from '../waterfall.vue'
import WaterfallItem from '../waterfall-item.vue'
import WaterfallLoad from '../waterfall-load.vue'
import SimulatedImage from './SimulatedImage.vue'
import { random, sleep } from '../../../utils'

// ── ResizeObserver polyfill ────────────────────────────────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

const text = `黄初三年，余朝京师，还济洛川。古人有言，斯水之神，名曰宓妃。感宋玉对楚王神女之事，遂作斯赋。其辞曰：
    余从京域，言归东藩。背伊阙，越轘辕，经通谷，陵景山。日既西倾，车殆马烦。尔乃税驾乎蘅皋，秣驷乎芝田，容与乎阳林，流眄乎洛川。于是精移神骇，忽焉思散。俯则未察，仰以殊观，睹一丽人，于岩之畔。乃援御者而告之曰："尔有觌于彼者乎？彼何人斯？若此之艳也！"御者对曰："臣闻河洛之神，名曰宓妃。然则君王之所见也，无乃是乎？其状若何？臣愿闻之。"
    余告之曰："其形也，翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松寐归乎东路。`

const getData = () => {
  return Array(3)
    .fill(0)
    .map(() => {
      const min = 20
      const max = 50
      const startIndex = random(0, text.length - max)
      const length = random(min, max)
      return {
        title: text.slice(startIndex, startIndex + length),
        img: {
          width: random(100, 500),
          height: random(100, 500),
        },
      }
    })
}

async function flush() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 50))
  await nextTick()
}

describe('Waterfall', () => {
  // ── basic ────────────────────────────────────────────────────────

  test('emits loadstart immediately and load after items finish', async () => {
    const onLoad = vi.fn<() => void>()
    const onLoadStart = vi.fn<() => void>()

    mount(
      <Waterfall onLoad={onLoad} onLoadstart={onLoadStart}>
        {getData().map(() => (
          <WaterfallItem>
            {{
              default: ({ onLoad }: { onLoad: () => void }) => (
                <>
                  <WaterfallLoad />
                  <SimulatedImage meta={{ width: 0, height: 0 }} onLoad={onLoad} />
                </>
              ),
            }}
          </WaterfallItem>
        ))}
      </Waterfall>,
    )

    expect(onLoadStart).toHaveBeenCalled()
    await sleep(160)
    expect(onLoad).toHaveBeenCalled()
  })

  // ── rendering ────────────────────────────────────────────────────

  test('renders wrapper element', () => {
    const wrapper = mount(
      <Waterfall>
        <WaterfallItem>
          {{
            default: () => <div class="item-content">Item 1</div>,
          }}
        </WaterfallItem>
      </Waterfall>,
    )

    expect(wrapper.find('.s-waterfall').exists()).toBe(true)
  })

  test('renders multiple waterfall items', () => {
    const wrapper = mount(
      <Waterfall columns={2}>
        {getData().map((item, i) => (
          <WaterfallItem key={i}>
            {{
              default: () => <div class="item-content">{item.title}</div>,
            }}
          </WaterfallItem>
        ))}
      </Waterfall>,
    )

    expect(wrapper.findAll('.s-waterfall-item')).toHaveLength(3)
  })

  // ── columns prop ─────────────────────────────────────────────────

  test('renders with default columns', () => {
    const wrapper = mount(
      <Waterfall>
        <WaterfallItem>
          {{
            default: () => <div class="item">A</div>,
          }}
        </WaterfallItem>
      </Waterfall>,
    )

    expect(wrapper.find('.s-waterfall').exists()).toBe(true)
  })

  test('renders with custom columns and gaps', () => {
    const wrapper = mount(
      <Waterfall columns={3} columnGap={8} rowGap={12}>
        <WaterfallItem>
          {{
            default: () => <div class="item">A</div>,
          }}
        </WaterfallItem>
        <WaterfallItem>
          {{
            default: () => <div class="item">B</div>,
          }}
        </WaterfallItem>
      </Waterfall>,
    )

    expect(wrapper.find('.s-waterfall').exists()).toBe(true)
    expect(wrapper.findAll('.s-waterfall-item')).toHaveLength(2)
  })

  // ── load status ──────────────────────────────────────────────────

  test('emits loadstart when items contain loading', async () => {
    const onLoadStart = vi.fn<() => void>()

    mount(
      <Waterfall onLoadstart={onLoadStart}>
        <WaterfallItem>
          {{
            default: ({ onLoad }: { onLoad: () => void }) => (
              <>
                <WaterfallLoad />
                <SimulatedImage meta={{ width: 0, height: 0 }} onLoad={onLoad} />
              </>
            ),
          }}
        </WaterfallItem>
      </Waterfall>,
    )

    await flush()
    expect(onLoadStart).toHaveBeenCalled()
  })

  // ── WaterfallLoad ────────────────────────────────────────────────

  test('renders WaterfallLoad component', () => {
    const wrapper = mount(
      <Waterfall>
        <WaterfallItem>
          {{
            default: () => (
              <>
                <WaterfallLoad />
                <div class="content">Loaded</div>
              </>
            ),
          }}
        </WaterfallItem>
      </Waterfall>,
    )

    expect(wrapper.find('.s-waterfall-load').exists()).toBe(true)
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('renders without items', () => {
    const wrapper = mount(<Waterfall />)

    expect(wrapper.find('.s-waterfall').exists()).toBe(true)
  })

  test('passes columnWidth to item slot', () => {
    let capturedWidth: number | undefined
    mount(
      <Waterfall columns={3}>
        <WaterfallItem>
          {{
            default: ({ columnWidth }: { columnWidth: number }) => {
              capturedWidth = columnWidth
              return <div class="item">A</div>
            },
          }}
        </WaterfallItem>
      </Waterfall>,
    )

    expect(capturedWidth).toBeDefined()
  })
})
