import {
  CSSProperties,
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
import { isNullish } from '../utils'
import { useBem } from '../use'
import { ListItem, ListItemProps } from './Item'
import { ListContext } from './ListContext'
import { OrderContext } from './OrderContext'
import Halfline from '../halfline'

export interface ListProps extends BaseProps {
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

export interface ListFC extends FC<ListProps> {
  Item: typeof ListItem
}

export const List: ListFC = (props) => {
  const {
    className,
    style,
    children,

    title,
    label,
    inlaid,
    card = false,
    inset,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
    ...restProps
  } = props

  const [bem] = useBem('list')

  const listContextValue = useMemo(() => {
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
      className={classNames(bem.b(), bem.m('card', card), className)}
      style={style}
    >
      {!isNullish(title) && (
        <View className={bem.e('header')}>
          <View className={bem.e('title')}>{title}</View>
        </View>
      )}
      <View className={classNames(bem.e('body'), bem.em('body', 'card', card))}>
        {!inlaid && !card && <Halfline direction="top" />}
        <ListContext.Provider value={listContextValue}>
          {Children.map(
            children,
            (element: ReactElement<ListItemProps>, index) => {
              return (
                <OrderContext.Provider value={{ index, count, card }}>
                  {cloneElement(element)}
                </OrderContext.Provider>
              )
            },
          )}
        </ListContext.Provider>
        {!inlaid && !card && <Halfline direction="bottom" />}
      </View>
      {!isNullish(label) && (
        <View className={bem.e('footer')}>
          <View className={bem.e('label')}>{label}</View>
        </View>
      )}
    </View>
  )
}

List.Item = ListItem

export default List
