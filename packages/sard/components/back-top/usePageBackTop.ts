import { ref } from 'vue'
import { usePageScroll } from '../../use'

export function usePageBackTop(behavior: ScrollBehavior = 'smooth') {
  const scrollTop = ref(0)

  usePageScroll(() => {
    scrollTop.value = window.scrollY
  })

  const backTop = () => {
    window.scrollTo({
      top: 0,
      behavior,
    })
  }

  return {
    scrollTop,
    backTop,
  }
}
