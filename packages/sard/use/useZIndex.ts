import { ref } from 'vue'

let currentZIndex = 0

export function useZIndex() {
  if (currentZIndex === 0) {
    currentZIndex = 1000
  }
  const zIndex = ref(currentZIndex)

  function increase() {
    zIndex.value = currentZIndex = currentZIndex + 1
  }

  return [zIndex, increase] as const
}
