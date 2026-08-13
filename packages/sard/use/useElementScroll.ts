import { onBeforeUnmount, watch, type Ref } from 'vue'

export function useElementScroll(el: Ref<HTMLElement | null | undefined>, callback: () => void) {
  const handleScroll = () => {
    callback()
  }

  watch(
    el,
    (el, old) => {
      if (old) {
        old.removeEventListener('scroll', handleScroll)
      }
      if (el) {
        el.addEventListener('scroll', handleScroll)
      }
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onBeforeUnmount(() => {
    if (el.value) {
      el.value.removeEventListener('scroll', handleScroll)
    }
  })
}
