import { computed, ref, useModel, watch } from 'vue'
import { useFormItemContext } from '../form/common'
import { omit } from '../../utils'
import type { MotionEmits, MotionHookName } from '../motion/common'

export interface UseFormPopoutProps {
  visible?: boolean
  modelValue?: any
  validateEvent?: boolean
  resettable?: boolean
}

export interface FormPopoutProps {
  visible?: boolean
  title?: string
  resettable?: boolean
  validateEvent?: boolean
  showConfirm?: boolean
}

export function omitFormPopoutProps<T>(props: T & FormPopoutProps) {
  return computed(() =>
    omit(props, ['visible', 'title', 'resettable', 'validateEvent', 'showConfirm']),
  )
}

export interface UseFormPopoutEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', ...args: any[]): void
  (e: 'change', ...args: any[]): void
  (e: 'confirm'): void
}

/**
 * 表单 Popout 组合式函数
 *
 * 统一管理所有表单类 popout 组件（如 select-popout、picker-popout、datetime-picker-popout 等）的通用逻辑：
 * - `innerVisible` — 弹出层显示/隐藏状态（双向绑定 `visible`）
 * - `innerValue`  — 已确认的外部值（同步自 `modelValue`，变更时触发表单校验）
 * - `draftValue`  — 弹出层中的临时草稿值，仅在确认后同步到 `innerValue`
 * - `onChange`    — 草稿变更回调，同时触发自定义 `onChange` 逻辑
 * - `onConfirm`   — 确认回调：若草稿值与当前值不同则 emit modelValue 更新及 change 事件
 * - `onVisibleHook` — 动画生命周期钩子，支持 `resettable` 模式下关闭时重置草稿值
 */
export function useFormPopout(
  props: UseFormPopoutProps,
  emit: UseFormPopoutEmits,
  options: {
    onChange?: (...args: any[]) => void
    onConfirmBefore?: () => any
  } = {},
) {
  const formItemContext = useFormItemContext()

  // visible
  const visible = useModel(props, 'visible')

  // value
  const innerValue = ref(props.modelValue)

  watch(
    () => props.modelValue,
    () => {
      innerValue.value = props.modelValue
      if (props.validateEvent) {
        formItemContext?.onChange()
      }
    },
  )

  const draftValue = ref(props.modelValue)

  watch(innerValue, () => {
    draftValue.value = innerValue.value
  })

  let restArgs: any[] = []

  const onChange = (value: any, ...args: any[]) => {
    draftValue.value = value
    restArgs = args
    options.onChange?.(value, ...args)
  }

  const onConfirm = (showConfirm = true) => {
    if (showConfirm) {
      emit('confirm')
    }
    const extraArgs = options.onConfirmBefore?.()
    if (extraArgs) {
      restArgs = extraArgs
    }
    if (draftValue.value !== innerValue.value) {
      innerValue.value = draftValue.value
      const args = [innerValue.value, ...restArgs]
      emit('update:modelValue', ...args)
      emit('change', ...args)
    }
  }

  const onVisibleHook = (name: MotionHookName, el: Element) => {
    if (props.resettable && name === 'after-leave' && draftValue.value !== innerValue.value) {
      draftValue.value = innerValue.value
    }
    emit('visible-hook', name, el)
    emit(name as any, el)
  }

  return {
    innerVisible: visible,
    innerValue,
    draftValue,
    onChange,
    onConfirm,
    onVisibleHook,
  }
}
