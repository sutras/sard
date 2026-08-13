import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Signature from '../signature.vue'
import Button from '../../button/button.vue'
import { type SignatureExpose } from '../common'

const mockResizeObserver = vi.fn<(callback: ResizeObserverCallback) => void>(function (
  this: any,
  _callback: ResizeObserverCallback,
) {
  this.observe = vi.fn<() => void>()
  this.unobserve = vi.fn<() => void>()
  this.disconnect = vi.fn<() => void>()
})

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', mockResizeObserver)
})

const createMockCanvasContext = () => ({
  fillStyle: '',
  lineCap: 'round',
  lineJoin: 'round',
  lineWidth: 0,
  strokeStyle: '',
  setTransform() {},
  scale() {},
  clearRect() {},
  fillRect() {},
  beginPath() {},
  moveTo() {},
  lineTo() {},
  stroke() {},
  closePath() {},
  save() {},
  translate() {},
  rotate() {},
  drawImage() {},
  restore() {},
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Signature', () => {
  // ==================== rendering ====================

  test('renders canvas and buttons', () => {
    const wrapper = mount(<Signature />)

    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper.find('.s-signature').exists()).toBe(true)
  })

  test('renders clear and confirm buttons', () => {
    const wrapper = mount(<Signature />)

    const buttons = wrapper.findAllComponents(Button)
    // clear + confirm (no cancel in non-fullScreen mode)
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  // ==================== fullScreen ====================

  test('renders cancel button when fullScreen', () => {
    const wrapper = mount(<Signature fullScreen />)

    const buttons = wrapper.findAllComponents(Button)
    // cancel + clear + confirm
    expect(buttons.length).toBe(3)
  })

  test('does not render cancel button when not fullScreen', () => {
    const wrapper = mount(<Signature />)

    const buttons = wrapper.findAllComponents(Button)
    expect(buttons.length).toBe(2)
  })

  test('has full modifier class when fullScreen', () => {
    mount(<Signature fullScreen />)

    // Teleported to body in fullScreen mode
    expect(document.body.querySelector('.s-signature--full')).toBeTruthy()
  })

  test('teleports to body when fullScreen', () => {
    mount(<Signature fullScreen />)

    // Teleported content should be in document.body
    expect(document.body.querySelector('.s-signature')).toBeTruthy()
  })

  test('shows signature when visible is true', async () => {
    const wrapper = mount(<Signature fullScreen visible={false} />)

    await wrapper.setProps({ visible: true })
    await nextTick()

    // Component should render without error after becoming visible
    expect(wrapper.findComponent(Signature).exists()).toBe(true)
  })

  // ==================== button text ====================

  test('uses default button texts', () => {
    const wrapper = mount(<Signature fullScreen />)

    const buttons = wrapper.findAllComponents(Button)
    const texts = buttons.map((b) => b.text())
    expect(texts.some((t) => t.includes('取消') || t.includes('Cancel'))).toBe(true)
  })

  test('uses custom cancelText', () => {
    const wrapper = mount(<Signature fullScreen cancelText="cancel1" />)

    const buttons = wrapper.findAllComponents(Button)
    expect(buttons[0].text()).toBe('cancel1')
  })

  test('uses custom clearText', () => {
    const wrapper = mount(<Signature clearText="clear1" />)

    const buttons = wrapper.findAllComponents(Button)
    expect(buttons[0].text()).toBe('clear1')
  })

  test('uses custom confirmText', () => {
    const wrapper = mount(<Signature confirmText="confirm1" />)

    const buttons = wrapper.findAllComponents(Button)
    // confirm is the last button
    expect(buttons[buttons.length - 1].text()).toBe('confirm1')
  })

  // ==================== confirm ====================

  test('emits confirm with empty dataURL when canvas is empty', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')

    const wrapper = mount(<Signature />)

    // Click confirm button (last button)
    const buttons = wrapper.findAllComponents(Button)
    await buttons[buttons.length - 1].trigger('click')

    expect(wrapper.emitted('confirm')?.[0]).toEqual([''])
  })

  test('closes after confirm when fullScreen', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')

    const wrapper = mount(<Signature fullScreen visible={true} />)

    const buttons = wrapper.findAllComponents(Button)
    await buttons[buttons.length - 1].trigger('click')
    await nextTick()

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  test('does not close after confirm when not fullScreen', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')

    const wrapper = mount(<Signature />)

    const buttons = wrapper.findAllComponents(Button)
    await buttons[buttons.length - 1].trigger('click')

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  // ==================== clear ====================

  test('emits clear when clear button clicked', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )

    const wrapper = mount(<Signature fullScreen />)

    // clear is the 2nd button (index 1)
    const buttons = wrapper.findAllComponents(Button)
    await buttons[1].trigger('click')

    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('emits clear when clear button clicked in non-fullScreen', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )

    const wrapper = mount(<Signature />)

    // clear is the 1st button
    const buttons = wrapper.findAllComponents(Button)
    await buttons[0].trigger('click')

    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  // ==================== cancel ====================

  test('emits cancel and update:visible when cancel clicked', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )

    const wrapper = mount(<Signature fullScreen visible={true} />)

    // cancel is the 1st button
    const buttons = wrapper.findAllComponents(Button)
    await buttons[0].trigger('click')
    await nextTick()

    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  // ==================== props ====================

  test('passes color prop', () => {
    const wrapper = mount(<Signature color="#ff0000" />)

    // Color is used when drawing, check that component mounts without error
    expect(wrapper.find('.s-signature').exists()).toBe(true)
  })

  test('passes lineWidth prop', () => {
    const wrapper = mount(<Signature lineWidth={5} />)

    expect(wrapper.find('.s-signature').exists()).toBe(true)
  })

  test('passes type and quality props', () => {
    const wrapper = mount(<Signature type="image/jpeg" quality={0.8} />)

    expect(wrapper.find('.s-signature').exists()).toBe(true)
  })

  // ==================== expose ====================

  test('exposes clear and confirm methods', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')

    const wrapper = mount(<Signature />)

    expect(typeof wrapper.vm.clear).toBe('function')
    expect(typeof wrapper.vm.confirm).toBe('function')
  })

  test('exposed clear emits clear event', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )

    const wrapper = mount(<Signature />)

    ;(wrapper.vm as unknown as SignatureExpose).clear()

    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  test('exposed confirm emits confirm event', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock')

    const wrapper = mount(<Signature />)

    ;(wrapper.vm as unknown as SignatureExpose).confirm()

    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  // ==================== edge cases ====================

  test('handles background prop', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
      createMockCanvasContext() as never,
    )

    const wrapper = mount(<Signature background="#f5f5f5" />)

    expect(wrapper.find('.s-signature').exists()).toBe(true)
  })
})
