import { computed, ref, watch } from 'vue'
import { isNumber } from '../../utils'

export interface SwiperSlideData {
  el: HTMLElement | null
  size: number
  offset: number
}

export function useSwiperData() {
  // ============================ state ============================
  const swiperSize = ref(0)
  const offset = ref(0)
  const spaceBetween = ref(0)
  const slidesPerView = ref(1)
  const slidesPerGroup = ref(1)
  const centeredSlides = ref(false)
  // TODO: 目前只支持单 slide 的循环切换，后面需支持任意场景的循环。
  const loop = ref(false)
  const activeIndex = ref(0)
  const slides = ref<SwiperSlideData[]>([])

  const pageCount = computed(() => {
    const len = slides.value.length
    if (centeredSlides.value) {
      return Math.ceil(len / slidesPerGroup.value)
    }
    return Math.max(Math.ceil((len - slidesPerView.value) / slidesPerGroup.value) + 1, 0)
  })

  const contentSize = computed(() => {
    return Math.max(
      slides.value.reduce((total, slide) => total + slide.size + spaceBetween.value, 0) -
        spaceBetween.value,
      0,
    )
  })

  const startEdge = computed(() => {
    if (centeredSlides.value) {
      let groupSize = 0
      for (let i = 0; i < slidesPerGroup.value; i++) {
        const slideSize = slides.value[i].size
        groupSize += (i !== slidesPerGroup.value - 1 ? spaceBetween.value : 0) + slideSize
      }
      return swiperSize.value / 2 - groupSize / 2
    } else {
      return 0
    }
  })

  const endEdge = computed(() => {
    if (centeredSlides.value) {
      const len = slides.value.length
      const lastCount = len % slidesPerGroup.value || slidesPerGroup.value
      let groupSize = 0
      for (let i = len - 1; i >= len - lastCount; i--) {
        const slideSize = slides.value[i].size
        groupSize += (i !== len - lastCount ? spaceBetween.value : 0) + slideSize
      }
      return swiperSize.value / 2 + groupSize / 2 - contentSize.value
    } else {
      return swiperSize.value - contentSize.value
    }
  })

  // ============================ offset ============================
  function getOffsetByIndex(index: number) {
    if (loop.value) {
      if (index < 0) {
        return swiperSize.value + spaceBetween.value
      } else if (index >= pageCount.value) {
        return -contentSize.value - spaceBetween.value
      }
    }

    const beforeSize = slides.value
      .slice(0, index * slidesPerGroup.value)
      .reduce((total, slide) => total + slide.size + spaceBetween.value, 0)

    if (centeredSlides.value) {
      let groupSize = 0
      for (let i = 0; i < slidesPerGroup.value; i++) {
        const slide = slides.value[index * slidesPerGroup.value + i]
        if (!slide) break
        groupSize += (i !== slidesPerGroup.value - 1 ? spaceBetween.value : 0) + slide.size
      }
      return swiperSize.value / 2 - groupSize / 2 - beforeSize
    } else {
      if (index >= pageCount.value - 1) {
        return swiperSize.value - contentSize.value
      } else {
        return beforeSize * -1
      }
    }
  }

  function getOffsetWithIndex(index: number) {
    if (loop.value) {
      if (index < 0) {
        return {
          offset: getOffsetByIndex(-1),
          index: pageCount.value - 1,
        }
      } else if (index >= pageCount.value) {
        return {
          offset: getOffsetByIndex(pageCount.value),
          index: 0,
        }
      }
    } else {
      index = Math.max(Math.min(pageCount.value - 1, index), 0)
    }

    return {
      offset: getOffsetByIndex(index),
      index,
    }
  }

  function getNearestOffset(forceSide?: 'before' | 'after') {
    let before = 0
    let after = 0
    let length = slides.value.length

    function iteratorGroup(
      cursor: number,
      callback: (index: number, before: number, groupSize: number) => number | void,
    ) {
      let index = 0
      for (let i = 0; i < length; ) {
        let groupSize = 0
        for (let j = 0; j < slidesPerGroup.value; j++) {
          const slideSize = slides.value[i].size
          groupSize += slideSize + (j < slidesPerGroup.value - 1 ? spaceBetween.value : 0)
        }

        before = i === 0 ? 0 : after
        after =
          i === 0 ? groupSize + spaceBetween.value / 2 : before + groupSize + spaceBetween.value

        if (cursor >= before && cursor <= after) {
          const result = callback(i, before, groupSize)
          if (isNumber(result)) {
            index = result
            break
          }
        }

        if (i < length - 1) {
          i = Math.min(i + slidesPerGroup.value, length - 1)
        } else {
          break
        }
      }
      return getOffsetWithIndex(index)
    }

    let _offset = offset.value

    if (centeredSlides.value) {
      if (_offset >= swiperSize.value / 2) {
        return getOffsetWithIndex(0)
      } else if (_offset <= swiperSize.value / 2 - contentSize.value) {
        return getOffsetWithIndex(pageCount.value - 1)
      }

      const cursor = swiperSize.value / 2 - _offset

      return iteratorGroup(cursor, (i) => {
        if (forceSide) {
          if (forceSide === 'before') {
            return i / slidesPerGroup.value - 1
          } else {
            return i / slidesPerGroup.value + 1
          }
        } else {
          return i / slidesPerGroup.value
        }
      })
    } else {
      if (loop.value) {
        if (_offset > 0) {
          if (forceSide) {
            return getOffsetWithIndex(forceSide === 'before' ? -1 : 0)
          } else {
            return getOffsetWithIndex(_offset > swiperSize.value / 2 ? -1 : 0)
          }
        } else if (_offset < swiperSize.value - contentSize.value) {
          if (forceSide) {
            return getOffsetWithIndex(
              forceSide === 'before' ? pageCount.value - 1 : pageCount.value,
            )
          } else {
            return getOffsetWithIndex(
              _offset < swiperSize.value / 2 - contentSize.value
                ? pageCount.value
                : pageCount.value - 1,
            )
          }
        }
      } else {
        if (_offset >= 0) {
          return getOffsetWithIndex(0)
        } else if (_offset <= swiperSize.value - contentSize.value) {
          return getOffsetWithIndex(pageCount.value - 1)
        }
      }

      const cursor = -_offset

      return iteratorGroup(cursor, (i, before, groupSize) => {
        if (forceSide) {
          if (forceSide === 'before') {
            return i / slidesPerGroup.value
          } else {
            return i / slidesPerGroup.value + 1
          }
        } else {
          const slideCenter =
            i === 0 ? groupSize / 2 : before + groupSize / 2 + spaceBetween.value / 2

          if (cursor < slideCenter) {
            return i / slidesPerGroup.value
          } else {
            return i / slidesPerGroup.value + 1
          }
        }
      })
    }
  }

  function getPreviousNearestOffset() {
    return getNearestOffset('before')
  }

  function getNextNearestOffset() {
    return getNearestOffset('after')
  }

  function getNextIndex() {
    let index = activeIndex.value
    if (loop.value) return index >= pageCount.value ? 0 : index + 1
    return index >= pageCount.value - 1 ? 0 : index + 1
  }

  function getPreviousIndex() {
    let index = activeIndex.value
    if (loop.value) return index <= -1 ? pageCount.value - 1 : index - 1
    return index <= 0 ? pageCount.value - 1 : index - 1
  }

  function getNextIndexOffset() {
    return getOffsetWithIndex(getNextIndex())
  }

  function getPreviousIndexOffset() {
    return getOffsetWithIndex(getPreviousIndex())
  }

  function normalizeLoopOffset(nextOffset: number) {
    const firstMember = slides.value[0]
    const lastMember = slides.value[slides.value.length - 1]

    firstMember.offset = 0
    lastMember.offset = 0

    if (nextOffset > spaceBetween.value && nextOffset < swiperSize.value + spaceBetween.value) {
      lastMember.offset = -contentSize.value - spaceBetween.value
    } else if (nextOffset >= swiperSize.value + spaceBetween.value) {
      nextOffset = swiperSize.value - contentSize.value
    } else if (
      nextOffset < swiperSize.value - contentSize.value - spaceBetween.value &&
      nextOffset > -contentSize.value - spaceBetween.value
    ) {
      firstMember.offset = contentSize.value + spaceBetween.value
    } else if (nextOffset <= -contentSize.value - spaceBetween.value) {
      nextOffset = 0
    }
    return nextOffset
  }

  // ============================ snap ============================
  function snapTo(index: number) {
    offset.value = getOffsetByIndex(index)
  }

  function snapToStart() {
    offset.value = 0
  }

  function snapToEnd() {
    offset.value = swiperSize.value - contentSize.value
  }

  function snapToNearest() {
    offset.value = getNearestOffset().offset
  }

  function snapToPreviousNearest() {
    offset.value = getPreviousNearestOffset().offset
  }

  function snapToNextNearest() {
    offset.value = getNextNearestOffset().offset
  }

  // ============================ slides ============================
  function setSlides(_slides: SwiperSlideData[]) {
    slides.value = _slides
    updateSlidesSize()
  }

  function updateSlidesSize() {
    const slideSize =
      (swiperSize.value - (slidesPerView.value - 1) * spaceBetween.value) / slidesPerView.value

    slides.value.forEach((slide) => {
      slide.size = slideSize
    })
  }

  watch(swiperSize, () => {
    updateSlidesSize()
    snapTo(activeIndex.value)
  })

  return {
    offset,
    swiperSize,
    contentSize,
    startEdge,
    endEdge,
    activeIndex,
    slidesPerView,
    slidesPerGroup,
    spaceBetween,
    centeredSlides,
    loop,
    pageCount,
    setSlides,
    getOffsetByIndex,
    getNearestOffset,
    getPreviousNearestOffset,
    getNextNearestOffset,
    snapToStart,
    snapToEnd,
    snapToNearest,
    snapToPreviousNearest,
    snapToNextNearest,
    getNextIndex,
    getPreviousIndex,
    getNextIndexOffset,
    getPreviousIndexOffset,
    normalizeLoopOffset,
  }
}
