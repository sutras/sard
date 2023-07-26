import { ReactNode } from 'react'

export interface MainProps {
  children?: ReactNode
}

export default function Main(props: MainProps) {
  const { children } = props

  return <div className="doc-layout-main">{children}</div>
}
