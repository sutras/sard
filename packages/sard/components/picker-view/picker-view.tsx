import {
  type ComponentInternalInstance,
  type Ref,
  type VNode,
  computed,
  provide,
  reactive,
  ref,
  toRef,
  useTemplateRef,
  watch,
} from 'vue'
import { createBem, defineSetupFnComponent, flatVNode } from '../../utils'
import {
  pickerViewContextKey,
  pickerViewProps,
  type PickerViewEmits,
  type PickerViewSlots,
} from './common'
import { useResizeObserver } from '../../use'

export default defineSetupFnComponent(
  (props, { slots, emit }) => {
    const bem = createBem('picker-view')
    const rootRef = useTemplateRef<HTMLElement>('root')

    // ============================ value ============================
    const innerValue = reactive([...props.value])

    watch(
      () => props.value,
      (value) => {
        innerValue.length = value.length
        value.forEach((val, index) => {
          if (val !== innerValue[index]) {
            innerValue.splice(index, 1, val)
          }
        })
      },
    )

    // ============================ columns ============================
    const columnsRef: Ref<VNode[]> = ref([])

    function getItemIndex(vnode: VNode): number {
      return columnsRef.value.indexOf(vnode)
    }

    const getColumnValue = (columnInstance: ComponentInternalInstance) => {
      return computed({
        get() {
          const index = getItemIndex(columnInstance.vnode)
          return innerValue[index] || 0
        },
        set(current: number) {
          const index = getItemIndex(columnInstance.vnode)
          if (index < 0) {
            return
          }
          const oldCurrent = innerValue[index]
          if (oldCurrent !== current) {
            innerValue[index] = current
            // 避免外部直接对此值进行修改
            const value = innerValue.map((val) => val)
            emit('update:value', value)
            emit('change', value)
          }
        },
      })
    }

    // ============================ height ============================
    const height = ref(48)

    useResizeObserver(rootRef, (size) => {
      height.value = size.height
    })

    // ============================ context ============================
    const context = reactive({
      maskStyle: toRef(() => props.maskStyle),
      maskClass: toRef(() => props.maskClass),
      indicatorClass: toRef(() => props.indicatorClass),
      indicatorStyle: toRef(() => props.indicatorStyle),
      height,
      getColumnValue,
    })

    provide(pickerViewContextKey, context)

    return () => {
      const defaultSlots = slots.default && slots.default()
      columnsRef.value = flatVNode(defaultSlots)

      return (
        <div ref="root" class={bem.b()}>
          <div class={bem.e('wrapper')}>{defaultSlots}</div>
        </div>
      )
    }
  },
  {
    name: 'PickerView',
    props: pickerViewProps,
    emits: ['change', 'update:value'] as unknown as PickerViewEmits,
    slots: null as unknown as PickerViewSlots,
  },
)
