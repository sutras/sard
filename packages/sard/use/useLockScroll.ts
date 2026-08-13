import {
  computed,
  type MaybeRefOrGetter,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
} from 'vue'

const globalLockRecord = ref(0)

// FIXME: iOS添加溢出隐藏后还能滚动
watch(globalLockRecord, (record) => {
  if (record > 0) {
    document.body.classList.add('s-lock-scroll')
  } else {
    document.body.classList.remove('s-lock-scroll')
  }
})

export function useLockScroll(_visible: MaybeRefOrGetter<boolean>, lockScroll = true) {
  if (!lockScroll) return

  const visible = computed(() => toValue(_visible))

  let isLocked = false

  const lock = () => {
    if (!isLocked) {
      isLocked = true
      globalLockRecord.value++
    }
  }

  const unlock = () => {
    if (isLocked) {
      isLocked = false
      globalLockRecord.value--
    }
  }

  onMounted(() => {
    if (visible.value) {
      lock()
    }
  })

  onBeforeUnmount(() => {
    unlock()
  })

  watch(visible, (visible) => {
    if (visible) {
      lock()
    } else {
      unlock()
    }
  })
}
