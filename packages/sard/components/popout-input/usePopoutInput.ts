import { computed, ref, useModel, watch } from 'vue'
import { partition } from '../../utils'
import { type FormPopoutProps } from '../popout/useFormPopout'
import { type PopoutInputProps } from './common'
import type { MotionEmits, MotionHookName } from '../motion/common'

export type UsePopoutInputProps = Omit<PopoutInputProps, 'modelValue'> &
  FormPopoutProps & {
    modelValue?: any
  }

export interface UsePopoutInputEmits extends MotionEmits {
  (e: 'update:visible', visible: boolean): void
  (e: 'update:modelValue', ...args: any[]): void
  (e: 'change', ...args: any[]): void
}

const popoutInputKeys: (keyof Omit<PopoutInputProps, 'modelValue'>)[] = [
  'placeholder',
  'readonly',
  'disabled',
  'clearable',
  'loading',
  'multiline',
  'inputProps',
  'valueOnClear',
]

export function partitionPopoutInputProps<
  T extends Omit<PopoutInputProps, 'modelValue'> & FormPopoutProps,
>(props: T) {
  return computed(() => {
    const [picked, rest] = partition(props, popoutInputKeys)

    return [
      picked,
      {
        ...rest,
        title: rest.title ?? picked.placeholder,
      },
    ]
  })
}

const defaultValueOnClear = () => undefined

export function usePopoutInput<T extends UsePopoutInputProps>(
  props: T,
  emit: UsePopoutInputEmits,
  options: {
    onClear?: (value: any) => void
  } = {},
) {
  // visible
  const innerVisible = useModel(props, 'visible')

  const show = () => {
    innerVisible.value = true
  }

  const onVisibleHook = (name: MotionHookName, el: Element) => {
    emit('visible-hook', name, el)
    emit(name as any, el)
  }

  // value
  const innerValue = ref(props.modelValue)

  const getValueOnClear = () => (props.valueOnClear || defaultValueOnClear)()

  watch(
    () => props.modelValue,
    () => {
      innerValue.value = props.modelValue
    },
  )

  const onChange = (...args: any[]) => {
    emit('update:modelValue', ...args)
    emit('change', ...args)
  }

  const onClear = () => {
    inputValue.value = ''
    innerValue.value = getValueOnClear()
    if (options.onClear) {
      options.onClear(innerValue.value)
    } else {
      emit('update:modelValue', innerValue.value)
      emit('change', innerValue.value)
    }
  }

  // input
  const inputValue = ref('')

  return {
    innerVisible,
    innerValue,
    inputValue,
    show,
    onChange,
    onClear,
    onVisibleHook,
  }
}
