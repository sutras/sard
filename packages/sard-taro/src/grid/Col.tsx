import { FC, useContext } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { RowContext } from './Row'
import { BaseProps } from '../base'

export interface ColProps extends BaseProps {
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

export const Col: FC<ColProps> = (props) => {
  const { children, className, style, span, offset, order, ...restProps } =
    props

  const colClass = classNames(
    'sar-col',
    {
      ['sar-col-' + span]: span,
      ['sar-col-offset-' + offset]: offset,
    },
    className,
  )

  const context = useContext(RowContext)

  const colStyle = {
    ...(order !== undefined
      ? {
          order,
        }
      : null),
    ...(context.gap
      ? {
          paddingLeft: context.gap[0] + context.gap[1],
          paddingRight: context.gap[0] + context.gap[1],
        }
      : null),
    ...style,
  }

  return (
    <View {...restProps} className={colClass} style={colStyle}>
      {children}
    </View>
  )
}

export default Col
