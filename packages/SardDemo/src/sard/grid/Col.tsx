import { FC, useContext } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { RowContext } from './Row'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish } from '../utils'

export interface ColProps extends BaseProps {
  span?: number | 'auto' | 'none'
  offset?: number
  order?: number
}

export const Col: FC<ColProps> = (props) => {
  const { children, className, style, span, offset, order, ...restProps } =
    props

  const [bem] = useBem('col')

  const gap = useContext(RowContext)

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m(span, span),
        bem.m(`offset-${offset}`, offset),
        className,
      )}
      style={{
        ...style,
        ...filterNullish({
          order,
          padding: gap ? gap / 2 : null,
        }),
      }}
    >
      {children}
    </View>
  )
}

export default Col
