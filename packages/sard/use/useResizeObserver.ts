import {
  reactive,
  type Ref,
  onMounted,
  onUnmounted,
  watch,
  toValue,
  type MaybeRefOrGetter,
} from 'vue'

interface Size {
  width: number
  height: number
}

export function useResizeObserver(
  target: Ref<Element | null>,
  callback?: (size: Size) => void,
  disabled?: MaybeRefOrGetter<boolean>,
) {
  const size = reactive<Size>({
    width: 0,
    height: 0,
  })

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const contentSize = entry.contentBoxSize[0]
      Object.assign(size, {
        width: contentSize.inlineSize,
        height: contentSize.blockSize,
      })
      callback?.(size)
    }
  })

  const observe = () => {
    observer.disconnect()
    if (target.value && !toValue(disabled)) {
      observer.observe(target.value)
    }
  }

  watch(
    [target, () => toValue(disabled)],
    () => {
      observe()
    },
    {
      immediate: true,
    },
  )

  onMounted(() => {
    observe()
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return size
}
