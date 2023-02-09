import { CSSProperties, FC, ReactNode, useContext } from 'react'
import classNames from 'classnames'

import { RowContext } from './Row'

export interface ColProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

export const Col: FC<ColProps> = (props) => {
  const { children, className, style, span, offset, order, ...restProps } =
    props

  const colClass = classNames(
    's-col',
    {
      ['s-col-' + span]: span,
      ['s-col-offset-' + offset]: offset,
    },
    className,
  )

  const context = useContext(RowContext)

  const colStyle = {
    ...(order != null
      ? {
          order,
        }
      : null),
    ...(context.gutter
      ? {
          paddingLeft: context.gap[0] + context.gap[1],
          paddingRight: context.gap[0] + context.gap[1],
        }
      : null),
    ...style,
  }

  return (
    <div {...restProps} className={colClass} style={colStyle}>
      {children}
    </div>
  )
}

export default Col
