import { useEffect, useState } from 'react'

function getDom(context: Element) {
  return [...context.querySelectorAll('h1, h2, h3, h4')].map((heading) => {
    return `<li data-level="${heading.nodeName.slice(
      1,
    )}"><a class="doc-catalog-link" href="#${
      heading.id
    }">${heading.textContent.replace(/#/g, '')}</a></li>`
  })
}

export function useDom() {
  const [dom, setDom] = useState([])

  useEffect(() => {
    const mainEl = document.querySelector('.doc-layout-main')
    let observer: MutationObserver = null

    if (mainEl) {
      setDom(getDom(mainEl))

      observer = new MutationObserver((mutationRecord) => {
        for (const mutation of mutationRecord) {
          if (mutation.type === 'childList') {
            setDom(getDom(mainEl))
          }
        }
      })
      observer.observe(mainEl, {
        childList: true,
      })
    }

    return () => {
      observer?.disconnect()
    }
  }, [])

  return dom
}
