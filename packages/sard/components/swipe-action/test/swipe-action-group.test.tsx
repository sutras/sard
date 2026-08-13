import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

import SwipeAction from '../swipe-action.vue'
import SwipeActionGroup from '../swipe-action-group.vue'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('SwipeActionGroup', () => {
  test('accordion behavior hides other items on touchstart by default', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          left: 0,
          top: 0,
          right: 100,
          bottom: 40,
          width: 100,
          height: 40,
          x: 0,
          y: 0,
          toJSON() {
            return {}
          },
        }) as DOMRect,
    )

    const firstVisible = ref<'right' | false>('right')
    const secondVisible = ref<'left' | false>(false)

    const wrapper = mount({
      components: {
        SwipeAction,
        SwipeActionGroup,
      },
      setup() {
        return {
          firstVisible,
          secondVisible,
        }
      },
      template: `
        <SwipeActionGroup>
          <SwipeAction v-model:visible="firstVisible">
            <div>一</div>
            <template #right="{ hide }"><button @click="hide()">删</button></template>
          </SwipeAction>
          <SwipeAction v-model:visible="secondVisible">
            <div>二</div>
            <template #left="{ hide }"><button @click="hide()">赞</button></template>
          </SwipeAction>
        </SwipeActionGroup>
      `,
    })

    await wrapper.findAll('.s-swipe-action')[1].trigger('touchstart', {
      touches: [{ clientX: 10, clientY: 10 }],
      changedTouches: [{ clientX: 10, clientY: 10 }],
    })

    expect(firstVisible.value).toBe(false)
    expect(secondVisible.value).toBe(false)
  })

  test('multiple allows more than one item open', async () => {
    const firstVisible = ref<'right' | false>('right')
    const secondVisible = ref<'left' | false>(false)

    const wrapper = mount({
      components: {
        SwipeAction,
        SwipeActionGroup,
      },
      setup() {
        return {
          firstVisible,
          secondVisible,
        }
      },
      template: `
        <SwipeActionGroup multiple>
          <SwipeAction v-model:visible="firstVisible">
            <div>一</div>
            <template #right="{ hide }"><button @click="hide()">删</button></template>
          </SwipeAction>
          <SwipeAction v-model:visible="secondVisible">
            <div>二</div>
            <template #left="{ hide }"><button @click="hide()">赞</button></template>
          </SwipeAction>
        </SwipeActionGroup>
      `,
    })

    secondVisible.value = 'left'
    await wrapper.vm.$nextTick()

    expect(firstVisible.value).toBe('right')
    expect(secondVisible.value).toBe('left')
  })

  test('closeAll hides all items', async () => {
    const groupRef = ref<InstanceType<typeof SwipeActionGroup>>()
    const firstVisible = ref<'right' | false>('right')
    const secondVisible = ref<'left' | false>('left')

    const wrapper = mount({
      components: {
        SwipeAction,
        SwipeActionGroup,
      },
      setup() {
        return {
          groupRef,
          firstVisible,
          secondVisible,
        }
      },
      template: `
        <SwipeActionGroup ref="groupRef" multiple>
          <SwipeAction v-model:visible="firstVisible">
            <div>一</div>
            <template #right="{ hide }"><button @click="hide()">删</button></template>
          </SwipeAction>
          <SwipeAction v-model:visible="secondVisible">
            <div>二</div>
            <template #left="{ hide }"><button @click="hide()">赞</button></template>
          </SwipeAction>
        </SwipeActionGroup>
      `,
    })

    groupRef.value?.closeAll()
    await wrapper.vm.$nextTick()

    expect(firstVisible.value).toBe(false)
    expect(secondVisible.value).toBe(false)
  })
})
