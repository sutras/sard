import { ref, type Ref } from 'vue'
import { useElementScroll } from '../../use'

export function useElementBackTop(el: Ref<HTMLElement | null | undefined>) {
  const scrollTop = ref(0)

  const backTop = () => {
    if (el.value) {
      el.value.scrollTop = 0
    }
  }

  useElementScroll(el, () => {
    scrollTop.value = el.value!.scrollTop
  })

  return {
    scrollTop,
    backTop,
  }
}
