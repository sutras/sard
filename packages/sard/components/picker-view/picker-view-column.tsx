import {
  computed,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
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

    const rootRef = ref<HTMLElement | null>(null)
    const contentRef = ref<HTMLElement | null>(null)

    const instance = getCurrentInstance()!

    const context = inject(pickerViewContextKey)!

    const columnValue = context.getColumnValue(instance)

    const itemCount = ref(0)

    // ============================ indicator ============================
    const indicatorHeight = ref(48)

    const indicatorRef = useTemplateRef<HTMLElement>('indicator')

    useResizeObserver(indicatorRef, (size) => {
      if (size.height > 0) {
        indicatorHeight.value = size.height
      }
    })

    const maskSize = computed(() => (context.height - indicatorHeight.value) / 2)

    // ============================ scroll ============================
    const { update, scrollTo, isIdle, handleTouchStart, handleTouchMove, handleTouchEnd } =
      useScroller(contentRef, {
        enableY: true,
        enableX: false,
        enableSnap: true,
        itemSize: indicatorHeight.value,
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

    let updatesScrollerRequest: boolean
    function updatesScroller() {
      if (!updatesScrollerRequest && indicatorHeight.value) {
        updatesScrollerRequest = true
        nextTick(() => {
          updatesScrollerRequest = false
          const current = Math.max(Math.min(columnValue.value, itemCount.value - 1), 0)
          update(current * indicatorHeight.value, undefined, indicatorHeight.value)
        })
      }
    }

    watch([indicatorHeight, itemCount, () => context.height, columnValue], () => {
      updatesScroller()
    })

    onMounted(() => {
      updatesScroller()
    })

    // ============================ events ============================

    let oldDeltaY = 0

    function handleWheel(event: Event) {
      const deltaY = oldDeltaY + (event as WheelEvent).deltaY
      if (Math.abs(deltaY) > 10) {
        oldDeltaY = 0
        let current = Math.min(columnValue.value + (deltaY < 0 ? -1 : 1), itemCount.value - 1)
        columnValue.value = current = Math.max(current, 0)
        scrollTo(current * indicatorHeight.value)
      } else {
        oldDeltaY = deltaY
      }
      event.preventDefault()
    }

    function handleTap({ changedTouches: [{ clientY }] }: TouchEvent) {
      const el = rootRef.value as HTMLElement
      if (isIdle()) {
        const rect = el.getBoundingClientRect()
        const r = clientY - rect.top - context.height / 2
        const o = indicatorHeight.value / 2
        if (!(Math.abs(r) <= o)) {
          const a = Math.ceil((Math.abs(r) - o) / indicatorHeight.value)
          const s = r < 0 ? -a : a
          let current = Math.min(columnValue.value + s, itemCount.value - 1)
          columnValue.value = current = Math.max(current, 0)
          scrollTo(current * indicatorHeight.value)
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
              ref="indicator"
              class={[bem.e('indicator'), context.indicatorClass]}
              style={context.indicatorStyle}
            ></div>
            <div
              ref={contentRef}
              class={[bem.e('content')]}
              style={{
                padding: padding,
                '--picker-view-indicator-height': `${indicatorHeight.value}px`,
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
