import { useEffect, useState } from 'react'

function throttle(callback, wait) {
  let waiting = false
  return function (...args) {
    const context = this
    if (!waiting) {
      waiting = true
      setTimeout(function () {
        callback.apply(context, args)
        waiting = false
      }, wait)
    }
  }
}

export function useScrollSpy(dom) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const mainEl = document.querySelector('.doc-layout-main')

    let leadings = []
    const offset = 60 + 20

    function scrollHandler() {
      const leadingsTop = leadings.map((leading) => {
        return leading.getBoundingClientRect().top
      })
      if (leadingsTop[0] >= offset) {
        setIndex(0)
        return
      }
      if (leadingsTop[leadingsTop.length - 1] < offset) {
        setIndex(leadingsTop.length - 1)
        return
      }
      leadingsTop.some((top, i) => {
        const nextTop = leadingsTop[i + 1]
        if (top <= offset && nextTop > offset) {
          setIndex(i)
          return true
        }
      })
    }
    const throttleScrollHandler = throttle(scrollHandler, 150)

    throttleScrollHandler()

    if (mainEl) {
      leadings = [...mainEl.querySelectorAll('h1, h2, h3, h4')]

      window.addEventListener('scroll', throttleScrollHandler)
    }

    return () => {
      if (mainEl) {
        window.removeEventListener('scroll', throttleScrollHandler)
      }
    }
  }, [dom])

  return index
}
