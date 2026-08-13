import { afterEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import ShareSheet from '../share-sheet.vue'
import ShareSheetRow from '../share-sheet-row.vue'
import ShareSheetItem from '../share-sheet-item.vue'

describe('ShareSheet', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  // ── basic rendering ──────────────────────────────────────────────

  test('renders wrapper element when visible', () => {
    mount(<ShareSheet visible={true} cancel="取消" />, { attachTo: document.body })

    expect(document.body.querySelector('.s-share-sheet')).not.toBeNull()
  })

  test('renders cancel button', () => {
    mount(<ShareSheet visible={true} cancel="取消" />, { attachTo: document.body })

    expect(document.body.querySelector('.s-share-sheet__cancel')?.textContent).toBe('取消')
  })

  test('renders title and description', () => {
    mount(<ShareSheet visible={true} title="分享到" description="这是描述" />, {
      attachTo: document.body,
    })

    expect(document.body.querySelector('.s-share-sheet__title')?.textContent).toBe('分享到')
    expect(document.body.querySelector('.s-share-sheet__description')?.textContent).toBe('这是描述')
  })

  // ── slots ────────────────────────────────────────────────────────

  test('renders custom title slot', () => {
    mount(
      <ShareSheet visible={true}>
        {{
          title: () => <span class="custom-title">自定义标题</span>,
        }}
      </ShareSheet>,
      { attachTo: document.body },
    )

    expect(document.body.querySelector('.custom-title')?.textContent).toBe('自定义标题')
  })

  test('renders custom cancel slot', () => {
    mount(
      <ShareSheet visible={true}>
        {{
          cancel: () => <span class="custom-cancel">自定义取消</span>,
        }}
      </ShareSheet>,
      { attachTo: document.body },
    )

    expect(document.body.querySelector('.custom-cancel')?.textContent).toBe('自定义取消')
  })

  test('renders description via slot', () => {
    mount(
      <ShareSheet visible={true}>
        {{
          description: () => <span class="custom-desc">自定义描述</span>,
        }}
      </ShareSheet>,
      { attachTo: document.body },
    )

    expect(document.body.querySelector('.custom-desc')?.textContent).toBe('自定义描述')
  })

  // ── events ───────────────────────────────────────────────────────

  test('emits cancel on cancel button click', async () => {
    const wrapper = mount(<ShareSheet visible={true} cancel="取消" />, { attachTo: document.body })

    const cancelBtn = document.body.querySelector('.s-share-sheet__cancel') as HTMLElement
    cancelBtn?.click()

    expect(wrapper.emitted()).toHaveProperty('cancel')
  })

  test('emits update:visible on cancel click', async () => {
    const wrapper = mount(<ShareSheet visible={true} cancel="取消" />, { attachTo: document.body })

    const cancelBtn = document.body.querySelector('.s-share-sheet__cancel') as HTMLElement
    cancelBtn?.click()

    expect(wrapper.emitted()).toHaveProperty('update:visible')
  })

  // ── items ────────────────────────────────────────────────────────

  test('renders share sheet items', () => {
    mount(
      <ShareSheet visible={true} cancel="取消">
        <ShareSheetRow>
          <ShareSheetItem label="微信" />
          <ShareSheetItem label="支付宝" />
          <ShareSheetItem label="Twitter" />
          <ShareSheetItem label="Facebook" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    const items = document.body.querySelectorAll('.s-share-sheet-item')
    expect(items).toHaveLength(4)
    expect(items[3].querySelector('.s-share-sheet-item__label')?.textContent).toBe('Facebook')
  })

  test('emits select with item label on item click', async () => {
    const wrapper = mount(
      <ShareSheet visible={true} cancel="取消">
        <ShareSheetRow>
          <ShareSheetItem label="微信" />
          <ShareSheetItem label="支付宝" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    const lastItem = document.body.querySelector('.s-share-sheet-item:last-child') as HTMLElement
    lastItem?.click()

    expect(wrapper.emitted()).toHaveProperty('select')
    expect(wrapper.emitted<[any]>().select[0][0].label).toBe('支付宝')
  })

  // ── multiple rows ────────────────────────────────────────────────

  test('renders multiple rows', () => {
    mount(
      <ShareSheet visible={true} cancel="取消">
        <ShareSheetRow>
          <ShareSheetItem label="微信" />
          <ShareSheetItem label="支付宝" />
        </ShareSheetRow>
        <ShareSheetRow>
          <ShareSheetItem label="Twitter" />
          <ShareSheetItem label="Facebook" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    expect(document.body.querySelectorAll('.s-share-sheet-row')).toHaveLength(2)
  })

  // ── item description ─────────────────────────────────────────────

  test('renders item with description', () => {
    mount(
      <ShareSheet visible={true} title="分享到">
        <ShareSheetRow>
          <ShareSheetItem label="微信" />
          <ShareSheetItem label="支付宝" description="这是描述这是描述" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    const descEl = document.body.querySelector(
      '.s-share-sheet-item:nth-child(2) .s-share-sheet-item__description',
    )
    expect(descEl?.textContent).toBe('这是描述这是描述')
  })

  // ── disabled items ───────────────────────────────────────────────

  test('applies disabled class to disabled item', () => {
    mount(
      <ShareSheet visible={true} cancel="取消">
        <ShareSheetRow>
          <ShareSheetItem label="微信" disabled={true} />
          <ShareSheetItem label="支付宝" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    const firstItem = document.body.querySelectorAll('.s-share-sheet-item')[0]
    expect(firstItem.classList).toContain('is-disabled')
  })

  test('does not emit select on disabled item click', async () => {
    const wrapper = mount(
      <ShareSheet visible={true} cancel="取消">
        <ShareSheetRow>
          <ShareSheetItem label="微信" disabled={true} />
          <ShareSheetItem label="支付宝" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    const disabledItem = document.body.querySelector(
      '.s-share-sheet-item.is-disabled',
    ) as HTMLElement
    disabledItem?.click()

    expect(wrapper.emitted()).not.toHaveProperty('select')
  })

  // ── showCancel ───────────────────────────────────────────────────

  test('hides cancel when showCancel is false', () => {
    mount(
      <ShareSheet visible={true} showCancel={false}>
        <ShareSheetRow>
          <ShareSheetItem label="微信" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    expect(document.body.querySelector('.s-share-sheet__cancel')).toBeNull()
  })

  // ── edge cases ───────────────────────────────────────────────────

  test('does not render title when not provided', () => {
    mount(
      <ShareSheet visible={true} cancel="取消">
        <ShareSheetRow>
          <ShareSheetItem label="微信" />
        </ShareSheetRow>
      </ShareSheet>,
      { attachTo: document.body },
    )

    expect(document.body.querySelector('.s-share-sheet__title')).toBeNull()
    expect(document.body.querySelector('.s-share-sheet__description')).toBeNull()
  })
})
