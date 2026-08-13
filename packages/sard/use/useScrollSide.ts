import { onMounted, reactive, type Ref } from 'vue'
import { useElementScroll } from './useElementScroll'

type Side = 'start' | 'none' | 'end' | 'both'

export function useScrollSide(
  elRef: Ref<HTMLElement | null | undefined>,
  options: {
    direction?: 'vertical' | 'horizontal' | 'both'
    distance?: number
  } = {},
) {
  const { distance = 1, direction = 'vertical' } = options

  const side = reactive<{
    horizontal: Side
    vertical: Side
  }>({
    vertical: 'both',
    horizontal: 'both',
  })

  const updateHorizontalSide = (el: HTMLElement) => {
    const scrollLeft = Math.abs(el.scrollLeft)
    const clientWidth = el.clientWidth
    const scrollWidth = el.scrollWidth

    if (scrollWidth <= clientWidth) {
      side.horizontal = 'both'
    } else if (scrollLeft <= distance) {
      side.horizontal = 'start'
    } else if (scrollLeft + clientWidth >= scrollWidth - distance) {
      side.horizontal = 'end'
    } else {
      side.horizontal = 'none'
    }
  }

  const updateVerticalSide = (el: HTMLElement) => {
    const scrollTop = el.scrollTop
    const clientHeight = el.clientHeight
    const scrollHeight = el.scrollHeight

    if (scrollHeight <= clientHeight) {
      side.vertical = 'both'
    } else if (scrollTop <= distance) {
      side.vertical = 'start'
    } else if (scrollTop + clientHeight >= scrollHeight - distance) {
      side.vertical = 'end'
    } else {
      side.vertical = 'none'
    }
  }

  const updateSide = (el: HTMLElement) => {
    if (direction === 'vertical') {
      updateVerticalSide(el)
    } else if (direction === 'horizontal') {
      updateHorizontalSide(el)
    } else {
      updateVerticalSide(el)
      updateHorizontalSide(el)
    }
  }

  const handleScroll = (el: HTMLElement) => {
    updateSide(el)
  }

  useElementScroll(elRef, () => {
    const el = elRef.value
    if (el) {
      handleScroll(el)
    }
  })

  onMounted(() => {
    if (elRef.value) {
      updateSide(elRef.value)
    }
  })

  return side
}
