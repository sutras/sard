import { ref, onUnmounted, watch, type Ref, type MaybeRefOrGetter, toValue, computed } from 'vue'

export interface UseIntersectionObserverOptions {
  target?: MaybeRefOrGetter<Element | null | undefined>
  root?: MaybeRefOrGetter<Element | Document | Window | null | undefined>
  rootMargin?: MaybeRefOrGetter<string>
  threshold?: MaybeRefOrGetter<number | number[]>
  disabled?: MaybeRefOrGetter<boolean | null | undefined>
}

export interface UseIntersectionObserverReturn {
  isIntersecting: Ref<boolean>
  intersectionRatio: Ref<number>
  observe: () => void
  unobserve: () => void
  stop: () => void
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const root = computed(() => {
    let result = toValue(options.root)
    if (result === window) {
      result = document
    }
    return result as Element | Document | null | undefined
  })
  const rootMargin = computed(() => toValue(options.rootMargin))
  const threshold = computed(() => toValue(options.threshold))
  const target = computed(() => toValue(options.target))
  const disabled = computed(() => toValue(options.disabled))

  const isIntersecting = ref(false)
  const intersectionRatio = ref(0)

  let observer: IntersectionObserver | null = null

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      isIntersecting.value = entry.isIntersecting
      intersectionRatio.value = entry.intersectionRatio
    })
  }

  const destroyObserver = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  const createObserver = () => {
    destroyObserver()

    if (disabled.value) return

    observer = new IntersectionObserver(callback, {
      root: root.value,
      rootMargin: rootMargin.value,
      threshold: threshold.value,
    })

    if (target.value) {
      observer.observe(target.value)
    }
  }

  const observe = () => {
    if (!observer) {
      createObserver()
    }

    if (observer && target.value) {
      observer.observe(target.value)
    }
  }

  const unobserve = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }
  }

  const stop = () => {
    unobserve()
    destroyObserver()
    isIntersecting.value = false
    intersectionRatio.value = 0
  }

  watch(
    [root, rootMargin, threshold, disabled],
    () => {
      createObserver()
    },
    {
      flush: 'post',
      immediate: true,
    },
  )

  watch(
    target,
    (newTarget, oldTarget) => {
      if (oldTarget && observer) {
        observer.unobserve(oldTarget)
      }

      if (newTarget && observer) {
        observer.observe(newTarget)
      }
    },
    {
      flush: 'post',
      immediate: true,
    },
  )

  onUnmounted(() => {
    stop()
  })

  return {
    isIntersecting,
    intersectionRatio,
    observe,
    unobserve,
    stop,
  }
}
