import { ReactNode } from 'react'

export interface LayoutProps {
  children?: ReactNode
}

export default function Content(props: LayoutProps) {
  const { children } = props

  return <div className="doc-layout-content">{children}</div>
}
