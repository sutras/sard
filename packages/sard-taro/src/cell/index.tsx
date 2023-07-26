import { CSSProperties, FC, ReactNode, useContext } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { CellGroup, CellGroupContext } from './Group'
import Icon from '../icon'

import { BaseProps } from '../base'
import { isNullish } from '../utils'

export * from './Group'

export interface CellProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  value?: ReactNode
  footer?: ReactNode
  isLink?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
  arrow?: ReactNode
  icon?: ReactNode
  inset?: boolean
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
  onClick?: (event: ITouchEvent) => void
}

export interface CellFC extends FC<CellProps> {
  Group: typeof CellGroup
}

export const Cell: CellFC = (props) => {
  const {
    className = '',
    children,
    title,
    label,
    value,
    footer,
    isLink = false,
    arrowDirection = 'right',
    arrow,
    icon,
    inset,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
    ...restProps
  } = props

  const context = useContext(CellGroupContext)

  const cellClass = classNames(
    'sar-cell',
    {
      'sar-cell-is-link': isLink,
      'sar-cell-inset': inset,
    },
    className,
  )

  return (
    <View {...restProps} className={cellClass}>
      {!isNullish(icon) && (
        <View className="sar-cell-header">
          <View className="sar-cell-icon">{icon}</View>
        </View>
      )}
      <View
        className={classNames('sar-cell-content', {
          'sar-cell-content-custom': children,
        })}
      >
        {children ?? (
          <>
            <View
              className={classNames(
                'sar-cell-body',
                context.bodyClass,
                bodyClass,
              )}
              style={{
                ...context.bodyStyle,
                ...bodyStyle,
              }}
            >
              {!isNullish(title) && (
                <View className="sar-cell-title">{title}</View>
              )}
              {!isNullish(label) && (
                <View className="sar-cell-label">{label}</View>
              )}
            </View>
            <View
              className={classNames(
                'sar-cell-footer',
                context.footerClass,
                footerClass,
              )}
              style={{
                ...context.footerStyle,
                ...footerStyle,
              }}
            >
              {footer || (
                <>
                  {!isNullish(value) && (
                    <View className="sar-cell-value">{value}</View>
                  )}
                  {isLink && (
                    <View className="sar-cell-arrow">
                      {arrow ?? <Icon name={arrowDirection}></Icon>}
                    </View>
                  )}
                </>
              )}
            </View>
          </>
        )}
      </View>
    </View>
  )
}

Cell.Group = CellGroup

export default Cell
