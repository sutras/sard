import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import PreviewImage from '../preview-image.vue'
import { previewImage } from '../imperative'
import { sleep } from '../../../utils'

const mountOptions = {
  attachTo: document.body,
  global: {
    stubs: {
      // preview-image 依赖 Transition 的 before-enter 钩子渲染懒加载内容，
      // 且 overlay 的 class 透传依赖真实的 Transition 转发，因此禁用 stubbing
      transition: false,
      'transition-group': false,
    },
  },
}

const getRoot = () =>
  Array.from(document.body.querySelectorAll('.s-preview-image')).at(-1) as HTMLElement | null

const getPopup = () =>
  Array.from(document.body.querySelectorAll('.s-popup')).at(-1) as HTMLElement | null

const getOverlay = () =>
  Array.from(document.body.querySelectorAll('.s-overlay')).at(-1) as HTMLElement | null

describe('PreviewImage', () => {
  test('renders swiper, items and indicator for urls', async () => {
    const wrapper = mount(PreviewImage, {
      ...mountOptions,
      props: {
        visible: true,
        urls: ['http://temp/1.jpg', 'http://temp/2.jpg', 'http://temp/3.jpg'],
      },
    })

    await nextTick()

    const root = getRoot()

    expect(root).not.toBeNull()
    expect(root?.querySelector('.s-preview-image__swiper')).not.toBeNull()
    expect(root?.querySelectorAll('.s-preview-image__item')).toHaveLength(3)
    expect(root?.querySelectorAll('.s-swiper__item')).toHaveLength(3)

    expect(getPopup()?.querySelector('.s-preview-image__indicator')?.textContent?.trim()).toBe(
      '1 / 3',
    )

    wrapper.unmount()
  })

  test('hides indicator when showIndicator is false', async () => {
    const wrapper = mount(PreviewImage, {
      ...mountOptions,
      props: {
        visible: true,
        showIndicator: false,
        urls: ['http://temp/1.jpg', 'http://temp/2.jpg'],
      },
    })

    await nextTick()

    expect(getPopup()?.querySelector('.s-preview-image__indicator')).toBeNull()

    wrapper.unmount()
  })

  test('indicator reflects current prop', async () => {
    const wrapper = mount(PreviewImage, {
      ...mountOptions,
      props: {
        visible: true,
        current: 2,
        urls: ['http://temp/1.jpg', 'http://temp/2.jpg', 'http://temp/3.jpg'],
      },
    })

    await nextTick()

    expect(getPopup()?.querySelector('.s-preview-image__indicator')?.textContent?.trim()).toBe(
      '3 / 3',
    )

    wrapper.unmount()
  })

  test('applies preview-image modifiers to overlay and swiper', async () => {
    const wrapper = mount(PreviewImage, {
      ...mountOptions,
      props: {
        visible: true,
        urls: ['http://temp/1.jpg'],
      },
    })

    await nextTick()

    const overlay = getOverlay()
    const swiper = getRoot()?.querySelector('.s-preview-image__swiper')

    expect(overlay?.classList.contains('s-preview-image__overlay')).toBe(true)
    expect(overlay?.classList.contains('is-preview-image')).toBe(true)
    expect(swiper?.classList.contains('is-preview-image')).toBe(true)

    wrapper.unmount()
  })

  test('imperative show and hide', async () => {
    previewImage({
      urls: ['http://temp/1.jpg', 'http://temp/2.jpg'],
    })

    await Promise.resolve()
    await nextTick()
    await sleep(0)

    expect(getRoot()).not.toBeNull()
    expect(getRoot()?.querySelectorAll('.s-preview-image__item')).toHaveLength(2)
    expect(getPopup()?.querySelector('.s-preview-image__indicator')?.textContent?.trim()).toBe(
      '1 / 2',
    )

    previewImage.hide()

    await sleep(50)
    await nextTick()

    expect(getPopup()?.getAttribute('style') || '').toContain('display: none;')
  })
})
