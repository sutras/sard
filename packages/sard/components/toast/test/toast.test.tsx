import { describe, expect, test } from 'vitest'
import { nextTick } from 'vue'

import { toast } from '../imperative'
import { sleep } from '../../../utils'

describe('Toast', () => {
  test('basic', async () => {
    const getRoot = () => document.body.querySelector('.s-toast') as HTMLElement | null

    toast('文本提示')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.querySelector('.s-toast__title')?.textContent || '').toContain('文本提示')

    toast.success('成功')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.querySelector('.s-toast__icon')).not.toBeNull()
    expect(getRoot()?.querySelector('.s-toast__title')?.textContent || '').toContain('成功')

    toast.fail('失败')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.querySelector('.s-toast__icon')).not.toBeNull()
    expect(getRoot()?.querySelector('.s-toast__title')?.textContent || '').toContain('失败')

    toast.loading('加载中')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.querySelector('.s-loading')).not.toBeNull()
    expect(getRoot()?.querySelector('.s-toast__title')?.textContent || '').toContain('加载中')
  })

  test('position', async () => {
    const getPopup = () => document.body.querySelector('.s-popup') as HTMLElement | null
    const getRoot = () => document.body.querySelector('.s-toast') as HTMLElement | null

    toast('顶部位置', {
      position: 'top',
    })
    await Promise.resolve()
    await nextTick()
    await sleep(0)

    expect(getPopup()?.classList.contains('s-toast__popup--top')).toBe(true)
    expect(getRoot()?.querySelector('.s-toast__title')?.textContent || '').toContain('顶部位置')

    toast('底部位置', {
      position: 'bottom',
    })
    await Promise.resolve()
    await nextTick()
    await sleep(0)

    expect(getPopup()?.classList.contains('s-toast__popup--bottom')).toBe(true)
    expect(getRoot()?.querySelector('.s-toast__title')?.textContent || '').toContain('底部位置')
  })

  test('loadingOverlay', async () => {
    const getOverlay = () => document.body.querySelector('.s-overlay') as HTMLElement | null

    toast.loading('加载中', {
      overlay: true,
    })
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getOverlay()).not.toBeNull()

    toast.loading('加载中', {
      overlay: true,
      transparent: true,
    })
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getOverlay()?.classList.contains('s-overlay--transparent')).toBe(true)
  })
})
