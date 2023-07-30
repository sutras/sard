import { Children, FC, ReactElement, cloneElement, useMemo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { BaseProps } from '../base'
import { MeshCommonProps } from './type'
import { MeshItem, MeshItemProps } from './Item'
import { pickNullish } from '../utils'
import { splitUnit } from '../utils'
import { useBem } from '../use'

export interface Mesh extends BaseProps, MeshCommonProps {
  columns?: number
  border?: boolean
  center?: boolean
  direction?: 'horizontal' | 'vertical'
  square?: boolean
}

export interface MeshFC extends FC<Mesh> {
  Item: typeof MeshItem
}

export const Mesh: MeshFC = (props) => {
  const {
    children,
    className,
    style,
    columns = 4,

    gap,
    square,
    border,
    center,
    clickable,
    direction,
    reverse,
    ...restProps
  } = props

  const [bem] = useBem('mesh')

  const gutter = useMemo(() => {
    if (gap) {
      const result = splitUnit(gap)
      return [result[0] / 2, result[1] || 'px'] as [number, string]
    }
  }, [gap])

  const meshClass = classNames(bem.b(), className)

  const meshStyle = {
    ...(gap
      ? {
          marginLeft: -gutter[0] + gutter[1],
          marginRight: -gutter[0] + gutter[1],
        }
      : null),
    ...style,
  }

  return (
    <View {...restProps} className={meshClass} style={meshStyle}>
      {Children.map(children, (item: ReactElement<MeshItemProps>, index) => {
        const total = Children.count(children)

        const isRight = (index + 1) % columns === 0
        const isBottom = total - index <= (total % columns || columns)

        return cloneElement(item, {
          ...pickNullish(
            {
              gap,
              square,
              border,
              center,
              clickable,
              direction,
              reverse,
            },
            item.props,
          ),
          style: {
            flexBasis: (1 / columns) * 100 + '%',
            paddingTop: square ? (1 / columns) * 100 + '%' : '',
            ...(gap
              ? {
                  paddingRight: gutter[0] + gutter[1],
                  paddingLeft: gutter[0] + gutter[1],
                }
              : null),
            marginBottom: gap && !isBottom ? gap : '',
          },
          isRight,
          isBottom,
        })
      })}
    </View>
  )
}

Mesh.Item = MeshItem

export default Mesh
