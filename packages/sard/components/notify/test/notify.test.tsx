import { describe, expect, test } from 'vitest'
import { nextTick } from 'vue'

import { createNotify } from '../imperative'
import { sleep } from '../../../utils'

describe('Notify', () => {
  test('basic', async () => {
    const notify = createNotify()

    const getRoot = () =>
      Array.from(document.body.querySelectorAll('.s-notify')).at(-1) as HTMLElement | null

    notify('这是一条通知')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.textContent).toContain('这是一条通知')
    expect(getRoot()?.classList.contains('s-notify--primary')).toBe(true)

    notify.success('这是一条成功通知')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.textContent).toContain('这是一条成功通知')
    expect(getRoot()?.classList.contains('s-notify--success')).toBe(true)

    notify.warning('这是一条警告通知')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.textContent).toContain('这是一条警告通知')
    expect(getRoot()?.classList.contains('s-notify--warning')).toBe(true)

    notify.error('这是一条错误通知')
    await Promise.resolve()
    await nextTick()
    await sleep(0)
    expect(getRoot()?.textContent).toContain('这是一条错误通知')
    expect(getRoot()?.classList.contains('s-notify--error')).toBe(true)

    notify.hide()
  })

  test('color', async () => {
    const notify = createNotify()

    notify('这是一条通知', {
      background: 'red',
      color: 'white',
    })

    await Promise.resolve()
    await nextTick()
    await sleep(0)

    const root = Array.from(document.body.querySelectorAll('.s-notify')).at(
      -1,
    ) as HTMLElement | null

    expect(root?.getAttribute('style') || '').toContain('background-color: red;')
    expect(root?.getAttribute('style') || '').toContain('color: white;')

    notify.hide()
  })

  test('position', async () => {
    const notify = createNotify()

    notify('这是一条通知', {
      position: 'bottom',
    })

    await Promise.resolve()
    await nextTick()
    await sleep(0)

    const root = Array.from(document.body.querySelectorAll('.s-notify')).at(
      -1,
    ) as HTMLElement | null

    expect(root?.classList.contains('s-notify--bottom')).toBe(true)

    notify.hide()
  })
})
