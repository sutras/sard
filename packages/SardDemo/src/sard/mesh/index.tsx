import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import { BaseProps } from '../base'
import { MeshCommonProps } from './type'
import { MeshItem, MeshItemProps } from './Item'
import { filterNullish, pickNonNullish } from '../utils'
import { useBem } from '../use'
import Halfline from '../halfline'

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
    border = true,
    square,
    center = true,
    clickable,
    reverse,
    direction,
    ...restProps
  } = props

  const [bem] = useBem('mesh')

  const canShowOutline = border && (!gap || gap <= 0)

  const rows = useMemo(() => {
    const total = Children.count(children)

    const rows: ReactNode[][] = Array(Math.ceil(total / columns))
      .fill(0)
      .map(() => [])

    Children.forEach(children, (item: ReactElement<MeshItemProps>, index) => {
      const isRight = (index + 1) % columns === 0
      const isBottom = total - index <= (total % columns || columns)

      const col = cloneElement(item, {
        key: index,
        ...pickNonNullish(
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
        _isRight: isRight,
        _isBottom: isBottom,
      })

      const rowIndex = Math.floor(index / columns)
      rows[rowIndex].push(col)
    })

    const lastRow = rows[rows.length - 1]
    const lack = columns - lastRow.length
    if (lack > 0) {
      Array(lack)
        .fill(0)
        .forEach((_, i) => {
          lastRow.push(<View key={i} className={bem.e('substitute')} />)
        })
    }

    return rows.map((cols, i) => (
      <View
        key={i}
        className={bem.e('row')}
        style={filterNullish({
          gap,
        })}
      >
        {cols}
      </View>
    ))
  }, [
    children,
    columns,
    gap,
    square,
    border,
    center,
    clickable,
    direction,
    reverse,
  ])

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        ...style,
        ...filterNullish({
          gap,
        }),
      }}
    >
      {canShowOutline && outline && <Halfline direction="around" />}
      {canShowOutline && outlineVertical && !outline && (
        <>
          <Halfline direction="top" />
          <Halfline direction="bottom" />
        </>
      )}
      {rows}
    </View>
  )
}

Mesh.Item = MeshItem

export default Mesh
