import { createElement } from 'react'
import Code from './code'
import genHash from '../../utils/genHash'

export default function Demo({ children }) {
  const { doc } = children

  return (
    <div className="doc-card">
      <div
        dangerouslySetInnerHTML={{
          __html: genHash(doc.doc),
        }}
      ></div>

      <div className="doc-demo">{createElement(children)}</div>

      <Code code={doc.code}></Code>
    </div>
  )
}
