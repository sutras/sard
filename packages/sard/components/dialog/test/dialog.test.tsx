import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Dialog from '../dialog.vue'
import { dialog } from '../imperative'

const flushDialog = async () => {
  await Promise.resolve()
}

describe('Dialog', () => {
  test('imperative alert and confirm render current defaults and button states', async () => {
    dialog.alert({
      title: '提示',
      message: '此功能暂时无法使用',
    })

    await flushDialog()

    const getDialog = () => document.body.querySelector('.s-dialog') as HTMLElement | null
    const getFooterButtons = () =>
      Array.from(document.body.querySelectorAll('.s-dialog__footer .s-button'))

    expect(getDialog()).not.toBeNull()
    expect(getDialog()?.classList.contains('s-dialog--headed')).toBe(false)
    expect(getDialog()?.classList.contains('s-dialog--text')).toBe(true)
    expect(document.body.querySelector('.s-dialog__header')).toBeNull()
    expect(
      (document.body.querySelector('.s-dialog__title') as HTMLElement | null)?.textContent,
    ).toBe('提示')
    expect(
      (document.body.querySelector('.s-dialog__message') as HTMLElement | null)?.textContent,
    ).toContain('此功能暂时无法使用')
    expect(getFooterButtons()).toHaveLength(1)
    expect(getFooterButtons()[0].textContent).toContain('确定')
    expect(getFooterButtons()[0].classList.contains('s-button--text')).toBe(true)

    dialog.confirm({
      title: '提示',
      message: '此功能暂时无法使用',
    })

    await flushDialog()

    expect(getFooterButtons()).toHaveLength(2)
    expect(getFooterButtons().map((button) => button.textContent?.trim())).toEqual(['取消', '确定'])
    expect(document.body.querySelector('.s-dialog__divider')).not.toBeNull()

    dialog.hide()
    await flushDialog()
  })

  test('buttonType and headed props drive current modifiers and header rendering', async () => {
    const wrapper = mount(Dialog, {
      attachTo: document.body,
      props: {
        visible: true,
        title: '提示',
        message: '确定删除？',
        buttonType: 'round',
        headed: true,
      },
    })

    const getRoot = () =>
      Array.from(document.body.querySelectorAll('.s-dialog')).at(-1) as HTMLElement | null
    const getFooterButtons = () => getRoot()?.querySelectorAll('.s-dialog__footer .s-button') || []

    const root = getRoot()

    expect(root).not.toBeNull()
    expect(root?.classList.contains('s-dialog--round')).toBe(true)
    expect(root?.classList.contains('s-dialog--headed')).toBe(true)
    expect(root?.querySelector('.s-dialog__header')).not.toBeNull()
    expect(root?.querySelector('.s-dialog__close')).not.toBeNull()
    expect(
      Array.from(getFooterButtons()).every((button) =>
        button.classList.contains('s-button--round'),
      ),
    ).toBe(true)
    expect(root?.querySelector('.s-dialog__divider')).toBeNull()

    await wrapper.setProps({
      headed: false,
    })

    expect(root?.classList.contains('s-dialog--headed')).toBe(false)
    expect(root?.querySelector('.s-dialog__header')).toBeNull()
    expect(
      (root!.querySelector('.s-dialog__body .s-dialog__title') as HTMLElement).textContent,
    ).toBe('提示')

    wrapper.unmount()
  })

  test('renders default slot content inside dialog body area', async () => {
    const wrapper = mount(
      <Dialog visible title="标题">
        <div class="content">内容</div>
      </Dialog>,
      {
        attachTo: document.body,
      },
    )

    expect(document.body.querySelector('.content')?.textContent).toBe('内容')

    wrapper.unmount()
  })
})
