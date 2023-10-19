import { useMemo } from 'react'
import { useTopRoute } from '../../use/useRoute'
import { useDom } from './useDom'
import { useScrollSpy } from './useScrollSpy'

export function Catalog() {
  const topRoute = useTopRoute()

  const dom = useDom()
  const index = useScrollSpy(dom)

  const finalDom = useMemo(() => {
    const item = dom[index]
    if (!item) {
      return ''
    }
    return dom
      .map((item, i) => {
        return i === index
          ? item.replace('doc-catalog-link', 'doc-catalog-link active')
          : item
      })
      .join('')
  }, [dom, index])

  if (
    !topRoute ||
    !Array.isArray(topRoute.children) ||
    topRoute.children.length === 0
  ) {
    return null
  }

  return (
    <div className="doc-catalog">
      <ul dangerouslySetInnerHTML={{ __html: finalDom }}></ul>
    </div>
  )
}

export default Catalog
