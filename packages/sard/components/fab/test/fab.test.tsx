import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Fab from '../fab.vue'
import FabItem from '../fab-item.vue'

if (!HTMLElement.prototype.getBoundingClientRect) {
  HTMLElement.prototype.getBoundingClientRect = function () {
    return {
      x: 0,
      y: 0,
      top: 0,
      right: 56,
      bottom: 56,
      left: 0,
      width: 56,
      height: 56,
      toJSON() {},
    } as DOMRect
  }
}

describe('Fab', () => {
  test('toggles overlay/content from the entry button and closes after item click', async () => {
    const wrapper = mount(
      <Fab>
        <FabItem name="首页">
          <span class="item-icon">A</span>
        </FabItem>
        <FabItem name="分享">
          <span class="item-icon">B</span>
        </FabItem>
        <FabItem name="收藏" color="red" background="rgb(52, 147, 240)">
          <span class="item-icon">C</span>
        </FabItem>
      </Fab>,
      {
        attachTo: document.body,
      },
    )

    const getFab = () =>
      Array.from(document.body.querySelectorAll('.s-fab')).at(-1) as HTMLElement | null
    const getOverlay = () =>
      Array.from(document.body.querySelectorAll('.s-overlay')).at(-1) as HTMLElement | null
    const getContent = () =>
      Array.from(document.body.querySelectorAll('.s-fab__content')).at(-1) as HTMLElement | null

    expect(getFab()).not.toBeNull()
    expect(getFab()?.classList.contains('s-fab--bottom')).toBe(true)
    expect(getFab()?.classList.contains('s-fab--right')).toBe(true)
    expect(getOverlay()).not.toBeNull()
    expect(getContent()?.style.display).toBe('none')
    expect(document.body.querySelectorAll('.s-fab-item__name')).toHaveLength(3)
    expect(
      (
        document.body.querySelector(
          '.s-fab__content .s-fab-item:nth-child(2) .s-fab-item__name',
        ) as HTMLElement
      ).textContent,
    ).toBe('分享')

    const getEntry = () => getFab()?.querySelector('.s-fab-item--entry') as HTMLElement | null

    getEntry()?.click()
    await nextTick()

    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(getContent()?.style.display).toBe('')
    expect(getOverlay()?.style.display).toBe('')

    ;(getContent()?.querySelector('.s-fab-item:nth-child(2)') as HTMLElement | null)?.click()
    await nextTick()

    expect(getContent()?.style.display).toBe('none')
    expect(getOverlay()?.style.display).toBe('none')

    wrapper.unmount()
  })

  test('hideName and item color props affect rendered item output', async () => {
    const wrapper = mount(
      <Fab hideName>
        <FabItem name="首页" background="rgb(59, 190, 136)">
          <span>A</span>
        </FabItem>
        <FabItem name="分享" background="rgb(247, 149, 59)">
          <span>B</span>
        </FabItem>
        <FabItem name="收藏" color="red" background="rgb(52, 147, 240)">
          <span>C</span>
        </FabItem>
      </Fab>,
      {
        attachTo: document.body,
      },
    )

    ;(
      (
        Array.from(document.body.querySelectorAll('.s-fab')).at(-1) as HTMLElement | null
      )?.querySelector('.s-fab-item--entry') as HTMLElement | null
    )?.click()
    await nextTick()

    expect(
      (
        Array.from(document.body.querySelectorAll('.s-fab__content')).at(-1) as HTMLElement | null
      )?.querySelector('.s-fab-item__name'),
    ).toBeNull()

    const buttons =
      (
        Array.from(document.body.querySelectorAll('.s-fab__content')).at(-1) as HTMLElement | null
      )?.querySelectorAll('.s-fab-item__btn') || []

    expect((buttons[1] as HTMLElement).getAttribute('style')).toContain(
      'background: rgb(247, 149, 59);',
    )
    expect((buttons[2] as HTMLElement).getAttribute('style')).toContain('color: red;')

    wrapper.unmount()
  })

  test('position props switch side modifiers and inline offsets', async () => {
    const wrapper = mount(
      <Fab top="48px" left="48px">
        <FabItem name="首页">
          <span>A</span>
        </FabItem>
      </Fab>,
      {
        attachTo: document.body,
      },
    )

    const root = Array.from(document.body.querySelectorAll('.s-fab')).at(-1) as HTMLElement | null

    expect(root).not.toBeNull()
    expect(root?.classList.contains('s-fab--top')).toBe(true)
    expect(root?.classList.contains('s-fab--left')).toBe(true)
    expect(root?.classList.contains('s-fab--bottom')).toBe(false)
    expect(root?.classList.contains('s-fab--right')).toBe(false)
    expect(root?.getAttribute('style')).toContain('top: 48px;')
    expect(root?.getAttribute('style')).toContain('left: 48px;')
    expect(root?.getAttribute('style')).toContain('right: auto;')
    expect(root?.getAttribute('style')).toContain('bottom: auto;')

    wrapper.unmount()
  })
})
