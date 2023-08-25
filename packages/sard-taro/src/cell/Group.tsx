import {
  CSSProperties,
  Children,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useMemo,
} from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { CellProps } from './index'
import { useBem } from '../use'
import { CellContext } from './CellContext'
import { OrderContext } from './OrderContext'

export interface CellGroupProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  inlaid?: boolean
  card?: boolean
  inset?: boolean
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
}

export const CellGroup: FC<CellGroupProps> = (props) => {
  const {
    className = '',
    children,
    title,
    label,
    inlaid,
    card,
    inset,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
    ...restProps
  } = props

  const [bem] = useBem('cell-group')

  const cellContextValue = useMemo(() => {
    return {
      inset,
      bodyStyle,
      bodyClass,
      footerStyle,
      footerClass,
    }
  }, [inset, bodyStyle, bodyClass, footerStyle, footerClass])

  const count = Children.count(children)

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('inlaid', inlaid),
        bem.m('card', card),
        className,
      )}
    >
      {!isNullish(title) && (
        <View className={bem.e('header')}>
          <View className={bem.e('title')}>{title}</View>
        </View>
      )}
      <View
        className={classNames(
          bem.e('body'),
          bem.em('body', 'card', card),
          bem.em('body', 'inlaid', inlaid),
        )}
      >
        <CellContext.Provider value={cellContextValue}>
          {Children.map(children, (element: ReactElement<CellProps>, index) => {
            return (
              <OrderContext.Provider value={{ index, count, card }}>
                {cloneElement(element)}
              </OrderContext.Provider>
            )
          })}
        </CellContext.Provider>
      </View>
      {!isNullish(label) && (
        <View className={bem.e('footer')}>
          <View className={bem.e('label')}>{label}</View>
        </View>
      )}
    </View>
  )
}

export default CellGroup
