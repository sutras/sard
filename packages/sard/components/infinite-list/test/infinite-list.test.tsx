import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import InfiniteList from '../infinite-list.vue'
import LoadMore from '../../load-more/load-more.vue'
import PullDownRefresh from '../../pull-down-refresh/pull-down-refresh.vue'

describe('InfiniteList', () => {
  test('basic', async () => {
    const wrapper = mount(
      <InfiniteList request={async () => true}>
        <div class="content">content</div>
      </InfiniteList>,
    )

    expect(wrapper.find('.content').text()).toBe('content')
    expect(wrapper.findComponent(LoadMore).exists()).toBe(true)
    expect(wrapper.classes()).toContain('s-infinite-list')
  })

  test('hide-load-more', () => {
    const wrapper = mount(
      <InfiniteList request={async () => true} hide-load-more={true}>
        <div>content</div>
      </InfiniteList>,
    )

    const loadMoreEl = wrapper.find('.s-infinite-list__load-more')
    expect(loadMoreEl.classes()).toContain('is-hidden')
  })

  test('load-more on intersection', async () => {
    let page = 0

    const wrapper = mount(
      <InfiniteList
        request={async (p) => {
          page = p
          return p >= 2
        }}
      >
        <div>content</div>
      </InfiniteList>,
    )

    const loadMore = wrapper.findComponent(LoadMore)
    await loadMore.trigger('click')

    // wait for async request
    await new Promise((r) => setTimeout(r, 50))
    expect(page).toBe(2)
  })

  test('load-more complete status', async () => {
    const wrapper = mount(
      <InfiniteList request={async () => true}>
        <div>content</div>
      </InfiniteList>,
    )

    const loadMore = wrapper.findComponent(LoadMore)
    await loadMore.trigger('click')
    await new Promise((r) => setTimeout(r, 50))

    expect(loadMore.classes()).toContain('s-load-more--complete')
  })

  test('load-more error status and reload', async () => {
    let callCount = 0

    const wrapper = mount(
      <InfiniteList
        request={async () => {
          callCount++
          throw new Error('fail')
        }}
      >
        <div>content</div>
      </InfiniteList>,
    )

    const loadMore = wrapper.findComponent(LoadMore)
    await loadMore.trigger('click')
    await new Promise((r) => setTimeout(r, 50))

    expect(loadMore.classes()).toContain('s-load-more--error')

    await loadMore.trigger('click')
    await new Promise((r) => setTimeout(r, 50))
    expect(callCount).toBe(2)
  })

  test('expose refresh', async () => {
    let page = 0

    const wrapper = mount(
      <InfiniteList
        request={async (p) => {
          page = p
          return true
        }}
      >
        <div>content</div>
      </InfiniteList>,
    )

    ;(wrapper.vm as any).refresh()
    await new Promise((r) => setTimeout(r, 50))

    expect(page).toBe(1)
  })

  test('refresh emits refresh-success', async () => {
    const wrapper = mount(
      <InfiniteList request={async () => true} refreshable={true}>
        <div>content</div>
      </InfiniteList>,
    )

    const pullDownRefresh = wrapper.findComponent(PullDownRefresh)

    await new Promise((r) => setTimeout(r, 50))

    await (pullDownRefresh as any).vm.$emit('refresh')
    await new Promise((r) => setTimeout(r, 100))

    expect(wrapper.emitted()).toHaveProperty('refresh-success')
  })

  test('default slot receives status and refresh', () => {
    const wrapper = mount(InfiniteList, {
      props: {
        request: async () => true,
      },
      slots: {
        default:
          '<template #default="{ status, refresh }"><span class="status">{{ status }}</span></template>',
      },
    })

    expect(wrapper.find('.status').text()).toBe('incomplete')
  })

  test('not refreshable when refreshable is false', async () => {
    const wrapper = mount(
      <InfiniteList request={async () => true} refreshable={false}>
        <div>content</div>
      </InfiniteList>,
    )

    const pullDownRefresh = wrapper.findComponent(PullDownRefresh)
    expect((pullDownRefresh as any).props('disabled')).toBe(true)
  })

  test('done-duration prop', () => {
    const wrapper = mount(
      <InfiniteList request={async () => true} done-duration={500}>
        <div>content</div>
      </InfiniteList>,
    )

    const pullDownRefresh = wrapper.findComponent(PullDownRefresh)
    expect((pullDownRefresh as any).props('doneDuration')).toBe(500)
  })
})
