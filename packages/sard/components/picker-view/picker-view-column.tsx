import { computed, getCurrentInstance, inject, ref, watch, watchPostEffect } from 'vue'
import {
  createBem,
  defineSetupFnComponent,
  flatVNode,
  Friction,
  Spring,
  useScroller,
} from '../../utils'
import { usePointerDown, useResizeObserver } from '../../use'
import { type PickerViewColumnSlots, pickerViewContextKey } from './common'

export default defineSetupFnComponent(
  (_props, { slots }) => {
    const bem = createBem('picker-view-column')

    const instance = getCurrentInstance()!

    const rootRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)
    const indicatorRef = ref<HTMLElement | null>(null)

    const context = inject(pickerViewContextKey)!

    const columnValue = context.getColumnValue(instance)

    const itemCount = ref(0)

    const rootSize = useResizeObserver(rootRef)
    const contentSize = useResizeObserver(contentRef)
    const indicatorSize = useResizeObserver(indicatorRef)

    const maskSize = computed(() => (rootSize.height - indicatorSize.height) / 2)

    const contentHeight = computed(() => {
      return contentSize.height + maskSize.value * 2
    })

    // ============================ scroll ============================
    const {
      position,
      update,
      scrollTo,
      isIdle,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    } = useScroller({
      itemSize: indicatorSize.height,
      friction: new Friction(0.0001),
      spring: new Spring(2, 90, 20),
      onSnap: (index) => {
        if (!isNaN(index) && index !== columnValue.value) {
          columnValue.value = index
        }
      },
      onTap: (event) => {
        handleTap(event)
      },
    })

    let updatePending = false

    watch(
      [() => indicatorSize.height, columnValue, itemCount, () => rootSize.height, contentHeight],
      () => {
        if (updatePending) return
        updatePending = true

        // NOTE: 确保短期内所有元素高度改变仅执行一次 update
        setTimeout(() => {
          updatePending = false
          if (indicatorSize.height) {
            const current = Math.max(Math.min(columnValue.value, itemCount.value - 1), 0)
            update(
              current * indicatorSize.height,
              indicatorSize.height,
              rootSize.height,
              contentHeight.value,
            )
          }
        })
      },
      {
        flush: 'post',
      },
    )

    // ============================ style ============================
    watchPostEffect(() => {
      const el = contentRef.value
      if (!el) return
      const transform = 'translateY(' + position.value + 'px) translateZ(0)'
      el.style.transform = transform
    })

    // ============================ events ============================

    let oldDeltaY = 0

    function handleWheel(event: Event) {
      const deltaY = oldDeltaY + (event as WheelEvent).deltaY
      if (Math.abs(deltaY) > 10) {
        oldDeltaY = 0
        let current = Math.min(columnValue.value + (deltaY < 0 ? -1 : 1), itemCount.value - 1)
        columnValue.value = current = Math.max(current, 0)
        scrollTo(current * indicatorSize.height)
      } else {
        oldDeltaY = deltaY
      }
      event.preventDefault()
    }

    function handleTap({ changedTouches: [{ clientY }] }: TouchEvent) {
      const el = rootRef.value as HTMLElement
      if (isIdle()) {
        const rect = el.getBoundingClientRect()
        const r = clientY - rect.top - rootSize.height / 2
        const o = indicatorSize.height / 2
        if (!(Math.abs(r) <= o)) {
          const a = Math.ceil((Math.abs(r) - o) / indicatorSize.height)
          const s = r < 0 ? -a : a
          let current = Math.min(columnValue.value + s, itemCount.value - 1)
          columnValue.value = current = Math.max(current, 0)
          scrollTo(current * indicatorSize.height)
        }
      }
    }

    const onTouchStart = (event: TouchEvent) => {
      handleTouchStart(event)
    }

    const onTouchMove = (event: TouchEvent) => {
      handleTouchMove(event)
      event.stopPropagation()
    }

    const onTouchEnd = (event: TouchEvent) => {
      handleTouchEnd(event)
    }

    const onPointerDown = usePointerDown(onTouchStart, onTouchMove, onTouchEnd)

    return () => {
      const defaultSlots = slots.default?.()
      itemCount.value = flatVNode(defaultSlots).length
      const padding = `${maskSize.value}px 0`
      return (
        <div
          ref={rootRef}
          class={bem.b()}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
          onPointerdown={onPointerDown}
        >
          <div class={bem.e('group')} onWheel={handleWheel}>
            <div
              class={[bem.e('mask'), context.maskClass]}
              style={[`background-size: 100% ${maskSize.value}px;`, context.maskStyle]}
            ></div>
            <div
              ref={indicatorRef}
              class={[bem.e('indicator'), context.indicatorClass]}
              style={context.indicatorStyle}
            ></div>
            <div
              ref={contentRef}
              class={[bem.e('content')]}
              style={{
                padding: padding,
                '--picker-view-indicator-height': `${indicatorSize.height}px`,
              }}
            >
              {defaultSlots}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    name: 'PickerViewColumn',
    slots: null as unknown as PickerViewColumnSlots,
  },
)
