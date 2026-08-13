import { onUnmounted, reactive, ref } from 'vue'

export function useTimeout() {
  const isPending = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    isPending.value = false
  }

  const set = (callback: () => void, delay: number) => {
    clear()

    isPending.value = true
    timer = setTimeout(() => {
      timer = null
      isPending.value = false
      callback()
    }, delay)
  }

  onUnmounted(() => {
    clear()
  })

  return reactive({
    isPending,
    set,
    clear,
  })
}
