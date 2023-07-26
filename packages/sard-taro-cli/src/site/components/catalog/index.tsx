import { useEffect, useState } from 'react'
import { useTopRoute } from '../../use/useRoute'

function getDom(context: Element) {
  return [...context.querySelectorAll('h1, h2, h3')]
    .map((heading) => {
      return `<li data-level="${heading.nodeName.slice(
        1,
      )}"><a class="doc-catalog-link" href="#${
        heading.id
      }">${heading.textContent.replace(/#/g, '')}</a></li>`
    })
    .join('')
}

export function Catalog() {
  const [dom, setDom] = useState('')

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

  const topRoute = useTopRoute()

  if (
    !topRoute ||
    !Array.isArray(topRoute.children) ||
    topRoute.children.length === 0
  ) {
    return null
  }

  return (
    <div className="doc-catalog">
      <ul dangerouslySetInnerHTML={{ __html: dom }}></ul>
    </div>
  )
}

export default Catalog
