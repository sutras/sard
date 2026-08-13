import { afterEach, describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import DatetimeRangePickerPopout from '../datetime-range-picker-popout.vue'

// ── ResizeObserver polyfill ────────────────────────────────────────
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  ;(globalThis as any).ResizeObserver = ResizeObserverMock
}

// ── scrollTo polyfill ─────────────────────────────────────────────
if (!Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {}
}

async function flush() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 50))
  await nextTick()
}

function getPopup() {
  return document.body.querySelector('.s-popup') as HTMLElement | null
}

function getPopout() {
  return document.body.querySelector('.s-popout') as HTMLElement | null
}

describe('DatetimeRangePickerPopout', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  // ── basic rendering ──────────────────────────────────────────────

  test('renders popout when visible', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    expect(getPopout()).not.toBeNull()
    expect(getPopup()).not.toBeNull()

    wrapper.unmount()
  })

  test('does not render popup when not visible', () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={false} />, {
      attachTo: document.body,
    })

    // Popup renders in DOM but hidden with display:none
    const popup = getPopup()
    expect(popup).not.toBeNull()
    expect(popup?.style.display).toBe('none')

    wrapper.unmount()
  })

  // ── visible toggle ───────────────────────────────────────────────

  test('toggles visibility with visible prop', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={false} />, {
      attachTo: document.body,
    })

    expect(getPopup()?.style.display).toBe('none')

    await wrapper.setProps({ visible: true })
    await flush()

    // After setting visible=true, popup should no longer be hidden
    expect(getPopup()?.style.display).not.toBe('none')

    wrapper.unmount()
  })

  // ── title ────────────────────────────────────────────────────────

  test('renders title', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} title="选择日期范围" />, {
      attachTo: document.body,
    })

    await flush()

    const titleEl = document.body.querySelector('.s-popout__title-text')
    expect(titleEl?.textContent).toBe('选择日期范围')

    wrapper.unmount()
  })

  test('renders without title', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    expect(getPopout()).not.toBeNull()

    wrapper.unmount()
  })

  // ── modelValue binding ───────────────────────────────────────────

  test('initializes with modelValue', async () => {
    const wrapper = mount(
      <DatetimeRangePickerPopout
        visible={true}
        modelValue={[new Date(2024, 0, 1), new Date(2024, 0, 10)]}
      />,
      { attachTo: document.body },
    )

    await flush()

    const picker = document.body.querySelector('.s-datetime-range-picker')
    expect(picker).not.toBeNull()

    wrapper.unmount()
  })

  test('emits update:visible on overlay click', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    const overlay = document.body.querySelector('.s-overlay') as HTMLElement | null
    overlay?.click()
    await flush()

    expect(wrapper.emitted('update:visible')).toEqual([[false]])

    wrapper.unmount()
  })

  // ── confirm behavior ─────────────────────────────────────────────

  test('emits confirm on confirm button click', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    const confirmBtn = document.body.querySelector(
      '.s-popout__button-wrap--end .s-button',
    ) as HTMLElement | null
    confirmBtn?.click()
    await flush()

    expect(wrapper.emitted('confirm')).toBeTruthy()

    wrapper.unmount()
  })

  test('confirms with modelValue without changes', async () => {
    const wrapper = mount(
      <DatetimeRangePickerPopout
        visible={true}
        modelValue={[new Date(2024, 0, 1), new Date(2024, 0, 10)]}
      />,
      { attachTo: document.body },
    )

    await flush()

    const confirmBtn = document.body.querySelector(
      '.s-popout__button-wrap--end .s-button',
    ) as HTMLElement | null
    confirmBtn?.click()
    await flush()

    expect(wrapper.emitted('confirm')).toBeTruthy()

    wrapper.unmount()
  })

  // ── slots ────────────────────────────────────────────────────────

  test('renders header slot content', async () => {
    const wrapper = mount(
      <DatetimeRangePickerPopout visible={true}>
        {{
          header: () => <div class="custom-header">自定义头部</div>,
        }}
      </DatetimeRangePickerPopout>,
      { attachTo: document.body },
    )

    await flush()

    const header = document.body.querySelector('.custom-header')
    expect(header?.textContent).toBe('自定义头部')

    wrapper.unmount()
  })

  test('renders footer slot content', async () => {
    const wrapper = mount(
      <DatetimeRangePickerPopout visible={true}>
        {{
          footer: () => <div class="custom-footer">自定义底部</div>,
        }}
      </DatetimeRangePickerPopout>,
      { attachTo: document.body },
    )

    await flush()

    const footer = document.body.querySelector('.custom-footer')
    expect(footer?.textContent).toBe('自定义底部')

    wrapper.unmount()
  })

  // ── tabs ─────────────────────────────────────────────────────────

  test('renders with custom tab labels', async () => {
    const wrapper = mount(
      <DatetimeRangePickerPopout visible={true} tabs={['开始日期', '结束日期']} />,
      { attachTo: document.body },
    )

    await flush()

    const tabs = document.body.querySelectorAll('.s-tabs__tab')
    expect(tabs).toHaveLength(2)

    wrapper.unmount()
  })

  // ── compact popout buttons ───────────────────────────────────────

  test('renders confirm button', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    const confirmBtn = document.body.querySelector('.s-popout__button-wrap--end')
    expect(confirmBtn).not.toBeNull()

    wrapper.unmount()
  })

  test('emits update:visible on cancel', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    const cancelBtn = document.body.querySelector(
      '.s-popout__button-wrap--start .s-button',
    ) as HTMLElement | null
    cancelBtn?.click()
    await flush()

    expect(wrapper.emitted('update:visible')).toEqual([[false]])

    wrapper.unmount()
  })

  // ── auto-normalize range ─────────────────────────────────────────

  test('renders without modelValue', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} />, { attachTo: document.body })

    await flush()

    expect(getPopout()).not.toBeNull()

    wrapper.unmount()
  })

  test('renders with partial range modelValue', async () => {
    const wrapper = mount(
      <DatetimeRangePickerPopout visible={true} modelValue={[new Date(2024, 0, 1)]} />,
      { attachTo: document.body },
    )

    await flush()

    expect(getPopout()).not.toBeNull()

    wrapper.unmount()
  })

  // ── type prop ────────────────────────────────────────────────────

  test('renders with type yMdhms', async () => {
    const wrapper = mount(<DatetimeRangePickerPopout visible={true} type="yMdhms" />, {
      attachTo: document.body,
    })

    await flush()

    expect(getPopout()).not.toBeNull()

    wrapper.unmount()
  })
})
