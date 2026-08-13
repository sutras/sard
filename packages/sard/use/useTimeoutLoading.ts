import { computed, watch } from 'vue'
import { ref, type Ref } from 'vue'
import { useTimeout } from './useTimeout'

export interface UseTimeoutLoadingOptions {
  leading?: number
  trailing?: number
}

export function useTimeoutLoading(loading: Ref<boolean>, options: UseTimeoutLoadingOptions = {}) {
  const { leading = 150, trailing = 20000 } = options

  const status = ref<'idle' | 'leading' | 'loading' | 'trailing'>('idle')

  let startTime = 0

  const trailingTimer = useTimeout()

  const leadingTimer = useTimeout()

  watch(loading, () => {
    leadingTimer.clear()
    trailingTimer.clear()

    if (loading.value) {
      switch (status.value) {
        case 'idle':
          status.value = 'leading'
          leadingTimer.set(() => {
            status.value = 'loading'
            startTime = Date.now()
          }, leading)
          break
        case 'trailing':
          status.value = 'loading'
          startTime = Date.now()
          break
      }
    } else {
      switch (status.value) {
        case 'leading':
          status.value = 'idle'
          break
        case 'loading': {
          const duration = Date.now() - startTime

          if (duration >= trailing) {
            status.value = 'idle'
          } else {
            status.value = 'trailing'
            trailingTimer.set(() => {
              status.value = 'idle'
            }, trailing - duration)
          }
          break
        }
      }
    }
  })

  const timeoutLoading = computed(() => {
    return status.value === 'loading' || status.value === 'trailing'
  })

  return timeoutLoading
}
