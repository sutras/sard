import Taro from '@tarojs/taro'
import { kebabCase } from '@/utils'

function getScrollBox(el: HTMLElement) {
  let current: HTMLElement | null = el

  while (current && current.nodeType == 1) {
    const overflowY = window.getComputedStyle(current).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return current
    }
    current = current.parentElement
  }

  return window
}

type DataType = number | string | boolean | object

const strategies: {
  [key: PropertyKey]: (data: DataType) => void
} = {
  route(data: string) {
    const pages = Taro.getCurrentPages()
    const toRoute = pages.length < 2 ? Taro.navigateTo : Taro.redirectTo
    toRoute({
      url: `/packageA/pages/${kebabCase(data)}/index`,
    })
  },
  scrollTo(data: string) {
    function attention(
      el: HTMLElement & {
        __flashTimer?: number
      },
    ) {
      if (el.__flashTimer) {
        clearTimeout(el.__flashTimer)
      }

      el.classList.add('attention')

      el.__flashTimer = setTimeout(() => {
        el.classList.remove('attention')
      }, 1300)
    }

    const titles = document.querySelectorAll('.demo-title')
    Array.prototype.slice.call(titles).some((el: HTMLElement) => {
      if ((el.textContent || '').replace(/\s/g, '') === data) {
        const scorllBox = getScrollBox(el)
        scorllBox.scrollBy({
          top: el.getBoundingClientRect().top - 10,
          behavior: 'smooth',
        })

        const parent = el.parentElement
        if (parent) {
          attention(parent)
        }
        return true
      }
    })
  },
}

function sendMessage(message: { type: string; data?: DataType }) {
  parent.postMessage(message, '*')
}

export function ganged() {
  window.addEventListener(
    'message',
    (
      event: MessageEvent<{
        type: string
        data: DataType
      }>,
    ) => {
      const {
        data: { type, data },
      } = event

      const handler = strategies[type]
      if (typeof handler === 'function') {
        handler(data)
      }
    },
  )

  sendMessage({
    type: 'loaded',
  })
}
