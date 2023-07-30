import { FC, useContext } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { RowContext } from './Row'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface ColProps extends BaseProps {
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

export const Col: FC<ColProps> = (props) => {
  const { children, className, style, span, offset, order, ...restProps } =
    props

  const [bem] = useBem('col')

  const colClass = classNames(
    bem.b(),
    bem.m(span, span),
    bem.m(`offset-${offset}`, offset),
    className,
  )

  const gutter = useContext(RowContext)

  const colStyle = {
    ...(order !== undefined
      ? {
          order,
        }
      : null),
    ...(gutter
      ? {
          paddingLeft: gutter[0],
          paddingRight: gutter[0],
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
