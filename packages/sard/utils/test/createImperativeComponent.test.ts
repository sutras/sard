import { afterEach, describe, expect, test, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { createImperativeComponent } from '../createImperativeComponent'

interface DummyOptions {
  visible?: boolean
  title?: string
  'onUpdate:visible'?: (value: boolean) => void
}

interface DummyExpose {
  greeting: () => string
  close: () => void
}

function createDummy() {
  return defineComponent({
    name: 'Dummy',
    props: {
      visible: Boolean,
      title: { type: String, default: '' },
    },
    emits: ['update:visible'],
    setup(props, { expose, emit }) {
      expose({
        greeting: () => `hello ${props.title}`,
        close: () => emit('update:visible', false),
      } satisfies DummyExpose)

      return () =>
        h(
          'div',
          { class: 'dummy' },
          props.visible ? `visible:${props.title}` : `hidden:${props.title}`,
        )
    },
  })
}

function getDummyText() {
  return document.body.querySelector('.dummy')?.textContent
}

describe('createImperativeComponent', () => {
  afterEach(() => {
    // 命令式组件会把容器挂到 body 上，这里把它们清掉
    document.body.querySelectorAll('.dummy').forEach((el) => el.parentElement?.remove())
    vi.restoreAllMocks()
  })

  test('returns a show / hide api', () => {
    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(createDummy())

    expect(typeof imperative.show).toBe('function')
    expect(typeof imperative.hide).toBe('function')
  })

  test('show renders component with option merged over defaults', async () => {
    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(createDummy(), {
      title: 'default',
    })

    imperative.show({ title: 'custom' })
    await nextTick()

    expect(getDummyText()).toBe('visible:custom')
  })

  test('show without options falls back to defaults', async () => {
    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(createDummy(), {
      title: 'default',
    })

    imperative.show()
    await nextTick()

    expect(getDummyText()).toBe('visible:default')
  })

  test('hide sets visible to false', async () => {
    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(createDummy(), {
      title: 't',
    })

    imperative.show()
    await nextTick()
    expect(getDummyText()).toBe('visible:t')

    imperative.hide()
    await nextTick()
    expect(getDummyText()).toBe('hidden:t')
  })

  test('onShow receives the child expose', async () => {
    let exposed: DummyExpose | undefined
    const onShow = vi.fn<(expose: DummyExpose) => void>((expose) => {
      exposed = expose
    })

    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(
      createDummy(),
      { title: 'default' },
      { onShow },
    )

    imperative.show()
    await nextTick()

    expect(onShow).toHaveBeenCalledTimes(1)
    // NOTE: onShow 与 props 更新同拍触发（子组件此时尚未重渲染），
    // 所以要等到 nextTick 之后再读 expose 的值。
    expect(exposed!.greeting()).toBe('hello default')
  })

  test('onHide receives the child expose', async () => {
    const onHide = vi.fn<(expose: DummyExpose) => void>()

    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(
      createDummy(),
      { title: 't' },
      { onHide },
    )

    imperative.show()
    await nextTick()
    imperative.hide()

    expect(onHide).toHaveBeenCalledTimes(1)
    expect(onHide.mock.calls[0][0]).toHaveProperty('greeting')
  })

  test('onUpdate:visible writes back and calls user callback exactly once', async () => {
    const onUpdateVisible = vi.fn<(value: boolean) => void>()
    // 子组件在 onShow 里主动关掉自己，模拟 Popup 内部关闭（点遮罩 / 按 ESC 等）
    const onShow = vi.fn<(expose: DummyExpose) => void>((expose) => expose.close())

    const imperative = createImperativeComponent<DummyOptions, DummyExpose>(
      createDummy(),
      { title: 't' },
      { onShow },
    )

    imperative.show({ 'onUpdate:visible': onUpdateVisible })
    await nextTick()

    expect(onUpdateVisible).toHaveBeenCalledTimes(1)
    expect(onUpdateVisible).toHaveBeenCalledWith(false)
    expect(getDummyText()).toBe('hidden:t')
  })
})
