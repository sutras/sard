import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { h, ref } from 'vue'
import Dnd from '../dnd.vue'
import DndItem from '../dnd-item.vue'
import DndHandle from '../dnd-handle.vue'
import List from '../../list/list.vue'
import ListItem from '../../list/list-item.vue'

const listData = ref(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        title: `标题${i}`,
      }
    }),
)

describe('Dnd', () => {
  test('basic', async () => {
    const wrapper = mount(
      h(
        Dnd,
        {
          list: listData.value,
          'onUpdate:list': (list: any[]) => (listData.value = list),
        },
        {
          default: ({ list }: any) => {
            return h(List, null, () =>
              list.map(({ key, itemInfo, data }: any) =>
                h(DndItem, { key, itemInfo }, () =>
                  h(
                    ListItem,
                    { title: data.title },
                    {
                      value: () => h(DndHandle, null, () => h('span', { class: 's-icon' })),
                    },
                  ),
                ),
              ),
            )
          },
        },
      ),
    )

    expect(
      wrapper.find('.s-list .s-dnd-item .s-list-item__value .s-dnd-handle .s-icon').exists(),
    ).toBeTruthy()
  })
})
