import { windowInfo } from 'sard'
import router from './router'

const strategies: {
  [key: string]: (data: any) => void
} = {
  route(data: string) {
    router.push(`/components/${data}`)
  },

  hashchange(data: string) {
    const titles = document.querySelectorAll('.doc-demo__title')

    ;[...titles].some((el) => {
      if (el.textContent.replace(/\s/g, '') === data) {
        window.scrollBy({
          top:
            el.getBoundingClientRect().top -
            windowInfo.navBarHeight -
            windowInfo.statusBarHeight -
            10,
          behavior: 'smooth',
        })
        return true
      }
    })
  },

  theme(data: string) {
    document.dispatchEvent(
      new CustomEvent('theme-change', {
        detail: data,
      }),
    )
  },

  getUrl() {
    sendMessage({
      type: 'url',
      data: window.location.href,
    })
  },
}

function sendMessage(message: { type: string; data?: any }) {
  parent.postMessage(message, '*')
}

window.addEventListener(
  'message',
  (
    event: MessageEvent<{
      type: string
      data: any
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

window.addEventListener('load', () => {
  sendMessage({
    type: 'loaded',
  })
})
