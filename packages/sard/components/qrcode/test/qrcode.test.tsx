import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Qrcode from '../qrcode.vue'
import { templateData } from './utils'

import { ECLList, qrcode } from '../../../utils'
import type { QrcodeECL } from '../common'

// Mock ResizeObserver which is not available in jsdom
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

afterEach(() => {
  vi.restoreAllMocks()
})

async function flushPromises() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 50))
  await nextTick()
}

describe('Qrcode', () => {
  // QR code generation algorithm tests
  describe('qrcode generation', () => {
    test('generates correct QR code maps matching template data', () => {
      const allMatch = templateData.every((item) => {
        const map = qrcode(item[3], {
          ecl: ECLList[item[1]],
        })

        return item[4] === map.map((row) => row.join('')).join('')
      })
      expect(allMatch).toBeTruthy()
    })

    test('generates qrcode for all ECL levels', () => {
      const text = 'https://github.com/sutras/sard'
      const eclLevels: QrcodeECL[] = ['L', 'M', 'Q', 'H']

      eclLevels.forEach((ecl) => {
        const map = qrcode(text, { ecl })
        expect(Array.isArray(map)).toBeTruthy()
        expect(map.length).toBeGreaterThan(0)
        expect(map[0].length).toBeGreaterThan(0)
      })
    })

    test('generates different sized maps for different text lengths', () => {
      const shortMap = qrcode('A', { ecl: 'M' })
      const longMap = qrcode('https://github.com/sutras/sard', { ecl: 'M' })

      expect(shortMap.length).toBeLessThanOrEqual(longMap.length)
    })

    test('generates qrcode for numeric text', () => {
      const map = qrcode('1234567890', { ecl: 'M' })
      expect(Array.isArray(map)).toBeTruthy()
      expect(map.length).toBeGreaterThan(0)
    })

    test('generates qrcode for alphanumeric text', () => {
      const map = qrcode('HELLO WORLD', { ecl: 'M' })
      expect(Array.isArray(map)).toBeTruthy()
      expect(map.length).toBeGreaterThan(0)
    })

    test('generates qrcode for Chinese text', () => {
      const map = qrcode('你好世界', { ecl: 'M' })
      expect(Array.isArray(map)).toBeTruthy()
      expect(map.length).toBeGreaterThan(0)
    })

    test('returns 1 and 0 values only', () => {
      const map = qrcode('test', { ecl: 'L' })
      map.flat().forEach((cell) => {
        expect([0, 1]).toContain(cell)
      })
    })
  })

  // Component rendering tests
  describe('component rendering', () => {
    test('renders a canvas element', async () => {
      const wrapper = mount(<Qrcode text="https://github.com/sutras/sard" />)
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('applies size prop as container style', () => {
      const wrapper = mount(<Qrcode text="test" size="200px" />)
      expect(wrapper.attributes('style')).toContain('width: 200px')
      expect(wrapper.attributes('style')).toContain('height: 200px')
    })

    test('uses default size when not provided', () => {
      const wrapper = mount(<Qrcode text="test" />)
      expect(wrapper.attributes('style')).toContain('width: 160px')
      expect(wrapper.attributes('style')).toContain('height: 160px')
    })

    test('uses default ECL when not provided', () => {
      const wrapper = mount(<Qrcode text="test" />)
      // Should not throw and should render
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('canvas element has width and height attributes', () => {
      const wrapper = mount(<Qrcode text="test" size="100px" />)
      const canvas = wrapper.find('canvas')
      expect(canvas.attributes('width')).toBeDefined()
      expect(canvas.attributes('height')).toBeDefined()
    })

    test('renders with empty text gracefully', () => {
      const wrapper = mount(<Qrcode text="" />)
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('updates when text prop changes', async () => {
      const wrapper = mount(<Qrcode text="old" />)
      await flushPromises()

      await wrapper.setProps({ text: 'new' })
      await flushPromises()

      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('updates when size prop changes', async () => {
      const wrapper = mount(<Qrcode text="test" size="100px" />)
      expect(wrapper.attributes('style')).toContain('width: 100px')

      await wrapper.setProps({ size: '250px' })
      expect(wrapper.attributes('style')).toContain('width: 250px')
    })

    test('updates when color prop changes', async () => {
      const wrapper = mount(<Qrcode text="test" color="#ff0000" />)
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()

      await wrapper.setProps({ color: '#00ff00' })
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('updates when bgColor prop changes', async () => {
      const wrapper = mount(<Qrcode text="test" bgColor="#000000" />)
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()

      await wrapper.setProps({ bgColor: '#ffffff' })
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('updates when quietZoneModules changes', async () => {
      const wrapper = mount(<Qrcode text="test" quietZoneModules={4} />)
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()

      await wrapper.setProps({ quietZoneModules: 8 })
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('has correct CSS class', () => {
      const wrapper = mount(<Qrcode text="test" />)
      expect(wrapper.classes()).toContain('s-qrcode')
    })
  })

  // Icon tests
  describe('icon support', () => {
    test('renders canvas when icon is provided', async () => {
      const wrapper = mount(<Qrcode text="test" icon="data:image/png;base64,iVBORw0KGgo=" />)
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })

    test('renders canvas when icon is not provided', async () => {
      const wrapper = mount(<Qrcode text="test" />)
      await flushPromises()
      expect(wrapper.find('canvas').exists()).toBeTruthy()
    })
  })
})
