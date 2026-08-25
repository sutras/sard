import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import ActionSheet from '../action-sheet.vue'
import { createActionSheet } from '../imperative'
import { sleep } from '../../../utils'

describe('ActionSheet', () => {
  test('create', async () => {
    const wrapper = mount(
      <ActionSheet
        visible
        description="描述"
        cancel="取消"
        itemList={[
          {
            label: '选项1',
            color: 'red',
          },
          {
            label: '选项2',
            description: '描述信息',
            disabled: true,
          },
          {
            label: '选项3',
            loading: true,
          },
        ]}
      />,
      {
        attachTo: document.body,
      },
    )

    await nextTick()

    const root = Array.from(document.body.querySelectorAll('.s-action-sheet')).at(
      -1,
    ) as HTMLElement | null

    expect(root?.querySelector('.s-action-sheet__description')).not.toBeNull()
    expect(root?.querySelector('.s-action-sheet__cancel')).not.toBeNull()
    expect(
      (
        root?.querySelector(
          '.s-action-sheet__item .s-action-sheet__item-label',
        ) as HTMLElement | null
      )?.getAttribute('style'),
    ).toContain('color: red;')
    expect(
      (
        root?.querySelectorAll('.s-action-sheet__item')[1] as HTMLElement | undefined
      )?.classList.contains('is-disabled'),
    ).toBe(true)
    expect(
      (
        root?.querySelectorAll('.s-action-sheet__item')[2] as HTMLElement | undefined
      )?.classList.contains('is-loading'),
    ).toBe(true)

    wrapper.unmount()
  })

  test('imperative', async () => {
    const actionSheet = createActionSheet()

    actionSheet({
      description: '请选择',
      itemList: [{ label: '选项1' }, { label: '选项2' }, { label: '选项3' }],
      showCancel: true,
    })

    await Promise.resolve()
    await nextTick()
    await sleep(0)

    const getRoot = () =>
      Array.from(document.body.querySelectorAll('.s-action-sheet')).at(-1) as HTMLElement | null
    const getPopup = () =>
      Array.from(document.body.querySelectorAll('.s-popup')).at(-1) as HTMLElement | null

    expect(getRoot()).not.toBeNull()
    expect(getRoot()?.querySelector('.s-action-sheet__cancel')).not.toBeNull()

    actionSheet.hide()

    await sleep(50)
    await nextTick()

    expect(getPopup()?.getAttribute('style') || '').toContain('display: none;')
  })
})
