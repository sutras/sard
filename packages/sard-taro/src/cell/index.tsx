import { CSSProperties, FC, ReactNode, useContext } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { CellGroup } from './Group'
import Icon from '../icon'

import { BaseProps } from '../base'
import { isNullish, pickContextNullish } from '../utils'
import { useBem } from '../use'
import { OrderContext } from './OrderContext'
import { CellContext } from './CellContext'

export * from './Group'

export interface CellProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  value?: ReactNode
  footer?: ReactNode
  linkable?: boolean
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
    linkable = false,
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

  const [bem] = useBem('cell')

  const { index, count } = useContext(OrderContext)

  const cellContext = useContext(CellContext)
  const contextProps = pickContextNullish(
    {
      inset,
      bodyStyle,
      bodyClass,
      footerStyle,
      footerClass,
    },
    cellContext,
  )

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('first', index === 0),
        bem.m('last', index === count - 1),
        bem.m('linkable', linkable),
        className,
      )}
    >
      {!isNullish(icon) && (
        <View
          className={classNames(
            bem.e('header'),
            bem.em('header', 'inset-later', contextProps.inset && index > 0),
          )}
        >
          <View className={bem.e('icon')}>{icon}</View>
        </View>
      )}
      <View
        className={classNames(
          bem.e('content'),
          bem.em('content', 'custom', !!children),
          bem.em('content', 'later', index > 0),
        )}
      >
        {children ?? (
          <>
            <View
              className={classNames(bem.e('body'), contextProps.bodyClass)}
              style={contextProps.bodyStyle}
            >
              {!isNullish(title) && (
                <View className={classNames(bem.e('title'))}>{title}</View>
              )}
              {!isNullish(label) && (
                <View className={bem.e('label')}>{label}</View>
              )}
            </View>
            <View
              className={classNames(bem.e('footer'), contextProps.footerClass)}
              style={contextProps.footerStyle}
            >
              {footer || (
                <>
                  {!isNullish(value) && (
                    <View className={bem.e('value')}>{value}</View>
                  )}
                  {linkable && (
                    <View className={bem.e('arrow')}>
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
