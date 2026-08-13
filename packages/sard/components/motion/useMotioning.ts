import { ref } from 'vue'
import type { MotionHookName } from './common'

export function useMotioning(visible: boolean) {
  const status = ref<'entering' | 'leaving' | 'entered' | 'left'>(visible ? 'entered' : 'left')

  const onVisibleHook = (name: MotionHookName) => {
    switch (name) {
      case 'before-enter':
      case 'enter':
        status.value = 'entering'
        break
      case 'after-enter':
        status.value = 'entered'
        break
      case 'before-leave':
      case 'leave':
        status.value = 'leaving'
        break
      case 'after-leave':
        status.value = 'left'
        break
    }
  }

  return [status, onVisibleHook] as const
}
