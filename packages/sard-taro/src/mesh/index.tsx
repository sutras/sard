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
  outline?: boolean
  outlineVertical?: boolean
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
    outline = false,
    outlineVertical = false,

    gap,
    square,
    border = true,
    center = true,
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

  const canShowOutline = border && (!gutter || gutter[0] <= 0)

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('outline', canShowOutline && outline),
        bem.m(
          'outline-vertical',
          canShowOutline && outlineVertical && !outline,
        ),
        className,
      )}
      style={{
        ...(gap
          ? {
              marginLeft: -gutter[0] + gutter[1],
              marginRight: -gutter[0] + gutter[1],
            }
          : null),
        ...style,
      }}
    >
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
            ...(gap
              ? {
                  paddingRight: gutter[0] + gutter[1],
                  paddingLeft: gutter[0] + gutter[1],
                }
              : null),
            marginBottom: gap && !isBottom ? gap : '',
            ...item.props.style,
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
