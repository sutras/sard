import { onUnmounted, watch, type Ref } from 'vue'
import { useTimeout } from './useTimeout'

export function useClickOutside(
  elRef: Ref<Element | null>,
  callback: (event: Event) => void,
  enabled: Ref<boolean>,
  type: 'click' | 'touchstart' = 'click',
) {
  const mapTypeEvents = {
    click: ['click'],
    touchstart: ['touchstart', 'pointerdown'],
  }

  const events = mapTypeEvents[type]

  const onDocumentClick = (event: Event) => {
    const el = elRef.value
    const target = event.target as Element
    if (!el || !target) return

    if (!el.contains(target)) {
      callback(event)
    }
  }

  const bindTimer = useTimeout()

  let isBinding = false

  const bind = () => {
    if (isBinding) return
    events.map((event) => {
      document.addEventListener(event, onDocumentClick)
    })
    isBinding = true
  }

  const unbind = () => {
    if (!isBinding) return
    events.map((event) => {
      document.removeEventListener(event, onDocumentClick)
    })
    isBinding = false
  }

  watch(
    enabled,
    (enabled) => {
      bindTimer.clear()

      if (enabled) {
        bindTimer.set(() => {
          bind()
        }, 0)
      } else {
        unbind()
      }
    },
    {
      immediate: true,
      flush: 'post',
    },
  )

  onUnmounted(() => {
    unbind()
  })
}
