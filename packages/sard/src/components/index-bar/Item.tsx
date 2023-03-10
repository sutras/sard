import { CSSProperties, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

export interface IndexBarItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  activeKey?: number | string
  offset?: number | string
  anchorClass?: string
  anchorStyle?: CSSProperties
}

export const IndexBarItem = forwardRef<HTMLElement, IndexBarItemProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      title,
      activeKey,
      offset,
      anchorClass,
      anchorStyle,
      ...restProps
    } = props

    const itemClass = classNames('s-index-bar-item', className)

    return (
      <div {...restProps} ref={ref as any} className={itemClass}>
        <div
          className={classNames('s-index-bar-anchor', anchorClass)}
          style={{ ...anchorStyle, top: offset }}
        >
          {title}
        </div>
        <div className="s-index-bar-content">{children}</div>
      </div>
    )
  },
)

export default IndexBarItem
