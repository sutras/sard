import { ref } from 'vue'

export function useStopMovedClick() {
  let isDown = false
  let moved = false

  const isStoppedClick = ref(false)

  const onPointerDown = () => {
    isDown = true
    moved = false
    isStoppedClick.value = false
  }

  const onPointerMove = () => {
    moved = true
  }

  const onPointerUp = () => {
    if (isDown && moved) {
      isStoppedClick.value = true
    }
    isDown = false
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    isStoppedClick,
  }
}
