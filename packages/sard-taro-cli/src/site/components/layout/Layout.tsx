import { ReactNode, Children, useMemo, CSSProperties } from 'react'
import classNames from 'classnames'
import Sider from './Sider'

export interface LayoutProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

interface LayoutChildren {
  type: typeof Sider
}

export default function Layout(props) {
  const { children, className, style } = props

  const hasSider = useMemo(
    () =>
      Children.toArray(children).some((item) => {
        return (item as unknown as LayoutChildren).type === Sider
      }),
    [children],
  )

  return (
    <div
      className={classNames(
        'doc-layout',
        {
          'doc-layout-has-sider': hasSider,
        },
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
