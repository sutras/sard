import { onBeforeUnmount, onMounted } from 'vue'

export function useWindowResize(callback: () => void) {
  const handleResize = () => {
    callback()
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
}
