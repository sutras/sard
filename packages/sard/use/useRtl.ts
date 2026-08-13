import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { checkRtl } from '../utils'

export function useRtl(elRef?: Ref<HTMLElement | null | undefined>) {
  const isRtl = ref(checkRtl(document.documentElement))

  let observer: MutationObserver | null = null

  const observe = (el: HTMLElement) => {
    observer?.disconnect()
    observer = new MutationObserver(() => {
      isRtl.value = checkRtl(el)
    })
    observer.observe(el, { attributes: true, attributeFilter: ['dir'] })
  }

  const update = () => {
    const el = elRef?.value || document.documentElement
    isRtl.value = checkRtl(el)
    observe(document.documentElement)
  }

  onMounted(() => nextTick(update))

  if (elRef) {
    watch(elRef, update)
  }

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return isRtl
}
