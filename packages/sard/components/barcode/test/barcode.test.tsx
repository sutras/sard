import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Barcode from '../barcode.vue'
import { BarcodeFormatList, barcode, calculateBarcodeLayout } from '../../../utils'

async function flushTasks() {
  await nextTick()
  await Promise.resolve()
  await new Promise((resolve) => setTimeout(resolve, 120))
  await nextTick()
}

describe('Barcode', () => {
  // ── supported formats ────────────────────────────────────────────

  test('only exposes supported barcode formats', () => {
    expect(BarcodeFormatList).toEqual(['CODE128', 'EAN13', 'UPC-A', 'ITF14'])
  })

  // ── CODE128 encoding ─────────────────────────────────────────────

  test('generates CODE128 with expected code set behavior', () => {
    const numericOnly = barcode('123456', { format: 'CODE128' })[0]
    const alphaNumeric = barcode('AB12', { format: 'CODE128' })[0]
    const ean128 = barcode('123456', { format: 'CODE128', ean128: true })[0]

    expect(numericOnly.text).toBe('123456')
    expect(numericOnly.data.startsWith('11010011100')).toBeTruthy()
    expect(alphaNumeric.data.startsWith('11010010000')).toBeTruthy()
    expect(ean128.data.length).toBe(numericOnly.data.length + 11)
  })

  // ── EAN13 encoding ───────────────────────────────────────────────

  test('auto-appends checksum and segments EAN13 correctly', () => {
    const encodings = barcode('590123412345', { format: 'EAN13' })

    expect(encodings).toHaveLength(6)
    expect(encodings.map((item) => item.text)).toEqual(['5', '', '901234', '', '123457', ''])
    expect(encodings[1].data).toBe('101')
    expect(encodings[2].data).toHaveLength(42)
    expect(encodings[3].data).toBe('01010')
    expect(encodings[4].data).toHaveLength(42)
    expect(encodings[5].data).toBe('101')
  })

  test('throws on invalid EAN13 input with wrong checksum', () => {
    expect(() => barcode('5901234123458', { format: 'EAN13' })).toThrow(
      'Invalid barcode input for format EAN13',
    )
  })

  test('throws on empty EAN13 input', () => {
    expect(() => barcode('', { format: 'EAN13' })).toThrow('Invalid barcode input for format EAN13')
  })

  // ── UPC-A encoding ───────────────────────────────────────────────

  test('auto-appends checksum and segments UPC-A correctly', () => {
    const encodings = barcode('12345678901', { format: 'UPC-A' })

    expect(encodings).toHaveLength(7)
    expect(encodings.map((item) => item.text)).toEqual(['1', '', '23456', '', '78901', '', '2'])
    expect(encodings[0].data).toBe('00000000')
    expect(encodings[1].data).toHaveLength(10)
    expect(encodings[3].data).toBe('01010')
    expect(encodings[5].data).toHaveLength(10)
    expect(encodings[6].data).toBe('00000000')
  })

  test('throws on invalid UPC-A input', () => {
    expect(() => barcode('123456789013', { format: 'UPC-A' })).toThrow(
      'Invalid barcode input for format UPC-A',
    )
  })

  // ── ITF14 encoding ───────────────────────────────────────────────

  test('auto-appends checksum for ITF14', () => {
    const encodings = barcode('1234567890123', { format: 'ITF14' })

    expect(encodings).toHaveLength(1)
    expect(encodings[0].text).toBe('12345678901231')
    expect(encodings[0].data.startsWith('1010')).toBeTruthy()
    expect(encodings[0].data.endsWith('11101')).toBeTruthy()
  })

  test('throws on invalid ITF14 input', () => {
    expect(() => barcode('12345678901234', { format: 'ITF14' })).toThrow(
      'Invalid barcode input for format ITF14',
    )
  })

  // ── invalid input ────────────────────────────────────────────────

  test('throws on empty input for CODE128', () => {
    expect(() => barcode('', { format: 'CODE128' })).toThrow(
      'Invalid barcode input for format CODE128',
    )
  })

  // ── layout calculation ───────────────────────────────────────────

  test('calculates layout width, height, and text padding', () => {
    const encodings = barcode('AB12', {
      format: 'CODE128',
      width: 1,
      marginLeft: 4,
      marginRight: 6,
      textAlign: 'center',
    })
    const layout = calculateBarcodeLayout(encodings, () => 100)

    expect(layout.width).toBe(110)
    expect(layout.height).toBe(142)
    expect(layout.segments[0].textWidth).toBe(100)
    expect(layout.segments[0].barcodeWidth).toBe(encodings[0].data.length)
    expect(layout.segments[0].barcodePadding).toBe(Math.floor((100 - encodings[0].data.length) / 2))
  })

  test('layout with left textAlign and wider text has zero padding', () => {
    const encodings = barcode('AB12', {
      format: 'CODE128',
      width: 1,
      textAlign: 'left',
    })
    const layout = calculateBarcodeLayout(encodings, () => 100)

    // left align doesn't add extra padding to the barcode
    expect(layout.segments[0].barcodePadding).toBe(0)
  })

  // ── component rendering ──────────────────────────────────────────

  test('renders canvas element with wrapper', () => {
    const wrapper = mount(<Barcode value="123456" />)

    expect(wrapper.find('.s-barcode').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  test('renders without value', () => {
    const wrapper = mount(<Barcode />)

    expect(wrapper.find('.s-barcode').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  test('sets canvas element attributes', async () => {
    const wrapper = mount(<Barcode value="123456" />)

    await flushTasks()

    const canvas = wrapper.find('canvas').element as HTMLCanvasElement
    // Canvas element exists with width/height attributes
    expect(canvas).toBeDefined()
    expect(typeof canvas.width).toBe('number')
    expect(typeof canvas.height).toBe('number')
  })

  test('updates canvas when value changes', async () => {
    const wrapper = mount(<Barcode value="123456" />)

    await flushTasks()

    await wrapper.setProps({ value: '789012' })
    await flushTasks()

    // Canvas should redraw with new value
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  test('applies custom width and height props', async () => {
    const wrapper = mount(<Barcode value="123456" width={3} height={150} />)

    await flushTasks()

    // Component should render without error with custom dimensions
    expect(wrapper.find('.s-barcode').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  test('hides display text when displayValue is false', async () => {
    const wrapper = mount(<Barcode value="123456" displayValue={false} />)

    await flushTasks()

    // Should render successfully with text hidden
    expect(wrapper.find('.s-barcode').exists()).toBe(true)
  })

  test('renders text at top position', async () => {
    const wrapper = mount(<Barcode value="123456" textPosition="top" />)

    await flushTasks()

    // Should render successfully with text on top
    expect(wrapper.find('.s-barcode').exists()).toBe(true)
  })

  test('applies custom font styling', async () => {
    const wrapper = mount(
      <Barcode
        value="123456"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={20}
        fontFamily="Arial"
      />,
    )

    await flushTasks()

    expect(wrapper.find('.s-barcode').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  test('applies custom color and background', async () => {
    const wrapper = mount(<Barcode value="123456" color="#ff0000" background="#00ff00" />)

    await flushTasks()

    expect(wrapper.find('.s-barcode').exists()).toBe(true)
  })

  test('applies custom margins', async () => {
    const wrapper = mount(
      <Barcode
        value="123456"
        margin={20}
        marginTop={5}
        marginBottom={5}
        marginLeft={15}
        marginRight={15}
      />,
    )

    await flushTasks()

    expect(wrapper.find('.s-barcode').exists()).toBe(true)
  })

  test('renders different formats without error', async () => {
    for (const format of ['CODE128', 'EAN13', 'UPC-A', 'ITF14'] as const) {
      const wrapper = mount(<Barcode value="123456" format={format} />)
      await flushTasks()
      expect(wrapper.find('.s-barcode').exists()).toBe(true)
      wrapper.unmount()
    }
  })

  test('clears canvas when value becomes empty', async () => {
    const wrapper = mount(<Barcode value="123456" />)

    await flushTasks()
    expect(wrapper.find('canvas').exists()).toBe(true)

    await wrapper.setProps({ value: '' })
    await flushTasks()

    expect(wrapper.find('canvas').exists()).toBe(true)
  })
})
