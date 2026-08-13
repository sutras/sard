import { onBeforeUnmount, onMounted } from 'vue'

export function usePageScroll(callback: () => void) {
  const handleScroll = () => {
    callback()
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
