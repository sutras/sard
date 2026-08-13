import { computed, nextTick, onMounted, ref, shallowRef, type Ref } from 'vue'
import { useTimeout } from './useTimeout'
import { isNullish, matchScrollVisible } from '../utils'
import { usePopupEnter } from '../components/popup/common'
import { useElementScroll } from './useElementScroll'

export interface UseScrollSpyOptions {
  defaultCurrent?: string | number
  getSpiedRect: () => DOMRect
  initialScroll?: boolean
  startOffset?: number
  onChange?: (name: string | number) => void
}

export function useScrollSpy(
  el: Ref<HTMLElement | null | undefined>,
  options: UseScrollSpyOptions,
) {
  const { defaultCurrent, initialScroll, onChange, getSpiedRect } = options

  const startOffset = computed(() => options.startOffset || 0)

  let memoScrollTop = 0

  const innerCurrent = ref<number | string | undefined>(defaultCurrent)

  const anchorRectList = shallowRef<[string | number, DOMRect][]>([])

  const anchorMap = new Map<string | number, () => DOMRect>()

  let lockScroll = false

  let requestUpdate = false

  const queueUpdate = () => {
    if (requestUpdate) return

    requestUpdate = true
    nextTick(() => {
      requestUpdate = false
      update()
    })
  }

  const lockTimer = useTimeout()

  const register = (name: string | number, getRect: () => DOMRect) => {
    anchorMap.set(name, getRect)
    queueUpdate()
  }

  const unregister = (name: string | number) => {
    anchorMap.delete(name)
    queueUpdate()
  }

  const calcPosition = (offset: number) => {
    matchScrollVisible(
      anchorRectList.value.map((item) => item[1]),
      (index) => {
        const name = anchorRectList.value[index][0]
        if (name !== innerCurrent.value) {
          innerCurrent.value = name
          onChange?.(name)
        }
      },
      {
        offset,
      },
    )
  }

  useElementScroll(el, () => {
    memoScrollTop = el.value!.scrollTop
    if (lockScroll) {
      return
    }
    calcPosition(el.value!.scrollTop + startOffset.value)
  })

  const scrollTo = (name: string | number) => {
    if (anchorRectList.value.length > 0) {
      const item = anchorRectList.value.find((item) => item[0] === name)
      if (item) {
        const offset = item[1].top
        const nextScrollTop = offset - startOffset.value

        el.value!.scrollTop = nextScrollTop

        lockScroll = true
        lockTimer.set(() => {
          lockScroll = false
        }, 150)
      }
    }
  }

  const getAllAnchorRect = () => {
    const allRect = [...anchorMap].map(([name, getRect]) => {
      return [name, getRect()] as const
    })

    return allRect.sort((a, b) => {
      return a[1].top - b[1].top
    })
  }

  const calcRect = () => {
    const spiedRect = getSpiedRect()

    anchorRectList.value = getAllAnchorRect().map(([name, rect]) => {
      return [
        name,
        new DOMRect(rect.x, rect.top - spiedRect.top + memoScrollTop, rect.width, rect.height),
      ]
    })
  }

  const update = () => {
    calcRect()
  }

  const initialize = () => {
    calcRect()

    if (isNullish(innerCurrent.value)) {
      innerCurrent.value = anchorRectList.value[0]?.[0]
    }
    if (initialScroll) {
      scrollTo(innerCurrent.value)
    }
  }

  usePopupEnter(() => {
    queueUpdate()
  })

  onMounted(() => {
    initialize()
  })

  return {
    innerCurrent,
    anchorRectList,
    register,
    unregister,
    scrollTo,
    update: queueUpdate,
  }
}
