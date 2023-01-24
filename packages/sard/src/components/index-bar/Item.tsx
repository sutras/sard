import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface IndexBarItemProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  name?: any
  activeKey?: any
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
      name,
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
          {name}
        </div>
        <div className="s-index-bar-content">{children}</div>
      </div>
    )
  },
)

export default IndexBarItem
