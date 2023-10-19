import { ReactElement, Children, cloneElement, FC } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { pickNonNullish } from '../utils'
import { useBem, useControllableValue } from '../use'

import { TabbarItem, TabbarItemProps } from './Item'
import { BaseProps } from '../base'
import Halfline from '../halfline'

export * from './Item'

export interface TabbarProps extends Omit<BaseProps, 'children'> {
  children?: ReactElement | ReactElement[]
  activeKey?: number | string
  defaultActiveKey?: number | string
  onChange?: (key: number | string) => void
  color?: string
  activeColor?: string
}

export interface TabbarFC extends FC<TabbarProps> {
  Item: typeof TabbarItem
}

export const Tabbar: TabbarFC = (props) => {
  const {
    className,
    style,
    children,

    activeKey,
    defaultActiveKey,
    onChange,
    color,
    activeColor,
    ...restProps
  } = props

  const [bem] = useBem('tabbar')

  const [innerActiveKey, setInnerActiveKey] = useControllableValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    trigger: onChange,
  })

  const handleItemClick = (
    key: number | string,
    element: ReactElement,
    event: ITouchEvent,
  ) => {
    setInnerActiveKey(key)
    element.props?.onClick?.(event)
  }

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={style}
    >
      {Children.map(
        children,
        (element: ReactElement<TabbarItemProps>, index) => {
          const innerKey = element.key ?? index

          return cloneElement(element, {
            ...pickNonNullish({ color, activeColor }, element.props),
            onClick: (event) => handleItemClick(innerKey, element, event),
            _innerKey: innerKey,
            _activeKey: innerActiveKey,
          })
        },
      )}
      <Halfline direction="top" />
    </View>
  )
}

Tabbar.Item = TabbarItem

export default Tabbar
